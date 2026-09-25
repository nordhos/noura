"use client";

import { useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  ArrowLeftRight,
  RotateCcw,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

import { ConfirmBottomSheet } from "@/components/ui/ConfirmBottomSheet";
import { formatIDR } from "@/lib/format-currency";
import { useDeleteTransaction } from "@/hooks/useTransactions";

interface TransactionItemProps {
  id: string;
  type: "income" | "expense" | "transfer" | "return";
  category: string;
  profile: string;
  amount: number;
  date: string;
  fromProfile?: string;
  toProfile?: string;
}

export function TransactionItem({
  id,
  type,
  category,
  profile,
  amount,
  date,
  fromProfile,
  toProfile,
}: TransactionItemProps) {
  const mutation = useDeleteTransaction();

  const [openConfirm, setOpenConfirm] =
    useState(false);

  async function handleDelete() {
    try {
      await mutation.mutateAsync(id);

      toast.success(
        "Transaksi berhasil dihapus."
      );
    } catch {
      toast.error(
        "Gagal menghapus transaksi."
      );
    }
  }

  const isIncome = type === "income";
  const isExpense = type === "expense";
  const isTransfer = type === "transfer";
  const isReturn = type === "return";

  let icon;
  let iconClass;
  let amountClass;
  let amountPrefix = "";

  if (isIncome) {
    icon = <ArrowDownLeft size={18} />;
    iconClass =
      "bg-emerald-500/15 text-emerald-400";
    amountClass = "text-emerald-400";
    amountPrefix = "+";
  } else if (isExpense) {
    icon = <ArrowUpRight size={18} />;
    iconClass =
      "bg-red-500/15 text-red-400";
    amountClass = "text-red-400";
    amountPrefix = "-";
  } else if (isTransfer) {
    icon = <ArrowLeftRight size={18} />;
    iconClass =
      "bg-blue-500/15 text-blue-400";
    amountClass = "text-blue-400";
  } else {
    icon = <RotateCcw size={18} />;
    iconClass =
      "bg-emerald-500/15 text-emerald-400";
    amountClass = "text-emerald-400";
    amountPrefix = "+";
  }

  const title = isTransfer
    ? "Transfer"
    : isReturn
      ? "Pengembalian"
      : category;

  const subtitle = isTransfer
    ? `${fromProfile ?? "-"} → ${toProfile ?? "-"} • ${date}`
    : `${profile} • ${date}`;

  return (
    <>
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-2xl ${iconClass}`}
          >
            {icon}
          </div>

          <div>
            <p className="font-medium text-white">
              {title}
            </p>

            <p className="text-sm text-zinc-400">
              {subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <p
            className={`font-semibold ${amountClass}`}
          >
            {amountPrefix}
            {formatIDR(amount)}
          </p>

          <button
            type="button"
            onClick={() =>
              setOpenConfirm(true)
            }
            disabled={mutation.isPending}
            className="rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-800 hover:text-red-400"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </div>

      <ConfirmBottomSheet
        open={openConfirm}
        title="Hapus Transaksi"
        description="Apakah kamu yakin ingin menghapus transaksi ini?"
        loading={mutation.isPending}
        onCancel={() =>
          setOpenConfirm(false)
        }
        onConfirm={async () => {
          await handleDelete();
          setOpenConfirm(false);
        }}
      />
    </>
  );
}