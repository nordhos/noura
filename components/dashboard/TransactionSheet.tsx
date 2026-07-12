"use client";

import { BottomSheet } from "@/components/ui/BottomSheet";
import { TransactionForm } from "./TransactionForm";

interface TransactionSheetProps {
  open: boolean;
  onClose: () => void;
}

export function TransactionSheet({
  open,
  onClose,
}: TransactionSheetProps) {
  return (
    <BottomSheet
      open={open}
      title="Catat Penghasilan"
      onClose={onClose}
    >
      <TransactionForm
        onSuccess={onClose}
      />
    </BottomSheet>
  );
}