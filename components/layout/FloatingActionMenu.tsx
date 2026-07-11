"use client";

import Link from "next/link";
import { Wallet, Plus, X } from "lucide-react";

interface FloatingActionMenuProps {
  open: boolean;
  onClose: () => void;
}

export function FloatingActionMenu({
  open,
  onClose,
}: FloatingActionMenuProps) {
  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <button
        type="button"
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md transition-opacity"
      />

      {/* Bottom Sheet */}
      <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-4">

        <div
          className="
            w-full
            max-w-md
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
              Pilih
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

          {/* Menu */}
          <div className="space-y-3 px-5 pb-5">

            <Link
              href="/income"
              onClick={onClose}
              className="
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-zinc-800
                bg-zinc-950
                px-4
                py-4
                transition-all
                hover:border-orange-500/40
                hover:bg-zinc-900
              "
            >
              <div className="flex items-center gap-4">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-orange-500/10
                  "
                >
                  <Wallet
                    size={20}
                    className="text-orange-400"
                  />
                </div>

                <span className="font-medium text-white">
                  Update Penghasilan
                </span>
              </div>

              <span className="text-zinc-500">
                ›
              </span>
            </Link>

            <Link
              href="/expenses/new"
              onClick={onClose}
              className="
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-zinc-800
                bg-zinc-950
                px-4
                py-4
                transition-all
                hover:border-orange-500/40
                hover:bg-zinc-900
              "
            >
              <div className="flex items-center gap-4">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-orange-500/10
                  "
                >
                  <Plus
                    size={20}
                    className="text-orange-400"
                  />
                </div>

                <span className="font-medium text-white">
                  Tambah Pengeluaran
                </span>
              </div>

              <span className="text-zinc-500">
                ›
              </span>
            </Link>

          </div>
        </div>

      </div>
    </>
  );
}