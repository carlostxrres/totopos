import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";

type EmptyPoolDialogProps = {
  onBack: () => void;
};

export function EmptyPoolDialog({ onBack }: EmptyPoolDialogProps) {
  return (
    <Dialog.Root open onOpenChange={onBack}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-background p-6 shadow-lg space-y-4">
          <Dialog.Title className="font-semibold">Sin preguntas disponibles</Dialog.Title>
          <Dialog.Description className="text-sm text-muted-foreground">
            No hay preguntas disponibles con los filtros de este test.
          </Dialog.Description>
          <Button variant="secondary" onClick={onBack} className="w-full">
            Volver
          </Button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
