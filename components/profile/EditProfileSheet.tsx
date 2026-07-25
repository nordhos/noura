"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { BottomSheet } from "@/components/ui/BottomSheet";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";

import {
  Profile,
  updateProfile,
} from "@/services/profile.service";

import { useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();

  const [name, setName] = useState("");

  useEffect(() => {
    if (!profile) return;

    setName(profile.name);
  }, [profile]);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!profile) return;

    try {
      await updateProfile(
        profile.id,
        name
      );

      await queryClient.invalidateQueries({
        queryKey: ["profiles"],
      });

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

        <div className="pt-2">
          <Button
            type="submit"
            disabled={
              name.trim() === ""
            }
          >
            Simpan
          </Button>
        </div>
      </form>
    </BottomSheet>
  );
}