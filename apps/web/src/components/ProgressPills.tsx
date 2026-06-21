import { cn } from "@/lib/cn";

type ProgressPillsProps = {
  questionIds: string[];
  answeredIds: Set<string>;
  flaggedIds: Set<string>;
  activeIds: Set<string>;
};

export function ProgressPills({ questionIds, answeredIds, flaggedIds, activeIds }: ProgressPillsProps) {
  function scrollTo(id: string) {
    document.getElementById(`question-${id}`)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="flex flex-wrap items-end gap-1">
      {questionIds.map((id, index) => {
        const isAnswered = answeredIds.has(id);
        const isFlagged = flaggedIds.has(id);
        const isActive = activeIds.has(id);

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
                "flex w-5 items-center justify-center rounded-sm text-[10px] font-medium",
                "transition-[height] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                isActive ? "h-8" : "h-5",
                isAnswered ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
              )}
            >
              {index + 1}
            </span>
            {isFlagged && (
              <span className="absolute -bottom-1 left-0 right-0 h-2 bg-warning" />
            )}
          </button>
        );
      })}
    </div>
  );
}
