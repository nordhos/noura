"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";

import { Button } from "@/components/ui/Button";
import {
  formatIDRInput,
  parseIDRInput,
} from "@/lib/format-currency";

import { getAppSetting } from "@/services/app-settings.service";
import { createFinancialSystem } from "@/services/financial-system.service";
import { savePin } from "@/services/pin.service";
import { login } from "@/hooks/useAuth";

type Step = 1 | 2 | 3;

export default function FinancialSetupPage() {
  const router = useRouter();

  const [checking, setChecking] = useState(true);
  const [loading, setLoading] = useState(false);

  const [step, setStep] = useState<Step>(1);

  const [primaryName, setPrimaryName] =
    useState("");

  const [hasPartner, setHasPartner] =
    useState(false);

  const [partnerName, setPartnerName] =
    useState("");

  const [primaryBalance, setPrimaryBalance] =
    useState("");

  const [partnerBalance, setPartnerBalance] =
    useState("");

  // ============================
  // PIN
  // ============================

  const [pin, setPin] = useState("");

  const [confirmPin, setConfirmPin] =
    useState("");

  useEffect(() => {
    async function checkSetup() {
      try {
        const appSetting =
          await getAppSetting();

        if (appSetting?.onboarding_completed) {
          login();
          router.replace("/dashboard");
          return;
        }
      } catch (error) {
        console.error(error);
      } finally {
        setChecking(false);
      }
    }

    checkSetup();
  }, [router]);

  const primaryBalanceNumber = Number(
    parseIDRInput(primaryBalance) || "0"
  );

  const partnerBalanceNumber = Number(
    parseIDRInput(partnerBalance) || "0"
  );

  const canContinueProfile = useMemo(() => {
    if (primaryName.trim() === "") {
      return false;
    }

    if (
      hasPartner &&
      partnerName.trim() === ""
    ) {
      return false;
    }

    return true;
  }, [
    primaryName,
    partnerName,
    hasPartner,
  ]);

  const isPinValid = useMemo(() => {
    return /^\d{6}$/.test(pin);
  }, [pin]);

  const isConfirmPinValid = useMemo(() => {
    return (
      pin.length === 6 &&
      pin === confirmPin
    );
  }, [pin, confirmPin]);

  const canSubmit = useMemo(() => {
    if (primaryBalance === "") {
      return false;
    }

    if (
      hasPartner &&
      partnerBalance === ""
    ) {
      return false;
    }

    if (!isPinValid) {
      return false;
    }

    if (!isConfirmPinValid) {
      return false;
    }

    return true;
  }, [
    primaryBalance,
    partnerBalance,
    hasPartner,
    isPinValid,
    isConfirmPinValid,
  ]);

  function handleNext() {
    if (step === 1) {
      setStep(2);
      return;
    }

    if (
      step === 2 &&
      canContinueProfile
    ) {
      setStep(3);
    }
  }

  function handleBack() {
    if (step === 2) {
      setStep(1);
      return;
    }

    if (step === 3) {
      setStep(2);
    }
  }

  async function handleSubmit() {
    if (!canSubmit) return;

    try {
      setLoading(true);

      const profiles = [
        {
          name: primaryName.trim(),
          openingBalance:
            primaryBalanceNumber,
        },
      ];

      if (hasPartner) {
        profiles.push({
          name: partnerName.trim(),
          openingBalance:
            partnerBalanceNumber,
        });
      }

      // =====================================
      // Create Financial System
      // =====================================

      await createFinancialSystem({
        profiles,
      });

      // =====================================
      // Save PIN
      // =====================================
      await savePin(pin);

      /* Auto Login */
      login();

      toast.success("Financial system berhasil dibuat.");

      router.replace("/dashboard");
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(JSON.stringify(error));
      }
    } finally {
      setLoading(false);
    }
  }

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-zinc-500">
          Memuat...
        </p>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-[#000000]">
      <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-6 py-10">
        {step === 1 && (
          <>
            <div className="flex flex-1 flex-col items-center justify-center">
              <Image
                src="/images/nouraopening.png"
                alt="NOURA"
                width={320}
                height={320}
                priority
                className="mb-12"
              />

              <h1 className="text-center text-3xl font-bold leading-tight">
                Selamat Datang di
                <br />
                NOURA 👋🏻
              </h1>

              <p className="mt-6 text-center text-base text-zinc-400">
                Saatnya lihat kondisi keuanganmu<br />lebih jelas
              </p>
            </div>

            <Button onClick={handleNext}>
              Mulai
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="space-y-8">
              <div className="space-y-2">
                <h1 className="text-3xl font-semibold">
                  Profil Pengguna
                </h1>

                <p className="text-zinc-400">
                  Informasi ini akan digunakan untuk
                  mencatat transaksi keuanganmu.
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-zinc-400">
                  Nama
                </label>

                <input
                  type="text"
                  value={primaryName}
                  placeholder="Masukkan namamu"
                  onChange={(e) =>
                    setPrimaryName(e.target.value)
                  }
                  className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm text-zinc-400">
                  Apakah kamu ingin menambahkan partner?
                </label>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant={
                      !hasPartner
                        ? "primary"
                        : "secondary"
                    }
                    onClick={() =>
                      setHasPartner(false)
                    }
                    className="flex-1"
                  >
                    Tidak
                  </Button>

                  <Button
                    type="button"
                    variant={
                      hasPartner
                        ? "primary"
                        : "secondary"
                    }
                    onClick={() =>
                      setHasPartner(true)
                    }
                    className="flex-1"
                  >
                    Ya
                  </Button>
                </div>
              </div>

              {hasPartner && (
                <div className="space-y-2">
                  <label className="text-sm text-zinc-400">
                    Nama Partner
                  </label>

                  <input
                    type="text"
                    value={partnerName}
                    placeholder="Masukkan nama partner"
                    onChange={(e) =>
                      setPartnerName(
                        e.target.value
                      )
                    }
                    className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3"
                  />
                </div>
              )}
            </div>

            <div className="mt-auto flex gap-3 pt-10">
              <Button
                type="button"
                variant="secondary"
                onClick={handleBack}
                className="flex-1"
              >
                Kembali
              </Button>

              <Button
                type="button"
                onClick={handleNext}
                disabled={!canContinueProfile}
                className="flex-1"
              >
                Lanjut
              </Button>
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <div className="space-y-8">
              <div className="space-y-2">
                <h1 className="text-3xl font-semibold">
                  Berapa saldo yang kamu miliki saat ini?
                </h1>

                <p className="text-zinc-400">
                  Saldo ini akan menjadi titik awal
                  pencatatan keuanganmu di NOURA.
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-zinc-400">
                  {primaryName}
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  value={primaryBalance}
                  placeholder="Rp0"
                  onChange={(e) =>
                    setPrimaryBalance(
                      formatIDRInput(e.target.value)
                    )
                  }
                  className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3"
                />
              </div>

              {hasPartner && (
                <div className="space-y-2">
                  <label className="text-sm text-zinc-400">
                    {partnerName}
                  </label>

                  <input
                    type="text"
                    inputMode="numeric"
                    value={partnerBalance}
                    placeholder="Rp0"
                    onChange={(e) =>
                      setPartnerBalance(
                        formatIDRInput(e.target.value)
                      )
                    }
                    className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3"
                  />
                </div>
              )}

              <div className="rounded-2xl bg-zinc-900 p-4 text-sm text-zinc-400">
                Agar pencatatan sesuai kondisi keuanganmu, isi
                sesuai saldo yang kamu miliki saat
                ini.
              </div>

              {/* ========================= */}
              {/* SECURITY */}
              {/* ========================= */}

              <div className="space-y-2 pt-4">
                <h2 className="text-2xl font-semibold">
                  PIN untuk NOURA
                </h2>

                <p className="text-zinc-400">
                  Buat PIN 6 digit untuk membuka NOURA.
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-zinc-400">
                  PIN
                </label>

                <input
                  type="password"
                  inputMode="numeric"
                  maxLength={6}
                  value={pin}
                  placeholder="••••••"
                  onChange={(e) =>
                    setPin(
                      e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 6)
                    )
                  }
                  className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 tracking-[0.5em]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-zinc-400">
                  Konfirmasi PIN
                </label>

                <input
                  type="password"
                  inputMode="numeric"
                  maxLength={6}
                  value={confirmPin}
                  placeholder="••••••"
                  onChange={(e) =>
                    setConfirmPin(
                      e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 6)
                    )
                  }
                  className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 tracking-[0.5em]"
                />
              </div>

              <div className="rounded-2xl bg-zinc-900 p-4 text-sm text-zinc-400 space-y-2">
                <p>
                  • PIN harus terdiri dari
                  6 digit angka.
                </p>

                <p>
                  • PIN dan konfirmasi harus
                  sama.
                </p>

                <p>
                  • Hindari kombinasi yang mudah
                  ditebak seperti 111111,
                  123456, atau tanggal lahir.
                </p>
              </div>
            </div>

            <div className="mt-auto flex gap-3 pt-10">
              <Button
                type="button"
                variant="secondary"
                onClick={handleBack}
                className="flex-1"
              >
                Kembali
              </Button>

              <Button
                type="button"
                disabled={!canSubmit || loading}
                onClick={handleSubmit}
                className="flex-1"
              >
                {loading
                  ? "Menyimpan..."
                  : "Simpan & Masuk"}
              </Button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}