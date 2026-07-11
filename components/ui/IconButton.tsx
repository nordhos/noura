import type { ButtonHTMLAttributes } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon;
  variant?: 'outline' | 'filled' | 'soft';
  size?: 'sm' | 'md' | 'lg';
  'aria-label': string;
}

const sizeMap = {
  sm: { box: 'h-9 w-9', icon: 16 },
  md: { box: 'h-11 w-11', icon: 20 },
  lg: { box: 'h-14 w-14', icon: 26 },
};

/**
 * Circular icon button. `variant` controls the fill:
 * - outline: transparent with a hairline border (settings gear, quick actions)
 * - soft: tinted accent background (decorative icons inside cards)
 * - filled: solid accent (the bottom-nav "+" FAB)
 */
export function IconButton({
  icon: Icon,
  variant = 'outline',
  size = 'md',
  className,
  ...props
}: IconButtonProps) {
  const { box, icon } = sizeMap[size];
  return (
    <button
      type="button"
      className={cn(
        'flex items-center justify-center rounded-full transition-colors',
        box,
        variant === 'outline' && 'border border-border text-ink hover:bg-white/5',
        variant === 'soft' && 'bg-accent-soft text-accent',
        variant === 'filled' && 'bg-accent text-black shadow-fab hover:brightness-105',
        className
      )}
      {...props}
    >
      <Icon size={icon} />
    </button>
  );
}
