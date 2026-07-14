import { Wallet, Users, Plus, ListChecks, PieChart, ArrowDownToLine, Home, Receipt, BarChart3, User } from 'lucide-react';
import type { DashboardSummary, QuickAction, NavItem } from './types';

/**
 * NOTE on the numbers below:
 * - Total Pengeluaran (Rp120.000, 69%), Sisa Saldo (Rp0, 0%) are reproduced
 *   exactly as shown on-screen.
 * - Both individual incomes and Total Penghasilan are masked (dots) in the
 *   screenshot and never revealed, so their amounts here are placeholders.
 * - Those placeholders are deliberately NOT used to derive the two
 *   percentages above, because the screenshot's own figures don't reconcile:
 *   a 69% expense ratio and a Rp0 leftover balance can't both fall out of
 *   one consistent income number. Rather than hide that, this mock data
 *   keeps percentages and income as independent fields — replace both with
 *   real figures from your backend, where they will actually agree.
 */
export const dashboardSummary: DashboardSummary = {
  month: 'Juli 2026',
  incomes: [
    { id: 'suami', label: 'Penghasilan Suami', icon: Wallet, amount: 8_000_000, progress: 35 },
    { id: 'istri', label: 'Penghasilan Istri', icon: Users, amount: 6_400_000, progress: 28 },
  ],
  totalIncome: 14_400_000,
  totalExpense: 120_000,
  expensePercentage: 69,
  remainingBalance: 0,
  balancePercentage: 0,
};

export const monthOptions = [
  {
    label: "Januari 2026",
    value: 1,
  },

  {
    label: "Februari 2026",
    value: 2,
  },

  {
    label: "Maret 2026",
    value: 3,
  },

  {
    label: "April 2026",
    value: 4,
  },

  {
    label: "Mei 2026",
    value: 5,
  },

  {
    label: "Juni 2026",
    value: 6,
  },

  {
    label: "Juli 2026",
    value: 7,
  },

  {
    label: "Agustus 2026",
    value: 8,
  },

  {
    label: "September 2026",
    value: 9,
  },

  {
    label: "Oktober 2026",
    value: 10,
  },

  {
    label: "November 2026",
    value: 11,
  },

  {
    label: "Desember 2026",
    value: 12,
  },
];

export const quickActions = [
  {
    id: "income",
    label: "Update Penghasilan",
    icon: Wallet,
    href: "/income",
  },

  {
    id: "tambah",
    label: "Tambah Pengeluaran",
    icon: Plus,
    href: "/expenses/new",
  },

  {
    id: "riwayat",
    label: "Riwayat",
    icon: ListChecks,
    href: "/expenses",
  },

  {
    id: "laporan",
    label: "Laporan",
    icon: ArrowDownToLine,
    href: "/laporan",
  },
];

export const navItems: NavItem[] = [
  { id: "beranda", label: "Beranda", icon: Home, href: "/dashboard" },
  { id: "transaksi", label: "Transaksi", icon: Receipt, href: "/transaksi" },
  { id: "laporan", label: "Laporan", icon: BarChart3, href: "/laporan" },
  { id: "profil", label: "Profil", icon: User, href: "/profile" },
];
