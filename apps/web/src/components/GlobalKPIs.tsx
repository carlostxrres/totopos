import { useMemo } from "react";
import { useHistoryStore } from "@/store/history-store";
import { useQuestionHistoryStore } from "@/store/question-history-store";

function computeStreak(activityDays: Set<string>): number {
  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 0; ; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    if (activityDays.has(key)) {
      streak++;
    } else if (i === 0) {
      // Today has no activity yet — check yesterday to not break streak
      continue;
    } else {
      break;
    }
  }
  return streak;
}

export function GlobalKPIs() {
  const historyByQuestionId = useQuestionHistoryStore((s) => s.historyByQuestionId);
  const fixedAttempts = useHistoryStore((s) => s.fixedAttempts);
  const indefiniteSessions = useHistoryStore((s) => s.indefiniteSessions);

  const { totalAnswered, totalCorrect, streak, bestFixedPct } = useMemo(() => {
    let answered = 0;
    let correct = 0;
    const activityDays = new Set<string>();

    for (const history of Object.values(historyByQuestionId)) {
      for (const entry of history.entries) {
        answered++;
        if (entry.wasCorrect) {
          correct++;
        }
        activityDays.add(entry.answeredAt.slice(0, 10));
      }
    }

    // Also collect activity days from attempt/session dates in case history was cleared
    for (const a of fixedAttempts) {
      activityDays.add(a.completedAt.slice(0, 10));
    }
    for (const s of indefiniteSessions) {
      activityDays.add(s.startedAt.slice(0, 10));
    }

    const best = fixedAttempts.reduce<number | undefined>((acc, a) => {
      const pct = a.maxScore > 0 ? Math.round((a.score / a.maxScore) * 100) : 0;
      return acc === undefined || pct > acc ? pct : acc;
    }, undefined);

    return {
      totalAnswered: answered,
      totalCorrect: correct,
      streak: computeStreak(activityDays),
      bestFixedPct: best,
    };
  }, [historyByQuestionId, fixedAttempts, indefiniteSessions]);

  const globalRate = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : null;

  const kpis = [
    { label: "Racha actual", value: streak > 0 ? `${streak}d` : "—", sub: streak === 1 ? "día" : "días" },
    { label: "Preguntas respondidas", value: totalAnswered.toLocaleString("es"), sub: "total" },
    { label: "Tasa de acierto", value: globalRate !== null ? `${globalRate}%` : "—", sub: "global" },
    { label: "Mejor resultado", value: bestFixedPct !== undefined ? `${bestFixedPct}%` : "—", sub: "test fijo" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {kpis.map(({ label, value, sub }) => (
        <div key={label} className="card text-center space-y-0.5">
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold leading-tight">{value}</p>
          <p className="text-xs text-muted-foreground">{sub}</p>
        </div>
      ))}
    </div>
  );
}
