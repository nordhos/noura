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
  // Financial Setup hanya boleh dilakukan satu kali.
  // Jika data sudah ada, onboarding dianggap selesai.
  const existing = await getAppSetting();

  if (existing) {
    throw new Error("Financial setup already completed.");
  }

  const { data, error } = await supabase
    .from("app_setting")
    .insert({
      financial_start_date: input.financialStartDate,
      starting_balance: input.startingBalance,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}