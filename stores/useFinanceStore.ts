import { create } from "zustand";

interface FinancePeriod {
  month: number;
  year: number;
}

interface FinanceState {
  selectedMonth: number;
  selectedYear: number;

  availablePeriods: FinancePeriod[];

  setPeriod: (
    month: number,
    year: number
  ) => void;

  setAvailablePeriods: (
    periods: FinancePeriod[]
  ) => void;

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

    availablePeriods: [],

    setPeriod: (
      month: number,
      year: number
    ) =>
      set({
        selectedMonth: month,
        selectedYear: year,
      }),

    setAvailablePeriods: (
      periods: FinancePeriod[]
    ) =>
      set({
        availablePeriods: periods,
      }),

      nextMonth: () => {
        const {
          selectedMonth,
          selectedYear,
          availablePeriods,
        } = get();
  
        const currentIndex =
          availablePeriods.findIndex(
            (period) =>
              period.month === selectedMonth &&
              period.year === selectedYear
          );
  
        if (
          currentIndex === -1 ||
          currentIndex ===
            availablePeriods.length - 1
        ) {
          return;
        }
  
        const next =
          availablePeriods[currentIndex + 1];
  
        set({
          selectedMonth: next.month,
          selectedYear: next.year,
        });
      },
  
      previousMonth: () => {
        const {
          selectedMonth,
          selectedYear,
          availablePeriods,
        } = get();
  
        const currentIndex =
          availablePeriods.findIndex(
            (period) =>
              period.month === selectedMonth &&
              period.year === selectedYear
          );
  
        if (currentIndex <= 0) {
          return;
        }
  
        const previous =
          availablePeriods[currentIndex - 1];
  
        set({
          selectedMonth: previous.month,
          selectedYear: previous.year,
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