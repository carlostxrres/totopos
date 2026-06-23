import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ValueColor = "success" | "warning" | "destructive" | "muted";

const colorClass: Record<ValueColor, string> = {
  success: "text-success",
  warning: "text-warning",
  destructive: "text-destructive",
  muted: "text-muted-foreground",
};

type StatCardProps = {
  value: ReactNode;
  label: string;
  sub?: string;
  valueColor?: ValueColor;
};

export function StatCard({ value, label, sub, valueColor }: StatCardProps) {
  return (
    <div className="card text-center space-y-0.5">
      <p className={cn("text-2xl font-bold leading-tight", valueColor && colorClass[valueColor])}>
        {value}
      </p>
      <p className="text-xs text-muted-foreground">{label}</p>
      {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
    </div>
  );
}
