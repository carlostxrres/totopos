import type { UnitStats } from "@/lib/stats-utils";
import { cn } from "@/lib/cn";

export function StatsUnitBadge({ stats }: { stats: UnitStats }) {
  if (stats.total === 0) {
    return null;
  }
  const rate = stats.answered > 0 ? Math.round((stats.correct / stats.answered) * 100) : 0;
  const coverage = Math.round((stats.answered / stats.total) * 100);

  return (
    <div className="ml-auto flex shrink-0 items-center gap-3 text-xs text-muted-foreground">
      <span>{stats.answered}/{stats.total}</span>
      {stats.answered > 0 && (
        <span
          className={cn(
            "font-medium",
            rate >= 70 ? "text-success" : rate >= 50 ? "text-warning" : "text-destructive",
          )}
        >
          {rate}%
        </span>
      )}
      <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-primary/40 relative"
          style={{ width: `${coverage}%` }}
        >
          {stats.answered > 0 && (
            <div
              className={cn(
                "absolute inset-y-0 left-0 rounded-full",
                rate >= 70 ? "bg-success" : rate >= 50 ? "bg-warning" : "bg-destructive",
              )}
              style={{ width: `${rate}%` }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
