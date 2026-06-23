import { Button } from "@/components/ui/button";
import { SessionResultsSummary } from "@/components/SessionResultsSummary";

type IndefiniteEndOfPoolScreenProps = {
  totalAnswered: number;
  correctCount: number;
  rate: number;
  onReview: () => void;
  onClose: () => void;
};

export function IndefiniteEndOfPoolScreen({
  totalAnswered,
  correctCount,
  rate,
  onReview,
  onClose,
}: IndefiniteEndOfPoolScreenProps) {
  return (
    <div className="py-8 space-y-6">
      <div className="card text-center space-y-2">
        <p className="text-lg font-semibold">No quedan más preguntas disponibles</p>
        <p className="text-sm text-muted-foreground">Has llegado al final del pool de preguntas.</p>
      </div>
      <div className="card space-y-2">
        <h3 className="text-sm font-semibold">Resultados de esta sesión</h3>
        <SessionResultsSummary totalAnswered={totalAnswered} correctCount={correctCount} rate={rate} />
      </div>
      <div className="flex gap-3">
        <Button variant="secondary" onClick={onReview} className="flex-1">Revisar</Button>
        <Button variant="primary" onClick={onClose} className="flex-1">Cerrar sesión</Button>
      </div>
    </div>
  );
}
