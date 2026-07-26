import type { ButtonHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon;
  variant?: "outline" | "filled" | "soft";
  size?: "sm" | "md" | "lg";
  "aria-label": string;
}

const sizeMap = {
  sm: { box: "h-9 w-9", icon: 16 },
  md: { box: "h-11 w-11", icon: 20 },
  lg: { box: "h-14 w-14", icon: 26 },
};

/**
 * Circular icon button.
 *
 * outline = Back button / Logout
 * soft    = Accent soft background
 * filled  = Primary FAB
 */
export function IconButton({
  icon: Icon,
  variant = "outline",
  size = "md",
  className,
  ...props
}: IconButtonProps) {
  const { box, icon } = sizeMap[size];

  return (
    <button
      type="button"
      className={cn(
        "flex items-center justify-center rounded-full transition-all duration-200",
        box,

        variant === "outline" &&
          "border border-border bg-card text-foreground hover:border-accent hover:bg-accent/10",

        variant === "soft" &&
          "bg-accent-soft text-accent",

        variant === "filled" &&
          "bg-accent text-black shadow-fab hover:brightness-105",

        className
      )}
      {...props}
    >
      <Icon size={icon} />
    </button>
  );
}