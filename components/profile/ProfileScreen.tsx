"use client";

import { useState } from "react";

import { BackButton } from "@/components/ui/BackButton";
import { BottomNav } from "@/components/layout/BottomNav";
import { navItems } from "@/lib/mock-data";

import {
  Pencil,
  User,
} from "lucide-react";

import { useProfiles } from "@/hooks/useProfiles";
import { EditProfileSheet } from "./EditProfileSheet";

import type { Profile } from "@/services/profile.service";

export function ProfileScreen() {
  const { data, isLoading } = useProfiles();

  const [selectedProfile, setSelectedProfile] =
    useState<Profile | null>(null);

  const [sheetOpen, setSheetOpen] =
    useState(false);

  function openEditor(profile: Profile) {
    setSelectedProfile(profile);
    setSheetOpen(true);
  }

  function closeEditor() {
    setSheetOpen(false);
    setSelectedProfile(null);
  }

  if (isLoading) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-md items-center justify-center">
        <p className="text-zinc-400">
          Memuat...
        </p>
      </main>
    );
  }

  return (
    <>
      <main className="mx-auto w-full max-w-md space-y-6 px-5 pb-28 pt-6">

        <header className="flex items-center gap-3">
          <BackButton href="/dashboard" />

          <div>
            <h1 className="text-2xl font-bold text-white">
              Profil
            </h1>

            <p className="mt-1 text-sm text-zinc-400">
              Kelola profil yang menggunakan NOURA
            </p>
          </div>
        </header>

        {data?.map((profile) => (
          <ProfileCard
            key={profile.id}
            profile={profile}
            onEdit={() => openEditor(profile)}
          />
        ))}

        <EditProfileSheet
          open={sheetOpen}
          profile={selectedProfile}
          onClose={closeEditor}
        />
      </main>

      <BottomNav items={navItems} />
    </>
  );
}

interface ProfileCardProps {
  profile: Profile;
  onEdit: () => void;
}

function ProfileCard({
  profile,
  onEdit,
}: ProfileCardProps) {
  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5">

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10">
            <User
              size={22}
              className="text-orange-400"
            />
          </div>

          <div>
            <p className="text-lg font-semibold text-white">
              {profile.name}
            </p>

            <p className="text-sm text-zinc-500">
              Profil Pengguna
            </p>
          </div>

        </div>

        <button
          type="button"
          onClick={onEdit}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-700 text-zinc-400 transition hover:bg-zinc-900"
        >
          <Pencil size={18} />
        </button>

      </div>

    </section>
  );
}