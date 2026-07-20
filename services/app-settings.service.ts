import { supabase } from "@/lib/supabase";

export interface AppSetting {
  id: string;
  financial_start_date: string;
  starting_balance: number;
  created_at: string;
}

export interface SaveAppSettingInput {
  financialStartDate: string;
  startingBalance: number;
}

export async function getAppSetting(): Promise<AppSetting | null> {
  const { data, error } = await supabase
    .from("app_setting")
    .select("*")
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

export async function saveAppSetting(
  input: SaveAppSettingInput
): Promise<AppSetting> {
  const existing = await getAppSetting();

  if (existing) {
    const { data, error } = await supabase
      .from("app_setting")
      .update({
        financial_start_date: input.financialStartDate,
        starting_balance: input.startingBalance,
      })
      .eq("id", existing.id)
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  const { data, error } = await supabase
    .from("app_setting")
    .insert({
      financial_start_date: input.financialStartDate,
      starting_balance: input.startingBalance,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}