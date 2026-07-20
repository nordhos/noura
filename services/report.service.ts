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

interface AppSetting {
  starting_balance: number | string;
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
  // APP SETTING
  // ======================================

  const {
    data: appSetting,
    error: appSettingError,
  } = await supabase
    .from("app_setting")
    .select("starting_balance")
    .maybeSingle();

  if (appSettingError) {
    throw appSettingError;
  }

  const startingBalance = Number(
    (appSetting as AppSetting | null)?.starting_balance ?? 0
  );

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

  if (transactionError) {
    throw transactionError;
  }

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
    } else {
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

    const current = monthlyMap.get(key)!;

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

  const netCashFlow =
    totalIncome -
    totalExpense;

  const totalBalance =
    startingBalance +
    netCashFlow;

  return {
    startingBalance,

    totalIncome,

    totalExpense,

    totalBalance,

    totalTransaction: list.length,

    netCashFlow,

    monthly: Array.from(
      monthlyMap.values()
    ),
  };
}