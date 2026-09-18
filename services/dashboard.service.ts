import { supabase } from "@/lib/supabase";

export interface DashboardProfile {
  id: string;
  name: string;
  income: number;
  expense: number;
}

export interface DashboardSummary {
  profiles: DashboardProfile[];

  incomes: {
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
  name: string;
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
    .select("id,name")
    .order("created_at", {
      ascending: true,
    });

  if (profileError) {
    throw profileError;
  }

  const profileList =
    (profiles ?? []) as Profile[];

  const startDate = new Date(
    year,
    month - 1,
    1
  )
    .toISOString()
    .split("T")[0];

  const endDate = new Date(
    year,
    month,
    0
  )
    .toISOString()
    .split("T")[0];

  const {
    data: transactions,
    error: transactionError,
  } = await supabase
    .from("transactions")
    .select(`
      profile_id,
      amount,
      type,
      transaction_date
    `)
    .gte("transaction_date", startDate)
    .lte("transaction_date", endDate);

  if (transactionError) {
    throw transactionError;
  }

  const transactionList =
    (transactions ?? []) as Transaction[];

  const profilesSummary =
    profileList.map((profile) => {
      const income =
        transactionList
          .filter(
            (transaction) =>
              transaction.type === "income" &&
              transaction.profile_id ===
                profile.id
          )
          .reduce(
            (total, transaction) =>
              total +
              Number(transaction.amount),
            0
          );

      const expense =
        transactionList
          .filter(
            (transaction) =>
              transaction.type === "expense" &&
              transaction.profile_id ===
                profile.id
          )
          .reduce(
            (total, transaction) =>
              total +
              Number(transaction.amount),
            0
          );

      return {
        id: profile.id,
        name: profile.name,
        income,
        expense,
      };
    });

  const totalIncome =
    profilesSummary.reduce(
      (total, profile) =>
        total + profile.income,
      0
    );

  const totalExpense =
    profilesSummary.reduce(
      (total, profile) =>
        total + profile.expense,
      0
    );

  const balance =
    totalIncome - totalExpense;

  return {
    profiles: profilesSummary,

    incomes: {
      total: totalIncome,
    },

    expenses: {
      total: totalExpense,
      percentage:
        totalIncome === 0
          ? 0
          : Math.round(
              (totalExpense /
                totalIncome) *
                100
            ),
    },

    balance: {
      total: balance,
      percentage:
        totalIncome === 0
          ? 0
          : Math.round(
              (balance /
                totalIncome) *
                100
            ),
    },
  };
}