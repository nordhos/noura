import { PiggyBank } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { DotMask } from '@/components/ui/DotMask';
import { RevealToggle } from '@/components/ui/RevealToggle';
import { useReveal } from '@/components/ui/use-reveal';
import { formatIDR } from '@/lib/format-currency';

export function TotalIncomeCard({ amount }: { amount: number }) {
  const { visible, toggle } = useReveal();

  return (
    <Card>
      <div className="mb-4 flex items-center gap-2">
        <span className="text-sm text-ink-muted">Total Penghasilan</span>
        <RevealToggle visible={visible} onToggle={toggle} size={16} />
      </div>

      <div className="flex items-center justify-between">
        {visible ? (
          <span className="font-display text-base font-semibold text-ink">{formatIDR(amount)}</span>
        ) : (
          <DotMask count={11} />
        )}
        
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent">
          <PiggyBank size={20} />
        </span>
      </div>
    </Card>
  );
}
