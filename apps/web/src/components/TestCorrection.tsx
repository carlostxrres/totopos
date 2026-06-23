import type { FixedAttempt, FixedTest } from "@tot-opos/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { TestResult } from "@/lib/scoring";
import { formatDateTime } from "@/lib/relative-time";
import { useTestsStore } from "@/store/tests-store";
import { CorrectionPills } from "@/components/CorrectionPills";
import { QuestionCard } from "@/components/QuestionCard";
import { TestPreviewDialog } from "@/components/TestPreviewDialog";
import { Button } from "@/components/ui/button";
import PluralizedNoun from "@/components/PluralizedNoun";

type TestCorrectionProps = {
  test: FixedTest;
  attempt: FixedAttempt;
  result: TestResult;
};

export function TestCorrection({ test, attempt, result }: TestCorrectionProps) {
  const navigate = useNavigate();
  const addTest = useTestsStore((s) => s.addTest);
  const [redoModalOpen, setRedoModalOpen] = useState(false);

  const percentage = result.maxScore > 0
    ? Math.round((result.score / result.maxScore) * 100)
    : 0;

  const failedQuestionIds = new Set(
    result.questionResults
      .filter((r) => !r.isCorrect && r.selectedOptionIds.length > 0)
      .map((r) => r.questionId),
  );
  const failedQuestions = test.questions.filter((q) => failedQuestionIds.has(q.id));

  function buildRedoTest(saved: boolean): FixedTest {
    return {
      id: crypto.randomUUID(),
      type: "fixed",
      title: `Repaso de fallos — ${test.title}`,
      questions: failedQuestions,
      unitIds: test.unitIds,
      saved,
      rules: test.rules,
      metadata: { category: "Personalizado" },
    };
  }

  function handleSaveRedo() {
    const t = buildRedoTest(true);
    addTest(t);
    setRedoModalOpen(false);
  }

  function handleStartRedo() {
    const t = buildRedoTest(false);
    addTest(t);
    setRedoModalOpen(false);
    navigate(`/tests/fixed/${t.id}`);
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
        <Button variant="secondary" onClick={() => setRedoModalOpen(true)} className="w-full">
          Crear test de repaso —{" "}
          <PluralizedNoun
            count={failedQuestions.length}
            singular="pregunta fallada"
            plural="preguntas falladas"
            showNumberSingular
          />
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

      <TestPreviewDialog
        open={redoModalOpen}
        onOpenChange={setRedoModalOpen}
        title="Repaso de fallos"
        summaryItems={[
          { label: "Tipo", value: "Test fijo" },
          { label: "Preguntas falladas", value: failedQuestions.length },
          { label: "Unidades", value: `${test.unitIds.length} del test original` },
        ]}
        onSave={handleSaveRedo}
        onStart={handleStartRedo}
      />
    </div>
  );
}
