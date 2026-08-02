"use client";

import { useQuery } from "@tanstack/react-query";

import {
  getReportSummary,
  type ReportSummary,
} from "@/services/report.service";

export function useAnnualReport(year: number) {
  return useQuery<ReportSummary>({
    queryKey: ["annual-report", year],

    queryFn: () => getReportSummary(year),

    staleTime: 1000 * 60,

    refetchOnWindowFocus: false,
  });
}