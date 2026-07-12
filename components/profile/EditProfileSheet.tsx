"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { BottomSheet } from "@/components/ui/BottomSheet";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";

import {
  Profile,
  UpdateProfilePayload,
} from "@/services/profile.service";

import { useUpdateProfile } from "@/hooks/useProfiles";

interface EditProfileSheetProps {
  open: boolean;
  profile: Profile | null;
  onClose: () => void;
}

export function EditProfileSheet({
  open,
  profile,
  onClose,
}: EditProfileSheetProps) {
  const updateProfile = useUpdateProfile();

  const [name, setName] = useState("");

  const [salary, setSalary] =
    useState("");

  const [payday, setPayday] =
    useState("");

  useEffect(() => {
    if (!profile) return;

    setName(profile.name);

    setSalary(
      profile.salary.toString()
    );

    setPayday(
      profile.payday.toString()
    );
  }, [profile]);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!profile) return;

    const payload: UpdateProfilePayload = {
      id: profile.id,

      name: name.trim(),

      salary: Number(salary),

      payday: Number(payday),
    };

    try {
      await updateProfile.mutateAsync(
        payload
      );

      toast.success(
        "Profil berhasil diperbarui."
      );

      onClose();
    } catch {
      toast.error(
        "Gagal memperbarui profil."
      );
    }
  }
  return (
    <BottomSheet
      open={open}
      title="Edit Profil"
      onClose={onClose}
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <FormField>

          <label className="text-sm text-zinc-400">
            Nama
          </label>

          <Input
            value={name}
            placeholder="Masukkan nama"
            onChange={(e) =>
              setName(e.target.value)
            }
          />

        </FormField>

        <FormField>

          <label className="text-sm text-zinc-400">
            Gaji Bulanan
          </label>

          <Input
            type="number"
            inputMode="numeric"
            value={salary}
            placeholder="10000000"
            onChange={(e) =>
              setSalary(e.target.value)
            }
          />

        </FormField>
        <FormField>

<label className="text-sm text-zinc-400">
  Tanggal Gajian
</label>

<Input
  type="number"
  inputMode="numeric"
  min={1}
  max={31}
  value={payday}
  placeholder="25"
  onChange={(e) =>
    setPayday(e.target.value)
  }
/>

</FormField>

<div className="pt-2">

<Button
  type="submit"
  disabled={
    updateProfile.isPending ||
    name.trim() === "" ||
    salary === "" ||
    payday === ""
  }
>
  {updateProfile.isPending
    ? "Menyimpan..."
    : "Simpan"}
</Button>

</div>
</form>
    </BottomSheet>
  );
}