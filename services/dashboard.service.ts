import { supabase } from "@/lib/supabase";

export interface DashboardProfile {
  id: string;
  name: string;
  income: number;
  expense: number;
  return: number;
  transferIn: number;
  transferOut: number;
  balance: number;
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

  returns: {
    total: number;
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
  profile_id: string | null;
  from_profile_id: string | null;
  to_profile_id: string | null;
  amount: number | string;
  type: "income" | "expense" | "transfer" | "return";
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
      from_profile_id,
      to_profile_id,
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

      const returnAmount =
        transactionList
          .filter(
            (transaction) =>
              transaction.type === "return" &&
              transaction.profile_id ===
                profile.id
          )
          .reduce(
            (total, transaction) =>
              total +
              Number(transaction.amount),
            0
          );

      const transferIn =
        transactionList
          .filter(
            (transaction) =>
              transaction.type === "transfer" &&
              transaction.to_profile_id ===
                profile.id
          )
          .reduce(
            (total, transaction) =>
              total +
              Number(transaction.amount),
            0
          );

      const transferOut =
        transactionList
          .filter(
            (transaction) =>
              transaction.type === "transfer" &&
              transaction.from_profile_id ===
                profile.id
          )
          .reduce(
            (total, transaction) =>
              total +
              Number(transaction.amount),
            0
          );

      const balance =
        income +
        returnAmount +
        transferIn -
        expense -
        transferOut;

      return {
        id: profile.id,
        name: profile.name,
        income,
        expense,
        return: returnAmount,
        transferIn,
        transferOut,
        balance,
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

  const totalReturn =
    profilesSummary.reduce(
      (total, profile) =>
        total + profile.return,
      0
    );

  /*
   * Transfer adalah perpindahan uang
   * di dalam rumah tangga.
   *
   * Karena itu transfer tidak mengubah
   * saldo rumah tangga secara keseluruhan.
   */
  const balance =
    totalIncome +
    totalReturn -
    totalExpense;

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

    returns: {
      total: totalReturn,
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