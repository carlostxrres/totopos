import type { Test } from "@tot-opos/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { units } from "@tot-opos/curriculum-data";
import { useTestsStore } from "@/store/tests-store";
import { useTestSummary } from "@/hooks/useTestSummary";
import { useHistoryStore } from "@/store/history-store";
import { formatRelativeTime, formatDate } from "@/lib/relative-time";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import PluralizedNoun from "@/components/PluralizedNoun";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { cn } from "@/lib/cn";

type TestCardProps = {
  test: Test;
  chipLabel?: string;
};

export function TestCard({ test, chipLabel }: TestCardProps) {
  const navigate = useNavigate();
  const setSaved = useTestsStore((s) => s.setSaved);
  const summary = useTestSummary(test.id, test.type);
  const fixedAttempts = useHistoryStore((s) => s.fixedAttempts);
  const indefiniteSessions = useHistoryStore((s) => s.indefiniteSessions);
  const [confirmUnsave, setConfirmUnsave] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const unitNames = test.unitIds
    .map((id) => units.find((u) => u.id === id)?.name ?? id)
    .slice(0, 5);

  const recentAttempts =
    test.type === "fixed"
      ? fixedAttempts.filter((a) => a.testId === test.id).slice(0, 3)
      : indefiniteSessions.filter((s) => s.testId === test.id).slice(0, 3);

  const questionCount =
    test.type === "fixed" ? test.questions.length : "Variable";

  const lastActivity = summary.lastOpenedAt;

  const scoreDisplay =
    summary.bestScore !== undefined && summary.bestMaxScore !== undefined
      ? test.type === "fixed"
        ? `${Math.round((summary.bestScore / summary.bestMaxScore) * 100)}% acierto`
        : `${summary.bestScore}% acierto`
      : null;

  function handleStart() {
    const path =
      test.type === "fixed"
        ? `/tests/fixed/${test.id}`
        : `/tests/indefinite/${test.id}`;
    navigate(path);
  }

  return (
    <div className="card flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
              test.type === "fixed"
                ? "bg-primary/10 text-primary"
                : "bg-success/10 text-success",
            )}
          >
            {test.type === "fixed" ? "Test fijo" : "Test libre"}
          </span>
          {chipLabel && (
            <span className="inline-flex items-center rounded-full bg-warning/10 px-2 py-0.5 text-xs font-medium text-warning-foreground">
              {chipLabel}
            </span>
          )}
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => test.saved ? setConfirmUnsave(true) : setSaved(test.id, true)}
          className={cn("shrink-0", test.saved && "text-destructive hover:text-destructive")}
        >
          {test.saved ? "Quitar" : "Guardar"}
        </Button>
      </div>

      <div>
        <h3 className="font-semibold text-sm leading-snug">
          {test.type === "fixed" ? test.title : (test.title ?? "Test libre")}
        </h3>
        {test.type === "fixed" && test.description && (
          <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">{test.description}</p>
        )}
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
        <span>{questionCount} {typeof questionCount === "number" ? "preguntas" : ""}</span>
        {lastActivity ? (
          <span>{summary.isInProgress ? "En progreso" : "Completado"} {formatRelativeTime(lastActivity)}</span>
        ) : (
          <span>Nunca realizado</span>
        )}
        {scoreDisplay && <span>{scoreDisplay}</span>}
        {summary.timesDone > 0 && (
          <span><PluralizedNoun count={summary.timesDone} singular="vez realizado" plural="veces realizado" /></span>
        )}
      </div>

      {/* Preview toggle */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors -mt-1"
      >
        {expanded ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />}
        {expanded ? "Ocultar detalles" : "Ver detalles"}
      </button>

      {/* Preview panel */}
      {expanded && (
        <div className="space-y-3 border-t border-border pt-3">
          {unitNames.length > 0 && (
            <div>
              <p className="mb-1.5 text-xs font-medium text-muted-foreground">Unidades cubiertas</p>
              <div className="flex flex-wrap gap-1">
                {unitNames.map((name) => (
                  <span
                    key={name}
                    className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground"
                  >
                    {name}
                  </span>
                ))}
                {test.unitIds.length > 5 && (
                  <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                    +{test.unitIds.length - 5} más
                  </span>
                )}
              </div>
            </div>
          )}

          {recentAttempts.length > 0 && (
            <div>
              <p className="mb-1.5 text-xs font-medium text-muted-foreground">Últimos intentos</p>
              <div className="space-y-1">
                {test.type === "fixed"
                  ? (recentAttempts as typeof fixedAttempts).map((a) => (
                      <div key={a.id} className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">{formatDate(a.completedAt)}</span>
                        <span className={a.passed ? "text-success font-medium" : "text-destructive font-medium"}>
                          {a.maxScore > 0 ? Math.round((a.score / a.maxScore) * 100) : 0}%
                          {a.passed ? " ✓" : " ✗"}
                        </span>
                      </div>
                    ))
                  : (recentAttempts as typeof indefiniteSessions).map((s) => {
                      const correct = s.answers.filter((a) => a.wasCorrect).length;
                      const rate = s.answers.length > 0 ? Math.round((correct / s.answers.length) * 100) : 0;
                      return (
                        <div key={s.id} className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">{formatDate(s.startedAt)}</span>
                          <span className="text-muted-foreground">
                            {s.answers.length} resp. · {rate}%
                          </span>
                        </div>
                      );
                    })}
              </div>
            </div>
          )}

          {recentAttempts.length === 0 && (
            <p className="text-xs text-muted-foreground italic">Sin intentos anteriores.</p>
          )}
        </div>
      )}

      <Button variant="primary" onClick={handleStart} className="w-full">
        {summary.isInProgress ? "Continuar" : "Comenzar"}
      </Button>

      <ConfirmDialog
        open={confirmUnsave}
        onOpenChange={setConfirmUnsave}
        title="¿Quitar de guardados?"
        description="El test dejará de aparecer en tu lista. Puedes volver a guardarlo desde la búsqueda por temario."
        confirmLabel="Quitar"
        onConfirm={() => setSaved(test.id, false)}
        variant="destructive"
      />
    </div>
  );
}
