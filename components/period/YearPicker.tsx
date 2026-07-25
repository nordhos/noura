"use client";

import { BottomSheet } from "@/components/ui/BottomSheet";

interface YearPickerProps {
  open: boolean;
  selectedYear: number;
  years: number[];
  onClose: () => void;
  onSelect: (year: number) => void;
}

export function YearPicker({
  open,
  selectedYear,
  years,
  onClose,
  onSelect,
}: YearPickerProps) {
  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title="Pilih Tahun"
    >
      <div className="grid grid-cols-3 gap-3">
        {years.map((year) => {
          const active = year === selectedYear;

          return (
            <button
              key={year}
              type="button"
              onClick={() => {
                onSelect(year);
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
                    : "border border-border bg-card hover:border-accent/40 hover:bg-white/5"
                }
              `}
            >
              {year}
            </button>
          );
        })}
      </div>
    </BottomSheet>
  );
}