import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useEffect, useRef, useState } from "react";
import { useBlocker, useNavigate, useParams } from "react-router-dom";
import type { IndefiniteAnswer, TimerMode } from "@tot-opos/types";
import { units } from "@tot-opos/curriculum-data";
import { useTestsStore } from "@/store/tests-store";
import { useSessionStore } from "@/store/session-store";
import { useQuestionHistoryStore } from "@/store/question-history-store";
import { resolveQuestions } from "@/lib/test-generator";
import { QuestionCard } from "@/components/QuestionCard";
import { TimerControl } from "@/components/TimerControl";
import { TimerSetupModal } from "@/components/TimerSetupModal";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { EmptyPoolDialog } from "@/components/EmptyPoolDialog";
import { FewQuestionsDialog } from "@/components/FewQuestionsDialog";
import { IndefiniteEndOfPoolScreen } from "@/components/IndefiniteEndOfPoolScreen";
import { IndefiniteExitDialog } from "@/components/IndefiniteExitDialog";
import { Button } from "@/components/ui/button";
import { IconCheck, IconChevronLeft, IconChevronRight, IconClock, IconDotsVertical, IconX } from "@tabler/icons-react";
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
    if (!test || test.type !== "indefinite") {
      return [];
    }
    return resolveQuestions(ALL_QUESTIONS, test.filters, historyByQuestionId, new Date(), units);
  });

  const [currentIndex, setCurrentIndex] = useState(() => {
    if (!activeSession) {
      return 0;
    }
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

  const blocker = useBlocker(!!activeSession);
  useEffect(() => {
    if (blocker.state === "blocked") {
      setExitDialog(true);
    }
  }, [blocker.state]);

  useEffect(() => {
    if (!test || test.type !== "indefinite" || !testId) {
      return;
    }

    if (activeSession) {
      setCurrentIndex(activeSession.answers.length);
      return;
    }

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

  useEffect(() => {
    if (!timerMode) {
      return;
    }
    const answeredInSession = activeSession?.answers.length ?? 0;
    if (currentIndex >= answeredInSession) {
      const deadline = new Date(Date.now() + timerSecondsRef.current * 1000).toISOString();
      setTimerDeadlineAt(deadline);
      setTimerPausedMs(undefined);
      setTimerExpired(false);
    } else {
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
    if (!testId) {
      return;
    }
    const ids = poolQuestions.map((q) => q.id);
    startSession(testId, ids, test!.title);
    if (mode) {
      setTimerMode(mode);
      setTimerSeconds(seconds ?? 60);
    }
    setInitModal("none");
    setCurrentIndex(0);
  }

  // ── Init modals ─────────────────────────────────────────────────────────────

  if (initModal === "empty") {
    return <EmptyPoolDialog onBack={() => navigate(-1)} />;
  }

  if (initModal === "few") {
    return (
      <FewQuestionsDialog
        count={poolQuestions.length}
        onBack={() => navigate(-1)}
        onContinue={() => setInitModal("timer")}
      />
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

  // ── Current question ─────────────────────────────────────────────────────────

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

  const correctCount = activeSession?.answers.filter((a) => a.wasCorrect).length ?? 0;
  const totalAnswered = activeSession?.answers.length ?? 0;
  const rate = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

  function handleConfirm() {
    if (!currentQuestionId || !testId || !currentQuestion) {
      return;
    }
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
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  }

  // ── End of pool ──────────────────────────────────────────────────────────────

  if (isAtEnd) {
    return (
      <IndefiniteEndOfPoolScreen
        totalAnswered={totalAnswered}
        correctCount={correctCount}
        rate={rate}
        onReview={() => setCurrentIndex(0)}
        onClose={() => {
          if (testId) closeSession(testId);
          navigate("/historial");
        }}
      />
    );
  }

  // ── Main question view ───────────────────────────────────────────────────────

  return (
    <div className="space-y-4 py-4">
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
              if (timerMode === "hard") {
                setTimerExpired(true);
              }
            }}
          />
          <div className="flex flex-1 items-center gap-1 text-xs text-muted-foreground">
            <span>{totalAnswered} resp.</span>
            <span className="flex items-center gap-0.5 text-success">
              {correctCount}<IconCheck size={11} className="inline" />
            </span>
            <span className="flex items-center gap-0.5 text-destructive">
              {totalAnswered - correctCount}<IconX size={11} className="inline" />
            </span>
            {totalAnswered > 0 && <span>{rate}%</span>}
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

      {isLocked && (
        <div role="alert" className="rounded-md bg-destructive/10 p-3 text-sm text-destructive text-center font-medium">
          ¡Tiempo agotado! Esta pregunta no se registrará.
        </div>
      )}

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

      <IndefiniteExitDialog
        open={exitDialog}
        onOpenChange={(open) => {
          if (!open) blocker.reset?.();
          setExitDialog(open);
        }}
        totalAnswered={totalAnswered}
        correctCount={correctCount}
        rate={rate}
        onPauseAndExit={() => {
          setExitDialog(false);
          blocker.proceed?.();
        }}
        onCloseSession={() => {
          setExitDialog(false);
          if (testId) closeSession(testId);
          blocker.proceed?.();
        }}
      />
    </div>
  );
}
