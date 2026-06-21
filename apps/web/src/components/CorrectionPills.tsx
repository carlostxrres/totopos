import type { QuestionResult } from "@/lib/scoring";
import { cn } from "@/lib/cn";

type CorrectionPillsProps = {
  questionIds: string[];
  questionResults: QuestionResult[];
};

export function CorrectionPills({ questionIds, questionResults }: CorrectionPillsProps) {
  const resultMap = new Map(questionResults.map((r) => [r.questionId, r]));

  function scrollTo(id: string) {
    document.getElementById(`question-${id}`)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="flex flex-wrap gap-1">
      {questionIds.map((id, index) => {
        const result = resultMap.get(id);
        const isCorrect = result?.isCorrect;
        const hasAnswer = (result?.selectedOptionIds.length ?? 0) > 0;

        return (
          <button
            key={id}
            type="button"
            onClick={() => scrollTo(id)}
            aria-label={`Ir a pregunta ${index + 1}`}
            className={cn(
              "flex h-5 w-5 items-center justify-center rounded-sm text-[10px] font-medium transition-colors",
              isCorrect
                ? "bg-success text-success-foreground"
                : hasAnswer
                  ? "bg-destructive text-destructive-foreground"
                  : "bg-muted text-muted-foreground",
            )}
          >
            {index + 1}
          </button>
        );
      })}
    </div>
  );
}
