import type { Test, Unit } from "@tot-opos/types";
import { useCurriculumUiStore } from "@/store/curriculum-ui-store";
import { IconChevronDown, IconChevronRight } from "@tabler/icons-react";
import { TestCard } from "@/components/TestCard";
import { cn } from "@/lib/cn";
import { sortUnits, hasAnyTests } from "@/lib/curriculum-utils";

type Props = {
  unit: Unit;
  units: Unit[];
  depth: number;
  getTestsForUnit: (unitId: string) => Test[];
  showFullNames?: boolean;
};

export function CurriculumReadonlyNode({ unit, units, depth, getTestsForUnit, showFullNames }: Props) {
  const openNodeIds = useCurriculumUiStore((s) => s.openNodeIds);
  const toggleNode = useCurriculumUiStore((s) => s.toggleNode);

  const children = sortUnits(units.filter((u) => u.parentId === unit.id));
  const isLeaf = children.length === 0;
  const isOpen = openNodeIds.includes(unit.id);
  const tests = isLeaf ? getTestsForUnit(unit.id) : [];
  const empty = !hasAnyTests(unit.id, units, getTestsForUnit);

  return (
    <div>
      <button
        type="button"
        onClick={() => toggleNode(unit.id)}
        className={cn(
          "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
          depth === 0 ? "font-semibold" : "font-medium",
          empty ? "text-muted-foreground/50 cursor-default hover:bg-transparent" : "hover:bg-muted",
        )}
        style={{ paddingLeft: `${0.75 + depth * 1.25}rem` }}
      >
        {isOpen ? <IconChevronDown size={16} className="shrink-0" /> : <IconChevronRight size={16} className="shrink-0" />}
        <span className={cn("min-w-0 text-left", !showFullNames && "truncate")}>{unit.name}</span>
        {empty && <span className="ml-auto text-xs font-normal italic">sin tests</span>}
      </button>

      {isOpen && (
        <div>
          {isLeaf ? (
            <div className="space-y-2 px-3 py-2" style={{ paddingLeft: `${1 + (depth + 1) * 1.25}rem` }}>
              {tests.length === 0 ? (
                <p className="text-xs text-muted-foreground italic">Sin tests guardados en esta unidad.</p>
              ) : (
                tests.map((t) => {
                  const allIds = t.unitIds;
                  const isPure = allIds.length === 1 && allIds[0] === unit.id;
                  return <TestCard key={t.id} test={t} chipLabel={isPure ? "Unidad pura" : undefined} />;
                })
              )}
            </div>
          ) : (
            sortUnits(children).map((child) => (
              <CurriculumReadonlyNode
                key={child.id}
                unit={child}
                units={units}
                depth={depth + 1}
                getTestsForUnit={getTestsForUnit}
                showFullNames={showFullNames}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
