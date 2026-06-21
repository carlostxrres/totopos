import { cn } from "@/lib/cn";

type ClassValue = string | undefined | null | false;
type VariantSchema = Record<string, Record<string, ClassValue>>;
type VariantProps<T extends (...args: never[]) => string> = Parameters<T>[0];

export type { VariantProps };

export function cva(
  base: ClassValue,
  config: {
    variants: VariantSchema;
    defaultVariants?: Record<string, string>;
  },
) {
  return function resolve(
    props?: Record<string, string | undefined> & { className?: string },
  ): string {
    const classes: ClassValue[] = [base];
    for (const [key, map] of Object.entries(config.variants)) {
      const value = props?.[key] ?? config.defaultVariants?.[key];
      if (value && map[value]) classes.push(map[value]);
    }
    if (props?.className) classes.push(props.className);
    return cn(...classes);
  };
}
