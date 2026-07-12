"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Section } from "@/components/ui/Section";

import { useIncome, useUpdateIncome } from "@/hooks/useIncome";

interface IncomeFormProps {
  onSuccess?: () => void;
}

export function IncomeForm({
  onSuccess,
}: IncomeFormProps) {
  const router = useRouter();

  const { data, isLoading } = useIncome();
  const mutation = useUpdateIncome();

  const [husbandMain, setHusbandMain] = useState("");
  const [husbandExtra, setHusbandExtra] = useState("");

  const [wifeMain, setWifeMain] = useState("");
  const [wifeExtra, setWifeExtra] = useState("");

  useEffect(() => {
    if (!data) return;

    setHusbandMain(String(data.husbandMain));
    setHusbandExtra(String(data.husbandExtra));

    setWifeMain(String(data.wifeMain));
    setWifeExtra(String(data.wifeExtra));
  }, [data]);

  if (isLoading) {
    return (
      <div className="py-10 text-center">
        Loading...
      </div>
    );
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      await mutation.mutateAsync({
        husbandMain: Number(husbandMain) || 0,
        husbandExtra: Number(husbandExtra) || 0,
        wifeMain: Number(wifeMain) || 0,
        wifeExtra: Number(wifeExtra) || 0,
      });

      router.refresh();

      onSuccess?.();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <Section title="Penghasilan Suami">
        <FormField>
          <Label>Gaji Pokok</Label>

          <Input
            type="number"
            disabled={mutation.isPending}
            value={husbandMain}
            onChange={(e) => setHusbandMain(e.target.value)}
          />
        </FormField>

        <FormField>
          <Label>Penghasilan Tambahan</Label>

          <Input
            type="number"
            disabled={mutation.isPending}
            value={husbandExtra}
            onChange={(e) => setHusbandExtra(e.target.value)}
          />
        </FormField>
      </Section>

      <Section title="Penghasilan Istri">
        <FormField>
          <Label>Gaji Pokok</Label>

          <Input
            type="number"
            disabled={mutation.isPending}
            value={wifeMain}
            onChange={(e) => setWifeMain(e.target.value)}
          />
        </FormField>

        <FormField>
          <Label>Penghasilan Tambahan</Label>

          <Input
            type="number"
            disabled={mutation.isPending}
            value={wifeExtra}
            onChange={(e) => setWifeExtra(e.target.value)}
          />
        </FormField>
      </Section>

      <Button
        type="submit"
        disabled={mutation.isPending}
      >
        {mutation.isPending
          ? "Menyimpan..."
          : "Simpan Penghasilan"}
      </Button>
    </form>
  );
}