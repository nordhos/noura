import { clampPercent } from '@/lib/format-currency';

interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  /** Text shown in the center, defaults to "{value}%" */
  label?: string;
}

export function CircularProgress({ value, size = 100, strokeWidth = 11, label }: CircularProgressProps) {
  const pct = clampPercent(value);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="stroke-white/10"
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="stroke-accent transition-[stroke-dashoffset] duration-700 ease-out"
          fill="none"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-display text-lg font-bold text-ink">
        {label ?? `${pct}%`}
      </span>
    </div>
  );
}
