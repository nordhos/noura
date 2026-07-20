"use client";

import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { LoginHeader } from "./LoginHeader";
import { PinDots } from "./PinDots";
import { Keypad } from "./Keypad";
import { usePinInput } from "./use-pin-input";
import { mockUser, checkPin } from "@/lib/mock-user";
import { login } from "@/hooks/useAuth";
import { getAppSetting } from "@/services/app-settings.service";

const PIN_LENGTH = 6;

export function LoginScreen() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "checking" | "error">("idle");
  const resetRef = useRef<() => void>(() => {});

  const handleComplete = useCallback(
    async (pin: string) => {
      setStatus("checking");

      const ok = await checkPin(pin);

      if (ok) {
        login();

        try {
          const appSetting = await getAppSetting();

          if (!appSetting) {
            router.replace("/financial-setup");
            return;
          }

          router.replace("/dashboard");
          return;
        } catch (error) {
          console.error(error);
          setStatus("error");

          setTimeout(() => {
            resetRef.current();
            setStatus("idle");
          }, 500);

          return;
        }
      }

      setStatus("error");

      setTimeout(() => {
        resetRef.current();
        setStatus("idle");
      }, 500);
    },
    [router]
  );

  const { digits, press, backspace, reset } = usePinInput({
    length: PIN_LENGTH,
    onComplete: handleComplete,
  });

  resetRef.current = reset;

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="flex w-full max-w-sm flex-col items-center">
        <LoginHeader userName={mockUser.name} />

        <div className="mt-14 flex flex-col items-center gap-6">
          <p className="text-xs font-medium tracking-[0.2em] text-ink-faint">
            MASUKKAN PIN
          </p>

          <PinDots
            length={PIN_LENGTH}
            filled={digits.length}
            error={status === "error"}
          />

          {status === "error" && (
            <p className="-mt-3 text-sm text-red-400">
              PIN salah, coba lagi
            </p>
          )}
        </div>

        <div className="mt-10">
          <Keypad
            onDigit={press}
            onBackspace={backspace}
            disabled={status !== "idle"}
          />
        </div>
      </div>
    </main>
  );
}