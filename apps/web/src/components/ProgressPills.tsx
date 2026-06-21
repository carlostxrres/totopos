import { cn } from "../lib/cn";

type ProgressPillsProps = {
  questionIds: string[];
  answeredIds: Set<string>;
  flaggedIds: Set<string>;
  activeId: string | null;
};

export function ProgressPills({ questionIds, answeredIds, flaggedIds, activeId }: ProgressPillsProps) {
  function scrollTo(id: string) {
    document.getElementById(`question-${id}`)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="flex flex-wrap gap-1">
      {questionIds.map((id, index) => {
        const isAnswered = answeredIds.has(id);
        const isFlagged = flaggedIds.has(id);
        const isActive = activeId === id;

        return (
          <button
            key={id}
            type="button"
            onClick={() => scrollTo(id)}
            aria-label={`Ir a pregunta ${index + 1}`}
            className="relative"
          >
            <span
              className={cn(
                "flex h-5 w-5 items-center justify-center rounded-sm text-[10px] font-medium transition-colors",
                isAnswered ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                isActive && "ring-2 ring-primary ring-offset-1 ring-offset-background",
              )}
            >
              {index + 1}
            </span>
            {isFlagged && (
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-warning" />
            )}
          </button>
        );
      })}
    </div>
  );
}
