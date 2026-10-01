"use client";

import { BottomSheet } from "@/components/ui/BottomSheet";
import { TransactionForm } from "./TransactionForm";

interface TransactionSheetProps {
  type: "income" | "expense" | "transfer" | "return";
  open: boolean;
  onClose: () => void;
}

export function TransactionSheet({
  type,
  open,
  onClose,
}: TransactionSheetProps) {
  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title={
        type === "income"
          ? "Catat Pemasukan"
          : type === "expense"
            ? "Catat Pengeluaran"
            : type === "transfer"
              ? "Catat Transfer"
              : "Catat Pengembalian"
      }
    >
      <TransactionForm
        type={type}
        onSuccess={onClose}
      />
    </BottomSheet>
  );
}