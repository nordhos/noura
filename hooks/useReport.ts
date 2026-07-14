"use client";

import { useQuery } from "@tanstack/react-query";

import {
  getReportSummary,
  type ReportSummary,
} from "@/services/report.service";

export function useReport() {
  return useQuery<ReportSummary>({
    queryKey: ["report"],

    queryFn: getReportSummary,

    staleTime: 1000 * 60,

    refetchOnWindowFocus: false,
  });
}