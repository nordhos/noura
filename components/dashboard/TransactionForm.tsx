"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { PickerField } from "@/components/ui/PickerField";
import { PickerSheet } from "@/components/ui/PickerSheet";
import { ProfileSelector } from "@/components/ui/ProfileSelector";

import { useProfiles } from "@/hooks/useProfiles";
import { useCategories } from "@/hooks/useCategories";
import { useCreateTransaction } from "@/hooks/useTransactions";

import {
  formatIDRInput,
  parseIDRInput,
} from "@/lib/format-currency";

interface TransactionFormProps {
  type: "income" | "expense";
  onSuccess?: () => void;
}

function getTodayIndonesia() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta",
  }).format(new Date());
}

export function TransactionForm({
  type,
  onSuccess,
}: TransactionFormProps) {
  const { data: profiles = [] } = useProfiles();
  const { data: categories = [] } =
    useCategories(type);

  const mutation = useCreateTransaction();

  const [profileId, setProfileId] =
    useState("");

  const [categoryId, setCategoryId] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [categoryOpen, setCategoryOpen] =
    useState(false);

  const transactionDate =
    getTodayIndonesia();

  async function handleSubmit() {

    if (!profileId) {
      toast.error("Pilih penerima");
      return;
    }

    if (!categoryId) {
      toast.error("Pilih kategori");
      return;
    }

    if (!amount) {
      toast.error("Masukkan nominal");
      return;
    }

    try {

      await mutation.mutateAsync({
        profileId,
        categoryId,
        type,
        amount: Number(amount),
        description,
        transactionDate,
      });

      toast.success(
        type === "income"
          ? "Penghasilan berhasil disimpan"
          : "Pengeluaran berhasil disimpan"
      );

      setProfileId("");
      setCategoryId("");
      setAmount("");
      setDescription("");

      onSuccess?.();

    } catch (error) {

      console.error(error);

      toast.error(
        "Gagal menyimpan transaksi"
      );

    }

  }

  return (
    <div className="space-y-6">

      <ProfileSelector
        value={profileId}
        profiles={profiles}
        onChange={setProfileId}
      />

      <PickerField
        label="Kategori"
        value={
          categories.find(
            c => c.id === categoryId
          )?.name ?? "Pilih kategori"
        }
        onClick={() =>
          setCategoryOpen(true)
        }
      />

      <PickerSheet
        open={categoryOpen}
        title="Pilih Kategori"
        value={categoryId}
        options={categories.map(
          item => ({
            value: item.id,
            label: item.name,
          })
        )}
        onClose={() =>
          setCategoryOpen(false)
        }
        onSelect={setCategoryId}
      />

      <FormField>

        <Label>Nominal</Label>

        <Input
          type="text"
          inputMode="numeric"
          value={formatIDRInput(amount)}
          onChange={(e) =>
            setAmount(
              parseIDRInput(
                e.target.value
              )
            )
          }
        />

      </FormField>

      <FormField>

        <Label>Keterangan</Label>

        <Input
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
        />

      </FormField>

      <Button
        type="button"
        disabled={mutation.isPending}
        onClick={handleSubmit}
      >
        {mutation.isPending
          ? "Menyimpan..."
          : type === "income"
            ? "Simpan Penghasilan"
            : "Simpan Pengeluaran"}
      </Button>

    </div>
  );
}