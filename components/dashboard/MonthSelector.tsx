'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';

interface MonthSelectorProps {
  value: string;
  options: string[];
  onChange: (month: string) => void;
}

export function MonthSelector({ value, options, onChange }: MonthSelectorProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click — a static screenshot can't confirm this
  // behavior, but it's the standard expectation for a dropdown like this.
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex items-center gap-1.5 text-lg text-ink"
      >
        {value}
        <ChevronDown size={18} className={cn('text-ink-faint transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <ul className="absolute left-0 z-10 mt-2 w-40 overflow-hidden rounded-2xl border border-border bg-surface-raised py-1 shadow-xl">
          {options.map((opt) => (
            <li key={opt}>
              <button
                type="button"
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={cn(
                  'block w-full px-4 py-2 text-left text-sm hover:bg-white/5',
                  opt === value ? 'text-accent' : 'text-ink'
                )}
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
