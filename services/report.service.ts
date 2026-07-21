import { supabase } from "@/lib/supabase";

export interface MonthlyCashFlow {
  month: number;
  label: string;
  income: number;
  expense: number;
  balance: number;
}

export interface ReportSummary {
  startingBalance: number;

  totalIncome: number;

  totalExpense: number;

  totalBalance: number;

  totalTransaction: number;

  netCashFlow: number;

  monthly: MonthlyCashFlow[];
}

interface Transaction {
  profile_id: string;
  amount: number | string;
  type: "income" | "expense";
  month: number;
  year: number;
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

export async function getReportSummary(): Promise<ReportSummary> {

  // ======================================
  // TRANSACTION DATA
  // ======================================

  const {
    data: transactions,
    error: transactionError,
  } = await supabase
    .from("transactions")
    .select(`
      profile_id,
      amount,
      type,
      month,
      year
    `)
    .order("year", {
      ascending: true,
    })
    .order("month", {
      ascending: true,
    })
    .order("created_at", {
      ascending: true,
    });

  if (transactionError)
    throw transactionError;

  const list =
    (transactions ?? []) as Transaction[];

  // ======================================
  // TRANSACTION SUMMARY
  // ======================================

  let totalIncome = 0;

  let totalExpense = 0;

  const monthlyMap = new Map<
    string,
    MonthlyCashFlow
  >();

  for (const item of list) {
    const amount = Number(item.amount);

    if (item.type === "income") {
      totalIncome += amount;
    }

    if (item.type === "expense") {
      totalExpense += amount;
    }

    const key = `${item.year}-${item.month}`;

    if (!monthlyMap.has(key)) {
      monthlyMap.set(key, {
        month: item.month,
        label: `${MONTHS[item.month - 1]} ${item.year}`,
        income: 0,
        expense: 0,
        balance: 0,
      });
    }

    const current =
      monthlyMap.get(key)!;

    if (item.type === "income") {
      current.income += amount;
    } else {
      current.expense += amount;
    }

    current.balance =
      current.income -
      current.expense;
  }

  // ======================================
  // LIFETIME SUMMARY
  // ======================================

  // Total Income berasal murni dari transaksi.
  // Salary pada tabel profiles hanya digunakan
  // sebagai konfigurasi Auto Salary.

  const netCashFlow =
    totalIncome - totalExpense;

  const totalBalance =
    netCashFlow;

  // TODO Sprint 2.2
  // startingBalance akan dihapus setelah onboarding
  // membuat transaksi kategori "Saldo Awal".

  return {
    startingBalance: 0,

    totalIncome,

    totalExpense,

    totalBalance,

    totalTransaction:
      list.length,

    netCashFlow,

    monthly: Array.from(
      monthlyMap.values()
    ),
  };
}