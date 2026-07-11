import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

interface NavItemProps {
  href: string;
  label: string;
  icon: LucideIcon;
  active: boolean;
}

export function NavItem({ href, label, icon: Icon, active }: NavItemProps) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className="flex flex-col items-center gap-1"
    >
      <Icon size={22} className={active ? 'text-accent' : 'text-ink-faint'} />
      <span className={cn('text-[11px]', active ? 'text-accent' : 'text-ink-faint')}>{label}</span>
    </Link>
  );
}
