import type { TestProgress, TestTimer, TimerMode } from "@tot-opos/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type ProgressState = {
  progressByTestId: Record<string, TestProgress>;
  touchOpened: (testId: string) => void;
  setAnswer: (testId: string, questionId: string, optionIds: string[]) => void;
  toggleFlag: (testId: string, questionId: string) => void;
  startTimer: (testId: string, mode: TimerMode, minutes: number) => void;
  pauseTimer: (testId: string) => void;
  resumeTimer: (testId: string) => void;
  reset: (testId: string) => void;
  clear: (testId: string) => void;
};

function getOrCreate(state: ProgressState, testId: string): TestProgress {
  return (
    state.progressByTestId[testId] ?? {
      answers: {},
      flaggedQuestionIds: [],
      lastOpenedAt: new Date().toISOString(),
    }
  );
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, _get) => ({
      progressByTestId: {},

      touchOpened: (testId) =>
        set((state) => ({
          progressByTestId: {
            ...state.progressByTestId,
            [testId]: {
              ...getOrCreate(state, testId),
              lastOpenedAt: new Date().toISOString(),
            },
          },
        })),

      setAnswer: (testId, questionId, optionIds) =>
        set((state) => {
          const progress = getOrCreate(state, testId);
          return {
            progressByTestId: {
              ...state.progressByTestId,
              [testId]: {
                ...progress,
                answers: { ...progress.answers, [questionId]: optionIds },
              },
            },
          };
        }),

      toggleFlag: (testId, questionId) =>
        set((state) => {
          const progress = getOrCreate(state, testId);
          const flagged = progress.flaggedQuestionIds.includes(questionId)
            ? progress.flaggedQuestionIds.filter((id) => id !== questionId)
            : [...progress.flaggedQuestionIds, questionId];
          return {
            progressByTestId: {
              ...state.progressByTestId,
              [testId]: { ...progress, flaggedQuestionIds: flagged },
            },
          };
        }),

      startTimer: (testId, mode, minutes) =>
        set((state) => {
          const progress = getOrCreate(state, testId);
          const timer: TestTimer = {
            mode,
            deadlineAt: new Date(Date.now() + minutes * 60_000).toISOString(),
          };
          return {
            progressByTestId: {
              ...state.progressByTestId,
              [testId]: { ...progress, timer },
            },
          };
        }),

      pauseTimer: (testId) =>
        set((state) => {
          const progress = state.progressByTestId[testId];
          if (!progress?.timer?.deadlineAt) return state;
          const pausedRemainingMs = new Date(progress.timer.deadlineAt).getTime() - Date.now();
          return {
            progressByTestId: {
              ...state.progressByTestId,
              [testId]: {
                ...progress,
                timer: {
                  ...progress.timer,
                  deadlineAt: undefined,
                  pausedRemainingMs: Math.max(0, pausedRemainingMs),
                },
              },
            },
          };
        }),

      resumeTimer: (testId) =>
        set((state) => {
          const progress = state.progressByTestId[testId];
          if (!progress?.timer?.pausedRemainingMs) return state;
          return {
            progressByTestId: {
              ...state.progressByTestId,
              [testId]: {
                ...progress,
                timer: {
                  ...progress.timer,
                  deadlineAt: new Date(Date.now() + progress.timer.pausedRemainingMs).toISOString(),
                  pausedRemainingMs: undefined,
                },
              },
            },
          };
        }),

      reset: (testId) =>
        set((state) => {
          const progress = state.progressByTestId[testId];
          if (!progress) return state;
          return {
            progressByTestId: {
              ...state.progressByTestId,
              [testId]: {
                answers: {},
                flaggedQuestionIds: [],
                lastOpenedAt: new Date().toISOString(),
                timer: progress.timer
                  ? { mode: progress.timer.mode }
                  : undefined,
              },
            },
          };
        }),

      clear: (testId) =>
        set((state) => {
          const { [testId]: _, ...rest } = state.progressByTestId;
          return { progressByTestId: rest };
        }),
    }),
    { name: "tot-opos:progress" },
  ),
);
