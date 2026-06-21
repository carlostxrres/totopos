import { useQuestionHistoryStore } from "@/store/question-history-store";

export type QuestionHistorySummary = {
  timesAnswered: number;
  lastAnsweredAt: string | undefined;
  lastWasCorrect: boolean | undefined;
  successRate: number;
};

export function useQuestionHistory(questionId: string): QuestionHistorySummary {
  const history = useQuestionHistoryStore((s) => s.historyByQuestionId[questionId]);

  if (!history || history.entries.length === 0) {
    return {
      timesAnswered: 0,
      lastAnsweredAt: undefined,
      lastWasCorrect: undefined,
      successRate: 0,
    };
  }

  const correctCount = history.entries.filter((e) => e.wasCorrect).length;

  return {
    timesAnswered: history.entries.length,
    lastAnsweredAt: history.entries[0].answeredAt,
    lastWasCorrect: history.entries[0].wasCorrect,
    successRate: correctCount / history.entries.length,
  };
}
