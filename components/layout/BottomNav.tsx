"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Plus } from "lucide-react";

import type { NavItem as NavItemType } from "@/lib/types";

import { NavItem } from "./NavItem";
import { FloatingActionMenu } from "./FloatingActionMenu";

interface BottomNavProps {
  items: NavItemType[];
}

export function BottomNav({
  items,
}: BottomNavProps) {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  const left = items.slice(0, 2);
  const right = items.slice(2, 4);

  return (
    <>
      <nav
        className="sticky bottom-0 z-20 border-t border-border bg-background/95 px-6 pt-3 pb-[max(env(safe-area-inset-bottom),0.75rem)] backdrop-blur"
        aria-label="Navigasi utama"
      >
        <div className="relative grid grid-cols-5 items-center">

          {left.map((item) => (
            <NavItem
              key={item.id}
              {...item}
              active={pathname === item.href}
            />
          ))}

          <div />

          {right.map((item) => (
            <NavItem
              key={item.id}
              {...item}
              active={pathname === item.href}
            />
          ))}

          <button
            type="button"
            aria-label="Menu Cepat"
            onClick={() => setOpen(true)}
            className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-black shadow-fab transition-transform hover:scale-105"
          >
            <Plus size={26} />
          </button>

        </div>
      </nav>

      <FloatingActionMenu
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}