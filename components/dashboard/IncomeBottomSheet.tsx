"use client";

import { X } from "lucide-react";
import { IncomeForm } from "./IncomeForm";

interface IncomeBottomSheetProps {
  open: boolean;
  onClose: () => void;
}

export function IncomeBottomSheet({
  open,
  onClose,
}: IncomeBottomSheetProps) {
  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <button
        type="button"
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md"
      />

      {/* Bottom Sheet */}
      <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-4">

        <div
          className="
            w-full
            max-w-md
            overflow-hidden
            rounded-3xl
            border
            border-zinc-800
            bg-[#111111]
            shadow-2xl
          "
        >
          {/* Drag Handle */}
          <div className="flex justify-center pt-3">
            <div className="h-1.5 w-12 rounded-full bg-zinc-700" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-5 pb-4">

            <h2 className="text-lg font-semibold text-white">
              Update Penghasilan
            </h2>

            <button
              type="button"
              onClick={onClose}
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border
                border-zinc-700
                text-zinc-300
                transition
                hover:bg-zinc-800
              "
            >
              <X size={18} />
            </button>

          </div>

          {/* Form */}
          <div className="max-h-[70vh] overflow-y-auto px-5 pb-6">

            <IncomeForm
              onSuccess={onClose}
            />

          </div>

        </div>

      </div>
    </>
  );
}