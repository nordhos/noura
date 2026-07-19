import { supabase } from "@/lib/supabase";

export async function getIncomeSalaryCategoryId(): Promise<string> {
  const { data, error } = await supabase
    .from("transaction_categories")
    .select("id")
    .eq("type", "income")
    .eq("name", "Salary")
    .single();

  if (error) {
    throw error;
  }

  return data.id;
}