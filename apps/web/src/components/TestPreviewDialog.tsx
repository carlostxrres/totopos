import * as Dialog from "@radix-ui/react-dialog";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

type SummaryItem = { label: string; value: React.ReactNode };

type TestPreviewDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  summaryItems: SummaryItem[];
  duplicateTestId?: string | null;
  duplicateTestPath?: string;
  onSave: () => void;
  onStart: () => void;
};

export function TestPreviewDialog({
  open,
  onOpenChange,
  title,
  summaryItems,
  duplicateTestId,
  duplicateTestPath,
  onSave,
  onStart,
}: TestPreviewDialogProps) {
  const navigate = useNavigate();

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-background p-6 shadow-lg space-y-4">
          <Dialog.Title className="text-base font-semibold">{title}</Dialog.Title>

          <div className="text-sm text-muted-foreground space-y-1">
            {summaryItems.map((item) => (
              <p key={item.label}>
                <strong>{item.label}:</strong> {item.value}
              </p>
            ))}
          </div>

          {duplicateTestId && duplicateTestPath && (
            <p className="rounded-md bg-warning/10 p-3 text-sm text-warning-foreground">
              Ya existe un test con estos parámetros.{" "}
              <button
                type="button"
                className="underline"
                onClick={() => {
                  onOpenChange(false);
                  navigate(duplicateTestPath);
                }}
              >
                Ir al test
              </button>
            </p>
          )}

          <div className="flex flex-col gap-2">
            <Button variant="secondary" onClick={onSave} className="w-full">
              Guardar test
            </Button>
            <Button variant="primary" onClick={onStart} className="w-full">
              Comenzar test
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
