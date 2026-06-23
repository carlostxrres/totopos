import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { units } from "@tot-opos/curriculum-data";
import type { Test } from "@tot-opos/types";
import { useTestsStore } from "@/store/tests-store";
import { useHistoryStore } from "@/store/history-store";
import { useProgressStore } from "@/store/progress-store";
import { useSessionStore } from "@/store/session-store";
import { CurriculumDisplay } from "@/components/CurriculumDisplay";
import { TestCard } from "@/components/TestCard";
import { IconSearch } from "@tabler/icons-react";

type SubTab = "all" | "curriculum";
type SortOrder = "recent" | "oldest" | "name" | "score";

export function SavedTestsPage() {
  const [subTab, setSubTab] = useState<SubTab>("all");
  const [search, setSearch] = useState("");
  const [onlyMine, setOnlyMine] = useState(false);
  const [sortOrder, setSortOrder] = useState<SortOrder>("recent");

  const tests = useTestsStore((s) => s.tests);
  const fixedAttempts = useHistoryStore((s) => s.fixedAttempts);
  const indefiniteSessions = useHistoryStore((s) => s.indefiniteSessions);
  const progressByTestId = useProgressStore((s) => s.progressByTestId);
  const activeSessions = useSessionStore((s) => s.sessions);
  const savedTests = tests.filter((t) => t.saved);

  const filteredTests = savedTests.filter((t) => {
    const title = t.type === "fixed" ? t.title : (t.title ?? "Test libre");
    const matchesSearch = title.toLowerCase().includes(search.toLowerCase());
    const matchesMine = !onlyMine || t.metadata?.category === "Personalizado";
    return matchesSearch && matchesMine;
  });

  function lastActivityDate(test: Test): string | undefined {
    if (test.type === "fixed") {
      const progress = progressByTestId[test.id];
      const attempt = fixedAttempts.filter((a) => a.testId === test.id)[0];
      const dates = [progress?.lastOpenedAt, attempt?.completedAt].filter(Boolean) as string[];
      return dates.sort().reverse()[0];
    }
    const session = activeSessions[test.id];
    const completed = indefiniteSessions.filter((s) => s.testId === test.id)[0];
    const dates = [session?.startedAt, completed?.startedAt].filter(Boolean) as string[];
    return dates.sort().reverse()[0];
  }

  function bestScore(test: Test): number | undefined {
    if (test.type === "fixed") {
      const best = fixedAttempts
        .filter((a) => a.testId === test.id)
        .reduce<number | undefined>((acc, a) => {
          const pct = a.maxScore > 0 ? (a.score / a.maxScore) * 100 : 0;
          return acc === undefined || pct > acc ? pct : acc;
        }, undefined);
      return best;
    }
    const sessions = indefiniteSessions.filter((s) => s.testId === test.id);
    const last = sessions[0];
    if (!last) return undefined;
    const correct = last.answers.filter((a) => a.wasCorrect).length;
    return last.answers.length > 0 ? (correct / last.answers.length) * 100 : 0;
  }

  const sortedTests = useMemo(() => {
    return [...filteredTests].sort((a, b) => {
      if (sortOrder === "name") {
        const nameA = a.type === "fixed" ? a.title : (a.title ?? "Test libre");
        const nameB = b.type === "fixed" ? b.title : (b.title ?? "Test libre");
        return nameA.localeCompare(nameB, "es");
      }
      if (sortOrder === "score") {
        const scoreA = bestScore(a) ?? -1;
        const scoreB = bestScore(b) ?? -1;
        return scoreB - scoreA;
      }
      const dateA = lastActivityDate(a) ?? "0";
      const dateB = lastActivityDate(b) ?? "0";
      return sortOrder === "recent" ? dateB.localeCompare(dateA) : dateA.localeCompare(dateB);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredTests, sortOrder, fixedAttempts, indefiniteSessions, progressByTestId, activeSessions]);

  function getTestsForUnit(unitId: string): Test[] {
    return filteredTests.filter((t) => t.unitIds.includes(unitId));
  }

  return (
    <div className="space-y-4 py-4">
      {/* SubHeader */}
      <div className="subheader -mx-4 px-4 py-2 space-y-2">
        <div className="flex items-center gap-2 rounded-md border border-border bg-muted px-3 py-2">
          <IconSearch className="shrink-0 text-muted-foreground" />
          <input
            type="search"
            placeholder="Buscar tests..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-4 justify-around">
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
          <div className="flex items-center gap-4 justify-end h-6">
            {subTab === "all" && (
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as SortOrder)}
                className="rounded-md border border-border bg-background px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="recent">Más reciente</option>
                <option value="oldest">Más antiguo</option>
                <option value="name">Nombre</option>
                <option value="score">Mejor nota</option>
              </select>
            )}
            <label className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <input
                type="checkbox"
                checked={onlyMine}
                onChange={(e) => setOnlyMine(e.target.checked)}
                className="rounded border-border"
              />
              Solo míos
            </label>
          </div>
        </div>
      </div>

      {/* Quick access to question browser */}
      <Link
        to="/preguntas"
        className="card flex items-center justify-between hover:bg-muted transition-colors"
      >
        <span className="text-sm font-medium">Banco de preguntas</span>
        <span className="text-xs text-muted-foreground">Explorar →</span>
      </Link>

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
            {sortedTests.map((test) => (
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
