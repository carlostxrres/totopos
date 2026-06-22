import { useMemo, useState } from "react";
import { units } from "@tot-opos/curriculum-data";
import type { Unit } from "@tot-opos/types";
import { fixedTests } from "@tot-opos/test-data";
import { useQuestionHistoryStore } from "@/store/question-history-store";
import { IconChevronDown, IconChevronRight } from "@tabler/icons-react";
import { cn } from "@/lib/cn";

const ALL_QUESTIONS = fixedTests.flatMap((t) => t.questions);

type UnitStats = {
  total: number;
  answered: number;
  correct: number;
};

function computeStats(
  unitId: string,
  historyByQuestionId: ReturnType<typeof useQuestionHistoryStore.getState>["historyByQuestionId"],
): UnitStats {
  const questions = ALL_QUESTIONS.filter((q) => q.unitIds.includes(unitId));
  let answered = 0;
  let correct = 0;
  for (const q of questions) {
    const history = historyByQuestionId[q.id];
    if (history && history.entries.length > 0) {
      answered++;
      if (history.entries[0].wasCorrect) correct++;
    }
  }
  return { total: questions.length, answered, correct };
}

function aggregateStats(
  unitId: string,
  allUnits: Unit[],
  historyByQuestionId: ReturnType<typeof useQuestionHistoryStore.getState>["historyByQuestionId"],
): UnitStats {
  const direct = computeStats(unitId, historyByQuestionId);
  const children = allUnits.filter((u) => u.parentId === unitId);
  if (children.length === 0) return direct;
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

function StatsBadge({ stats }: { stats: UnitStats }) {
  if (stats.total === 0) return null;
  const rate = stats.answered > 0 ? Math.round((stats.correct / stats.answered) * 100) : 0;
  const coverage = Math.round((stats.answered / stats.total) * 100);

  return (
    <div className="ml-auto flex shrink-0 items-center gap-3 text-xs text-muted-foreground">
      <span>{stats.answered}/{stats.total}</span>
      {stats.answered > 0 && (
        <span
          className={cn(
            "font-medium",
            rate >= 70 ? "text-success" : rate >= 50 ? "text-warning" : "text-destructive",
          )}
        >
          {rate}%
        </span>
      )}
      <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-primary/40 relative"
          style={{ width: `${coverage}%` }}
        >
          {stats.answered > 0 && (
            <div
              className={cn(
                "absolute inset-y-0 left-0 rounded-full",
                rate >= 70 ? "bg-success" : rate >= 50 ? "bg-warning" : "bg-destructive",
              )}
              style={{ width: `${rate}%` }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

type UnitNodeProps = {
  unit: Unit;
  allUnits: Unit[];
  depth: number;
  historyByQuestionId: ReturnType<typeof useQuestionHistoryStore.getState>["historyByQuestionId"];
};

function UnitNode({ unit, allUnits, depth, historyByQuestionId }: UnitNodeProps) {
  const children = allUnits.filter((u) => u.parentId === unit.id).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const hasChildren = children.length > 0;
  const [open, setOpen] = useState(depth === 0);

  const stats = useMemo(
    () => aggregateStats(unit.id, allUnits, historyByQuestionId),
    [unit.id, allUnits, historyByQuestionId],
  );

  return (
    <div>
      <button
        type="button"
        onClick={() => hasChildren && setOpen((v) => !v)}
        className={cn(
          "flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors",
          hasChildren ? "hover:bg-muted cursor-pointer" : "cursor-default",
          depth === 0 && "font-semibold",
        )}
        style={{ paddingLeft: `${0.75 + depth * 1.25}rem` }}
      >
        {hasChildren ? (
          open ? <IconChevronDown size={14} className="shrink-0 text-muted-foreground" /> : <IconChevronRight size={14} className="shrink-0 text-muted-foreground" />
        ) : (
          <span className="w-3.5 shrink-0" />
        )}
        <span className="flex-1 leading-snug">{unit.name}</span>
        <StatsBadge stats={stats} />
      </button>

      {hasChildren && open && (
        <div>
          {children.map((child) => (
            <UnitNode
              key={child.id}
              unit={child}
              allUnits={allUnits}
              depth={depth + 1}
              historyByQuestionId={historyByQuestionId}
            />
          ))}
        </div>
      )}
    </div>
  );
}

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
        if (history.entries[0].wasCorrect) correct++;
      }
    }
    return { total, answered, correct };
  }, [historyByQuestionId]);

  const globalRate =
    globalStats.answered > 0 ? Math.round((globalStats.correct / globalStats.answered) * 100) : 0;

  return (
    <div className="space-y-6 py-4">
      <div>
        <h1 className="text-lg font-semibold">Estadísticas por unidad</h1>
        <p className="text-sm text-muted-foreground">
          Basado en el último intento de cada pregunta.
        </p>
      </div>

      {/* Global summary */}
      <div className="grid grid-cols-3 gap-3">
        <div className="card text-center space-y-1">
          <p className="text-2xl font-bold">{globalStats.total}</p>
          <p className="text-xs text-muted-foreground">Preguntas totales</p>
        </div>
        <div className="card text-center space-y-1">
          <p className="text-2xl font-bold">{globalStats.answered}</p>
          <p className="text-xs text-muted-foreground">Respondidas</p>
        </div>
        <div className="card text-center space-y-1">
          <p
            className={cn(
              "text-2xl font-bold",
              globalStats.answered === 0
                ? "text-muted-foreground"
                : globalRate >= 70
                  ? "text-success"
                  : globalRate >= 50
                    ? "text-warning"
                    : "text-destructive",
            )}
          >
            {globalStats.answered === 0 ? "—" : `${globalRate}%`}
          </p>
          <p className="text-xs text-muted-foreground">Acierto global</p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><span className="inline-block w-3 h-1.5 rounded-full bg-success" /> ≥70%</span>
        <span className="flex items-center gap-1"><span className="inline-block w-3 h-1.5 rounded-full bg-warning" /> 50–69%</span>
        <span className="flex items-center gap-1"><span className="inline-block w-3 h-1.5 rounded-full bg-destructive" /> &lt;50%</span>
        <span className="ml-auto">respondidas/total</span>
      </div>

      {/* Tree */}
      <div className="rounded-lg border border-border divide-y divide-border">
        {rootUnits.map((unit) => (
          <UnitNode
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
