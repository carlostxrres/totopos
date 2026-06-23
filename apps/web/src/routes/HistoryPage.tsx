import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useHistoryStore } from "@/store/history-store";
import { useProgressStore } from "@/store/progress-store";
import { useSessionStore } from "@/store/session-store";
import { useTestsStore } from "@/store/tests-store";
import { formatRelativeTime, formatDateTime } from "@/lib/relative-time";
import { GlobalKPIs } from "@/components/GlobalKPIs";
import { ActivityHeatmap } from "@/components/ActivityHeatmap";

// ─── Main page ────────────────────────────────────────────────────────────────

export function HistoryPage() {
  const navigate = useNavigate();
  const [, setTick] = useState(0);

  const fixedAttempts = useHistoryStore((s) => s.fixedAttempts);
  const indefiniteSessions = useHistoryStore((s) => s.indefiniteSessions);
  const progressByTestId = useProgressStore((s) => s.progressByTestId);
  const activeSessions = useSessionStore((s) => s.sessions);
  const tests = useTestsStore((s) => s.tests);

  // Refresh dates every 30s
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 30_000);
    return () => clearInterval(interval);
  }, []);

  type InProgressItem =
    | { kind: "fixed"; testId: string; progress: typeof progressByTestId[string]; test: typeof tests[number]; sortDate: string }
    | { kind: "indefinite"; session: typeof activeSessions[string]; test: typeof tests[number]; sortDate: string };

  const inProgressItems: InProgressItem[] = [
    ...Object.entries(progressByTestId).flatMap(([testId, progress]) => {
      const test = tests.find((t) => t.id === testId);
      if (!test) {
        return [];
      }
      return [{ kind: "fixed" as const, testId, progress, test, sortDate: progress.lastOpenedAt }];
    }),
    ...Object.values(activeSessions).flatMap((session) => {
      const test = tests.find((t) => t.id === session.testId);
      if (!test) {
        return [];
      }
      return [{ kind: "indefinite" as const, session, test, sortDate: session.startedAt }];
    }),
  ].sort((a, b) => b.sortDate.localeCompare(a.sortDate));

  const completedItems = [
    ...fixedAttempts.map((a) => ({ type: "fixed" as const, date: a.completedAt, data: a })),
    ...indefiniteSessions.map((s) => ({ type: "indefinite" as const, date: s.startedAt, data: s })),
  ].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="space-y-8 py-4">
      {/* Global KPIs */}
      <GlobalKPIs />

      {/* Quick link to stats */}
      <Link
        to="/estadisticas"
        className="card flex items-center justify-between hover:bg-muted transition-colors"
      >
        <span className="text-sm font-medium">Estadísticas por unidad</span>
        <span className="text-xs text-muted-foreground">Ver →</span>
      </Link>

      {/* Heatmap */}
      <section>
        <h2 className="mb-3 text-sm font-semibold">Actividad</h2>
        <ActivityHeatmap />
      </section>

      {/* In progress */}
      {inProgressItems.length > 0 && (
        <section>
          <h2 className="mb-3 text-sm font-semibold">En progreso</h2>
          <div className="space-y-2">
            {inProgressItems.map((item) => {
              if (item.kind === "fixed") {
                const { testId, progress, test } = item;
                if (test.type !== "fixed") {
                  return null;
                }
                const answered = Object.keys(progress.answers).length;
                const total = test.questions.length;
                return (
                  <button
                    key={testId}
                    type="button"
                    onClick={() => navigate(`/tests/fixed/${testId}`)}
                    className="card w-full text-left hover:bg-muted transition-colors"
                  >
                    <p className="text-sm font-medium">{test.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {answered} / {total} respondidas ({total > 0 ? Math.round((answered / total) * 100) : 0}%) ·{" "}
                      Abierto {formatRelativeTime(progress.lastOpenedAt)}
                    </p>
                  </button>
                );
              }
              const { session, test } = item;
              return (
                <button
                  key={session.id}
                  type="button"
                  onClick={() => navigate(`/tests/indefinite/${session.testId}`)}
                  className="card w-full text-left hover:bg-muted transition-colors"
                >
                  <p className="text-sm font-medium">{test.type === "indefinite" ? (test.title ?? "Test libre") : "Test libre"}</p>
                  <p className="text-xs text-muted-foreground">
                    {session.answers.length} respondidas · Iniciado {formatRelativeTime(session.startedAt)}
                  </p>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Completed */}
      <section>
        <h2 className="mb-3 text-sm font-semibold">Completados</h2>
        {completedItems.length === 0 ? (
          <p className="text-sm text-muted-foreground italic">
            Aún no has completado ningún test.
          </p>
        ) : (
          <div className="space-y-2">
            {completedItems.map(({ type, data }) => {
              if (type === "fixed") {
                const attempt = data as typeof fixedAttempts[0];
                return (
                  <button
                    key={attempt.id}
                    type="button"
                    onClick={() => navigate(`/historial/${attempt.id}`)}
                    className="card w-full text-left hover:bg-muted transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium">{attempt.testTitle}</p>
                      <span
                        className={`shrink-0 text-xs font-medium ${
                          attempt.passed ? "text-success" : "text-destructive"
                        }`}
                      >
                        {attempt.passed ? "Aprobado" : "Suspenso"}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {formatDateTime(attempt.completedAt)} ·{" "}
                      {attempt.score.toFixed(2)} / {attempt.maxScore} ptos
                    </p>
                  </button>
                );
              }

              const session = data as typeof indefiniteSessions[0];
              const correct = session.answers.filter((a) => a.wasCorrect).length;
              const total = session.answers.length;
              return (
                <button
                  key={session.id}
                  type="button"
                  onClick={() => navigate(`/historial/sesion/${session.id}`)}
                  className="card w-full text-left hover:bg-muted transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium">{session.testTitle ?? "Test libre"}</p>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {total > 0 ? Math.round((correct / total) * 100) : 0}%
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {formatDateTime(session.startedAt)} · {total} respondidas · {correct} correctas
                  </p>
                </button>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
