"use client";

import { useState } from "react";
import { Wallet, Users } from "lucide-react";

import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { MonthSelector } from "@/components/dashboard/MonthSelector";
import { IncomeCard } from "@/components/dashboard/IncomeCard";
import { TotalIncomeCard } from "@/components/dashboard/TotalIncomeCard";
import { ExpenseSummaryCard } from "@/components/dashboard/ExpenseSummaryCard";
import { BalanceCard } from "@/components/dashboard/BalanceCard";
import { BottomNav } from "@/components/layout/BottomNav";
import RecentTransactions from "@/components/dashboard/RecentTransactions";

import {
  monthOptions,
  navItems,
} from "@/lib/mock-data";

import { useDashboard } from "@/hooks/useDashboard";

export default function DashboardPage() {
  const { data, isLoading, error } = useDashboard();

  const [month, setMonth] = useState(
    monthOptions[monthOptions.length - 1]
  );

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Gagal mengambil data dashboard.
      </div>
    );
  }

  const husbandProgress =
    data.incomes.total === 0
      ? 0
      : Math.round(
          (data.incomes.husband / data.incomes.total) * 100
        );

  const wifeProgress =
    data.incomes.total === 0
      ? 0
      : Math.round(
          (data.incomes.wife / data.incomes.total) * 100
        );

  return (
    <>
      <main className="mx-auto w-full max-w-md space-y-6 px-5 pb-28 pt-6">

        <DashboardHeader />

        <MonthSelector
          value={month}
          options={monthOptions}
          onChange={setMonth}
        />

        <div className="grid grid-cols-2 gap-4">

          <IncomeCard
            label="Penghasilan Suami"
            icon={Wallet}
            amount={data.incomes.husband}
            progress={husbandProgress}
          />

          <IncomeCard
            label="Penghasilan Istri"
            icon={Users}
            amount={data.incomes.wife}
            progress={wifeProgress}
          />

        </div>

        <TotalIncomeCard
          amount={data.incomes.total}
        />

        <ExpenseSummaryCard
          amount={data.expenses.total}
          percentage={data.expenses.percentage}
        />

        <BalanceCard
          amount={data.balance.total}
          percentage={data.balance.percentage}
        />
        <RecentTransactions />

      </main>

      <BottomNav items={navItems} />
    </>
  );
}