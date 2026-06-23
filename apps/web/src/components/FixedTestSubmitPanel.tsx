import type { FixedTest } from "@tot-opos/types";
import { IconBookmarkFilled, IconCheck } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import PluralizedNoun from "@/components/PluralizedNoun";

type FixedTestSubmitPanelProps = {
  test: FixedTest;
  answeredCount: number;
  unansweredCount: number;
  flaggedUnansweredCount: number;
  flaggedAnsweredCount: number;
  onSubmit: () => void;
};

export function FixedTestSubmitPanel({
  test,
  answeredCount,
  unansweredCount,
  flaggedUnansweredCount,
  flaggedAnsweredCount,
  onSubmit,
}: FixedTestSubmitPanelProps) {
  return (
    <div
      id="submit-btn"
      className="flex min-h-screen snap-start items-center justify-center md:min-h-0 md:snap-none card"
    >
      <div className="w-full space-y-4">
        <div className="bg-card p-5 space-y-4">
          <h3 className="text-sm font-semibold">Resumen del test</h3>

          <div className="space-y-1.5">
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${Math.round((answeredCount / test.questions.length) * 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{answeredCount} de {test.questions.length} respondidas</span>
              <span>{Math.round((answeredCount / test.questions.length) * 100)} %</span>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            {answeredCount === test.questions.length ? (
              <div className="flex items-center gap-2 text-success">
                <IconCheck size={14} className="shrink-0" />
                <span>Todas las preguntas respondidas</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="size-2 shrink-0 rounded-full bg-muted-foreground/40" />
                <span>
                  <PluralizedNoun count={unansweredCount} singular="pregunta sin responder" plural="preguntas sin responder" />
                </span>
              </div>
            )}
            {flaggedUnansweredCount > 0 && (
              <div className="flex items-center gap-2 text-warning">
                <IconBookmarkFilled size={14} className="shrink-0" />
                <span>
                  <PluralizedNoun count={flaggedUnansweredCount} singular="marcada sin responder" plural="marcadas sin responder" />
                </span>
              </div>
            )}
            {flaggedAnsweredCount > 0 && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <IconBookmarkFilled size={14} className="shrink-0" />
                <span>
                  <PluralizedNoun count={flaggedAnsweredCount} singular="marcada y respondida" plural="marcadas y respondidas" />
                </span>
              </div>
            )}
          </div>
        </div>

        <Button variant="primary" onClick={onSubmit} className="w-full text-base">
          Enviar test
        </Button>
      </div>
    </div>
  );
}
