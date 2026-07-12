"use client";

import { ArrowDownLeft, ArrowUpRight, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { formatIDR } from "@/lib/format-currency";
import { useDeleteTransaction } from "@/hooks/useTransactions";

interface TransactionItemProps {
  id: string;
  type: "income" | "expense";
  category: string;
  profile: string;
  amount: number;
  date: string;
}

export function TransactionItem({
  id,
  type,
  category,
  profile,
  amount,
  date,
}: TransactionItemProps) {
  const income = type === "income";

  const mutation = useDeleteTransaction();

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

  return (
    <div className="flex items-center justify-between py-3">

      <div className="flex items-center gap-3">

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
            income
              ? "bg-emerald-500/15 text-emerald-400"
              : "bg-red-500/15 text-red-400"
          }`}
        >
          {income ? (
            <ArrowDownLeft size={18} />
          ) : (
            <ArrowUpRight size={18} />
          )}
        </div>

        <div>
          <p className="font-medium text-white">
            {category}
          </p>

          <p className="text-sm text-zinc-400">
            {profile}
            {" • "}
            {date}
          </p>
        </div>

      </div>

      <div className="flex items-center gap-3">

        <p
          className={`font-semibold ${
            income
              ? "text-emerald-400"
              : "text-red-400"
          }`}
        >
          {income ? "+" : "-"}
          {formatIDR(amount)}
        </p>

        <button
          type="button"
          onClick={handleDelete}
          disabled={mutation.isPending}
          className="rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-800 hover:text-red-400"
        >
          <Trash2 size={17} />
        </button>

      </div>

    </div>
  );
}