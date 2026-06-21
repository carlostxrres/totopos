import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { FixedAttempt, TimerMode } from "@tot-opos/types";
import { useTestsStore } from "@/store/tests-store";
import { useProgressStore } from "@/store/progress-store";
import { useHistoryStore } from "@/store/history-store";
import { useQuestionHistoryStore } from "@/store/question-history-store";
import { useActiveQuestion } from "@/hooks/useActiveQuestion";
import { useScrollSnap } from "@/hooks/useScrollSnap";
import { scoreTest } from "@/lib/scoring";
import { QuestionCard } from "@/components/QuestionCard";
import { ProgressPills } from "@/components/ProgressPills";
import { TimerControl } from "@/components/TimerControl";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { TestCorrection } from "@/components/TestCorrection";
import { Button } from "@/components/ui/button";
import { ClockIcon, MenuDotsIcon } from "@/components/icons";

export function FixedTestPage() {
  const { testId } = useParams<{ testId: string }>();

  const test = useTestsStore((s) => s.tests.find((t) => t.id === testId));
  const setSaved = useTestsStore((s) => s.setSaved);
  const progress = useProgressStore((s) => s.progressByTestId[testId ?? ""]);
  const { touchOpened, setAnswer, toggleFlag, startTimer, pauseTimer, resumeTimer, reset, clear } =
    useProgressStore();
  const addFixedAttempt = useHistoryStore((s) => s.addFixedAttempt);
  const recordAnswer = useQuestionHistoryStore((s) => s.recordAnswer);

  const [showCorrection, setShowCorrection] = useState(false);
  const [attempt, setAttempt] = useState<FixedAttempt | null>(null);
  const [submitDialog, setSubmitDialog] = useState<"unanswered" | "flagged" | null>(null);
  const [resetDialog, setResetDialog] = useState(false);
  const [hardExpired, setHardExpired] = useState(false);
  const [timerSetupOpen, setTimerSetupOpen] = useState(false);

  useEffect(() => {
    if (testId) touchOpened(testId);
  }, [testId, touchOpened]);

  const questionIds = test?.type === "fixed" ? test.questions.map((q) => q.id) : [];
  const activeIds = useActiveQuestion(questionIds);
  useScrollSnap(!showCorrection);

  if (!test || test.type !== "fixed") {
    return (
      <div className="py-12 text-center">
        <p className="text-sm text-muted-foreground">Test no encontrado.</p>
      </div>
    );
  }

  const answers = progress?.answers ?? {};
  const flaggedIds = new Set(progress?.flaggedQuestionIds ?? []);
  const answeredIds = new Set(Object.keys(answers));
  const answeredCount = answeredIds.size;

  // After early return, `test` is narrowed to FixedTest. Capture it so closures keep the type.
  const fixedTest = test;

  const timer = progress?.timer;
  const isHardTimer = timer?.mode === "hard";
  const isLocked = hardExpired && isHardTimer;

  function handleTimerExpire() {
    if (isHardTimer) setHardExpired(true);
  }

  function doSubmit() {
    if (!fixedTest || !testId) return;
    const result = scoreTest(fixedTest, answers);
    const newAttempt: FixedAttempt = {
      id: crypto.randomUUID(),
      testId: fixedTest.id,
      testTitle: fixedTest.title,
      completedAt: new Date().toISOString(),
      score: result.score,
      maxScore: result.maxScore,
      passed: result.passed,
      answers,
    };
    for (const qr of result.questionResults) {
      if (qr.selectedOptionIds.length > 0) {
        recordAnswer(qr.questionId, qr.isCorrect);
      }
    }
    addFixedAttempt(newAttempt);
    clear(testId);
    setAttempt(newAttempt);
    setShowCorrection(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleSubmitPress() {
    if (!fixedTest) return;
    const unansweredFlagged = fixedTest.questions.filter(
      (q) => flaggedIds.has(q.id) && !answeredIds.has(q.id),
    );
    const unanswered = fixedTest.questions.filter((q) => !answeredIds.has(q.id));
    if (unansweredFlagged.length > 0) {
      setSubmitDialog("flagged");
    } else if (unanswered.length > 0) {
      setSubmitDialog("unanswered");
    } else {
      doSubmit();
    }
  }

  const unansweredCount = test.questions.length - answeredCount;

  if (showCorrection && attempt) {
    const result = scoreTest(test, attempt.answers);
    return <TestCorrection test={test} attempt={attempt} result={result} />;
  }

  return (
    <div className="py-4">
      {/* SubHeader */}
      <div className="subheader -mx-4 px-4 py-2 space-y-2">
        <div className="flex items-center gap-2">
          <TimerControl
            mode="fixed"
            deadlineAt={timer?.deadlineAt}
            pausedRemainingMs={timer?.pausedRemainingMs}
            timerMode={timer?.mode}
            suggestedMinutes={test.suggestedMinuteLimit}
            questionCount={test.questions.length}
            setupOpen={timerSetupOpen}
            onSetupOpenChange={setTimerSetupOpen}
            onStart={(mode: TimerMode, minutes: number) => startTimer(testId!, mode, minutes)}
            onPause={() => pauseTimer(testId!)}
            onResume={() => resumeTimer(testId!)}
            onExpire={handleTimerExpire}
          />

          <div className="flex-1 overflow-x-auto">
            <ProgressPills
              questionIds={questionIds}
              answeredIds={answeredIds}
              flaggedIds={flaggedIds}
              activeIds={activeIds}
            />
          </div>

          <span className="shrink-0 text-xs text-muted-foreground">
            {answeredCount}/{test.questions.length}
          </span>

          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button
                type="button"
                className="btn-ghost flex h-8 w-8 items-center justify-center rounded-md"
                aria-label="Más opciones"
              >
                <MenuDotsIcon />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                align="end"
                className="z-50 min-w-44 rounded-md border border-border bg-background p-1 shadow-md"
              >
                <DropdownMenu.Item
                  className="flex cursor-pointer items-center gap-2 rounded px-3 py-2 text-sm hover:bg-muted"
                  onSelect={() => setTimerSetupOpen(true)}
                >
                  <ClockIcon size={16} />
                  Temporizador
                </DropdownMenu.Item>
                <DropdownMenu.Separator className="my-1 h-px bg-border" />
                <DropdownMenu.Item
                  className="flex cursor-pointer rounded px-3 py-2 text-sm hover:bg-muted"
                  onSelect={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  Ir al principio
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  className="flex cursor-pointer rounded px-3 py-2 text-sm hover:bg-muted"
                  onSelect={() =>
                    document.getElementById("submit-btn")?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Ir al final
                </DropdownMenu.Item>
                <DropdownMenu.Separator className="my-1 h-px bg-border" />
                <DropdownMenu.Item
                  className="flex cursor-pointer rounded px-3 py-2 text-sm hover:bg-muted"
                  onSelect={() => setSaved(test.id, !test.saved)}
                >
                  {test.saved ? "Quitar de guardados" : "Guardar test"}
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  className="flex cursor-pointer rounded px-3 py-2 text-sm text-destructive hover:bg-muted disabled:opacity-50"
                  onSelect={() => answeredCount > 0 && setResetDialog(true)}
                  disabled={answeredCount === 0}
                >
                  Reiniciar test
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>

      {/* Hard timer expired banner */}
      {isLocked && (
        <div
          role="alert"
          className="my-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive text-center font-medium"
        >
          ¡Tiempo agotado! Solo puedes enviar el test.
        </div>
      )}

      {/* Questions */}
      <div className="space-y-4 mt-4">
        <fieldset disabled={isLocked} className="space-y-4">
          {test.questions.map((question) => (
            <div key={question.id} id={`question-${question.id}`}>
              <QuestionCard
                question={question}
                selectedOptionIds={answers[question.id] ?? []}
                onChange={(ids) => setAnswer(testId!, question.id, ids)}
                showCorrection={false}
                isFlagged={flaggedIds.has(question.id)}
                onToggleFlag={() => toggleFlag(testId!, question.id)}
              />
            </div>
          ))}
        </fieldset>

        {/* Submit button — last snap point */}
        <div
          id="submit-btn"
          className="flex min-h-screen snap-start items-center justify-center md:min-h-0 md:snap-none"
        >
          <Button
            variant="primary"
            onClick={handleSubmitPress}
            className="w-full max-w-xs text-base"
          >
            Enviar test
          </Button>
        </div>
      </div>

      {/* Dialogs */}
      <ConfirmDialog
        open={submitDialog === "flagged"}
        onOpenChange={(open) => !open && setSubmitDialog(null)}
        title="Preguntas marcadas sin responder"
        description="Tienes preguntas marcadas con bookmark que no has respondido. ¿Quieres enviar igualmente?"
        confirmLabel="Enviar"
        onConfirm={doSubmit}
      />
      <ConfirmDialog
        open={submitDialog === "unanswered"}
        onOpenChange={(open) => !open && setSubmitDialog(null)}
        title="Preguntas sin responder"
        description={`Quedan ${unansweredCount} ${unansweredCount === 1 ? "pregunta" : "preguntas"} sin responder. ¿Quieres enviar igualmente?`}
        confirmLabel="Enviar"
        onConfirm={doSubmit}
      />
      <ConfirmDialog
        open={resetDialog}
        onOpenChange={setResetDialog}
        title="Reiniciar test"
        description="Se borrarán todas tus respuestas y marcas. ¿Estás seguro?"
        confirmLabel="Reiniciar"
        variant="destructive"
        onConfirm={() => reset(testId!)}
      />
    </div>
  );
}
