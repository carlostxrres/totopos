import type { Test } from "@tot-opos/types";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { units } from "@tot-opos/curriculum-data";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Dialog from "@radix-ui/react-dialog";
import { useTestsStore } from "@/store/tests-store";
import { useTestSummary } from "@/hooks/useTestSummary";
import { useHistoryStore } from "@/store/history-store";
import { formatRelativeTime } from "@/lib/relative-time";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { TestCardDetails } from "@/components/TestCardDetails";
import PluralizedNoun from "@/components/PluralizedNoun";
import {
  IconChevronDown,
  IconChevronUp,
  IconDots,
} from "@tabler/icons-react";
import { cn } from "@/lib/cn";

type TestCardProps = {
  test: Test;
  chipLabel?: string;
};

export function TestCard({ test, chipLabel }: TestCardProps) {
  const navigate = useNavigate();
  const setSaved = useTestsStore((s) => s.setSaved);
  const renameTest = useTestsStore((s) => s.renameTest);
  const summary = useTestSummary(test.id, test.type);
  const fixedAttempts = useHistoryStore((s) => s.fixedAttempts);
  const indefiniteSessions = useHistoryStore((s) => s.indefiniteSessions);
  const [confirmUnsave, setConfirmUnsave] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [renameOpen, setRenameOpen] = useState(false);
  const [renameValue, setRenameValue] = useState("");
  const renameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (renameOpen) {
      const currentTitle =
        test.type === "fixed"
          ? test.title
          : (test.title ?? "");
      setRenameValue(currentTitle);
      setTimeout(() => renameInputRef.current?.select(), 0);
    }
  }, [renameOpen, test]);

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

  function handleRenameConfirm() {
    const trimmed = renameValue.trim();
    if (trimmed) {
      renameTest(test.id, trimmed);
    }
    setRenameOpen(false);
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

        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              type="button"
              aria-label="Opciones del test"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <IconDots size={16} />
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              align="end"
              sideOffset={4}
              className="z-50 min-w-[9rem] rounded-md border border-border bg-background py-1 shadow-md"
            >
              <DropdownMenu.Item
                onSelect={() =>
                  test.saved ? setConfirmUnsave(true) : setSaved(test.id, true)
                }
                className={cn(
                  "flex cursor-pointer select-none items-center px-3 py-1.5 text-sm outline-none transition-colors hover:bg-muted",
                  test.saved && "text-destructive",
                )}
              >
                {test.saved ? "Quitar" : "Guardar"}
              </DropdownMenu.Item>

              <DropdownMenu.Item
                onSelect={() => setRenameOpen(true)}
                className="flex cursor-pointer select-none items-center px-3 py-1.5 text-sm outline-none transition-colors hover:bg-muted"
              >
                Renombrar
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
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
          <span><PluralizedNoun
            count={summary.timesDone}
            singular="vez"
            plural="veces"
            showNumberSingular={true}
          /> realizado</span>
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
        <TestCardDetails test={test} unitNames={unitNames} recentAttempts={recentAttempts} />
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

      {/* Rename dialog */}
      <Dialog.Root open={renameOpen} onOpenChange={setRenameOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-background p-6 shadow-lg space-y-4">
            <Dialog.Title className="text-base font-semibold">Renombrar test</Dialog.Title>
            <input
              ref={renameInputRef}
              type="text"
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleRenameConfirm();
                if (e.key === "Escape") setRenameOpen(false);
              }}
              maxLength={80}
              placeholder="Nombre del test"
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground"
            />
            <div className="flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setRenameOpen(false)}>
                Cancelar
              </Button>
              <Button
                variant="primary"
                onClick={handleRenameConfirm}
                disabled={!renameValue.trim()}
              >
                Guardar
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
