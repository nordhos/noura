import { Logomark } from '@/components/ui/Logomark';

interface LoginHeaderProps {
  userName: string;
}

export function LoginHeader({ userName }: LoginHeaderProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <p className="mb-3 max-w-[16rem] text-base text-ink-muted">
        Welcome to
      </p>

      <div className="mb-1 flex items-center gap-2">
        <Logomark size={44} />
        <span className="font-display text-3xl font-bold tracking-wide text-ink">
          NOURA
        </span>
      </div>

      <p className="font-medium text-accent">
        Your Financial Clarity System
      </p>
    </div>
  );
}
