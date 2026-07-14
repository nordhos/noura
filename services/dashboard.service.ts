import { supabase } from "@/lib/supabase";

export interface DashboardSummary {
  startingBalance: {
    husband: number;
    wife: number;
    total: number;
  };

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
  salary: number | string;
  savings: number | string;
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
    .select("id, role, salary, savings");

  if (profileError) {
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

  const husbandSalary =
    Number(husband?.salary ?? 0);

  const wifeSalary =
    Number(wife?.salary ?? 0);

  const husbandSavings =
    Number(husband?.savings ?? 0);

  const wifeSavings =
    Number(wife?.savings ?? 0);

  const totalSavings =
    husbandSavings + wifeSavings;

  const startingBalance =
    totalSavings;

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

  const husbandTotal =
    husbandSalary +
    husbandIncome;

  const wifeTotal =
    wifeSalary +
    wifeIncome;

  const totalIncome =
    husbandTotal +
    wifeTotal;

  const balance =
    totalSavings +
    totalIncome -
    totalExpense;

    return {
      startingBalance: {
        husband: husbandSavings,
        wife: wifeSavings,
        total: startingBalance,
      },
    
      incomes: {
        husband: husbandTotal,
        wife: wifeTotal,
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
        total: balance,
        percentage:
          totalIncome === 0
            ? 0
            : Math.round(
                (balance / totalIncome) *
                  100
              ),
      },
    };
}