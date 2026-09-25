import type { LucideIcon } from "lucide-react";

export interface IncomeSource {
  id: string;
  label: string;
  icon: LucideIcon;
  amount: number;
  /** 0–100, drives the linear progress bar under the amount */
  progress: number;
}

export interface QuickAction {
  id: string;
  label: string;
  icon: LucideIcon;
  href: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  href: string;
}

export interface DashboardProfile {
  id: string;
  name: string;
  income: number;
  expense: number;
  return: number;
  transferIn: number;
  transferOut: number;
  balance: number;
}

export interface DashboardSummary {
  profiles: DashboardProfile[];

  incomes: {
    total: number;
  };

  expenses: {
    total: number;
    percentage: number;
  };

  returns: {
    total: number;
  };

  balance: {
    total: number;
    percentage: number;
  };
}