import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IconChevronRight } from "@tabler/icons-react";
import { useHistoryStore } from "@/store/history-store";
import { useProgressStore } from "@/store/progress-store";
import { useSessionStore } from "@/store/session-store";
import { useTestsStore } from "@/store/tests-store";
import { GlobalKPIs } from "@/components/GlobalKPIs";
import { ActivityHeatmap } from "@/components/ActivityHeatmap";
import { HistoryInProgressCard } from "@/components/HistoryInProgressCard";
import { HistoryCompletedCard } from "@/components/HistoryCompletedCard";
import type { HistoryInProgressItem } from "@/components/HistoryInProgressCard";
import type { HistoryCompletedItem } from "@/components/HistoryCompletedCard";

export function HistoryPage() {
  const [, setTick] = useState(0);

  const fixedAttempts = useHistoryStore((s) => s.fixedAttempts);
  const indefiniteSessions = useHistoryStore((s) => s.indefiniteSessions);
  const progressByTestId = useProgressStore((s) => s.progressByTestId);
  const activeSessions = useSessionStore((s) => s.sessions);
  const tests = useTestsStore((s) => s.tests);

  // Refresh relative dates every 30s
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 30_000);
    return () => clearInterval(interval);
  }, []);

  const inProgressItems: HistoryInProgressItem[] = [
    ...Object.entries(progressByTestId).flatMap(([testId, progress]) => {
      const test = tests.find((t) => t.id === testId);
      if (!test) return [];
      return [{ kind: "fixed" as const, testId, progress, test, sortDate: progress.lastOpenedAt }];
    }),
    ...Object.values(activeSessions).flatMap((session) => {
      const test = tests.find((t) => t.id === session.testId);
      if (!test) return [];
      return [{ kind: "indefinite" as const, session, test, sortDate: session.startedAt }];
    }),
  ].sort((a, b) => b.sortDate.localeCompare(a.sortDate));

  const completedItems: HistoryCompletedItem[] = [
    ...fixedAttempts.map((a) => ({ type: "fixed" as const, date: a.completedAt, data: a })),
    ...indefiniteSessions.map((s) => ({ type: "indefinite" as const, date: s.startedAt, data: s })),
  ].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="space-y-8 py-4">
      <GlobalKPIs />

      <Link
        to="/estadisticas"
        className="card flex items-center justify-between hover:bg-muted transition-colors"
      >
        <span className="text-sm font-medium">Estadísticas por unidad</span>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">Ver <IconChevronRight size={16} /></span>
      </Link>

      <section>
        <h2 className="mb-3 text-sm font-semibold">Actividad</h2>
        <ActivityHeatmap />
      </section>

      {inProgressItems.length > 0 && (
        <section>
          <h2 className="mb-3 text-sm font-semibold">En progreso</h2>
          <div className="space-y-2">
            {inProgressItems.map((item) => (
              <HistoryInProgressCard
                key={item.kind === "fixed" ? item.testId : item.session.id}
                item={item}
              />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-3 text-sm font-semibold">Completados</h2>
        {completedItems.length === 0 ? (
          <p className="text-sm text-muted-foreground italic">
            Aún no has completado ningún test.
          </p>
        ) : (
          <div className="space-y-2">
            {completedItems.map((item) => (
              <HistoryCompletedCard
                key={item.type === "fixed" ? item.data.id : item.data.id}
                item={item}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
