"use client";

import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { formatIDR } from "@/lib/format-currency";

interface TransactionItemProps {
  type: "income" | "expense";
  category: string;
  profile: string;
  amount: number;
  date: string;
}

export function TransactionItem({
  type,
  category,
  profile,
  amount,
  date,
}: TransactionItemProps) {
  const income = type === "income";

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

    </div>
  );
}