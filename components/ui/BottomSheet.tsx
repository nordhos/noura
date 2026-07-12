"use client";

import { X } from "lucide-react";
import { ReactNode } from "react";

interface BottomSheetProps {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}

export function BottomSheet({
  open,
  title,
  children,
  onClose,
}: BottomSheetProps) {
  if (!open) return null;

  return (
    <>
      <button
        type="button"
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
      />

      <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-4">

        <div className="w-full max-w-md overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 shadow-2xl">

          <div className="flex justify-center pt-3">
            <div className="h-1.5 w-12 rounded-full bg-zinc-700" />
          </div>

          <div className="flex items-center justify-between px-5 py-4">

            <h2 className="text-lg font-semibold text-white">
              {title}
            </h2>

            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            >
              <X size={18} />
            </button>

          </div>

          <div className="max-h-[75vh] overflow-y-auto px-5 pb-6">
            {children}
          </div>

        </div>

      </div>
    </>
  );
}