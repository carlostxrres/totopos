import * as Checkbox from "@radix-ui/react-checkbox";
import type { Test, Unit } from "@tot-opos/types";
import { useMemo, useState } from "react";
import { useCurriculumUiStore } from "../store/curriculum-ui-store";
import { CheckIcon, ChevronDownIcon, ChevronRightIcon } from "./icons";
import { TestCard } from "./TestCard";
import { cn } from "../lib/cn";

type ReadonlyProps = {
  mode: "readonly";
  units: Unit[];
  getTestsForUnit: (unitId: string) => Test[];
};

type SelectProps = {
  mode: "select";
  units: Unit[];
  selected: string[];
  onChange: (selected: string[]) => void;
  searchQuery?: string;
};

type CurriculumDisplayProps = ReadonlyProps | SelectProps;

function sortUnits(units: Unit[]): Unit[] {
  return [...units].sort((a, b) => {
    const byName = a.name.localeCompare(b.name, "es");
    return byName !== 0 ? byName : a.id.localeCompare(b.id);
  });
}

function getDescendantIds(unitId: string, units: Unit[]): string[] {
  const children = units.filter((u) => u.parentId === unitId);
  return [unitId, ...children.flatMap((c) => getDescendantIds(c.id, units))];
}

function matchesSearch(unit: Unit, query: string, units: Unit[]): boolean {
  if (unit.name.toLowerCase().includes(query.toLowerCase())) return true;
  const descendants = getDescendantIds(unit.id, units).slice(1);
  return descendants.some((id) => {
    const u = units.find((u) => u.id === id);
    return u?.name.toLowerCase().includes(query.toLowerCase());
  });
}

function getAncestorIds(unitId: string, units: Unit[]): string[] {
  const unit = units.find((u) => u.id === unitId);
  if (!unit?.parentId) return [];
  return [unit.parentId, ...getAncestorIds(unit.parentId, units)];
}

// ─── Readonly node ────────────────────────────────────────────────────────────

function ReadonlyNode({
  unit,
  units,
  depth,
  getTestsForUnit,
}: {
  unit: Unit;
  units: Unit[];
  depth: number;
  getTestsForUnit: (unitId: string) => Test[];
}) {
  const openNodeIds = useCurriculumUiStore((s) => s.openNodeIds);
  const toggleNode = useCurriculumUiStore((s) => s.toggleNode);

  const children = sortUnits(units.filter((u) => u.parentId === unit.id));
  const isLeaf = children.length === 0;
  const isOpen = openNodeIds.includes(unit.id);
  const tests = isLeaf ? getTestsForUnit(unit.id) : [];

  return (
    <div>
      <button
        type="button"
        onClick={() => toggleNode(unit.id)}
        className={cn(
          "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted",
          depth === 0 && "font-semibold",
        )}
        style={{ paddingLeft: `${0.75 + depth * 1.25}rem` }}
      >
        {isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}
        <span className="text-left">{unit.name}</span>
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
              <ReadonlyNode
                key={child.id}
                unit={child}
                units={units}
                depth={depth + 1}
                getTestsForUnit={getTestsForUnit}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

// ─── Select node ─────────────────────────────────────────────────────────────

function SelectNode({
  unit,
  units,
  depth,
  selected,
  onChange,
  forceOpen,
}: {
  unit: Unit;
  units: Unit[];
  depth: number;
  selected: string[];
  onChange: (selected: string[]) => void;
  forceOpen?: boolean;
}) {
  const [localOpen, setLocalOpen] = useState(depth === 0);
  const isOpen = forceOpen || localOpen;

  const allDescendants = useMemo(() => getDescendantIds(unit.id, units).slice(1), [unit.id, units]);
  const children = sortUnits(units.filter((u) => u.parentId === unit.id));
  const isLeaf = children.length === 0;

  const isSelected = selected.includes(unit.id);
  const descendantSelected = allDescendants.filter((id) => selected.includes(id));
  const isIndeterminate =
    !isSelected && descendantSelected.length > 0 && descendantSelected.length < allDescendants.length;
  const isFullySelected = isSelected || (allDescendants.length > 0 && allDescendants.every((id) => selected.includes(id)));

  function handleCheck(checked: boolean) {
    const ids = isLeaf ? [unit.id] : getDescendantIds(unit.id, units);
    if (checked) {
      const next = new Set([...selected, ...ids]);
      onChange([...next]);
    } else {
      onChange(selected.filter((id) => !ids.includes(id)));
    }
  }

  return (
    <div>
      <div
        className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-muted"
        style={{ paddingLeft: `${0.75 + depth * 1.25}rem` }}
      >
        <button
          type="button"
          onClick={() => setLocalOpen((o) => !o)}
          className="text-muted-foreground"
          aria-label={isOpen ? "Colapsar" : "Expandir"}
        >
          {isLeaf ? (
            <span className="w-4 inline-block" />
          ) : isOpen ? (
            <ChevronDownIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </button>
        <Checkbox.Root
          checked={isIndeterminate ? "indeterminate" : isFullySelected}
          onCheckedChange={(val) => handleCheck(val === true)}
          className="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-muted-foreground data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=indeterminate]:border-primary"
        >
          <Checkbox.Indicator className="text-primary-foreground">
            {isIndeterminate ? (
              <div className="h-0.5 w-2 bg-primary" />
            ) : (
              <CheckIcon />
            )}
          </Checkbox.Indicator>
        </Checkbox.Root>
        <span className={cn("text-sm", depth === 0 && "font-semibold")}>{unit.name}</span>
      </div>

      {isOpen && !isLeaf && (
        <div>
          {children.map((child) => (
            <SelectNode
              key={child.id}
              unit={child}
              units={units}
              depth={depth + 1}
              selected={selected}
              onChange={onChange}
              forceOpen={forceOpen}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function CurriculumDisplay(props: CurriculumDisplayProps) {
  const roots = sortUnits(props.units.filter((u) => u.parentId === null));

  if (props.mode === "readonly") {
    return (
      <div className="space-y-1">
        {roots.map((root) => (
          <ReadonlyNode
            key={root.id}
            unit={root}
            units={props.units}
            depth={0}
            getTestsForUnit={props.getTestsForUnit}
          />
        ))}
      </div>
    );
  }

  // Select mode
  const query = props.searchQuery?.trim() ?? "";

  const expandedBySearch = useMemo(() => {
    if (!query) return new Set<string>();
    const toExpand = new Set<string>();
    for (const unit of props.units) {
      if (unit.name.toLowerCase().includes(query.toLowerCase())) {
        for (const ancestorId of getAncestorIds(unit.id, props.units)) {
          toExpand.add(ancestorId);
        }
      }
    }
    return toExpand;
  }, [query, props.units]);

  const filteredRoots = query
    ? roots.filter((r) => matchesSearch(r, query, props.units))
    : roots;

  return (
    <div className="space-y-1">
      {filteredRoots.map((root) => (
        <SelectNode
          key={root.id}
          unit={root}
          units={props.units}
          depth={0}
          selected={props.selected}
          onChange={props.onChange}
          forceOpen={expandedBySearch.has(root.id) || !!query}
        />
      ))}
    </div>
  );
}
