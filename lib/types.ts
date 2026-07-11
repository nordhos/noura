import type { LucideIcon } from 'lucide-react';

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

export interface DashboardSummary {
  month: string;
  incomes: IncomeSource[];
  totalIncome: number;
  totalExpense: number;
  /** 0–100, shown next to "dari total penghasilan" under the expense figure */
  expensePercentage: number;
  remainingBalance: number;
  /** 0–100, shown next to "dari total penghasilan" under the balance figure */
  balancePercentage: number;
}
