import type { Unit } from "@tot-opos/types";
import { useMemo, useState } from "react";
import { IconChevronDown, IconChevronRight } from "@tabler/icons-react";
import { cn } from "@/lib/cn";
import { aggregateStats } from "@/lib/stats-utils";
import { StatsUnitBadge } from "@/components/StatsUnitBadge";
import type { HistoryMap } from "@/lib/stats-utils";

type Props = {
  unit: Unit;
  allUnits: Unit[];
  depth: number;
  historyByQuestionId: HistoryMap;
};

export function StatsUnitNode({ unit, allUnits, depth, historyByQuestionId }: Props) {
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
          open ? <IconChevronDown size={16} className="shrink-0 text-muted-foreground" /> : <IconChevronRight size={16} className="shrink-0 text-muted-foreground" />
        ) : (
          <span className="w-3.5 shrink-0" />
        )}
        <span className="flex-1 leading-snug">{unit.name}</span>
        <StatsUnitBadge stats={stats} />
      </button>

      {hasChildren && open && (
        <div>
          {children.map((child) => (
            <StatsUnitNode
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
