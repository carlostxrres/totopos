import type { FixedAttempt, FixedTest } from "@tot-opos/types";
import type { TestResult } from "../lib/scoring";
import { formatDateTime } from "../lib/relative-time";
import { CorrectionPills } from "./CorrectionPills";
import { QuestionCard } from "./QuestionCard";

type TestCorrectionProps = {
  test: FixedTest;
  attempt: FixedAttempt;
  result: TestResult;
};

export function TestCorrection({ test, attempt, result }: TestCorrectionProps) {
  const percentage = result.maxScore > 0
    ? Math.round((result.score / result.maxScore) * 100)
    : 0;

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

      {/* Correction pills */}
      <CorrectionPills
        questionIds={test.questions.map((q) => q.id)}
        questionResults={result.questionResults}
      />

      {/* Questions */}
      <div className="space-y-4">
        {test.questions.map((question) => (
          <div key={question.id} id={`question-${question.id}`}>
            <QuestionCard
              question={question}
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
