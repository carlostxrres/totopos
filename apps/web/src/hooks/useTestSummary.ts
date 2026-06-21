import type { FixedAttempt, TestTimer } from "@tot-opos/types";
import { useHistoryStore } from "../store/history-store";
import { useProgressStore } from "../store/progress-store";
import { useSessionStore } from "../store/session-store";

export type TestSummary = {
  isInProgress: boolean;
  lastOpenedAt: string | undefined;
  answeredCount: number;
  answers: Record<string, string[]>;
  flaggedQuestionIds: string[];
  timer: TestTimer | undefined;
  bestScore: number | undefined;
  bestMaxScore: number | undefined;
  bestPassed: boolean | undefined;
  timesDone: number;
};

export function useTestSummary(testId: string, testType: "fixed" | "indefinite"): TestSummary {
  const progress = useProgressStore((s) => s.progressByTestId[testId]);
  const session = useSessionStore((s) => s.sessions[testId]);
  const fixedAttempts = useHistoryStore((s) => s.fixedAttempts);
  const indefiniteSessions = useHistoryStore((s) => s.indefiniteSessions);

  if (testType === "fixed") {
    const attempts = fixedAttempts.filter((a) => a.testId === testId);
    const best = attempts.reduce<FixedAttempt | undefined>((acc, a) => {
      if (!acc) return a;
      return a.score / a.maxScore > acc.score / acc.maxScore ? a : acc;
    }, undefined);

    return {
      isInProgress: !!progress,
      lastOpenedAt: progress?.lastOpenedAt,
      answeredCount: progress ? Object.keys(progress.answers).length : 0,
      answers: progress?.answers ?? {},
      flaggedQuestionIds: progress?.flaggedQuestionIds ?? [],
      timer: progress?.timer,
      bestScore: best?.score,
      bestMaxScore: best?.maxScore,
      bestPassed: best?.passed,
      timesDone: attempts.length,
    };
  }

  const sessions = indefiniteSessions.filter((s) => s.testId === testId);
  const lastSession = sessions[0];

  const correctCount = lastSession?.answers.filter((a) => a.wasCorrect).length ?? 0;
  const totalCount = lastSession?.answers.length ?? 0;
  const rate = totalCount > 0 ? correctCount / totalCount : undefined;

  return {
    isInProgress: !!session,
    lastOpenedAt: session?.startedAt,
    answeredCount: session?.answers.length ?? 0,
    answers: {},
    flaggedQuestionIds: [],
    timer: undefined,
    bestScore: rate !== undefined ? Math.round(rate * 100) : undefined,
    bestMaxScore: rate !== undefined ? 100 : undefined,
    bestPassed: undefined,
    timesDone: sessions.length,
  };
}
