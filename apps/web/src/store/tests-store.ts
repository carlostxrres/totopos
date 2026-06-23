import type { IndefiniteTest, IndefiniteTestFilters, Test } from "@tot-opos/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

function serializeFilters(filters: IndefiniteTestFilters): string {
  const sortedUnitIds = [...filters.unitIds].sort();
  return JSON.stringify({
    unitIds: sortedUnitIds,
    questionSelection: filters.questionSelection,
    excludeAnsweredInLastDays: filters.excludeAnsweredInLastDays ?? null,
    failedInLastDays: filters.failedInLastDays ?? null,
  });
}

type TestsState = {
  tests: Test[];
  addTest: (test: Test) => void;
  setSaved: (testId: string, saved: boolean) => void;
  renameTest: (testId: string, title: string) => void;
  findByFilters: (filters: IndefiniteTestFilters) => IndefiniteTest | undefined;
  seedFixedTests: (tests: Test[]) => void;
};

export const useTestsStore = create<TestsState>()(
  persist(
    (set, get) => ({
      tests: [],

      addTest: (test) =>
        set((state) => ({
          tests: [...state.tests, test],
        })),

      setSaved: (testId, saved) =>
        set((state) => ({
          tests: state.tests.map((t) => (t.id === testId ? { ...t, saved } : t)),
        })),

      renameTest: (testId, title) =>
        set((state) => ({
          tests: state.tests.map((t) => (t.id === testId ? { ...t, title } : t)),
        })),

      findByFilters: (filters) => {
        const target = serializeFilters(filters);
        return get().tests.find(
          (t): t is IndefiniteTest => t.type === "indefinite" && serializeFilters(t.filters) === target,
        );
      },

      seedFixedTests: (incoming) =>
        set((state) => {
          const existingIds = new Set(state.tests.map((t) => t.id));
          const newTests = incoming.filter((t) => !existingIds.has(t.id));
          return { tests: [...state.tests, ...newTests] };
        }),
    }),
    { name: "tot-opos:tests" },
  ),
);
