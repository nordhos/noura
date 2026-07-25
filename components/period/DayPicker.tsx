"use client";

import { BottomSheet } from "@/components/ui/BottomSheet";

interface DayPickerProps {
  open: boolean;
  value: number | null;
  onClose: () => void;
  onSelect: (day: number) => void;
}

const DAYS = Array.from(
  { length: 31 },
  (_, index) => index + 1
);

export function DayPicker({
  open,
  value,
  onClose,
  onSelect,
}: DayPickerProps) {
  if (!open) return null;

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title="Pilih Tanggal Gajian"
    >
      <div className="mt-6 grid grid-cols-7 justify-items-center gap-y-5">

        {DAYS.map((day) => {

          const active = value === day;

          return (
            <button
              key={day}
              type="button"
              onClick={() => {
                onSelect(day);
                onClose();
              }}
              className={`
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                text-sm
                font-semibold
                transition-all
                duration-200

                ${
                  active
                    ? "bg-accent text-black shadow-lg"
                    : "border border-border bg-card hover:border-accent/40 hover:bg-white/5"
                }
              `}
            >
              {day}
            </button>
          );

        })}

      </div>
    </BottomSheet>
  );
}