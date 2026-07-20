"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/Button";
import {
  formatIDRInput,
  parseIDRInput,
} from "@/lib/format-currency";
import { saveAppSetting } from "@/services/app-settings.service";

function todayString() {
  return new Date().toISOString().split("T")[0];
}

function minDateString() {
  const date = new Date();
  date.setDate(date.getDate() - 30);
  return date.toISOString().split("T")[0];
}

export default function FinancialSetupPage() {
  const router = useRouter();

  const [date, setDate] = useState(todayString());
  const [balance, setBalance] = useState("");
  const [loading, setLoading] = useState(false);

  const isDateValid = useMemo(() => {
    return (
      date >= minDateString() &&
      date <= todayString()
    );
  }, [date]);

  const balanceNumber = Number(parseIDRInput(balance) || "0");

  const isBalanceValid = balance !== "";

  const canSubmit =
    isDateValid &&
    isBalanceValid &&
    !loading;

  async function handleSubmit() {
    if (!canSubmit) return;

    try {
      setLoading(true);

      await saveAppSetting({
        financialStartDate: date,
        startingBalance: balanceNumber,
      });

      toast.success(
        "Pengaturan keuangan berhasil disimpan."
      );

      router.replace("/dashboard");
    } catch (error) {
      console.error(error);

      toast.error(
        "Terjadi kesalahan saat menyimpan data."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-6 py-10">

      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">
          Selamat Datang di NOURA
        </h1>

        <p className="text-zinc-400">
          Mari siapkan sistem keuangan Anda.
        </p>
      </div>

      <div className="mt-10 space-y-6">

        <div className="space-y-2">
          <label className="text-sm text-zinc-400">
            Tanggal Mulai Pencatatan
          </label>

          <input
            type="date"
            value={date}
            min={minDateString()}
            max={todayString()}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3"
          />

          <p className="text-xs text-zinc-500">
            Tanggal mulai pencatatan hanya dapat ditentukan saat pertama kali menggunakan NOURA.
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-zinc-400">
            Saldo Saat Ini
          </label>

          <input
            type="text"
            inputMode="numeric"
            value={balance}
            placeholder="Rp0"
            onChange={(e) =>
              setBalance(
                formatIDRInput(e.target.value)
              )
            }
            className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3"
          />
        </div>

      </div>

      <div className="mt-8 rounded-2xl bg-zinc-900 p-4 text-sm text-zinc-400">
        Masukkan saldo yang Anda miliki saat ini.
        <br />
        <br />
        NOURA akan mulai mencatat seluruh transaksi setelah tanggal yang Anda pilih.
      </div>

      <div className="mt-auto pt-10">
        <Button
          disabled={!canSubmit}
          onClick={handleSubmit}
        >
          {loading
            ? "Menyimpan..."
            : "Mulai Menggunakan NOURA"}
        </Button>
      </div>

    </main>
  );
}