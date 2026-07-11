import { supabase } from "@/lib/supabase";

export interface IncomeFormData {
  husbandMain: number;
  husbandExtra: number;
  wifeMain: number;
  wifeExtra: number;
}

export async function getCurrentIncome() {
  const now = new Date();

  const { data, error } = await supabase
    .from("months")
    .select("*")
    .eq("year", now.getFullYear())
    .eq("month", now.getMonth() + 1)
    .single();

  if (error) throw error;

  return {
    husbandMain: data.husband_main ?? 0,
    husbandExtra: data.husband_extra ?? 0,
    wifeMain: data.wife_main ?? 0,
    wifeExtra: data.wife_extra ?? 0,
  };
}

export async function updateIncome(values: IncomeFormData) {
  const now = new Date();

  const { data: month, error: monthError } = await supabase
    .from("months")
    .select("id")
    .eq("year", now.getFullYear())
    .eq("month", now.getMonth() + 1)
    .single();

  if (monthError) throw monthError;

  const { error } = await supabase
    .from("months")
    .update({
      husband_main: values.husbandMain,
      husband_extra: values.husbandExtra,
      wife_main: values.wifeMain,
      wife_extra: values.wifeExtra,
    })
    .eq("id", month.id);

  if (error) throw error;
}