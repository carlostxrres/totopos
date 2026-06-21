import { useState } from "react";
import { units } from "@tot-opos/curriculum-data";
import type { Test } from "@tot-opos/types";
import { useTestsStore } from "@/store/tests-store";
import { CurriculumDisplay } from "@/components/CurriculumDisplay";
import { TestCard } from "@/components/TestCard";
import { SearchIcon } from "@/components/icons";

type SubTab = "all" | "curriculum";

export function SavedTestsPage() {
  const [subTab, setSubTab] = useState<SubTab>("all");
  const [search, setSearch] = useState("");
  const [onlyMine, setOnlyMine] = useState(false);

  const tests = useTestsStore((s) => s.tests);
  const savedTests = tests.filter((t) => t.saved);

  const filteredTests = savedTests.filter((t) => {
    const title = t.type === "fixed" ? t.title : (t.title ?? "Test libre");
    const matchesSearch = title.toLowerCase().includes(search.toLowerCase());
    const matchesMine = !onlyMine || t.metadata?.category === "Personalizado";
    return matchesSearch && matchesMine;
  });

  function getTestsForUnit(unitId: string): Test[] {
    return savedTests.filter((t) => t.unitIds.includes(unitId));
  }

  return (
    <div className="space-y-4 py-4">
      {/* SubHeader */}
      <div className="subheader -mx-4 px-4 py-2 space-y-2">
        <div className="flex items-center gap-2 rounded-md border border-border bg-muted px-3 py-2">
          <SearchIcon className="shrink-0 text-muted-foreground" />
          <input
            type="search"
            placeholder="Buscar tests..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {(["all", "curriculum"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setSubTab(tab)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  subTab === tab
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {tab === "all" ? "Mostrar todo" : "Por temario"}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 text-xs text-muted-foreground">
            <input
              type="checkbox"
              checked={onlyMine}
              onChange={(e) => setOnlyMine(e.target.checked)}
              className="rounded border-border"
            />
            Solo mis tests
          </label>
        </div>
      </div>

      {/* Content */}
      {subTab === "all" ? (
        filteredTests.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-sm text-muted-foreground">
              {savedTests.length === 0
                ? "Aún no tienes tests guardados. Ve a 'Crear test' para empezar."
                : "No hay tests que coincidan con tu búsqueda."}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTests.map((test) => (
              <TestCard key={test.id} test={test} />
            ))}
          </div>
        )
      ) : (
        <CurriculumDisplay
          mode="readonly"
          units={units}
          getTestsForUnit={getTestsForUnit}
        />
      )}
    </div>
  );
}
