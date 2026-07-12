"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import type { NavItem as NavItemType } from "@/lib/types";

import { NavItem } from "./NavItem";
import { FloatingActionMenu } from "./FloatingActionMenu";
import { TransactionSheet } from "@/components/dashboard/TransactionSheet";

interface BottomNavProps {
  items: NavItemType[];
}

export function BottomNav({
  items,
}: BottomNavProps) {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [incomeOpen, setIncomeOpen] = useState(false);
const [expenseOpen, setExpenseOpen] = useState(false);

const left = items.slice(0, 2);
const right = items.slice(2, 4);

const mappedRight = right.map((item) => {
  if (item.label === "Laporan") {
    return {
      ...item,
      href: "#",
    };
  }

  return item;
});

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

          {mappedRight.map((item) => {
  if (item.label === "Laporan") {
    return (
      <button
        key={item.id}
        type="button"
        onClick={() =>
          toast.info("Dalam proses pengembangan.")
        }
        className="flex flex-col items-center justify-center gap-1 text-ink-faint transition hover:text-white"
      >
        <item.icon size={22} />

        <span className="text-xs">
          {item.label}
        </span>
      </button>
    );
  }

  return (
    <NavItem
      key={item.id}
      {...item}
      active={pathname === item.href}
    />
  );
})}

          <button
            type="button"
            aria-label="Menu Cepat"
            onClick={() => setMenuOpen(true)}
            className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-black shadow-fab transition-transform hover:scale-105"
          >
            <Plus size={26} />
          </button>

        </div>
      </nav>

      <FloatingActionMenu
  open={menuOpen}
  onClose={() => setMenuOpen(false)}
  onIncome={() => setIncomeOpen(true)}
  onExpense={() => setExpenseOpen(true)}
/>

<TransactionSheet
  type="income"
  open={incomeOpen}
  onClose={() => setIncomeOpen(false)}
/>

<TransactionSheet
  type="expense"
  open={expenseOpen}
  onClose={() => setExpenseOpen(false)}
/>
    </>
  );
}