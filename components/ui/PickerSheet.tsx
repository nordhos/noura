"use client";

import { ChevronRight } from "lucide-react";
import { BottomSheet } from "@/components/ui/BottomSheet";

interface PickerOption {
  value: string;
  label: string;
}

interface PickerSheetProps {
  open: boolean;
  title: string;
  value?: string;
  options: PickerOption[];
  onClose: () => void;
  onSelect: (value: string) => void;
}

export function PickerSheet({
  open,
  title,
  value,
  options,
  onClose,
  onSelect,
}: PickerSheetProps) {
  return (
    <BottomSheet
      open={open}
      title={title}
      onClose={onClose}
    >
      <div className="space-y-2">

        {options.map((option) => {

          const active = option.value === value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onSelect(option.value);
                onClose();
              }}
              className={`
                flex
                w-full
                items-center
                justify-between
                rounded-2xl
                border
                px-4
                py-4
                transition

                ${
                  active
                    ? "border-orange-500 bg-orange-500/10"
                    : "border-zinc-800 bg-zinc-950"
                }
              `}
            >
              <span
                className={
                  active
                    ? "font-medium text-orange-400"
                    : "text-white"
                }
              >
                {option.label}
              </span>

              <ChevronRight
                size={18}
                className={
                  active
                    ? "text-orange-400"
                    : "text-zinc-500"
                }
              />
            </button>
          );

        })}

      </div>
    </BottomSheet>
  );
}