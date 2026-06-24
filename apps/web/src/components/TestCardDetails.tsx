import type { FixedAttempt, IndefiniteSession, Test } from "@tot-opos/types";
import { IconCheck, IconX } from "@tabler/icons-react";
import { formatDate } from "@/lib/relative-time";
import { UnitChip } from "@/components/UnitChip";

type TestCardDetailsProps = {
  test: Test;
  unitNames: string[];
  recentAttempts: FixedAttempt[] | IndefiniteSession[];
};

export function TestCardDetails({ test, unitNames, recentAttempts }: TestCardDetailsProps) {
  return (
    <div className="space-y-3 border-t border-border pt-3">
      {unitNames.length > 0 && (
        <div>
          <p className="mb-1.5 text-xs font-medium text-muted-foreground">Unidades cubiertas</p>
          <div className="flex flex-wrap gap-1">
            {unitNames.map((name) => (
              <UnitChip key={name} label={name} />
            ))}
            {test.unitIds.length > 5 && (
              <UnitChip label={`+${test.unitIds.length - 5} más`} />
            )}
          </div>
        </div>
      )}

      {recentAttempts.length > 0 ? (
        <div>
          <p className="mb-1.5 text-xs font-medium text-muted-foreground">Últimos intentos</p>
          <div className="space-y-1">
            {test.type === "fixed"
              ? (recentAttempts as FixedAttempt[]).map((a) => (
                  <div key={a.id} className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{formatDate(a.completedAt)}</span>
                    <span className={`flex items-center gap-0.5 font-medium ${a.passed ? "text-success" : "text-destructive"}`}>
                      {a.maxScore > 0 ? Math.round((a.score / a.maxScore) * 100) : 0}%
                      {a.passed ? <IconCheck size={16} /> : <IconX size={16} />}
                    </span>
                  </div>
                ))
              : (recentAttempts as IndefiniteSession[]).map((s) => {
                  const correct = s.answers.filter((a) => a.wasCorrect).length;
                  const rate = s.answers.length > 0 ? Math.round((correct / s.answers.length) * 100) : 0;
                  return (
                    <div key={s.id} className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{formatDate(s.startedAt)}</span>
                      <span className="text-muted-foreground">{s.answers.length} resp. · {rate}%</span>
                    </div>
                  );
                })}
          </div>
        </div>
      ) : (
        <p className="text-xs text-muted-foreground italic">Sin intentos anteriores.</p>
      )}
    </div>
  );
}
