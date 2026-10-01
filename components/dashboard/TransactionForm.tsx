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
import {
  useCreateTransaction,
  useCreateTransfer,
  useCreateReturn,
} from "@/hooks/useTransactions";

import {
  formatIDRInput,
  parseIDRInput,
} from "@/lib/format-currency";

interface TransactionFormProps {
  type: "income" | "expense" | "transfer" | "return";
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

  const categoryType =
    type === "expense" ? "expense" : "income";

  const { data: categories = [] } =
    useCategories(categoryType);

  const transactionMutation =
    useCreateTransaction();

  const transferMutation =
    useCreateTransfer();

  const returnMutation =
    useCreateReturn();

  const [profileId, setProfileId] =
    useState("");

  const [fromProfileId, setFromProfileId] =
    useState("");

  const [toProfileId, setToProfileId] =
    useState("");

  const [categoryId, setCategoryId] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [categoryOpen, setCategoryOpen] =
    useState(false);

  const [fromProfileOpen, setFromProfileOpen] =
    useState(false);

  const [toProfileOpen, setToProfileOpen] =
    useState(false);

  const [transactionDate, setTransactionDate] =
    useState(getTodayIndonesia());

  const isPending =
    transactionMutation.isPending ||
    transferMutation.isPending ||
    returnMutation.isPending;

  async function handleSubmit() {
    /*
     * TRANSFER
     */
    if (type === "transfer") {
      if (!fromProfileId) {
        toast.error("Pilih pengirim");
        return;
      }

      if (!toProfileId) {
        toast.error("Pilih penerima");
        return;
      }

      if (fromProfileId === toProfileId) {
        toast.error("Pengirim dan penerima tidak boleh sama");
        return;
      }

      if (!amount) {
        toast.error("Masukkan nominal");
        return;
      }

      try {
        await transferMutation.mutateAsync({
          fromProfileId,
          toProfileId,
          amount: Number(amount),
          description,
          transactionDate,
        });

        toast.success("Transfer berhasil disimpan");

        setFromProfileId("");
        setToProfileId("");
        setAmount("");
        setDescription("");

        onSuccess?.();
      } catch (error) {
        console.error(error);

        toast.error(
          error instanceof Error
            ? error.message
            : "Terjadi kesalahan saat menyimpan transfer."
        );
      }

      return;
    }

    /*
     * PENGEMBALIAN
     */
    if (type === "return") {
      if (!profileId) {
        toast.error("Pilih penerima");
        return;
      }

      if (!amount) {
        toast.error("Masukkan nominal");
        return;
      }

      try {
        await returnMutation.mutateAsync({
          profileId,
          amount: Number(amount),
          description,
          transactionDate,
        });

        toast.success("Pengembalian berhasil disimpan");

        setProfileId("");
        setAmount("");
        setDescription("");

        onSuccess?.();
      } catch (error) {
        console.error(error);

        toast.error(
          error instanceof Error
            ? error.message
            : "Terjadi kesalahan saat menyimpan pengembalian."
        );
      }

      return;
    }

    /*
     * PEMASUKAN / PENGELUARAN
     */
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
      await transactionMutation.mutateAsync({
        profileId,
        categoryId,
        type,
        amount: Number(amount),
        description,
        transactionDate,
      });

      toast.success(
        type === "income"
          ? "Pemasukan berhasil disimpan"
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
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat menyimpan transaksi."
      );
    }
  }

  /*
   * TRANSFER FORM
   */
  if (type === "transfer") {
    return (
      <div className="space-y-6">

        <PickerField
          label="Dari"
          value={
            profiles.find(
              (profile) =>
                profile.id === fromProfileId
            )?.name ?? "Pilih pengirim"
          }
          onClick={() =>
            setFromProfileOpen(true)
          }
        />

        <PickerSheet
          open={fromProfileOpen}
          title="Pilih Pengirim"
          value={fromProfileId}
          options={profiles.map((profile) => ({
            value: profile.id,
            label: profile.name,
          }))}
          onClose={() =>
            setFromProfileOpen(false)
          }
          onSelect={setFromProfileId}
        />

        <PickerField
          label="Kepada"
          value={
            profiles.find(
              (profile) =>
                profile.id === toProfileId
            )?.name ?? "Pilih penerima"
          }
          onClick={() =>
            setToProfileOpen(true)
          }
        />

        <PickerSheet
          open={toProfileOpen}
          title="Pilih Penerima"
          value={toProfileId}
          options={profiles.map((profile) => ({
            value: profile.id,
            label: profile.name,
          }))}
          onClose={() =>
            setToProfileOpen(false)
          }
          onSelect={setToProfileId}
        />

        <FormField>
          <Label>Tanggal</Label>

          <Input
            type="date"
            value={transactionDate}
            onChange={(e) =>
              setTransactionDate(
                e.target.value
              )
            }
          />
        </FormField>

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
          disabled={isPending}
          onClick={handleSubmit}
        >
          {isPending
            ? "Menyimpan..."
            : "Simpan Transfer"}
        </Button>

      </div>
    );
  }

  /*
   * PENGEMBALIAN FORM
   */
  if (type === "return") {
    return (
      <div className="space-y-6">

        <ProfileSelector
          value={profileId}
          profiles={profiles}
          onChange={setProfileId}
        />

        <FormField>
          <Label>Tanggal</Label>

          <Input
            type="date"
            value={transactionDate}
            onChange={(e) =>
              setTransactionDate(
                e.target.value
              )
            }
          />
        </FormField>

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
          disabled={isPending}
          onClick={handleSubmit}
        >
          {isPending
            ? "Menyimpan..."
            : "Simpan Pengembalian"}
        </Button>

      </div>
    );
  }

  /*
   * PEMASUKAN / PENGELUARAN FORM
   */
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
            (category) =>
              category.id === categoryId
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
          (item) => ({
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
        <Label>Tanggal</Label>

        <Input
          type="date"
          value={transactionDate}
          onChange={(e) =>
            setTransactionDate(
              e.target.value
            )
          }
        />
      </FormField>

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
        disabled={isPending}
        onClick={handleSubmit}
      >
        {isPending
          ? "Menyimpan..."
          : type === "income"
            ? "Simpan Pemasukan"
            : "Simpan Pengeluaran"}
      </Button>

    </div>
  );
}