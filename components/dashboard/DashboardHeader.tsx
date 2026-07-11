import { Settings } from 'lucide-react';
import { IconButton } from '@/components/ui/IconButton';
import { Logomark } from '@/components/ui/Logomark';

export function DashboardHeader() {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Logomark size={30} />
        <div className="leading-tight">
          <h1 className="font-display text-xl font-bold tracking-wide text-ink">NOURA</h1>
          <p className="text-xs text-ink-faint">Personal Finance System</p>
        </div>
      </div>
      <IconButton icon={Settings} aria-label="Pengaturan" variant="outline" />
    </header>
  );
}
