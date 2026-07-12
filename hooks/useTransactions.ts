"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createTransaction,
  getTransactions,
  type TransactionPayload,
} from "@/services/transaction.service";

export function useTransactions(
  year: number,
  month: number
) {
  return useQuery({
    queryKey: ["transactions", year, month],
    queryFn: () => getTransactions(year, month),
  });
}

export function useCreateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: TransactionPayload) =>
      createTransaction(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });
    },
  });
}