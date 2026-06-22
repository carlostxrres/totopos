import type { FixedAttempt, FixedTest } from "@tot-opos/types";
import { useNavigate } from "react-router-dom";
import type { TestResult } from "@/lib/scoring";
import { formatDateTime } from "@/lib/relative-time";
import { useTestsStore } from "@/store/tests-store";
import { CorrectionPills } from "@/components/CorrectionPills";
import { QuestionCard } from "@/components/QuestionCard";
import { Button } from "@/components/ui/button";

type TestCorrectionProps = {
  test: FixedTest;
  attempt: FixedAttempt;
  result: TestResult;
};

export function TestCorrection({ test, attempt, result }: TestCorrectionProps) {
  const navigate = useNavigate();
  const addTest = useTestsStore((s) => s.addTest);

  const percentage = result.maxScore > 0
    ? Math.round((result.score / result.maxScore) * 100)
    : 0;

  const failedQuestionIds = new Set(
    result.questionResults
      .filter((r) => !r.isCorrect && r.selectedOptionIds.length > 0)
      .map((r) => r.questionId),
  );
  const failedQuestions = test.questions.filter((q) => failedQuestionIds.has(q.id));

  function handleRedoFailed() {
    if (failedQuestions.length === 0) return;
    const redoTest: FixedTest = {
      id: crypto.randomUUID(),
      type: "fixed",
      title: `Repaso de fallos — ${test.title}`,
      questions: failedQuestions,
      unitIds: test.unitIds,
      saved: false,
      rules: test.rules,
      metadata: { category: "Personalizado" },
    };
    addTest(redoTest);
    navigate(`/tests/fixed/${redoTest.id}`);
  }

  return (
    <div className="space-y-6 py-4">
      {/* Summary header */}
      <div className="card space-y-3 text-center">
        <div className="text-3xl font-bold">
          {result.score.toFixed(2)} <span className="text-base font-normal text-muted-foreground">/ {result.maxScore}</span>
        </div>
        <div className="text-lg font-semibold">{percentage}%</div>
        <div>
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
              result.passed
                ? "bg-success/10 text-success"
                : "bg-destructive/10 text-destructive"
            }`}
          >
            {result.passed ? "Aprobado" : "Suspenso"}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          Completado el {formatDateTime(attempt.completedAt)}
        </p>
      </div>

      {/* Redo failed questions */}
      {failedQuestions.length > 0 && (
        <Button variant="secondary" onClick={handleRedoFailed} className="w-full">
          Repasar {failedQuestions.length} pregunta{failedQuestions.length !== 1 ? "s" : ""} fallada{failedQuestions.length !== 1 ? "s" : ""}
        </Button>
      )}

      {/* Correction pills */}
      <CorrectionPills
        questionIds={test.questions.map((q) => q.id)}
        questionResults={result.questionResults}
      />

      {/* Questions */}
      <div className="space-y-4">
        {test.questions.map((question, index) => (
          <div key={question.id} id={`question-${question.id}`}>
            <QuestionCard
              question={question}
              questionNumber={index + 1}
              selectedOptionIds={attempt.answers[question.id] ?? []}
              onChange={() => {}}
              showCorrection
            />
          </div>
        ))}
      </div>
    </div>
  );
}
