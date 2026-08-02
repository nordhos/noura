import { supabase } from "@/lib/supabase";

export interface AppSetting {
  id: string;
  financial_start_date: string;
  onboarding_completed: boolean;
  created_at: string;
}

function todayString(): string {
  return new Date().toISOString().split("T")[0];
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

export async function completeOnboarding(): Promise<AppSetting> {
  const existing = await getAppSetting();

  if (existing?.onboarding_completed) {
    throw new Error("Financial setup already completed.");
  }

  const { data, error } = await supabase
    .from("app_setting")
    .insert({
      financial_start_date: todayString(),
      onboarding_completed: true,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}