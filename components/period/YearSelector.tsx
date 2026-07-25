"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { YearPicker } from "./YearPicker";

interface YearSelectorProps {
  year: number;
  years: number[];
  onChange: (year: number) => void;
}

export function YearSelector({
  year,
  years,
  onChange,
}: YearSelectorProps) {
  const [open, setOpen] =
    useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
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
        <span>{year}</span>

        <ChevronDown
          size={22}
          className={`transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <YearPicker
        open={open}
        selectedYear={year}
        years={years}
        onClose={() => setOpen(false)}
        onSelect={onChange}
      />
    </>
  );
}