"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCurrentIncome,
  updateIncome,
  type IncomeFormData,
} from "@/services/income.service";

export function useIncome() {
  return useQuery({
    queryKey: ["income"],
    queryFn: getCurrentIncome,
    staleTime: 60 * 1000,
  });
}

export function useUpdateIncome() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: IncomeFormData) => updateIncome(values),

    onSuccess: () => {
      // Refresh halaman income
      queryClient.invalidateQueries({
        queryKey: ["income"],
      });

      // Refresh dashboard
      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });
    },
  });
}