import { cn } from '@/lib/cn';

interface DotMaskProps {
  count?: number;
  className?: string;
}

/** Row of filled dots standing in for a hidden currency value. */
export function DotMask({ count = 10, className }: DotMaskProps) {
  return (
    <span
      className={cn('flex items-center gap-1.5', className)}
      role="img"
      aria-label="Nilai disembunyikan"
    >
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="h-1.5 w-1.5 rounded-full bg-ink" />
      ))}
    </span>
  );
}
