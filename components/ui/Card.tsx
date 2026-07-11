import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'highlight';
}

/**
 * Rounded dark panel used for every card on the dashboard (income, totals,
 * expense summary, balance). `variant="highlight"` adds the warm
 * accent-tinted background used by the Sisa Saldo card.
 */
export function Card({ variant = 'default', className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-card border p-5',
        variant === 'default' && 'border-border bg-surface',
        variant === 'highlight' &&
          'border-accent-dim/40 bg-gradient-to-br from-surface-raised via-surface to-accent-soft',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
