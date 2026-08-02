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

  useEffect(() => {
    async function checkSetup() {
      try {
        const appSetting =
          await getAppSetting();

        if (
          appSetting?.onboarding_completed
        ) {
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

    return true;
  }, [
    primaryBalance,
    partnerBalance,
    hasPartner,
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

      await createFinancialSystem({
        profiles,
      });

      toast.success(
        "Selamat datang di NOURA!"
      );

      router.replace("/dashboard");
    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan."
      );
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
            NOURA
          </h1>

          <p className="mt-6 text-center text-base text-zinc-400">
            Mari siapkan sistem keuangan Anda.
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
              Siapa nama Anda?
            </h1>

            <p className="text-zinc-400">
              Informasi ini akan digunakan untuk
              mencatat transaksi keuangan Anda.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-zinc-400">
              Nama Anda
            </label>

            <input
              type="text"
              value={primaryName}
              placeholder="Masukkan nama"
              onChange={(e) =>
                setPrimaryName(e.target.value)
              }
              className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3"
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm text-zinc-400">
              Apakah Anda ingin menambahkan partner?
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
              Berapa saldo yang Anda miliki saat ini?
            </h1>

            <p className="text-zinc-400">
              Saldo ini akan menjadi titik awal pencatatan keuangan Anda di NOURA.
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
            Agar pencatatan presisi, isi nilai sesuai saldo yang kamu miliki.
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
              ? "Menyiapkan..."
              : "Mulai"}
          </Button>
        </div>
      </>
    )}

  </main>
);
}
