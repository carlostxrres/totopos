import { useMemo, useState } from "react";
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
  const [tooltip, setTooltip] = useState<{ key: string; x: number; y: number } | null>(null);

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
