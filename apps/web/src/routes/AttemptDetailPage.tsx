import { useNavigate, useParams } from "react-router-dom";
import { useHistoryStore } from "@/store/history-store";
import { useTestsStore } from "@/store/tests-store";
import { TestCorrection } from "@/components/TestCorrection";
import { scoreTest } from "@/lib/scoring";
import { Button } from "@/components/ui/button";

export function AttemptDetailPage() {
  const { attemptId } = useParams<{ attemptId: string }>();
  const navigate = useNavigate();
  const attempt = useHistoryStore((s) => s.fixedAttempts.find((a) => a.id === attemptId));
  const test = useTestsStore((s) => s.tests.find((t) => t.id === attempt?.testId));

  if (!attempt || !test || test.type !== "fixed") {
    return (
      <div className="py-12 text-center space-y-4">
        <p className="text-sm text-muted-foreground">Intento no encontrado.</p>
        <Button variant="secondary" onClick={() => navigate("/historial")}>
          Volver al historial
        </Button>
      </div>
    );
  }

  const result = scoreTest(test, attempt.answers);

  return (
    <TestCorrection test={test} attempt={attempt} result={result} />
  );
}
