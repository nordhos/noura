import { supabase } from "@/lib/supabase";

export interface AppSetting {
  id: string;
  financial_start_date: string;
  created_at: string;
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

export async function initializeFinancialStartDate(): Promise<void> {
  const setting = await getAppSetting();

  if (setting) {
    return;
  }

  const today = new Date()
    .toISOString()
    .split("T")[0];

  const { error } = await supabase
    .from("app_setting")
    .insert({
      financial_start_date: today,
    });

  if (error) {
    throw error;
  }
}