type UnitChipProps = {
  label: string;
};

export function UnitChip({ label }: UnitChipProps) {
  return (
    <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
      {label}
    </span>
  );
}
