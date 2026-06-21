import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "destructive";
type Size = "default" | "sm" | "icon";

const variantClass: Record<Variant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
  destructive: "btn-destructive",
};

const sizeClass: Record<Size, string> = {
  default: "",
  sm: "min-h-9 px-3 text-xs",
  icon: "min-h-9 w-9 px-0",
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
};

export function Button({ variant = "primary", size = "default", asChild, className, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn("btn", variantClass[variant], sizeClass[size], className)}
      {...(props as React.HTMLAttributes<HTMLElement>)}
    />
  );
}
