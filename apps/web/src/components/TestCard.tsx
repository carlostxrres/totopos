import type { Test } from "@tot-opos/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTestsStore } from "@/store/tests-store";
import { useTestSummary } from "@/hooks/useTestSummary";
import { formatRelativeTime } from "@/lib/relative-time";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { IconDeviceFloppy, IconDeviceFloppyFilled } from "@tabler/icons-react";
import { cn } from "@/lib/cn";

type TestCardProps = {
  test: Test;
  chipLabel?: string;
};

export function TestCard({ test, chipLabel }: TestCardProps) {
  const navigate = useNavigate();
  const setSaved = useTestsStore((s) => s.setSaved);
  const summary = useTestSummary(test.id, test.type);
  const [confirmUnsave, setConfirmUnsave] = useState(false);

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
        <button
          type="button"
          onClick={() => test.saved ? setConfirmUnsave(true) : setSaved(test.id, true)}
          className={cn(
            "btn-ghost -mr-1 -mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-md",
            test.saved ? "text-primary hover:text-destructive" : "text-muted-foreground",
          )}
          aria-label={test.saved ? "Quitar de guardados" : "Guardar test"}
          title={test.saved ? "Quitar de guardados" : "Guardar test"}
        >
          {test.saved ? <IconDeviceFloppyFilled /> : <IconDeviceFloppy />}
        </button>
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
          <span>{summary.timesDone} {summary.timesDone === 1 ? "vez" : "veces"} realizado</span>
        )}
      </div>

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
