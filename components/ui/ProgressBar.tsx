import { clampPercent } from '@/lib/format-currency';

interface ProgressBarProps {
  value: number;
  className?: string;
}

export function ProgressBar({ value }: ProgressBarProps) {
  const pct = clampPercent(value);
  return (
    <div
      className="h-1.5 w-full overflow-hidden rounded-pill bg-white/10"
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full rounded-pill bg-accent transition-[width] duration-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
