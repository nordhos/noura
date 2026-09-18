import { TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { formatIDR, clampPercent } from "@/lib/format-currency";

interface BalanceCardProps {
  amount: number;
  percentage: number;
}

export function BalanceCard({
  amount,
  percentage,
}: BalanceCardProps) {
  const pct = clampPercent(percentage);

  return (
    <Card variant="highlight" className="relative overflow-hidden">
      <div className="relative flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="mb-2 text-sm text-ink-muted">
            Sisa Saldo
          </p>

          <p className="mb-1 truncate font-display text-3xl font-bold text-ink">
            {formatIDR(amount)}
          </p>

          <p className="text-sm text-ink-faint">
            <span className="font-medium text-accent">
              {pct}%
            </span>{" "}
            dari total penghasilan
          </p>
        </div>

        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-black/40 text-accent">
          <TrendingUp size={20} />
        </span>
      </div>
    </Card>
  );
}