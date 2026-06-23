import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import type { TimerMode } from "@tot-opos/types";
import { Button } from "@/components/ui/button";
import { RadioOption } from "@/components/RadioOption";

type TimerSetupModalProps = {
  onStart: (mode: TimerMode, seconds: number) => void;
  onSkip: () => void;
  onCancel: () => void;
};

const TIMER_OPTIONS: { value: "none" | TimerMode; label: string; description: string }[] = [
  { value: "none", label: "Sin temporizador", description: "Sin límite de tiempo." },
  { value: "soft", label: "Blando", description: "Pausable. Al expirar puedes confirmar igualmente." },
  { value: "hard", label: "Duro", description: "No pausable. Al expirar se bloquea la pregunta y no se registra." },
];

export function TimerSetupModal({ onStart, onSkip, onCancel }: TimerSetupModalProps) {
  const [selectedMode, setSelectedMode] = useState<TimerMode | "none">("none");
  const [seconds, setSeconds] = useState(60);

  return (
    <Dialog.Root open>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-background p-6 shadow-lg space-y-4">
          <Dialog.Title className="font-semibold">Configurar temporizador por pregunta</Dialog.Title>

          <div className="space-y-2">
            {TIMER_OPTIONS.map(({ value, label, description }) => (
              <RadioOption
                key={value}
                name="timer"
                value={value}
                checked={selectedMode === value}
                onChange={() => setSelectedMode(value)}
                label={label}
                description={description}
              />
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
                if (selectedMode === "none") {
                  onSkip();
                } else {
                  onStart(selectedMode, seconds);
                }
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
