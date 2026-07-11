import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = "primary",
  fullWidth = true,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "h-12 rounded-2xl font-medium transition-all duration-200",
        fullWidth && "w-full",

        variant === "primary" &&
          "bg-accent text-black hover:brightness-105",

        variant === "secondary" &&
          "border border-border bg-surface text-white hover:bg-white/5",

        variant === "danger" &&
          "bg-red-600 text-white hover:bg-red-500",

        disabled &&
          "cursor-not-allowed opacity-50",

        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}