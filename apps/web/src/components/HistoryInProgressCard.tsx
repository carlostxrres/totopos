import type { IndefiniteSession, Test, TestProgress } from "@tot-opos/types";
import { useNavigate } from "react-router-dom";
import { formatRelativeTime } from "@/lib/relative-time";

export type HistoryInProgressItem =
  | { kind: "fixed"; testId: string; progress: TestProgress; test: Test; sortDate: string }
  | { kind: "indefinite"; session: IndefiniteSession; test: Test; sortDate: string };

export function HistoryInProgressCard({ item }: { item: HistoryInProgressItem }) {
  const navigate = useNavigate();

  if (item.kind === "fixed") {
    const { testId, progress, test } = item;
    if (test.type !== "fixed") return null;
    const answered = Object.keys(progress.answers).length;
    const total = test.questions.length;
    return (
      <button
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
      type="button"
      onClick={() => navigate(`/tests/indefinite/${session.testId}`)}
      className="card w-full text-left hover:bg-muted transition-colors"
    >
      <p className="text-sm font-medium">
        {test.type === "indefinite" ? (test.title ?? "Test libre") : "Test libre"}
      </p>
      <p className="text-xs text-muted-foreground">
        {session.answers.length} respondidas · Iniciado {formatRelativeTime(session.startedAt)}
      </p>
    </button>
  );
}
