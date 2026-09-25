import { TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { formatIDR, clampPercent } from "@/lib/format-currency";

interface BalanceCardProps {
  amount: number;
  percentage: number;
  onClick?: () => void;
}

export function BalanceCard({
  amount,
  percentage,
  onClick,
}: BalanceCardProps) {
  const pct = clampPercent(percentage);

  return (
    <Card
      variant="highlight"
      className="
        group
        relative
        overflow-hidden
        cursor-pointer
        transition-all
        duration-300
        hover:border-[#FF8A1E]/60
        hover:bg-gradient-to-br
        hover:from-[#FF8A1E]/[0.14]
        hover:via-[#FF8A1E]/[0.05]
        hover:to-transparent
        hover:shadow-[0_0_28px_rgba(255,138,30,0.18)]
        active:scale-[0.99]
      "
      onClick={onClick}
    >
      {/* Orange glow */}
      <div
        className="
          pointer-events-none
          absolute
          -right-16
          -top-16
          h-40
          w-40
          rounded-full
          bg-[#FF8A1E]/10
          blur-3xl
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
      />

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

        <span
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-2xl
            bg-black/40
            text-accent
            transition-all
            duration-300
            group-hover:bg-[#FF8A1E]/20
            group-hover:shadow-[0_0_18px_rgba(255,138,30,0.25)]
          "
        >
          <TrendingUp size={20} />
        </span>
      </div>
    </Card>
  );
}