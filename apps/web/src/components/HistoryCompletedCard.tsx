import type { FixedAttempt, IndefiniteSession } from "@tot-opos/types";
import { useNavigate } from "react-router-dom";
import { formatDateTime } from "@/lib/relative-time";

export type HistoryCompletedItem =
  | { type: "fixed"; date: string; data: FixedAttempt }
  | { type: "indefinite"; date: string; data: IndefiniteSession };

export function HistoryCompletedCard({ item }: { item: HistoryCompletedItem }) {
  const navigate = useNavigate();

  if (item.type === "fixed") {
    const attempt = item.data as FixedAttempt;
    return (
      <button
        type="button"
        onClick={() => navigate(`/historial/${attempt.id}`)}
        className="card w-full text-left hover:bg-muted transition-colors"
      >
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium">{attempt.testTitle}</p>
          <span className={`shrink-0 text-xs font-medium ${attempt.passed ? "text-success" : "text-destructive"}`}>
            {attempt.passed ? "Aprobado" : "Suspenso"}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          {formatDateTime(attempt.completedAt)} · {attempt.score.toFixed(2)} / {attempt.maxScore} ptos
        </p>
      </button>
    );
  }

  const session = item.data as IndefiniteSession;
  const correct = session.answers.filter((a) => a.wasCorrect).length;
  const total = session.answers.length;
  return (
    <button
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
}
