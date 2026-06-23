import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type RadioOptionProps = {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  label: ReactNode;
  description?: ReactNode;
};

export function RadioOption({ name, value, checked, onChange, label, description }: RadioOptionProps) {
  return (
    <label className={cn("option cursor-pointer", checked && "border-primary bg-primary/10")}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-current">
        {checked && <div className="h-2 w-2 rounded-full bg-current" />}
      </div>
      <div>
        <p className="text-sm font-medium">{label}</p>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </div>
    </label>
  );
}
