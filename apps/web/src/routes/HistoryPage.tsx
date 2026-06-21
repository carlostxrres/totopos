import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHistoryStore } from "../store/history-store";
import { useProgressStore } from "../store/progress-store";
import { useSessionStore } from "../store/session-store";
import { useTestsStore } from "../store/tests-store";
import { formatRelativeTime, formatDateTime } from "../lib/relative-time";

// ─── Activity heatmap ─────────────────────────────────────────────────────────

function buildHeatmap(
  fixedAttempts: ReturnType<typeof useHistoryStore.getState>["fixedAttempts"],
  indefiniteSessions: ReturnType<typeof useHistoryStore.getState>["indefiniteSessions"],
) {
  const map: Record<string, { total: number; correct: number }> = {};

  function dayKey(isoDate: string) {
    return isoDate.slice(0, 10);
  }

  function bump(key: string, correct: boolean) {
    if (!map[key]) map[key] = { total: 0, correct: 0 };
    map[key].total++;
    if (correct) map[key].correct++;
  }

  for (const attempt of fixedAttempts) {
    const key = dayKey(attempt.completedAt);
    const test = useTestsStore.getState().tests.find((t) => t.id === attempt.testId);
    if (test?.type === "fixed") {
      for (const q of test.questions) {
        const selected = attempt.answers[q.id] ?? [];
        const correctIds = q.options.filter((o) => o.isCorrect).map((o) => o.id);
        const isCorrect =
          correctIds.length === selected.length && correctIds.every((id) => selected.includes(id));
        bump(key, isCorrect);
      }
    }
  }

  for (const session of indefiniteSessions) {
    for (const answer of session.answers) {
      bump(dayKey(answer.answeredAt), answer.wasCorrect);
    }
  }

  return map;
}

function ActivityHeatmap() {
  const fixedAttempts = useHistoryStore((s) => s.fixedAttempts);
  const indefiniteSessions = useHistoryStore((s) => s.indefiniteSessions);
  const [tooltip, setTooltip] = useState<{ key: string; x: number; y: number } | null>(null);

  const heatmap = buildHeatmap(fixedAttempts, indefiniteSessions);

  const WEEKS = 16;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dayOfWeek = (today.getDay() + 6) % 7; // Mon=0
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - dayOfWeek - (WEEKS - 1) * 7);

  const days: Date[] = [];
  for (let i = 0; i < WEEKS * 7; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    days.push(d);
  }

  const DAY_LABELS = ["", "Lun", "", "Mié", "", "Vie", "Dom"];

  const maxCorrect = Math.max(1, ...Object.values(heatmap).map((v) => v.correct));

  function cellColor(correct: number) {
    if (correct === 0) return "bg-muted";
    const intensity = correct / maxCorrect;
    if (intensity < 0.25) return "bg-success/20";
    if (intensity < 0.5) return "bg-success/40";
    if (intensity < 0.75) return "bg-success/70";
    return "bg-success";
  }

  return (
    <div className="relative">
      <div className="flex gap-1">
        {/* Day labels */}
        <div className="flex flex-col gap-1 pt-5">
          {DAY_LABELS.map((label, i) => (
            <div key={i} className="h-4 text-[10px] text-muted-foreground leading-4 w-6 text-right pr-1">
              {label}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="overflow-x-auto">
          <div className="flex gap-1">
            {Array.from({ length: WEEKS }, (_, weekIdx) => {
              const weekDays = days.slice(weekIdx * 7, weekIdx * 7 + 7);
              const firstDay = weekDays[0];
              const showMonth =
                weekIdx === 0 ||
                (weekIdx > 0 && days[weekIdx * 7 - 1].getMonth() !== firstDay.getMonth());

              return (
                <div key={weekIdx} className="flex flex-col gap-1">
                  <div className="h-5 text-[10px] text-muted-foreground leading-5">
                    {showMonth
                      ? firstDay.toLocaleDateString("es", { month: "short" })
                      : ""}
                  </div>
                  {weekDays.map((day) => {
                    const key = day.toISOString().slice(0, 10);
                    const data = heatmap[key];
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={(e) =>
                          setTooltip(
                            tooltip?.key === key
                              ? null
                              : { key, x: e.clientX, y: e.clientY },
                          )
                        }
                        className={`h-4 w-4 rounded-sm ${cellColor(data?.correct ?? 0)}`}
                        aria-label={key}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {tooltip && heatmap[tooltip.key] && (
        <div className="fixed z-50 rounded-md border border-border bg-background p-2 text-xs shadow-md"
          style={{ top: tooltip.y + 8, left: tooltip.x + 8 }}>
          <p className="font-medium">{new Date(tooltip.key).toLocaleDateString("es", { day: "numeric", month: "long", year: "numeric" })}</p>
          <p>{heatmap[tooltip.key].total} respuestas · {heatmap[tooltip.key].correct} correctas</p>
        </div>
      )}
    </div>
  );
}

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

  const inProgressFixed = Object.entries(progressByTestId).map(([testId, progress]) => ({
    testId,
    progress,
    test: tests.find((t) => t.id === testId),
  })).filter(({ test }) => !!test);

  const inProgressIndefinite = Object.values(activeSessions).map((session) => ({
    session,
    test: tests.find((t) => t.id === session.testId),
  })).filter(({ test }) => !!test);

  const completedItems = [
    ...fixedAttempts.map((a) => ({ type: "fixed" as const, date: a.completedAt, data: a })),
    ...indefiniteSessions.map((s) => ({ type: "indefinite" as const, date: s.startedAt, data: s })),
  ].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="space-y-8 py-4">
      {/* Heatmap */}
      <section>
        <h2 className="mb-3 text-sm font-semibold">Actividad</h2>
        <ActivityHeatmap />
      </section>

      {/* In progress */}
      {(inProgressFixed.length > 0 || inProgressIndefinite.length > 0) && (
        <section>
          <h2 className="mb-3 text-sm font-semibold">En progreso</h2>
          <div className="space-y-2">
            {inProgressFixed.map(({ testId, progress, test }) => {
              if (!test || test.type !== "fixed") return null;
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
            })}
            {inProgressIndefinite.map(({ session, test }) => (
              <button
                key={session.id}
                type="button"
                onClick={() => navigate(`/tests/indefinite/${session.testId}`)}
                className="card w-full text-left hover:bg-muted transition-colors"
              >
                <p className="text-sm font-medium">{test?.type === "indefinite" ? (test.title ?? "Test libre") : "Test libre"}</p>
                <p className="text-xs text-muted-foreground">
                  {session.answers.length} respondidas · Iniciado {formatRelativeTime(session.startedAt)}
                </p>
              </button>
            ))}
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
