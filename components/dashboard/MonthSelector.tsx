"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { MonthPicker } from "./MonthPicker";
import { useFinanceStore } from "@/stores/useFinanceStore";

export function MonthSelector() {
  const {
    monthLabel,
    selectedYear,
  } = useFinanceStore();

  const [openPicker, setOpenPicker] =
    useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpenPicker(true)}
        className="
  flex
  items-center
  gap-2
  text-xl
  font-semibold
  transition-opacity
  hover:opacity-80
        "
      >
        <span>{monthLabel()}</span>

        <ChevronDown
          size={22}
          className={`transition-transform ${openPicker ? "rotate-180" : ""
            }`}
        />
      </button>

      <MonthPicker
        open={openPicker}
        year={selectedYear}
        onClose={() => setOpenPicker(false)}
      />
    </>
  );
}