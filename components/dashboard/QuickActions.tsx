import type { QuickAction } from '@/lib/types';
import { QuickActionButton } from './QuickActionButton';

export function QuickActions({ actions }: { actions: QuickAction[] }) {
  return (
    <div className="grid grid-cols-4 gap-3">
      {actions.map((action) => (
        <QuickActionButton key={action.id} icon={action.icon} label={action.label} href={action.href} />
      ))}
    </div>
  );
}
