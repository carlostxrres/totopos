import { useMemo } from "react";
import { units } from "@tot-opos/curriculum-data";
import { fixedTests } from "@tot-opos/test-data";
import { useQuestionHistoryStore } from "@/store/question-history-store";
import { StatsUnitNode } from "@/components/StatsUnitNode";
import { StatCard } from "@/components/StatCard";

const ALL_QUESTIONS = fixedTests.flatMap((t) => t.questions);

export function StatsPage() {
  const historyByQuestionId = useQuestionHistoryStore((s) => s.historyByQuestionId);

  const rootUnits = units
    .filter((u) => u.parentId === null)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const globalStats = useMemo(() => {
    let total = 0;
    let answered = 0;
    let correct = 0;
    for (const q of ALL_QUESTIONS) {
      total++;
      const history = historyByQuestionId[q.id];
      if (history && history.entries.length > 0) {
        answered++;
        if (history.entries[0].wasCorrect) {
          correct++;
        }
      }
    }
    return { total, answered, correct };
  }, [historyByQuestionId]);

  const globalRate =
    globalStats.answered > 0 ? Math.round((globalStats.correct / globalStats.answered) * 100) : 0;

  const rateColor =
    globalStats.answered === 0
      ? "muted" as const
      : globalRate >= 70
        ? "success" as const
        : globalRate >= 50
          ? "warning" as const
          : "destructive" as const;

  return (
    <div className="space-y-6 py-4">
      <div>
        <h1 className="text-lg font-semibold">Estadísticas por unidad</h1>
        <p className="text-sm text-muted-foreground">
          Basado en el último intento de cada pregunta.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <StatCard value={globalStats.total} label="Preguntas totales" />
        <StatCard value={globalStats.answered} label="Respondidas" />
        <StatCard
          value={globalStats.answered === 0 ? "—" : `${globalRate}%`}
          label="Acierto global"
          valueColor={rateColor}
        />
      </div>

      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><span className="inline-block w-3 h-1.5 rounded-full bg-success" /> ≥70%</span>
        <span className="flex items-center gap-1"><span className="inline-block w-3 h-1.5 rounded-full bg-warning" /> 50–69%</span>
        <span className="flex items-center gap-1"><span className="inline-block w-3 h-1.5 rounded-full bg-destructive" /> &lt;50%</span>
        <span className="ml-auto">respondidas/total</span>
      </div>

      <div className="rounded-lg border border-border divide-y divide-border">
        {rootUnits.map((unit) => (
          <StatsUnitNode
            key={unit.id}
            unit={unit}
            allUnits={units}
            depth={0}
            historyByQuestionId={historyByQuestionId}
          />
        ))}
      </div>
    </div>
  );
}
