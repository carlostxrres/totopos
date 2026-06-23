import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";

type IndefiniteExitDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  totalAnswered: number;
  correctCount: number;
  rate: number;
  onPauseAndExit: () => void;
  onCloseSession: () => void;
};

export function IndefiniteExitDialog({
  open,
  onOpenChange,
  totalAnswered,
  correctCount,
  rate,
  onPauseAndExit,
  onCloseSession,
}: IndefiniteExitDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
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
            <Button variant="secondary" className="flex-1" onClick={onPauseAndExit}>
              Pausar y salir
            </Button>
            <Button variant="primary" className="flex-1" onClick={onCloseSession}>
              Cerrar sesión
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
