import type { Test, Unit } from "@tot-opos/types";
import { useMemo } from "react";
import { CurriculumReadonlyNode } from "@/components/CurriculumReadonlyNode";
import { CurriculumSelectNode } from "@/components/CurriculumSelectNode";
import { sortUnits, matchesSearch, getAncestorIds } from "@/lib/curriculum-utils";

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

export function CurriculumDisplay(props: CurriculumDisplayProps) {
  const roots = sortUnits(props.units.filter((u) => u.parentId === null));

  if (props.mode === "readonly") {
    return (
      <div className="space-y-1">
        {roots.map((root) => (
          <CurriculumReadonlyNode
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

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const expandedBySearch = useMemo(() => {
    if (!query) {
      return new Set<string>();
    }
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
        <CurriculumSelectNode
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
