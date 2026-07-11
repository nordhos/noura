import { Logomark } from '@/components/ui/Logomark';

interface LoginHeaderProps {
  userName: string;
}

export function LoginHeader({ userName }: LoginHeaderProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4 flex items-center gap-2">
        <Logomark size={44} />
        <span className="font-display text-3xl font-bold tracking-wide text-ink">NOURA</span>
      </div>
      <p className="max-w-[16rem] text-base text-ink-muted">
        The Personal Finance System for <span className="font-medium text-accent">{userName}</span>
      </p>
    </div>
  );
}
