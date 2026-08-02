import { supabase } from "@/lib/supabase";

export type TransactionCategoryType =
  | "income"
  | "expense";

export interface TransactionCategory {
  id: string;
  type: TransactionCategoryType;
  name: string;
  is_default: boolean;
  is_system: boolean;
  created_at: string;
}

export async function getCategories(
  type?: TransactionCategoryType
): Promise<TransactionCategory[]> {
  let query = supabase
    .from("transaction_categories")
    .select("*")
    .order("name", { ascending: true });

  if (type) {
    query = query.eq("type", type);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function getVisibleCategories(
  type?: TransactionCategoryType
): Promise<TransactionCategory[]> {
  let query = supabase
    .from("transaction_categories")
    .select("*")
    .eq("is_system", false)
    .order("name", { ascending: true });

  if (type) {
    query = query.eq("type", type);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function getCategoryId(
  type: TransactionCategoryType,
  name: string
): Promise<string> {
  const { data, error } = await supabase
    .from("transaction_categories")
    .select("id")
    .eq("type", type)
    .eq("name", name)
    .single();

  if (error) {
    throw error;
  }

  return data.id;
}

export async function getCategory(
  type: TransactionCategoryType,
  name: string
): Promise<TransactionCategory> {
  const { data, error } = await supabase
    .from("transaction_categories")
    .select("*")
    .eq("type", type)
    .eq("name", name)
    .single();

  if (error) {
    throw error;
  }

  return data;
}