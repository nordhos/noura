import { TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { formatIDR, clampPercent } from '@/lib/format-currency';

/**
 * Decorative flowing lines in the card background. This is an approximation
 * of the wave/network motif in the reference screenshot, not a pixel-exact
 * trace of it — treat it as a placeholder for a real illustration asset.
 */
function WaveDecoration() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
      viewBox="0 0 400 160"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={`M0 ${90 + i * 8} C 90 ${20 + i * 10}, 170 ${150 - i * 10}, 260 ${70 + i * 6} S 400 ${40 + i * 8}, 400 ${60 + i * 6}`}
          stroke="url(#wave-gradient)"
          strokeWidth="1"
          fill="none"
        />
      ))}
      <defs>
        <linearGradient id="wave-gradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FF8A1E" stopOpacity="0" />
          <stop offset="60%" stopColor="#FF8A1E" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#FF8A1E" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

interface BalanceCardProps {
  amount: number;
  percentage: number;
}

export function BalanceCard({ amount, percentage }: BalanceCardProps) {
  const pct = clampPercent(percentage);

  return (
    <Card variant="highlight" className="relative overflow-hidden">
      <WaveDecoration />
      <div className="relative flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="mb-2 text-sm text-ink-muted">Sisa Saldo</p>
          <p className="mb-1 truncate font-display text-3xl font-bold text-ink">{formatIDR(amount)}</p>
          <p className="text-sm text-ink-faint">
            <span className="font-medium text-accent">{pct}%</span> dari total penghasilan
          </p>
        </div>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-black/40 text-accent">
          <TrendingUp size={20} />
        </span>
      </div>
    </Card>
  );
}
