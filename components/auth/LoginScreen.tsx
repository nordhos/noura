'use client';

import { useCallback, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginHeader } from './LoginHeader';
import { PinDots } from './PinDots';
import { Keypad } from './Keypad';
import { FingerprintButton } from './FingerprintButton';
import { usePinInput } from './use-pin-input';
import { mockUser, checkPin } from '@/lib/mock-user';

const PIN_LENGTH = 6;

export function LoginScreen() {
  const router = useRouter();
  const [status, setStatus] = useState<'idle' | 'checking' | 'error'>('idle');
  const resetRef = useRef<() => void>(() => {});

  const handleComplete = useCallback(
    async (pin: string) => {
      setStatus('checking');
      const ok = await checkPin(pin);
      if (ok) {
        router.push('/dashboard');
        return;
      }
      setStatus('error');
      // Clear the wrong attempt after the shake plays so the user can retry.
      setTimeout(() => {
        resetRef.current();
        setStatus('idle');
      }, 500);
    },
    [router]
  );

  const { digits, press, backspace, reset } = usePinInput({
    length: PIN_LENGTH,
    onComplete: handleComplete,
  });
  resetRef.current = reset;

  const handleFingerprint = () => {
    // Demo shortcut — see FingerprintButton for what real biometric wiring looks like.
    router.push('/dashboard');
  };

  return (
    <main className="flex min-h-screen flex-1 flex-col justify-between px-6 py-16">
      <div className="flex flex-1 flex-col items-center justify-center gap-10">
        <LoginHeader userName={mockUser.name} />

        <div className="flex flex-col items-center gap-6">
          <p className="text-xs font-medium tracking-[0.2em] text-ink-faint">MASUKKAN PIN</p>
          <PinDots length={PIN_LENGTH} filled={digits.length} error={status === 'error'} />
          {status === 'error' && <p className="-mt-3 text-sm text-red-400">PIN salah, coba lagi</p>}
        </div>

        <Keypad onDigit={press} onBackspace={backspace} disabled={status !== 'idle'} />
      </div>

      <FingerprintButton onPress={handleFingerprint} disabled={status !== 'idle'} />
    </main>
  );
}
