import { supabase } from "@/lib/supabase";

export interface TransactionPayload {
  profileId: string;
  categoryId: string;
  type: "income" | "expense";
  amount: number;
  description: string;
  transactionDate: string;
}

export async function createTransaction(
  payload: TransactionPayload
) {
  const date = new Date(payload.transactionDate);

  const { data, error } = await supabase
    .from("transactions")
    .insert({
      profile_id: payload.profileId,
      category_id: payload.categoryId,
      type: payload.type,
      amount: payload.amount,
      description: payload.description,
      transaction_date: payload.transactionDate,
      year: date.getFullYear(),
      month: date.getMonth() + 1,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function getTransactions(
  year: number,
  month: number
) {
  const { data, error } = await supabase
    .from("transactions")
    .select(`
      *,
      profiles (
        name,
        role
      ),
      transaction_categories (
        name,
        icon,
        color,
        type
      )
    `)
    .eq("year", year)
    .eq("month", month)
    .order("transaction_date", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function getRecentTransactions() {
    const { data, error } = await supabase
      .from("transactions")
      .select(`
        *,
        profiles (
          name,
          role
        ),
        transaction_categories (
          name,
          icon,
          color,
          type
        )
      `)
      .order("transaction_date", {
        ascending: false,
      })
      .limit(5);
  
    if (error) throw error;
  
    return data ?? [];
  }

  export async function getAllTransactions() {
    const { data, error } = await supabase
      .from("transactions")
      .select(`
        *,
        profiles (
          name,
          role
        ),
        transaction_categories (
          name,
          icon,
          color,
          type
        )
      `)
      .order("transaction_date", {
        ascending: false,
      });
  
    if (error) {
      throw error;
    }
  
    return data ?? [];
  }