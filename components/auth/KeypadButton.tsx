import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface KeypadButtonProps {
  onPress: () => void;
  children: ReactNode;
  'aria-label': string;
  variant?: 'digit' | 'action' | 'ghost';
}

export function KeypadButton({ onPress, children, variant = 'digit', ...props }: KeypadButtonProps) {
  if (variant === 'ghost') {
    // Empty bottom-left cell — keeps the 3-column grid aligned without a visible key.
    return <div aria-hidden="true" />;
  }

  return (
    <button
      type="button"
      onClick={onPress}
      className={cn(
        'flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border font-display text-2xl transition-colors active:bg-white/10',
        variant === 'digit' && 'border-white/15 text-ink',
        variant === 'action' && 'border-accent-dim text-accent'
      )}
      {...props}
    >
      {children}
    </button>
  );
}
