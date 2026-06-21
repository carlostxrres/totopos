import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useRef, useState } from "react";
import type { TimerMode } from "@tot-opos/types";
import { PauseIcon, PlayIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

type TimerControlProps = {
  mode: "fixed" | "indefinite";
  deadlineAt?: string;
  pausedRemainingMs?: number;
  timerMode?: TimerMode;
  suggestedMinutes?: number;
  questionCount?: number;
  setupOpen: boolean;
  onSetupOpenChange: (open: boolean) => void;
  onStart: (mode: TimerMode, value: number) => void;
  onPause?: () => void;
  onResume?: () => void;
  onExpire?: () => void;
};

function formatCountdown(ms: number): string {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function TimerControl({
  mode,
  deadlineAt,
  pausedRemainingMs,
  timerMode: _timerMode,
  suggestedMinutes,
  questionCount,
  setupOpen,
  onSetupOpenChange,
  onStart,
  onPause,
  onResume,
  onExpire,
}: TimerControlProps) {
  const [selectedMode, setSelectedMode] = useState<TimerMode | "none">("none");
  const [inputValue, setInputValue] = useState(
    mode === "fixed"
      ? String(suggestedMinutes ?? (questionCount ? Math.round(questionCount * 0.5) : 30))
      : "60",
  );
  const [remainingMs, setRemainingMs] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isPaused = !!pausedRemainingMs && !deadlineAt;
  const isActive = !!deadlineAt;
  const warningThreshold = mode === "fixed" ? 5 * 60 * 1000 : 15 * 1000;
  const isWarning = remainingMs !== null && remainingMs > 0 && remainingMs < warningThreshold;

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (deadlineAt) {
      const tick = () => {
        const ms = new Date(deadlineAt).getTime() - Date.now();
        setRemainingMs(ms);
        if (ms <= 0) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          onExpire?.();
        }
      };
      tick();
      intervalRef.current = setInterval(tick, 500);
    } else if (pausedRemainingMs) {
      setRemainingMs(pausedRemainingMs);
    } else {
      setRemainingMs(null);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [deadlineAt, pausedRemainingMs, onExpire]);

  function handleStart() {
    if (selectedMode === "none") return;
    const val = parseInt(inputValue, 10);
    if (isNaN(val) || val <= 0) return;
    onStart(selectedMode, val);
    onSetupOpenChange(false);
  }

  const defaultMinutes = suggestedMinutes ?? (questionCount ? Math.round(questionCount * 0.5) : 30);

  return (
    <>
      {/* Countdown chip — only shown when timer is active or paused */}
      {(isActive || isPaused) && (
        <button
          type="button"
          onClick={() => {
            if (isActive && onPause) onPause();
            else if (isPaused && onResume) onResume();
          }}
          className={cn(
            "flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium transition-colors",
            isWarning
              ? "bg-warning/20 text-warning-foreground"
              : "bg-muted text-foreground",
          )}
          aria-label={isActive ? "Pausar temporizador" : "Reanudar temporizador"}
        >
          {isActive ? <PauseIcon /> : <PlayIcon />}
          <span>{remainingMs !== null ? formatCountdown(remainingMs) : "—"}</span>
        </button>
      )}

      {/* Setup dialog — triggered from DropdownMenu via setupOpen prop */}
      <Dialog.Root open={setupOpen} onOpenChange={onSetupOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-background p-6 shadow-lg">
            <Dialog.Title className="mb-4 text-base font-semibold">Configurar temporizador</Dialog.Title>

            <div className="space-y-2 mb-4">
              {(["none", "soft", "hard"] as const).map((opt) => (
                <label
                  key={opt}
                  className={cn(
                    "option cursor-pointer",
                    selectedMode === opt ? "border-primary bg-primary/10" : "",
                  )}
                >
                  <input
                    type="radio"
                    name="timer-mode"
                    value={opt}
                    checked={selectedMode === opt}
                    onChange={() => setSelectedMode(opt)}
                    className="sr-only"
                  />
                  <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-current">
                    {selectedMode === opt && <div className="h-2 w-2 rounded-full bg-current" />}
                  </div>
                  <div>
                    <p className="font-medium text-sm">
                      {opt === "none" ? "Sin temporizador" : opt === "soft" ? "Blando" : "Duro"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {opt === "none"
                        ? "Sin límite de tiempo."
                        : opt === "soft"
                          ? "Pausable. Al expirar puedes seguir respondiendo."
                          : "No pausable. Al expirar se bloquean los campos."}
                    </p>
                  </div>
                </label>
              ))}
            </div>

            {selectedMode !== "none" && (
              <div className="mb-4 space-y-2">
                <label className="text-sm font-medium">
                  {mode === "fixed" ? "Minutos" : "Segundos"}
                </label>
                <input
                  type="number"
                  min={1}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {mode === "fixed" && questionCount && (
                  <p className="text-xs text-muted-foreground">
                    {((parseInt(inputValue, 10) || 0) / questionCount).toFixed(1)} minutos por pregunta.
                  </p>
                )}
                {mode === "fixed" && suggestedMinutes && (
                  <p className="text-xs text-primary">
                    Para este test se recomiendan {suggestedMinutes} minutos.
                  </p>
                )}
              </div>
            )}

            <div className="flex justify-end gap-3">
              <Button variant="secondary" onClick={() => onSetupOpenChange(false)}>
                Cancelar
              </Button>
              <Button
                variant="primary"
                onClick={handleStart}
                disabled={selectedMode === "none"}
              >
                Iniciar
              </Button>
            </div>

            {selectedMode === "none" && (
              <p className="mt-2 text-xs text-center text-muted-foreground">
                Por defecto: {defaultMinutes} minutos.
              </p>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

