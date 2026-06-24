import { useNavigate, useParams } from "react-router-dom";
import { fixedTests } from "@tot-opos/test-data";
import { useHistoryStore } from "@/store/history-store";
import { formatDate, formatDateTime, formatDurationMs } from "@/lib/relative-time";
import { Button } from "@/components/ui/button";
import { SessionResultsSummary } from "@/components/SessionResultsSummary";
import { IconCheck, IconX } from "@tabler/icons-react";

const ALL_QUESTIONS = fixedTests.flatMap((t) => t.questions);

export function SessionDetailPage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const session = useHistoryStore((s) => s.indefiniteSessions.find((s) => s.id === sessionId));

  if (!session) {
    return (
      <div className="py-12 text-center space-y-4">
        <p className="text-sm text-muted-foreground">Sesión no encontrada.</p>
        <Button variant="secondary" onClick={() => navigate("/historial")}>
          Volver al historial
        </Button>
      </div>
    );
  }

  const correctCount = session.answers.filter((a) => a.wasCorrect).length;
  const totalCount = session.answers.length;
  const rate = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;

  const duration =
    session.endedAt
      ? formatDurationMs(new Date(session.endedAt).getTime() - new Date(session.startedAt).getTime())
      : null;

  return (
    <div className="space-y-6 py-4">
      {/* Header */}
      <div className="card space-y-2">
        <h2 className="font-semibold">{session.testTitle ?? "Sesión de test libre"}</h2>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span>Iniciada el {formatDateTime(session.startedAt)}</span>
          {session.endedAt && <span>Finalizada el {formatDate(session.endedAt)}</span>}
          {duration && <span>Duración: {duration}</span>}
        </div>
        <div className="pt-1">
          <SessionResultsSummary totalAnswered={totalCount} correctCount={correctCount} rate={rate} />
        </div>
      </div>

      {/* Answers list */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Preguntas respondidas</h3>
        {session.answers.map((answer, index) => {
          const question = ALL_QUESTIONS.find((q) => q.id === answer.questionId);
          return (
            <div key={answer.questionId} className="card flex items-start gap-3">
              <div
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                  answer.wasCorrect ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"
                }`}
              >
                {answer.wasCorrect ? <IconCheck size={16} /> : <IconX size={16} />}
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Pregunta {index + 1}</p>
                <p className="text-sm">
                  {question?.prompt ?? `ID: ${answer.questionId}`}
                </p>
              </div>
            </div>
          );
        })}
        {session.answers.length === 0 && (
          <p className="text-sm text-muted-foreground italic">Sin respuestas registradas.</p>
        )}
      </div>
    </div>
  );
}
