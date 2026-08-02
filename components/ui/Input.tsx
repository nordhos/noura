import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({
  className,
  type,
  ...props
}: InputProps) {
  return (
    <input
      type={type}
      className={cn(
        "block h-12 w-full min-w-0 max-w-full box-border rounded-2xl",
        "border border-border bg-surface px-4",
        "text-white placeholder:text-ink-faint",
        "focus:border-accent focus:outline-none",
        type === "date" &&
          "appearance-none [-webkit-appearance:none] overflow-hidden",
        className
      )}
      {...props}
    />
  );
}