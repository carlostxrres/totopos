import * as Dialog from "@radix-ui/react-dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { IndefiniteAnswer, TimerMode } from "@tot-opos/types";
import { units } from "@tot-opos/curriculum-data";
import { useTestsStore } from "@/store/tests-store";
import { useSessionStore } from "@/store/session-store";
import { useQuestionHistoryStore } from "@/store/question-history-store";
import { resolveQuestions } from "@/lib/test-generator";
import { QuestionCard } from "@/components/QuestionCard";
import { TimerControl } from "@/components/TimerControl";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { IconChevronLeft, IconChevronRight, IconClock, IconDotsVertical } from "@tabler/icons-react";
import { fixedTests as staticFixedTests } from "@tot-opos/test-data";
import { cn } from "@/lib/cn";

const ALL_QUESTIONS = staticFixedTests.flatMap((t) => t.questions);

export function IndefiniteTestPage() {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();

  const test = useTestsStore((s) => s.tests.find((t) => t.id === testId));
  const setSaved = useTestsStore((s) => s.setSaved);
  const { sessions, startSession, addAnswer, closeSession } = useSessionStore();
  const historyByQuestionId = useQuestionHistoryStore((s) => s.historyByQuestionId);
  const recordAnswer = useQuestionHistoryStore((s) => s.recordAnswer);

  const activeSession = testId ? sessions[testId] : undefined;

  const [poolQuestions, setPoolQuestions] = useState(() => {
    if (!test || test.type !== "indefinite") return [];
    return resolveQuestions(ALL_QUESTIONS, test.filters, historyByQuestionId, new Date(), units);
  });

  const [currentIndex, setCurrentIndex] = useState(() => {
    if (!activeSession) return 0;
    return activeSession.answers.length;
  });

  // Timer state (not persisted)
  const [timerDeadlineAt, setTimerDeadlineAt] = useState<string | undefined>(undefined);
  const [timerPausedMs, setTimerPausedMs] = useState<number | undefined>(undefined);
  const [timerMode, setTimerMode] = useState<TimerMode | undefined>(undefined);
  const [timerSeconds, setTimerSeconds] = useState(60);
  const [timerExpired, setTimerExpired] = useState(false);

  // UI state
  const [showHistory, setShowHistory] = useState(true);
  const [initModal, setInitModal] = useState<"none" | "empty" | "few" | "timer">("none");
  const [closeDialog, setCloseDialog] = useState(false);
  const [exitDialog, setExitDialog] = useState(false);
  const [timerSetupOpen, setTimerSetupOpen] = useState(false);
  const [localAnswers, setLocalAnswers] = useState<Record<string, string[]>>({});

  const timerSecondsRef = useRef(timerSeconds);
  timerSecondsRef.current = timerSeconds;

  // Intercept browser back button while a session is active
  useEffect(() => {
    if (!activeSession) return;
    window.history.pushState(null, "");
    function handlePopstate() {
      setExitDialog(true);
      window.history.pushState(null, "");
    }
    window.addEventListener("popstate", handlePopstate);
    return () => window.removeEventListener("popstate", handlePopstate);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSession?.id]);

  // On mount: check session state
  useEffect(() => {
    if (!test || test.type !== "indefinite" || !testId) return;

    if (activeSession) {
      // Resume session
      setCurrentIndex(activeSession.answers.length);
      return;
    }

    // Resolve questions and decide modal
    const pool = resolveQuestions(ALL_QUESTIONS, test.filters, historyByQuestionId, new Date(), units);
    setPoolQuestions(pool);

    if (pool.length === 0) {
      setInitModal("empty");
    } else if (pool.length < 10) {
      setInitModal("few");
    } else {
      setInitModal("timer");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testId]);

  // Reset timer on each new unanswered question
  useEffect(() => {
    if (!timerMode) return;
    const answeredInSession = activeSession?.answers.length ?? 0;
    if (currentIndex >= answeredInSession) {
      // New question — reset timer
      const deadline = new Date(Date.now() + timerSecondsRef.current * 1000).toISOString();
      setTimerDeadlineAt(deadline);
      setTimerPausedMs(undefined);
      setTimerExpired(false);
    } else {
      // Reviewing old question — stop timer
      setTimerDeadlineAt(undefined);
      setTimerPausedMs(undefined);
    }
  }, [currentIndex, timerMode, activeSession?.answers.length]);

  if (!test || test.type !== "indefinite") {
    return (
      <div className="py-12 text-center">
        <p className="text-sm text-muted-foreground">Test no encontrado.</p>
      </div>
    );
  }

  function startNewSession(mode?: TimerMode, seconds?: number) {
    if (!testId) return;
    const ids = poolQuestions.map((q) => q.id);
    startSession(testId, ids, test!.title);
    if (mode) {
      setTimerMode(mode);
      setTimerSeconds(seconds ?? 60);
    }
    setInitModal("none");
    setCurrentIndex(0);
  }

  // Current question
  const questionIds = activeSession ? activeSession.questionIds : poolQuestions.map((q) => q.id);
  const currentQuestionId = questionIds[currentIndex];
  const currentQuestion = ALL_QUESTIONS.find((q) => q.id === currentQuestionId);

  const answeredInSession = activeSession?.answers.length ?? 0;
  const isCurrentAnswered = currentIndex < answeredInSession;
  const isAtEnd = currentIndex >= questionIds.length;

  const sessionAnswer = activeSession?.answers.find((a) => a.questionId === currentQuestionId);
  const currentSelected = isCurrentAnswered
    ? (sessionAnswer?.selectedOptionIds ?? [])
    : (localAnswers[currentQuestionId ?? ""] ?? []);

  const isLocked = timerMode === "hard" && timerExpired && !isCurrentAnswered;

  function handleConfirm() {
    if (!currentQuestionId || !testId || !currentQuestion) return;
    const selectedIds = localAnswers[currentQuestionId] ?? [];
    const correctIds = currentQuestion.options.filter((o) => o.isCorrect).map((o) => o.id);
    const wasCorrect =
      correctIds.length === selectedIds.length && correctIds.every((id) => selectedIds.includes(id));

    const answer: IndefiniteAnswer = {
      questionId: currentQuestionId,
      answeredAt: new Date().toISOString(),
      wasCorrect,
      selectedOptionIds: selectedIds,
    };
    addAnswer(testId, answer);
    recordAnswer(currentQuestionId, wasCorrect);
    setTimerExpired(false);
  }

  function handleNext() {
    setCurrentIndex((i) => i + 1);
    setLocalAnswers({});
  }

  function handlePrev() {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  }

  const correctCount = activeSession?.answers.filter((a) => a.wasCorrect).length ?? 0;
  const totalAnswered = activeSession?.answers.length ?? 0;
  const rate = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

  // ── Modals ──────────────────────────────────────────────────────────────────

  if (initModal === "empty") {
    return (
      <Dialog.Root open onOpenChange={() => navigate(-1)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-background p-6 shadow-lg space-y-4">
            <Dialog.Title className="font-semibold">Sin preguntas disponibles</Dialog.Title>
            <Dialog.Description className="text-sm text-muted-foreground">
              No hay preguntas disponibles con los filtros de este test.
            </Dialog.Description>
            <Button variant="secondary" onClick={() => navigate(-1)} className="w-full">
              Volver
            </Button>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  }

  if (initModal === "few") {
    return (
      <Dialog.Root open>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-background p-6 shadow-lg space-y-4">
            <Dialog.Title className="font-semibold">Pocas preguntas disponibles</Dialog.Title>
            <Dialog.Description className="text-sm text-muted-foreground">
              Solo hay {poolQuestions.length} preguntas disponibles con estos filtros. ¿Quieres continuar?
            </Dialog.Description>
            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => navigate(-1)} className="flex-1">
                Volver
              </Button>
              <Button variant="primary" onClick={() => setInitModal("timer")} className="flex-1">
                Continuar
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  }

  if (initModal === "timer") {
    return (
      <TimerSetupModal
        onStart={startNewSession}
        onSkip={() => startNewSession()}
        onCancel={() => navigate(-1)}
      />
    );
  }

  // ── End of pool ──────────────────────────────────────────────────────────────

  if (isAtEnd) {
    return (
      <div className="py-8 space-y-6">
        <div className="card text-center space-y-2">
          <p className="text-lg font-semibold">No quedan más preguntas disponibles</p>
          <p className="text-sm text-muted-foreground">Has llegado al final del pool de preguntas.</p>
        </div>
        <div className="card space-y-2">
          <h3 className="text-sm font-semibold">Resultados de esta sesión</h3>
          <div className="flex gap-4 text-sm">
            <span>{totalAnswered} respondidas</span>
            <span className="text-success">{correctCount} correctas</span>
            <span className="text-destructive">{totalAnswered - correctCount} incorrectas</span>
            <span className="font-medium">{rate}% acierto</span>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => setCurrentIndex(0)} className="flex-1">
            Revisar
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              if (testId) closeSession(testId);
              navigate("/historial");
            }}
            className="flex-1"
          >
            Cerrar sesión
          </Button>
        </div>
      </div>
    );
  }

  // ── Main question view ───────────────────────────────────────────────────────

  return (
    <div className="space-y-4 py-4">
      {/* SubHeader */}
      <div className="subheader -mx-4 px-4 py-2 space-y-1">
        <div className="flex items-center gap-2">
          <TimerControl
            mode="indefinite"
            deadlineAt={timerDeadlineAt}
            pausedRemainingMs={timerPausedMs}
            timerMode={timerMode}
            setupOpen={timerSetupOpen}
            onSetupOpenChange={setTimerSetupOpen}
            onStart={(mode, seconds) => {
              setTimerMode(mode);
              setTimerSeconds(seconds);
              setTimerDeadlineAt(new Date(Date.now() + seconds * 1000).toISOString());
            }}
            onPause={() => {
              if (timerDeadlineAt) {
                setTimerPausedMs(new Date(timerDeadlineAt).getTime() - Date.now());
                setTimerDeadlineAt(undefined);
              }
            }}
            onResume={() => {
              if (timerPausedMs) {
                setTimerDeadlineAt(new Date(Date.now() + timerPausedMs).toISOString());
                setTimerPausedMs(undefined);
              }
            }}
            onExpire={() => {
              setTimerDeadlineAt(undefined);
              if (timerMode === "hard") setTimerExpired(true);
            }}
          />
          <div className="flex-1 text-xs text-muted-foreground">
            {totalAnswered} resp. · {correctCount} ✓ · {totalAnswered - correctCount} ✗
            {totalAnswered > 0 && ` · ${rate}%`}
          </div>
          <span className="shrink-0 text-xs text-muted-foreground">
            {questionIds.length} en pool
          </span>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button
                type="button"
                className="btn-ghost flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground"
                aria-label="Más opciones"
              >
                <IconDotsVertical />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                align="end"
                className="z-50 min-w-48 rounded-md border border-border bg-background p-1 shadow-md"
              >
                <DropdownMenu.Item
                  className="flex cursor-pointer items-center gap-2 rounded px-3 py-2 text-sm hover:bg-muted"
                  onSelect={() => setTimerSetupOpen(true)}
                >
                  <IconClock size={16} />
                  Temporizador
                </DropdownMenu.Item>
                <DropdownMenu.Separator className="my-1 h-px bg-border" />
                <DropdownMenu.Item
                  className="flex cursor-pointer rounded px-3 py-2 text-sm hover:bg-muted"
                  onSelect={() => setShowHistory((v) => !v)}
                >
                  {showHistory ? "Ocultar" : "Mostrar"} historial de pregunta
                </DropdownMenu.Item>
                <DropdownMenu.Separator className="my-1 h-px bg-border" />
                <DropdownMenu.Item
                  className="flex cursor-pointer rounded px-3 py-2 text-sm hover:bg-muted"
                  onSelect={() => setSaved(test.id, !test.saved)}
                >
                  {test.saved ? "Quitar de guardados" : "Guardar test"}
                </DropdownMenu.Item>
                <DropdownMenu.Separator className="my-1 h-px bg-border" />
                <DropdownMenu.Item
                  className="flex cursor-pointer rounded px-3 py-2 text-sm text-destructive hover:bg-muted"
                  onSelect={() => setCloseDialog(true)}
                >
                  Cerrar sesión
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>

      {/* Timer expired (hard) */}
      {isLocked && (
        <div role="alert" className="rounded-md bg-destructive/10 p-3 text-sm text-destructive text-center font-medium">
          ¡Tiempo agotado! Esta pregunta no se registrará.
        </div>
      )}

      {/* Question */}
      {currentQuestion && (
        <QuestionCard
          question={currentQuestion}
          selectedOptionIds={currentSelected}
          onChange={(ids) => {
            if (!isCurrentAnswered && !isLocked) {
              setLocalAnswers((prev) => ({ ...prev, [currentQuestionId!]: ids }));
            }
          }}
          showCorrection={isCurrentAnswered}
          showHistory={showHistory}
          questionHistory={historyByQuestionId[currentQuestionId ?? ""]}
        />
      )}

      {/* Controls */}
      <div className={cn("flex gap-3", isCurrentAnswered ? "justify-between" : "justify-end")}>
        {currentIndex > 0 && (
          <Button variant="secondary" onClick={handlePrev} size="sm">
            <IconChevronLeft className="mr-1" />
            Anterior
          </Button>
        )}

        {!isCurrentAnswered && !isLocked && (
          <Button
            variant="primary"
            disabled={currentSelected.length === 0}
            onClick={handleConfirm}
          >
            Confirmar
          </Button>
        )}

        {(isCurrentAnswered || isLocked) && (
          <Button variant="primary" onClick={handleNext}>
            Siguiente pregunta
            <IconChevronRight className="ml-1" />
          </Button>
        )}
      </div>

      <ConfirmDialog
        open={closeDialog}
        onOpenChange={setCloseDialog}
        title="Cerrar sesión"
        description="Se guardará tu progreso en el historial. ¿Quieres cerrar la sesión?"
        confirmLabel="Cerrar sesión"
        onConfirm={() => {
          if (testId) closeSession(testId);
          navigate("/historial");
        }}
      />

      {/* Exit dialog: shown when pressing the browser back button */}
      <Dialog.Root open={exitDialog} onOpenChange={setExitDialog}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-background p-6 shadow-lg space-y-4">
            <Dialog.Title className="font-semibold">¿Salir del test?</Dialog.Title>
            <Dialog.Description asChild>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Tu progreso se conservará. Puedes continuar desde aquí cuando quieras.
                </p>
                {totalAnswered > 0 && (
                  <div className="rounded-md bg-muted p-3 text-sm space-y-1">
                    <p className="font-medium">Esta sesión</p>
                    <p className="text-muted-foreground">
                      {totalAnswered} respondidas · {correctCount} correctas · {totalAnswered - correctCount} incorrectas · {rate}% acierto
                    </p>
                  </div>
                )}
              </div>
            </Dialog.Description>
            <div className="flex gap-3">
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => {
                  setExitDialog(false);
                  navigate(-1);
                }}
              >
                Pausar y salir
              </Button>
              <Button
                variant="primary"
                className="flex-1"
                onClick={() => {
                  setExitDialog(false);
                  if (testId) closeSession(testId);
                  navigate("/historial");
                }}
              >
                Cerrar sesión
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

// ─── Timer setup modal ────────────────────────────────────────────────────────

type TimerSetupModalProps = {
  onStart: (mode: TimerMode, seconds: number) => void;
  onSkip: () => void;
  onCancel: () => void;
};

function TimerSetupModal({ onStart, onSkip, onCancel }: TimerSetupModalProps) {
  const [selectedMode, setSelectedMode] = useState<TimerMode | "none">("none");
  const [seconds, setSeconds] = useState(60);

  return (
    <Dialog.Root open>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-background p-6 shadow-lg space-y-4">
          <Dialog.Title className="font-semibold">Configurar temporizador por pregunta</Dialog.Title>

          <div className="space-y-2">
            {(["none", "soft", "hard"] as const).map((opt) => (
              <label
                key={opt}
                className={`option cursor-pointer ${selectedMode === opt ? "border-primary bg-primary/10" : ""}`}
              >
                <input
                  type="radio"
                  name="timer"
                  value={opt}
                  checked={selectedMode === opt}
                  onChange={() => setSelectedMode(opt)}
                  className="sr-only"
                />
                <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-current">
                  {selectedMode === opt && <div className="h-2 w-2 rounded-full bg-current" />}
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {opt === "none" ? "Sin temporizador" : opt === "soft" ? "Blando" : "Duro"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {opt === "none"
                      ? "Sin límite de tiempo."
                      : opt === "soft"
                        ? "Pausable. Al expirar puedes confirmar igualmente."
                        : "No pausable. Al expirar se bloquea la pregunta y no se registra."}
                  </p>
                </div>
              </label>
            ))}
          </div>

          {selectedMode !== "none" && (
            <div className="space-y-1">
              <label className="text-sm font-medium">Segundos por pregunta</label>
              <input
                type="number"
                min={5}
                value={seconds}
                onChange={(e) => setSeconds(parseInt(e.target.value, 10) || 60)}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          )}

          <div className="flex gap-3">
            <Button variant="secondary" onClick={onCancel} className="flex-1">
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                if (selectedMode === "none") onSkip();
                else onStart(selectedMode, seconds);
              }}
              className="flex-1"
            >
              Comenzar
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
