"use client";

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export interface TransactionCategory {
  id: string;
  type: "income" | "expense";
  name: string;
  icon: string;
  color: string;
}

async function getVisibleCategories(
  type: "income" | "expense"
): Promise<TransactionCategory[]> {
  const { data, error } = await supabase
    .from("transaction_categories")
    .select("*")
    .eq("type", type)
    .eq("is_system", false)
    .order("sort_order", {
      ascending: true,
    })

  if (error) {
    throw error;
  }

  return data ?? [];
}

export function useCategories(
  type: "income" | "expense"
) {
  return useQuery({
    queryKey: ["categories", type],
    queryFn: () => getVisibleCategories(type),
    staleTime: 1000 * 60 * 60,
  });
}