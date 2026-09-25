"use client";

import { BottomSheet } from "@/components/ui/BottomSheet";
import { formatIDR } from "@/lib/format-currency";

interface BalanceProfile {
  id: string;
  name: string;
  income: number;
  expense: number;
  return: number;
  transferIn: number;
  transferOut: number;
  balance: number;
}

interface BalanceBreakdownSheetProps {
  open: boolean;
  onClose: () => void;
  profiles: BalanceProfile[];
  totalBalance: number;
}

function BreakdownRow({
  label,
  amount,
  negative = false,
}: {
  label: string;
  amount: number;
  negative?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-zinc-400">
        {label}
      </span>

      <span
        className={`text-sm font-medium ${
          negative
            ? "text-zinc-300"
            : "text-white"
        }`}
      >
        {negative ? "- " : "+ "}
        {formatIDR(Math.abs(amount))}
      </span>
    </div>
  );
}

export function BalanceBreakdownSheet({
  open,
  onClose,
  profiles,
  totalBalance,
}: BalanceBreakdownSheetProps) {
  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title="Rincian Sisa Saldo"
    >
      <div className="space-y-6">

        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4"
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-semibold text-white">
                {profile.name}
              </h3>

              <span className="text-base font-semibold text-accent">
                {formatIDR(profile.balance)}
              </span>
            </div>

            <div className="divide-y divide-zinc-800/80">
              <BreakdownRow
                label="Penghasilan"
                amount={profile.income}
              />

              <BreakdownRow
                label="Pengembalian"
                amount={profile.return}
              />

              <BreakdownRow
                label="Transfer masuk"
                amount={profile.transferIn}
              />

              <BreakdownRow
                label="Transfer keluar"
                amount={profile.transferOut}
                negative
              />

              <BreakdownRow
                label="Pengeluaran"
                amount={profile.expense}
                negative
              />
            </div>

            <div className="mt-3 border-t border-zinc-700 pt-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-zinc-300">
                  Sisa uang
                </span>

                <span className="text-base font-bold text-accent">
                  {formatIDR(profile.balance)}
                </span>
              </div>
            </div>
          </div>
        ))}

        <div className="rounded-2xl border border-accent-dim/40 bg-accent-soft p-4">
          <div className="flex items-center justify-between">
            <span className="font-medium text-ink-muted">
              Total Sisa Saldo
            </span>

            <span className="text-xl font-bold text-accent">
              {formatIDR(totalBalance)}
            </span>
          </div>

          <p className="mt-1 text-xs text-ink-faint">
            Total posisi uang seluruh anggota rumah tangga
          </p>
        </div>

      </div>
    </BottomSheet>
  );
}