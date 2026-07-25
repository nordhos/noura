import { supabase } from "@/lib/supabase";

export interface ProfileAmount {
  profileId: string;
  name: string;
  amount: number;
}

export interface MonthlyCashFlow {
  month: number;
  label: string;
  income: number;
  expense: number;
  balance: number;
}

export interface ReportSummary {
  lifetime: {
    balance: number;
  };

  annual: {
    balance: number;

    income: {
      total: number;
      profiles: ProfileAmount[];
    };

    expense: {
      total: number;
      profiles: ProfileAmount[];
    };
  };

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

export async function getReportSummary(
  year: number
): Promise<ReportSummary> {
  const { data: transactions, error } = await supabase
    .from("transactions")
    .select(`
      profile_id,
      amount,
      type,
      month,
      year
    `)
    .order("year", { ascending: true })
    .order("month", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    throw error;
  }

  const { data: profiles, error: profileError } = await supabase
    .from("profiles")
    .select(`
      id,
      name
    `)
    .order("created_at", { ascending: true });

  if (profileError) {
    throw profileError;
  }

  const list = (transactions ?? []) as Transaction[];

  // ============================
  // Lifetime
  // ============================

  let lifetimeIncome = 0;
  let lifetimeExpense = 0;

  // ============================
  // Annual
  // ============================

  let annualIncome = 0;
  let annualExpense = 0;

  const incomeProfileMap = new Map<string, number>();
  const expenseProfileMap = new Map<string, number>();

  const monthlyMap = new Map<number, MonthlyCashFlow>();

  for (const item of list) {
    const amount = Number(item.amount);

    // Lifetime
    if (item.type === "income") {
      lifetimeIncome += amount;
    } else {
      lifetimeExpense += amount;
    }

    // Annual
    if (item.year !== year) {
      continue;
    }

    if (item.type === "income") {
      annualIncome += amount;

      incomeProfileMap.set(
        item.profile_id,
        (incomeProfileMap.get(item.profile_id) ?? 0) + amount
      );
    } else {
      annualExpense += amount;

      expenseProfileMap.set(
        item.profile_id,
        (expenseProfileMap.get(item.profile_id) ?? 0) + amount
      );
    }

    if (!monthlyMap.has(item.month)) {
      monthlyMap.set(item.month, {
        month: item.month,
        label: MONTHS[item.month - 1],
        income: 0,
        expense: 0,
        balance: 0,
      });
    }

    const current = monthlyMap.get(item.month)!;

    if (item.type === "income") {
      current.income += amount;
    } else {
      current.expense += amount;
    }

    current.balance =
      current.income -
      current.expense;
  }

  const incomeProfiles = (profiles ?? []).map((profile) => ({
    profileId: profile.id,
    name: profile.name,
    amount: incomeProfileMap.get(profile.id) ?? 0,
  }));

  const expenseProfiles = (profiles ?? []).map((profile) => ({
    profileId: profile.id,
    name: profile.name,
    amount: expenseProfileMap.get(profile.id) ?? 0,
  }));

  return {
    lifetime: {
      balance:
        lifetimeIncome -
        lifetimeExpense,
    },

    annual: {
      balance:
        annualIncome -
        annualExpense,

      income: {
        total: annualIncome,
        profiles: incomeProfiles,
      },

      expense: {
        total: annualExpense,
        profiles: expenseProfiles,
      },
    },

    monthly: Array.from(
      monthlyMap.values()
    ).sort(
      (a, b) =>
        a.month - b.month
    ),
  };
}