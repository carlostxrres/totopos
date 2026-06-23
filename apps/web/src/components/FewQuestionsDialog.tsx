import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";

type FewQuestionsDialogProps = {
  count: number;
  onBack: () => void;
  onContinue: () => void;
};

export function FewQuestionsDialog({ count, onBack, onContinue }: FewQuestionsDialogProps) {
  return (
    <Dialog.Root open>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-background p-6 shadow-lg space-y-4">
          <Dialog.Title className="font-semibold">Pocas preguntas disponibles</Dialog.Title>
          <Dialog.Description className="text-sm text-muted-foreground">
            Solo hay {count} preguntas disponibles con estos filtros. ¿Quieres continuar?
          </Dialog.Description>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={onBack} className="flex-1">Volver</Button>
            <Button variant="primary" onClick={onContinue} className="flex-1">Continuar</Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
