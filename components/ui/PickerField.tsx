"use client";

import { ChevronDown } from "lucide-react";

interface PickerFieldProps {
  label: string;
  value: string;
  onClick: () => void;
}

export function PickerField({
  label,
  value,
  onClick,
}: PickerFieldProps) {
  return (
    <div className="space-y-2">

      <p className="text-sm text-zinc-400">
        {label}
      </p>

      <button
        type="button"
        onClick={onClick}
        className="
          flex
          w-full
          items-center
          justify-between
          rounded-2xl
          border
          border-zinc-800
          bg-zinc-900
          px-4
          py-3
        "
      >
        <span className="text-white">
          {value}
        </span>

        <ChevronDown
          size={18}
          className="text-zinc-500"
        />
      </button>

    </div>
  );
}