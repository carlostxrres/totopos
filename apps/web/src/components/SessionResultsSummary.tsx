type SessionResultsSummaryProps = {
  totalAnswered: number;
  correctCount: number;
  rate: number;
};

export function SessionResultsSummary({ totalAnswered, correctCount, rate }: SessionResultsSummaryProps) {
  const incorrectCount = totalAnswered - correctCount;
  return (
    <div className="flex flex-wrap gap-4 text-sm">
      <span>{totalAnswered} respondidas</span>
      <span className="text-success">{correctCount} correctas</span>
      <span className="text-destructive">{incorrectCount} incorrectas</span>
      <span className="font-medium">{rate}% acierto</span>
    </div>
  );
}
