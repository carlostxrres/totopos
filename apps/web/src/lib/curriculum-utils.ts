import type { Test, Unit } from "@tot-opos/types";

export function sortUnits(units: Unit[]): Unit[] {
  return [...units].sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity));
}

export function getDescendantIds(unitId: string, units: Unit[]): string[] {
  const children = units.filter((u) => u.parentId === unitId);
  return [unitId, ...children.flatMap((c) => getDescendantIds(c.id, units))];
}

export function matchesSearch(unit: Unit, query: string, units: Unit[]): boolean {
  if (unit.name.toLowerCase().includes(query.toLowerCase())) {
    return true;
  }
  const descendants = getDescendantIds(unit.id, units).slice(1);
  return descendants.some((id) => {
    const u = units.find((u) => u.id === id);
    return u?.name.toLowerCase().includes(query.toLowerCase());
  });
}

export function hasAnyTests(unitId: string, units: Unit[], getTestsForUnit: (id: string) => Test[]): boolean {
  const children = units.filter((u) => u.parentId === unitId);
  if (children.length === 0) {
    return getTestsForUnit(unitId).length > 0;
  }
  return children.some((child) => hasAnyTests(child.id, units, getTestsForUnit));
}

export function getAncestorIds(unitId: string, units: Unit[]): string[] {
  const unit = units.find((u) => u.id === unitId);
  if (!unit?.parentId) {
    return [];
  }
  return [unit.parentId, ...getAncestorIds(unit.parentId, units)];
}
