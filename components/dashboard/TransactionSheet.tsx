"use client";

import { BottomSheet } from "@/components/ui/BottomSheet";
import { TransactionForm } from "./TransactionForm";

interface TransactionSheetProps {
  type: "income" | "expense";
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
          ? "Catat Penghasilan"
          : "Catat Pengeluaran"
      }
    >
      <TransactionForm
        type={type}
        onSuccess={onClose}
      />
    </BottomSheet>
  );
}