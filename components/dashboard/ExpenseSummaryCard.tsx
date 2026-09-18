import { Card } from "@/components/ui/Card";
import { CircularProgress } from "@/components/ui/CircularProgress";
import { formatIDR, clampPercent } from "@/lib/format-currency";

interface ExpenseProfile {
  id: string;
  name: string;
  expense: number;
}

interface ExpenseSummaryCardProps {
  amount: number;
  percentage: number;
  profiles: ExpenseProfile[];
}

export function ExpenseSummaryCard({
  amount,
  percentage,
  profiles,
}: ExpenseSummaryCardProps) {
  const pct = clampPercent(percentage);

  return (
    <Card className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-10">
      <div className="min-w-0">
        <p className="mb-2 text-sm text-ink-muted">
          Total Pengeluaran
        </p>

        <p className="truncate font-display text-3xl font-bold text-ink">
          {formatIDR(amount)}
        </p>

        <div className="mt-5 border-t border-border pt-4">
          <div className="space-y-3">
            {profiles.map((profile) => (
              <div
                key={profile.id}
                className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4"
              >
                <span className="whitespace-nowrap text-sm text-ink-muted">
                  {profile.name}
                </span>

                <span className="min-w-0 truncate text-right font-medium">
                  {formatIDR(profile.expense)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CircularProgress value={pct} />
    </Card>
  );
}