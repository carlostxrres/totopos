import type { IndefiniteTestFilters, Question, QuestionHistory, Unit } from "@tot-opos/types";

function getDescendantIds(unitId: string, units: Unit[]): string[] {
  const children = units.filter((u) => u.parentId === unitId);
  return [unitId, ...children.flatMap((c) => getDescendantIds(c.id, units))];
}

function shuffleArray<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function resolveQuestions(
  allQuestions: Question[],
  filters: IndefiniteTestFilters,
  questionHistories: Record<string, QuestionHistory>,
  now: Date,
  units: Unit[],
): Question[] {
  const expandedUnitIds = new Set(
    filters.unitIds.flatMap((id) => getDescendantIds(id, units)),
  );

  let pool = allQuestions.filter((q) =>
    q.unitIds.some((uid) => expandedUnitIds.has(uid)),
  );

  if (filters.excludeAnsweredInLastDays !== undefined) {
    const cutoff = now.getTime() - filters.excludeAnsweredInLastDays * 24 * 60 * 60 * 1000;
    pool = pool.filter((q) => {
      const history = questionHistories[q.id];
      if (!history) {
        return true;
      }
      return !history.entries.some((e) => new Date(e.answeredAt).getTime() >= cutoff);
    });
  }

  if (filters.questionSelection === "new-only") {
    pool = pool.filter((q) => {
      const history = questionHistories[q.id];
      return !history || history.entries.length === 0;
    });
  } else if (filters.questionSelection === "failed-in-last-days") {
    const days = filters.failedInLastDays ?? 7;
    const cutoff = now.getTime() - days * 24 * 60 * 60 * 1000;
    pool = pool.filter((q) => {
      const history = questionHistories[q.id];
      if (!history) {
        return false;
      }
      const recentEntries = history.entries.filter(
        (e) => new Date(e.answeredAt).getTime() >= cutoff,
      );
      if (recentEntries.length === 0) {
        return false;
      }
      return !recentEntries[0].wasCorrect;
    });
  }

  return shuffleArray(pool);
}
