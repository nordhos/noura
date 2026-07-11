import { cn } from '@/lib/cn';

interface PinDotsProps {
  length: number;
  filled: number;
  error?: boolean;
}

export function PinDots({ length, filled, error = false }: PinDotsProps) {
  return (
    <div
      className={cn('flex justify-center gap-4', error && 'animate-shake')}
      role="status"
      aria-label={`${filled} dari ${length} digit PIN terisi`}
    >
      {Array.from({ length }).map((_, i) => {
        const isFilled = i < filled;
        return (
          <span
            key={i}
            className={cn(
              'h-3.5 w-3.5 rounded-full border transition-colors',
              error
                ? 'border-red-400 bg-red-400'
                : isFilled
                ? 'border-ink bg-ink'
                : 'border-white/25 bg-transparent'
            )}
          />
        );
      })}
    </div>
  );
}
