import * as Checkbox from "@radix-ui/react-checkbox";
import * as RadioGroup from "@radix-ui/react-radio-group";
import type { Question, QuestionHistory } from "@tot-opos/types";
import { IconBookmark, IconBookmarkFilled, IconCheck } from "@tabler/icons-react";
import { formatRelativeTime } from "@/lib/relative-time";
import { cn } from "@/lib/cn";

type QuestionCardProps = {
  question: Question;
  questionNumber?: number;
  selectedOptionIds: string[];
  onChange: (optionIds: string[]) => void;
  showCorrection: boolean;
  isFlagged?: boolean;
  onToggleFlag?: () => void;
  showHistory?: boolean;
  questionHistory?: QuestionHistory;
};

function OptionClass(_optionId: string, isCorrect: boolean, selected: boolean, showCorrection: boolean) {
  if (!showCorrection) return "option";
  if (isCorrect) return "option option-correct";
  if (selected && !isCorrect) return "option option-incorrect";
  return "option opacity-60";
}

export function QuestionCard({
  question,
  questionNumber,
  selectedOptionIds,
  onChange,
  showCorrection,
  isFlagged,
  onToggleFlag,
  showHistory,
  questionHistory,
}: QuestionCardProps) {
  const hasHistory = showHistory && questionHistory && questionHistory.entries.length > 0;
  const lastEntry = questionHistory?.entries[0];
  const successRate =
    questionHistory && questionHistory.entries.length > 0
      ? questionHistory.entries.filter((e) => e.wasCorrect).length / questionHistory.entries.length
      : 0;

  function handleSingleChange(value: string) {
    onChange([value]);
  }

  function handleMultiChange(optionId: string, checked: boolean) {
    if (checked) {
      onChange([...selectedOptionIds, optionId]);
    } else {
      onChange(selectedOptionIds.filter((id) => id !== optionId));
    }
  }

  return (
    <div className="card space-y-4" style={{ scrollSnapAlign: "start" }}>
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-medium leading-relaxed">
          {questionNumber !== undefined && (
            <span className="text-muted-foreground">{questionNumber}.{" "}</span>
          )}
          {question.prompt}
        </p>
        {onToggleFlag && (
          <button
            type="button"
            onClick={onToggleFlag}
            className="btn-ghost flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-muted-foreground"
            aria-label={isFlagged ? "Quitar marcador" : "Marcar pregunta"}
          >
            {isFlagged ? (
              <IconBookmarkFilled className="text-warning-foreground" />
            ) : (
              <IconBookmark />
            )}
          </button>
        )}
      </div>

      {/* Prompt image */}
      {question.promptImage && (
        <img
          src={question.promptImage}
          alt="Imagen de la pregunta"
          className="max-h-48 rounded-md object-contain"
        />
      )}

      {/* History */}
      {hasHistory && (
        <div className="rounded-md bg-muted p-3 text-xs text-muted-foreground space-y-1">
          <p>Esta pregunta se ha respondido {questionHistory.entries.length} {questionHistory.entries.length === 1 ? "vez" : "veces"}.</p>
          {lastEntry && (
            <p>
              Respondida por última vez {formatRelativeTime(lastEntry.answeredAt)}. Fue{" "}
              <span className={lastEntry.wasCorrect ? "text-success font-medium" : "text-destructive font-medium"}>
                {lastEntry.wasCorrect ? "correcta" : "incorrecta"}
              </span>.
            </p>
          )}
          <p>Tasa de acierto: {Math.round(successRate * 100)}%.</p>
        </div>
      )}

      {/* Options */}
      <fieldset disabled={showCorrection} className="space-y-2">
        <legend className="sr-only">Opciones de respuesta</legend>

        {question.type === "single" ? (
          <RadioGroup.Root
            value={selectedOptionIds[0] ?? ""}
            onValueChange={handleSingleChange}
            className="space-y-2"
          >
            {question.options.map((opt) => (
              <RadioGroup.Item
                key={opt.id}
                value={opt.id}
                className={cn(
                  OptionClass(opt.id, opt.isCorrect, selectedOptionIds.includes(opt.id), showCorrection),
                  "text-left",
                )}
                data-state={selectedOptionIds.includes(opt.id) ? "checked" : "unchecked"}
              >
                <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-current">
                  <RadioGroup.Indicator className="h-2 w-2 rounded-full bg-current" />
                </div>
                <span>{opt.text ?? opt.image}</span>
              </RadioGroup.Item>
            ))}
          </RadioGroup.Root>
        ) : (
          <div className="space-y-2">
            {question.options.map((opt) => (
              <label
                key={opt.id}
                className={cn(
                  OptionClass(opt.id, opt.isCorrect, selectedOptionIds.includes(opt.id), showCorrection),
                )}
              >
                <Checkbox.Root
                  checked={selectedOptionIds.includes(opt.id)}
                  onCheckedChange={(checked) => handleMultiChange(opt.id, checked === true)}
                  className="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-current"
                >
                  <Checkbox.Indicator>
                    <IconCheck />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                <span>{opt.text ?? opt.image}</span>
              </label>
            ))}
          </div>
        )}
      </fieldset>

      {/* Controls below options */}
      {!showCorrection && (
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{question.type === "single" ? "Selección única" : "Selección múltiple"}</span>
          {selectedOptionIds.length > 0 && (
            <button
              type="button"
              onClick={() => onChange([])}
              className="text-muted-foreground underline hover:text-foreground"
            >
              Borrar respuesta
            </button>
          )}
        </div>
      )}

      {/* Explanation */}
      {showCorrection && question.explanation && (
        <div className="rounded-md bg-muted p-3 text-sm text-muted-foreground">
          <span className="font-medium">Explicación: </span>
          {question.explanation}
        </div>
      )}
    </div>
  );
}
