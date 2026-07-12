"use client";

import { User } from "lucide-react";

interface Profile {
  id: string;
  name: string;
  role: "husband" | "wife";
}

interface ProfileSelectorProps {
  value: string;
  profiles: Profile[];
  onChange: (id: string) => void;
}

export function ProfileSelector({
  value,
  profiles,
  onChange,
}: ProfileSelectorProps) {
  return (
    <div className="space-y-3">

      <p className="text-sm text-zinc-400">
        Penerima
      </p>

      <div className="grid grid-cols-2 gap-3">

        {profiles.map((profile) => {

          const active = value === profile.id;

          return (
            <button
              key={profile.id}
              type="button"
              onClick={() => onChange(profile.id)}
              className={`
                rounded-2xl
                border
                p-4
                transition-all

                ${
                  active
                    ? "border-orange-500 bg-orange-500/10"
                    : "border-zinc-800 bg-zinc-900"
                }
              `}
            >
              <div className="mb-3 flex justify-center">

                <div
                  className={`
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full

                    ${
                      active
                        ? "bg-orange-500/20"
                        : "bg-zinc-800"
                    }
                  `}
                >
                  <User
                    size={22}
                    className={
                      active
                        ? "text-orange-400"
                        : "text-zinc-400"
                    }
                  />
                </div>

              </div>

              <p className="font-medium text-white">
                {profile.name}
              </p>

              <p className="mt-1 text-xs text-zinc-500">
                {profile.role === "husband"
                  ? "Suami"
                  : "Istri"}
              </p>

            </button>
          );

        })}

      </div>

    </div>
  );
}