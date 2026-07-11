import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';

interface QuickActionButtonProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

export function QuickActionButton({ icon: Icon, label, href }: QuickActionButtonProps) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-surface px-2 py-4 text-center transition-colors hover:bg-white/5"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-accent-dim/60 text-accent">
        <Icon size={20} />
      </span>
      <span className="text-xs leading-tight text-ink-muted">{label}</span>
    </Link>
  );
}
