import type { IndefiniteAnswer, IndefiniteSession } from "@tot-opos/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useHistoryStore } from "@/store/history-store";

type SessionState = {
  sessions: Record<string, IndefiniteSession>;
  startSession: (testId: string, questionIds: string[], testTitle?: string) => void;
  addAnswer: (testId: string, answer: IndefiniteAnswer) => void;
  closeSession: (testId: string) => void;
};

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      sessions: {},

      startSession: (testId, questionIds, testTitle) =>
        set((state) => ({
          sessions: {
            ...state.sessions,
            [testId]: {
              id: crypto.randomUUID(),
              testId,
              testTitle,
              startedAt: new Date().toISOString(),
              questionIds,
              answers: [],
            },
          },
        })),

      addAnswer: (testId, answer) =>
        set((state) => {
          const session = state.sessions[testId];
          if (!session) return state;
          return {
            sessions: {
              ...state.sessions,
              [testId]: {
                ...session,
                answers: [...session.answers, answer],
              },
            },
          };
        }),

      closeSession: (testId) => {
        const session = get().sessions[testId];
        if (!session) return;
        const closed: IndefiniteSession = {
          ...session,
          endedAt: new Date().toISOString(),
        };
        useHistoryStore.getState().addIndefiniteSession(closed);
        set((state) => {
          const { [testId]: _, ...rest } = state.sessions;
          return { sessions: rest };
        });
      },
    }),
    { name: "tot-opos:session" },
  ),
);
