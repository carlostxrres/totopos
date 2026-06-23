import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SettingsSectionProps = {
  title: string;
  description: string;
  danger?: boolean;
  children: ReactNode;
};

export function SettingsSection({ title, description, danger, children }: SettingsSectionProps) {
  return (
    <section className="space-y-3">
      <h2 className={cn("text-sm font-semibold", danger && "text-destructive")}>{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
      {children}
    </section>
  );
}
