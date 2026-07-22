"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { IconButton } from "@/components/ui/IconButton";
import { Logomark } from "@/components/ui/Logomark";
import { logout } from "@/hooks/useAuth";

export function DashboardHeader() {
  const router = useRouter();

  function handleLogout() {
    logout();
    router.replace("/");
  }

  return (
    <header className="flex items-center justify-between">

      <div className="flex items-center gap-3">
        <Logomark size={30} />

        <div className="leading-tight">
          <h1 className="font-display text-xl font-bold tracking-wide text-ink">
            NOURA
          </h1>

          <p className="text-xs text-ink-faint">
            Financial Clarity System
          </p>
        </div>
      </div>

      <IconButton
        icon={LogOut}
        aria-label="Keluar"
        variant="outline"
        onClick={handleLogout}
      />

    </header>
  );
}