'use client';

import { useCallback, useState } from 'react';

interface UsePinInputOptions {
  length?: number;
  onComplete: (pin: string) => void;
}

export function usePinInput({ length = 6, onComplete }: UsePinInputOptions) {
  const [digits, setDigits] = useState<string[]>([]);

  const press = useCallback(
    (digit: string) => {
      setDigits((prev) => {
        if (prev.length >= length) return prev;
        const next = [...prev, digit];
        if (next.length === length) {
          // Defer so the 6th dot actually paints before validation runs.
          setTimeout(() => onComplete(next.join('')), 120);
        }
        return next;
      });
    },
    [length, onComplete]
  );

  const backspace = useCallback(() => {
    setDigits((prev) => prev.slice(0, -1));
  }, []);

  const reset = useCallback(() => setDigits([]), []);

  return { digits, press, backspace, reset };
}
