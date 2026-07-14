"use client";

import { useQuery } from "@tanstack/react-query";

import { getDashboardSummary } from "@/services/dashboard.service";
import { useFinanceStore } from "@/stores/useFinanceStore";

export function useDashboard() {
  const {
    selectedMonth,
    selectedYear,
  } = useFinanceStore();

  return useQuery({
    queryKey: [
      "dashboard",
      selectedYear,
      selectedMonth,
    ],

    queryFn: () =>
      getDashboardSummary(
        selectedYear,
        selectedMonth
      ),

    staleTime: 1000 * 60,
  });
}