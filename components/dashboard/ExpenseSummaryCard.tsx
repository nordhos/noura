import { Card } from '@/components/ui/Card';
import { CircularProgress } from '@/components/ui/CircularProgress';
import { formatIDR, clampPercent } from '@/lib/format-currency';

interface ExpenseSummaryCardProps {
  amount: number;
  /** Percentage of total income this expense represents (drives the ring) */
  percentage: number;
}

export function ExpenseSummaryCard({ amount, percentage }: ExpenseSummaryCardProps) {
  const pct = clampPercent(percentage);

  return (
    <Card className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="mb-2 text-sm text-ink-muted">Total Pengeluaran</p>
        <p className="mb-1 truncate font-display text-3xl font-bold text-ink">{formatIDR(amount)}</p>
        <p className="text-sm text-ink-faint">
          <span className="font-medium text-accent">{pct}%</span> dari total penghasilan
        </p>
      </div>
      <CircularProgress value={pct} />
    </Card>
  );
}
