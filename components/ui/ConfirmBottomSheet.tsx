"use client";

import { BottomSheet } from "@/components/ui/BottomSheet";
import { Button } from "@/components/ui/Button";

interface ConfirmBottomSheetProps {
  open: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ConfirmBottomSheet({
  open,
  title,
  description,
  confirmText = "Hapus",
  cancelText = "Batal",
  loading = false,
  onCancel,
  onConfirm,
}: ConfirmBottomSheetProps) {
  return (
    <BottomSheet
      open={open}
      title={title}
      onClose={onCancel}
    >
      <div className="space-y-6">

        <p className="text-sm leading-6 text-zinc-400">
          {description}
        </p>

        <div className="flex gap-3">

          <Button
            type="button"
            variant="secondary"
            className="flex-1"
            onClick={onCancel}
          >
            {cancelText}
          </Button>

          <Button
            type="button"
            className="flex-1"
            disabled={loading}
            onClick={onConfirm}
          >
            {loading ? "Menghapus..." : confirmText}
          </Button>

        </div>

      </div>
    </BottomSheet>
  );
}