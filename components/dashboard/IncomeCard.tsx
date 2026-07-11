import { Card } from "@/components/ui/Card";
import { DotMask } from "@/components/ui/DotMask";
import { RevealToggle } from "@/components/ui/RevealToggle";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useReveal } from "@/components/ui/use-reveal";
import { formatIDR } from "@/lib/format-currency";

interface IncomeCardProps {
  label: string;
  amount: number;
  progress: number;
}

export function IncomeCard({
  label,
  amount,
  progress,
}: IncomeCardProps) {
  const { visible, toggle } = useReveal();

  return (
    <Card className="min-w-0 flex-1">
      <div className="mb-4 flex items-center justify-between">
        <span className="truncate text-sm text-ink-muted">
          {label}
        </span>

        <RevealToggle
          visible={visible}
          onToggle={toggle}
        />
      </div>

      <div className="mb-4">
        {visible ? (
          <span className="block truncate font-display text-base font-semibold text-ink">
            {formatIDR(amount)}
          </span>
        ) : (
          <DotMask count={9} />
        )}
      </div>

      <ProgressBar value={progress} />
    </Card>
  );
}