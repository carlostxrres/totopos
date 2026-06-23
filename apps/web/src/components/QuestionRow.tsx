import type { Question, QuestionHistory } from "@tot-opos/types";
import { units } from "@tot-opos/curriculum-data";
import { IconCheck, IconX } from "@tabler/icons-react";
import PluralizedNoun from "@/components/PluralizedNoun";
import { UnitChip } from "@/components/UnitChip";
import { cn } from "@/lib/cn";
import { formatRelativeTime } from "@/lib/relative-time";

type QuestionRowProps = {
  question: Question;
  history: QuestionHistory | undefined;
};

export function QuestionRow({ question, history }: QuestionRowProps) {
  const timesAnswered = history?.entries.length ?? 0;
  const lastEntry = history?.entries[0];
  const successCount = history?.entries.filter((e) => e.wasCorrect).length ?? 0;
  const rate = timesAnswered > 0 ? Math.round((successCount / timesAnswered) * 100) : null;

  return (
    <div className="card space-y-2">
      <div className="flex flex-wrap gap-1">
        {question.unitIds.map((uid) => (
          <UnitChip key={uid} label={units.find((u) => u.id === uid)?.name ?? uid} />
        ))}
        <span
          className={cn(
            "ml-auto inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium",
            question.type === "single"
              ? "bg-primary/10 text-primary"
              : "bg-success/10 text-success",
          )}
        >
          {question.type === "single" ? "Única" : "Múltiple"}
        </span>
      </div>

      <p className="text-sm leading-snug line-clamp-3">{question.prompt}</p>

      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        {timesAnswered === 0 ? (
          <span>Sin responder</span>
        ) : (
          <>
            <span><PluralizedNoun count={timesAnswered} singular="vez" plural="veces" showNumberSingular /></span>
            {lastEntry && (
              <span className="flex items-center gap-1">
                Última: {formatRelativeTime(lastEntry.answeredAt)}
                {lastEntry.wasCorrect
                  ? <IconCheck size={12} className="inline text-success" />
                  : <IconX size={12} className="inline text-destructive" />
                }
              </span>
            )}
            {rate !== null && (
              <span
                className={cn(
                  "font-medium",
                  rate >= 70 ? "text-success" : rate >= 50 ? "text-warning" : "text-destructive",
                )}
              >
                {rate}% acierto
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
}
