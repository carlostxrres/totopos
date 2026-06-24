import * as Checkbox from "@radix-ui/react-checkbox";
import type { Unit } from "@tot-opos/types";
import { useMemo, useState } from "react";
import { IconCheck, IconChevronDown, IconChevronRight } from "@tabler/icons-react";
import { cn } from "@/lib/cn";
import { sortUnits, getDescendantIds } from "@/lib/curriculum-utils";

type Props = {
  unit: Unit;
  units: Unit[];
  depth: number;
  selected: string[];
  onChange: (selected: string[]) => void;
  forceOpen?: boolean;
};

export function CurriculumSelectNode({ unit, units, depth, selected, onChange, forceOpen }: Props) {
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
            <IconChevronDown size={16} />
          ) : (
            <IconChevronRight size={16} />
          )}
        </button>
        <Checkbox.Root
          id={`checkbox-${unit.id}`}
          checked={isIndeterminate ? "indeterminate" : isFullySelected}
          onCheckedChange={(val) => handleCheck(val === true)}
          className="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-muted-foreground data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=indeterminate]:border-primary"
        >
          <Checkbox.Indicator className="text-primary-foreground">
            {isIndeterminate ? (
              <div className="h-0.5 w-2 bg-primary" />
            ) : (
              <IconCheck size={16} />
            )}
          </Checkbox.Indicator>
        </Checkbox.Root>
        <label
          htmlFor={`checkbox-${unit.id}`}
          className={cn("text-sm cursor-pointer select-none flex-1", depth === 0 && "font-semibold")}
        >
          {unit.name}
        </label>
      </div>

      {isOpen && !isLeaf && (
        <div>
          {children.map((child) => (
            <CurriculumSelectNode
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
