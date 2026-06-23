import * as Tooltip from "@radix-ui/react-tooltip";
import { useMemo } from "react";
import { useHistoryStore } from "@/store/history-store";
import { useTestsStore } from "@/store/tests-store";

function buildHeatmap(
  fixedAttempts: ReturnType<typeof useHistoryStore.getState>["fixedAttempts"],
  indefiniteSessions: ReturnType<typeof useHistoryStore.getState>["indefiniteSessions"],
) {
  const map: Record<string, { total: number; correct: number }> = {};

  function dayKey(isoDate: string) {
    return isoDate.slice(0, 10);
  }

  function bump(key: string, correct: boolean) {
    if (!map[key]) {
      map[key] = { total: 0, correct: 0 };
    }
    map[key].total++;
    if (correct) {
      map[key].correct++;
    }
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

const WEEKS = 16;
const DAY_LABELS = ["", "Lun", "", "Mié", "", "Vie", "Dom"];

export function ActivityHeatmap() {
  const fixedAttempts = useHistoryStore((s) => s.fixedAttempts);
  const indefiniteSessions = useHistoryStore((s) => s.indefiniteSessions);

  const heatmap = useMemo(
    () => buildHeatmap(fixedAttempts, indefiniteSessions),
    [fixedAttempts, indefiniteSessions],
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dayOfWeek = (today.getDay() + 6) % 7; // Mon=0
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - dayOfWeek - (WEEKS - 1) * 7);

  const days: Date[] = [];
  for (let i = 0; i < WEEKS * 7; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    if (d > today) {
      break;
    }
    days.push(d);
  }

  const maxCorrect = Math.max(1, ...Object.values(heatmap).map((v) => v.correct));

  function cellColor(correct: number) {
    if (correct === 0) {
      return "bg-muted";
    }
    const intensity = correct / maxCorrect;
    if (intensity < 0.25) {
      return "bg-success/20";
    }
    if (intensity < 0.5) {
      return "bg-success/40";
    }
    if (intensity < 0.75) {
      return "bg-success/70";
    }
    return "bg-success";
  }

  return (
    <Tooltip.Provider delayDuration={150}>
      <div className="flex gap-1">
        {/* Day labels */}
        <div className="flex flex-col gap-1 pt-5">
          {DAY_LABELS.map((label, i) => (
            <div key={i} className="h-4 w-6 pr-1 text-right text-[10px] leading-4 text-muted-foreground">
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
                  <div className="h-5 text-[10px] leading-5 text-muted-foreground">
                    {showMonth ? firstDay.toLocaleDateString("es", { month: "short" }) : ""}
                  </div>
                  {weekDays.map((day) => {
                    const key = day.toISOString().slice(0, 10);
                    const data = heatmap[key];
                    const hasData = !!data && data.total > 0;
                    const cell = (
                      <button
                        type="button"
                        className={`h-4 w-4 rounded-sm ${cellColor(data?.correct ?? 0)}`}
                        aria-label={key}
                      />
                    );

                    if (!hasData) {
                      return <div key={key}>{cell}</div>;
                    }

                    return (
                      <Tooltip.Root key={key}>
                        <Tooltip.Trigger asChild>{cell}</Tooltip.Trigger>
                        <Tooltip.Portal>
                          <Tooltip.Content
                            sideOffset={5}
                            className="z-50 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs shadow-md"
                          >
                            <p className="font-medium">
                              {new Date(key).toLocaleDateString("es", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </p>
                            <p className="text-muted-foreground">
                              {data.total} respuestas · {data.correct} correctas
                            </p>
                            <Tooltip.Arrow className="fill-border" />
                          </Tooltip.Content>
                        </Tooltip.Portal>
                      </Tooltip.Root>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Tooltip.Provider>
  );
}
