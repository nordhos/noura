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

export async function getDashboardSummary(): Promise<DashboardSummary> {
  const now = new Date();

  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  // ==========================
  // PROFILES
  // ==========================

  const { data: profiles, error: profileError } =
    await supabase
      .from("profiles")
      .select("*");

  if (profileError) throw profileError;

  const husband =
    profiles?.find(
      (item) => item.role === "husband"
    );

  const wife =
    profiles?.find(
      (item) => item.role === "wife"
    );

  const husbandSalary =
    Number(husband?.salary ?? 0);

  const wifeSalary =
    Number(wife?.salary ?? 0);

  const totalIncome =
    husbandSalary + wifeSalary;

  // ==========================
  // TRANSACTIONS
  // ==========================

  const {
    data: transactions,
    error: transactionError,
  } = await supabase
    .from("transactions")
    .select("amount,type")
    .eq("year", year)
    .eq("month", month);

  if (transactionError) {
    throw transactionError;
  }

  const totalExpense =
    transactions
      ?.filter(
        (item) => item.type === "expense"
      )
      .reduce(
        (sum, item) =>
          sum + Number(item.amount),
        0
      ) ?? 0;

  const balance =
    totalIncome - totalExpense;

  return {
    incomes: {
      husband: husbandSalary,
      wife: wifeSalary,
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