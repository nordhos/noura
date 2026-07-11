'use client';

import { Eye, EyeOff } from 'lucide-react';

interface RevealToggleProps {
  visible: boolean;
  onToggle: () => void;
  size?: number;
}

export function RevealToggle({ visible, onToggle, size = 18 }: RevealToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={visible}
      aria-label={visible ? 'Sembunyikan nominal' : 'Tampilkan nominal'}
      className="shrink-0 text-ink-faint transition-colors hover:text-ink"
    >
      {visible ? <Eye size={size} /> : <EyeOff size={size} />}
    </button>
  );
}
