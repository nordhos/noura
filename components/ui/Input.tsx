import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({
  className,
  ...props
}: InputProps) {
  return (
    <input
      className={cn(
        "h-12 w-full rounded-2xl border border-border bg-surface px-4 text-white",
        "placeholder:text-ink-faint",
        "focus:border-accent focus:outline-none",
        className
      )}
      {...props}
    />
  );
}