import type { Unit } from "@tot-opos/types";
import { useQuestionHistoryStore } from "@/store/question-history-store";
import { fixedTests } from "@tot-opos/test-data";

const ALL_QUESTIONS = fixedTests.flatMap((t) => t.questions);

export type UnitStats = {
  total: number;
  answered: number;
  correct: number;
};

export type HistoryMap = ReturnType<typeof useQuestionHistoryStore.getState>["historyByQuestionId"];

export function computeStats(unitId: string, historyByQuestionId: HistoryMap): UnitStats {
  const questions = ALL_QUESTIONS.filter((q) => q.unitIds.includes(unitId));
  let answered = 0;
  let correct = 0;
  for (const q of questions) {
    const history = historyByQuestionId[q.id];
    if (history && history.entries.length > 0) {
      answered++;
      if (history.entries[0].wasCorrect) {
        correct++;
      }
    }
  }
  return { total: questions.length, answered, correct };
}

export function aggregateStats(unitId: string, allUnits: Unit[], historyByQuestionId: HistoryMap): UnitStats {
  const direct = computeStats(unitId, historyByQuestionId);
  const children = allUnits.filter((u) => u.parentId === unitId);
  if (children.length === 0) {
    return direct;
  }
  const childStats = children.map((c) => aggregateStats(c.id, allUnits, historyByQuestionId));
  return childStats.reduce(
    (acc, s) => ({
      total: acc.total + s.total,
      answered: acc.answered + s.answered,
      correct: acc.correct + s.correct,
    }),
    direct,
  );
}
