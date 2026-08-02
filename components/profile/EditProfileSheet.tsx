"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CalendarDays, ChevronRight } from "lucide-react";

import { BottomSheet } from "@/components/ui/BottomSheet";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Switch } from "@/components/ui/Switch";

import { DayPicker } from "@/components/period/DayPicker";

import {
  Profile,
  updateProfile,
} from "@/services/profile.service";

import {
  formatIDRInput,
  parseIDRInput,
} from "@/lib/format-currency";

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

  const [salaryDay, setSalaryDay] =
    useState<number | null>(null);

  const [salary, setSalary] =
    useState("");

  const [autoSalary, setAutoSalary] =
    useState(false);

  const [dayPickerOpen, setDayPickerOpen] =
    useState(false);

  useEffect(() => {
    if (!profile) return;

    setName(profile.name);

    setSalaryDay(profile.salary_day);

    setSalary(
      profile.base_salary
        ? formatIDRInput(
            String(profile.base_salary)
          )
        : ""
    );

    setAutoSalary(
      profile.auto_salary_enabled
    );
  }, [profile]);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!profile) return;

    try {
      await updateProfile({
        id: profile.id,
        name: name.trim(),
        salary_day: salaryDay,
        base_salary:
          salary === ""
            ? null
            : Number(
                parseIDRInput(salary)
              ),
        auto_salary_enabled:
          autoSalary,
      });

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
    <>
      <BottomSheet
        open={open}
        title="Edit Profil"
        onClose={onClose}
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
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
              Tanggal Gajian
            </label>

            <button
              type="button"
              onClick={() =>
                setDayPickerOpen(true)
              }
              className="
                flex
                h-12
                w-full
                items-center
                justify-between
                rounded-2xl
                border
                border-border
                bg-surface
                px-4
                transition
                hover:border-accent/40
              "
            >
              <div className="flex items-center gap-3">
                <CalendarDays
                  size={18}
                  className="text-zinc-400"
                />

                <span className="text-white">
                  {salaryDay
                    ? `${salaryDay} setiap bulan`
                    : "Pilih tanggal"}
                </span>
              </div>

              <ChevronRight
                size={18}
                className="text-zinc-500"
              />
            </button>
          </FormField>

          <FormField>
            <label className="text-sm text-zinc-400">
              Gaji Pokok
            </label>

            <Input
              inputMode="numeric"
              placeholder="Rp0"
              value={salary}
              onChange={(e) =>
                setSalary(
                  formatIDRInput(
                    e.target.value
                  )
                )
              }
            />
          </FormField>

          <div className="flex items-center justify-between rounded-2xl border border-border bg-surface px-4 py-4">
            <div>
              <p className="font-medium text-white">
                Auto Salary
              </p>

              <p className="mt-1 text-sm text-zinc-500">
                Tambahkan gaji otomatis
                setiap bulan.
              </p>
            </div>

            <Switch
              checked={autoSalary}
              onChange={setAutoSalary}
            />
          </div>

          <Button
            type="submit"
            disabled={name.trim() === ""}
          >
            Simpan Perubahan
          </Button>
        </form>
      </BottomSheet>

      <DayPicker
        open={dayPickerOpen}
        value={salaryDay}
        onClose={() =>
          setDayPickerOpen(false)
        }
        onSelect={setSalaryDay}
      />
    </>
  );
}