import { supabase } from "@/lib/supabase";

export interface DashboardSummary {

  incomes: {
    husband: number;
    wife: number;
    total: number;
  };

  expenses: {
    total: number;
    percentage: number;
  };

  balance: {
    total: number;
    percentage: number;
  };
}

interface Profile {
  id: string;
  role: "husband" | "wife";
}

interface Transaction {
  profile_id: string;
  amount: number | string;
  type: "income" | "expense";
}

export async function getDashboardSummary(
  year: number,
  month: number
): Promise<DashboardSummary> {
  const {
    data: profiles,
    error: profileError,
  } = await supabase
    .from("profiles")
    .select("id, role");

  if (profileError) {
    console.error("PROFILE ERROR:", profileError);
    throw profileError;
  }

  const profileList =
    (profiles ?? []) as Profile[];

  const husband =
    profileList.find(
      (profile) =>
        profile.role === "husband"
    );

  const wife =
    profileList.find(
      (profile) =>
        profile.role === "wife"
    );

  const {
    data: transactions,
    error: transactionError,
  } = await supabase
    .from("transactions")
    .select(`
      profile_id,
      amount,
      type
    `)
    .eq("year", year)
    .eq("month", month);

  if (transactionError) {
    console.error("TRANSACTION ERROR:", transactionError);
    throw transactionError;
  }

  const transactionList =
    (transactions ?? []) as Transaction[];

  const husbandIncome =
    transactionList
      .filter(
        (transaction) =>
          transaction.type ===
          "income" &&
          transaction.profile_id ===
          husband?.id
      )
      .reduce(
        (total, transaction) =>
          total +
          Number(transaction.amount),
        0
      );

  const wifeIncome =
    transactionList
      .filter(
        (transaction) =>
          transaction.type ===
          "income" &&
          transaction.profile_id ===
          wife?.id
      )
      .reduce(
        (total, transaction) =>
          total +
          Number(transaction.amount),
        0
      );

  const totalExpense =
    transactionList
      .filter(
        (transaction) =>
          transaction.type ===
          "expense"
      )
      .reduce(
        (total, transaction) =>
          total +
          Number(transaction.amount),
        0
      );

  const totalIncome =
    husbandIncome +
    wifeIncome;

  const monthlyBalance =
    totalIncome -
    totalExpense;

  return {

    incomes: {
      husband: husbandIncome,
      wife: wifeIncome,
      total: totalIncome,
    },

    expenses: {
      total: totalExpense,
      percentage:
        totalIncome === 0
          ? 0
          : Math.round(
            (totalExpense / totalIncome) *
            100
          ),
    },

    balance: {
      total: monthlyBalance,
      percentage:
        totalIncome === 0
          ? 0
          : Math.round(
            (monthlyBalance / totalIncome) * 100
          ),
    }
  };
}