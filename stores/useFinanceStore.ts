import { create } from "zustand";

interface FinanceState {
  selectedMonth: number;
  selectedYear: number;

  setMonth: (month: number) => void;
  setYear: (year: number) => void;

  nextMonth: () => void;
  previousMonth: () => void;

  setCurrentMonth: () => void;

  monthLabel: () => string;
}

const MONTHS = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const today = new Date();

export const useFinanceStore =
  create<FinanceState>((set, get) => ({
    selectedMonth:
      today.getMonth() + 1,

    selectedYear:
      today.getFullYear(),

    setMonth: (month) =>
      set({
        selectedMonth: month,
      }),

    setYear: (year) =>
      set({
        selectedYear: year,
      }),

    nextMonth: () => {
      const {
        selectedMonth,
        selectedYear,
      } = get();

      if (selectedMonth === 12) {
        set({
          selectedMonth: 1,
          selectedYear:
            selectedYear + 1,
        });

        return;
      }

      set({
        selectedMonth:
          selectedMonth + 1,
      });
    },

    previousMonth: () => {
      const {
        selectedMonth,
        selectedYear,
      } = get();

      if (selectedMonth === 1) {
        set({
          selectedMonth: 12,
          selectedYear:
            selectedYear - 1,
        });

        return;
      }

      set({
        selectedMonth:
          selectedMonth - 1,
      });
    },

    setCurrentMonth: () => {
      const now = new Date();

      set({
        selectedMonth:
          now.getMonth() + 1,

        selectedYear:
          now.getFullYear(),
      });
    },

    monthLabel: () => {
      const {
        selectedMonth,
        selectedYear,
      } = get();

      return `${MONTHS[selectedMonth - 1]} ${selectedYear}`;
    },
  }));