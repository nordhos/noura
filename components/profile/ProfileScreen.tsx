"use client";

import { User, Wallet, Pencil } from "lucide-react";

import { useProfiles } from "@/hooks/useProfiles";
import { formatIDR } from "@/lib/format-currency";

export function ProfileScreen() {
  const { data, isLoading } = useProfiles();

  if (isLoading) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-md items-center justify-center">
        <p className="text-zinc-400">Memuat...</p>
      </main>
    );
  }

  const husband = data?.find((item) => item.role === "husband");
  const wife = data?.find((item) => item.role === "wife");

  return (
    <main className="mx-auto w-full max-w-md space-y-6 px-5 pb-28 pt-6">
      <div>
        <h1 className="text-2xl font-bold text-white">
          Profil
        </h1>

        <p className="mt-1 text-sm text-zinc-400">
          Konfigurasi Keuangan
        </p>
      </div>

      <ProfileCard
        title="Suami"
        icon={
          <User
            className="text-orange-400"
            size={22}
          />
        }
        accent="bg-orange-500/10"
        name={husband?.name ?? "-"}
        salary={husband?.salary ?? 0}
        payday={husband?.payday ?? 0}
        onEdit={() => {
          // next step
        }}
      />

      <ProfileCard
        title="Istri"
        icon={
          <Wallet
            className="text-pink-400"
            size={22}
          />
        }
        accent="bg-pink-500/10"
        name={wife?.name ?? "-"}
        salary={wife?.salary ?? 0}
        payday={wife?.payday ?? 0}
        onEdit={() => {
          // next step
        }}
      />
    </main>
  );
}

interface ProfileCardProps {
  title: string;
  icon: React.ReactNode;
  accent: string;

  name: string;
  salary: number;
  payday: number;

  onEdit: () => void;
}

function ProfileCard({
  title,
  icon,
  accent,
  name,
  salary,
  payday,
  onEdit,
}: ProfileCardProps) {
  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5">

      <div className="mb-5 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div
            className={`flex h-11 w-11 items-center justify-center rounded-2xl ${accent}`}
          >
            {icon}
          </div>

          <div>
            <p className="text-lg font-semibold text-white">
              {title}
            </p>

            <p className="text-sm text-zinc-500">
              Profil Keuangan
            </p>
          </div>

        </div>

        <button
          onClick={onEdit}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-700 text-zinc-400 transition hover:bg-zinc-900"
        >
          <Pencil size={18} />
        </button>

      </div>

      <div className="space-y-4">

        <PersonCard
          label="Nama"
          value={name}
        />

        <PersonCard
          label="Gaji Pokok"
          value={formatIDR(salary)}
        />

        <PersonCard
          label="Tanggal Gajian"
          value={`${payday}`}
        />

      </div>

    </section>
  );
}

interface PersonCardProps {
  label: string;
  value: string;
}

function PersonCard({
  label,
  value,
}: PersonCardProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3">

      <span className="text-sm text-zinc-400">
        {label}
      </span>

      <span className="font-medium text-white">
        {value}
      </span>

    </div>
  );
}