"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createTransaction,
  createTransfer,
  createReturn,
  deleteTransaction,
  getTransactions,
  getRecentTransactions,
  getAllTransactions,
  type TransactionPayload,
  type TransferPayload,
  type ReturnPayload,
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

export function useRecentTransactions(
  year: number,
  month: number
) {
  return useQuery({
    queryKey: [
      "recent-transactions",
      year,
      month,
    ],

    queryFn: () =>
      getRecentTransactions(
        year,
        month
      ),
  });
}

export function useAllTransactions() {
  return useQuery({
    queryKey: ["all-transactions"],
    queryFn: getAllTransactions,
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
        queryKey: ["recent-transactions"],
      });

      queryClient.invalidateQueries({
        queryKey: ["all-transactions"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });

      queryClient.invalidateQueries({
        queryKey: ["profiles"],
      });
    },
  });
}

export function useDeleteTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTransaction,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });

      queryClient.invalidateQueries({
        queryKey: ["recent-transactions"],
      });

      queryClient.invalidateQueries({
        queryKey: ["all-transactions"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });

      queryClient.invalidateQueries({
        queryKey: ["profiles"],
      });
    },
  });
}

export function useCreateTransfer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: TransferPayload) =>
      createTransfer(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });

      queryClient.invalidateQueries({
        queryKey: ["recent-transactions"],
      });

      queryClient.invalidateQueries({
        queryKey: ["all-transactions"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });

      queryClient.invalidateQueries({
        queryKey: ["profiles"],
      });
    },
  });
}

export function useCreateReturn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ReturnPayload) =>
      createReturn(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });

      queryClient.invalidateQueries({
        queryKey: ["recent-transactions"],
      });

      queryClient.invalidateQueries({
        queryKey: ["all-transactions"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });

      queryClient.invalidateQueries({
        queryKey: ["profiles"],
      });
    },
  });
}