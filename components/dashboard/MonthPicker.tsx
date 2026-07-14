"use client";

import { toast } from "sonner";
import { useState } from "react";
import { useFinanceStore } from "@/stores/useFinanceStore";
import {
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

interface MonthPickerProps {
  open: boolean;
  year: number;
  onClose: () => void;
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

export function MonthPicker({
  open,
  year,
  onClose,
}: MonthPickerProps) {
    const {
        selectedMonth,
        selectedYear,
        availablePeriods,
        setPeriod,
      } = useFinanceStore();

  const [displayYear, setDisplayYear] =
    useState(year);

  if (!open) return null;

  const firstAvailable =
  availablePeriods.length > 0
    ? availablePeriods[0]
    : null;

const today = new Date();

const currentMonth =
  today.getMonth() + 1;

const currentYear =
  today.getFullYear();

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
      />

      <div
        className="
          fixed
          bottom-0
          left-1/2
          z-50
          w-full
          max-w-md
          -translate-x-1/2
          rounded-t-[32px]
          border-t
          border-border
          bg-card
          p-6
          shadow-2xl
        "
      >
        <div className="mx-auto mb-5 h-1.5 w-14 rounded-full bg-zinc-700" />

        <div className="flex items-center justify-between">

          <h2 className="text-lg font-semibold">

            Pilih Periode

          </h2>

          <button
            onClick={onClose}
            className="
              rounded-full
              p-2
              transition
              hover:bg-white/5
            "
          >
            <X size={20} />
          </button>

        </div>

        <div className="mt-8 flex items-center justify-center gap-8">

          <button
            type="button"
            onClick={() =>
              setDisplayYear(
                (y) => y - 1
              )
            }
            className="
              rounded-full
              p-2
              transition
              hover:bg-white/5
            "
          >
            <ChevronLeft size={22} />
          </button>

          <span className="text-xl font-semibold">

            {displayYear}

          </span>

          <button
            type="button"
            onClick={() =>
              setDisplayYear(
                (y) => y + 1
              )
            }
            className="
              rounded-full
              p-2
              transition
              hover:bg-white/5
            "
          >
            <ChevronRight size={22} />
          </button>

        </div>
        <div className="mt-8 grid grid-cols-3 gap-3">

        {MONTHS.map((month, index) => {
  const monthNumber = index + 1;

  const active =
    displayYear === selectedYear &&
    selectedMonth === monthNumber;

    const beforeFirst =
    firstAvailable !== null &&
    (
      displayYear <
        firstAvailable.year ||
      (
        displayYear ===
          firstAvailable.year &&
        monthNumber <
          firstAvailable.month
      )
    );

  const futurePeriod =
    displayYear > currentYear ||
    (
      displayYear === currentYear &&
      monthNumber > currentMonth
    );

  return (
    <button
      key={month}
      type="button"
      disabled={beforeFirst}
      onClick={() => {

        if (futurePeriod) {

          toast.info(
            "Data belum tersedia."
          );

          return;
        }

        setPeriod(
          monthNumber,
          displayYear
        );

        onClose();
      }}
      className={`
        rounded-2xl
        py-3
        text-sm
        font-medium
        transition-all
        duration-200

        ${
          active
            ? "bg-accent text-black shadow-lg"
            : beforeFirst
            ? "cursor-not-allowed opacity-30"
            : "border border-border bg-card hover:border-accent/40 hover:bg-white/5"
        }
      `}
    >
      {month}
    </button>
  );
})}

</div>

</div>

</>
);
}