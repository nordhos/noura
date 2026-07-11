import { supabase } from "@/lib/supabase";

export interface DashboardSummary {
  month: {
    id: string;
    year: number;
    month: number;
    label: string;
  };

  incomes: {
    husband: {
      main: number;
      extra: number;
      total: number;
    };

    wife: {
      main: number;
      extra: number;
      total: number;
    };

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

  const { data: month, error: monthError } = await supabase
    .from("months")
    .select("*")
    .eq("year", now.getFullYear())
    .eq("month", now.getMonth() + 1)
    .single();

  if (monthError) throw monthError;

  const { data: expenses, error: expenseError } = await supabase
    .from("expenses")
    .select("amount")
    .eq("month_id", month.id);

  if (expenseError) throw expenseError;

  const husbandMain = Number(month.husband_main);
  const husbandExtra = Number(month.husband_extra);

  const wifeMain = Number(month.wife_main);
  const wifeExtra = Number(month.wife_extra);

  const husbandTotal = husbandMain + husbandExtra;
  const wifeTotal = wifeMain + wifeExtra;

  const totalIncome = husbandTotal + wifeTotal;

  const totalExpense =
    expenses?.reduce((sum, item) => sum + Number(item.amount), 0) ?? 0;

  const balance = totalIncome - totalExpense;

  return {
    month: {
      id: month.id,
      year: month.year,
      month: month.month,
      label: new Date(month.year, month.month - 1).toLocaleDateString(
        "id-ID",
        {
          month: "long",
          year: "numeric",
        }
      ),
    },

    incomes: {
      husband: {
        main: husbandMain,
        extra: husbandExtra,
        total: husbandTotal,
      },

      wife: {
        main: wifeMain,
        extra: wifeExtra,
        total: wifeTotal,
      },

      total: totalIncome,
    },

    expenses: {
      total: totalExpense,
      percentage:
        totalIncome === 0
          ? 0
          : Math.round((totalExpense / totalIncome) * 100),
    },

    balance: {
      total: balance,
      percentage:
        totalIncome === 0
          ? 0
          : Math.round((balance / totalIncome) * 100),
    },
  };
}