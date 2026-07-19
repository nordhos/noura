"use client";

import { downloadTransactionReport } from "@/lib/pdf/downloadTransactionReport";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BackButton } from "@/components/ui/BackButton";

import { BottomNav } from "@/components/layout/BottomNav";
import { TransactionItem } from "@/components/dashboard/TransactionItem";

import { navItems } from "@/lib/mock-data";
import { useTransactions } from "@/hooks/useTransactions";
import { useFinanceStore } from "@/stores/useFinanceStore";
import { isAuthenticated } from "@/hooks/useAuth";
import { useProfiles } from "@/hooks/useProfiles";
import { useDashboard } from "@/hooks/useDashboard";

export default function TransactionPage() {
  const router = useRouter();

  const {
    selectedMonth,
    selectedYear,
  } = useFinanceStore();

  const {
    data = [],
    isLoading,
  } = useTransactions(
    selectedYear,
    selectedMonth
  );

  const { data: dashboard } =
    useDashboard();

  const { data: profiles = [] } = useProfiles();


  const periodLabel = new Intl.DateTimeFormat(
    "id-ID",
    {
      month: "long",
      year: "numeric",
    }
  ).format(
    new Date(
      selectedYear,
      selectedMonth - 1
    )
  );

  const totalIncome =
    dashboard?.incomes.total ?? 0;

  const totalExpense =
    dashboard?.expenses.total ?? 0;

  const balance =
    dashboard?.balance.total ?? 0;

  const startingBalance = profiles.reduce(
    (total, profile) => total + profile.savings,
    0
  );

  const transactionCount =
    data.length;

  const pdfTransactions = data.map((item) => ({
    id: item.id,

    date: new Date(
      item.transaction_date
    ).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
    }),

    profile:
      item.profiles?.name ?? "-",

    category:
      item.transaction_categories?.name ??
      "-",

    description:
      item.description ?? "-",

    type: item.type,

    amount: Number(item.amount),
  }));

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/");
    }
  }, [router]);

  return (
    <>
      <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 pt-6 pb-28">

        <div className="mb-6 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <BackButton href="/dashboard" />

            <div>

              <h1 className="text-2xl font-bold">
                Riwayat Transaksi
              </h1>

              <p className="text-sm text-zinc-400">
                {periodLabel}
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              downloadTransactionReport({
                period: periodLabel,
                startingBalance,
                totalIncome,
                totalExpense,
                balance,
                transactionCount,
                transactions: pdfTransactions,
              })
            }
            className="
    rounded-xl
    border
    border-border
    px-3
    py-2
    text-sm
    font-medium
    transition
    hover:bg-white/5
  "
          >
            ⬇ PDF
          </button>

        </div>

        {isLoading && (
          <p>Loading...</p>
        )}

        {!isLoading && data.length === 0 && (
          <p className="text-zinc-400">
            Belum ada transaksi.
          </p>
        )}

        <div className="divide-y divide-border rounded-2xl border border-border bg-card px-4">

          {data.map((item) => (
            <TransactionItem
              id={item.id}
              key={item.id}
              type={item.type}
              category={
                item.transaction_categories?.name ??
                "-"
              }
              profile={
                item.profiles?.name ??
                "-"
              }
              amount={Number(item.amount)}
              date={new Date(
                item.transaction_date
              ).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
              })}
            />
          ))}

        </div>

      </main>

      <BottomNav items={navItems} />
    </>
  );
}