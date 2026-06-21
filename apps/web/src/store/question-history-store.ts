import type { QuestionHistory } from "@tot-opos/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type QuestionHistoryState = {
  historyByQuestionId: Record<string, QuestionHistory>;
  recordAnswer: (questionId: string, wasCorrect: boolean) => void;
};

export const useQuestionHistoryStore = create<QuestionHistoryState>()(
  persist(
    (set) => ({
      historyByQuestionId: {},

      recordAnswer: (questionId, wasCorrect) =>
        set((state) => {
          const existing = state.historyByQuestionId[questionId] ?? {
            questionId,
            entries: [],
          };
          return {
            historyByQuestionId: {
              ...state.historyByQuestionId,
              [questionId]: {
                ...existing,
                entries: [
                  { answeredAt: new Date().toISOString(), wasCorrect },
                  ...existing.entries,
                ],
              },
            },
          };
        }),
    }),
    { name: "tot-opos:question-history" },
  ),
);
