"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { BottomNav } from "@/components/layout/BottomNav";
import { TransactionItem } from "@/components/dashboard/TransactionItem";

import { navItems } from "@/lib/mock-data";
import { useAllTransactions } from "@/hooks/useTransactions";
import { isAuthenticated } from "@/hooks/useAuth";

export default function TransactionPage() {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/");
    }
  }, [router]);

  const {
    data = [],
    isLoading,
  } = useAllTransactions();

  return (
    <>
      <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 pt-6 pb-28">

        <div className="mb-6 flex items-center gap-3">

          <Link
            href="/dashboard"
            className="rounded-xl border border-border p-2"
          >
            <ArrowLeft size={18} />
          </Link>

          <div>
            <h1 className="text-2xl font-bold">
              Riwayat Transaksi
            </h1>

            <p className="text-sm text-zinc-400">
              Semua transaksi terbaru
            </p>
          </div>

        </div>

        {isLoading && (
          <p>Loading...</p>
        )}

        {!isLoading && data.length === 0 && (
          <p className="text-zinc-400">
            Belum ada transaksi.
          </p>
        )}

        <div className="divide-y divide-border rounded-2xl border border-border bg-card px-4">

          {data.map((item) => (
            <TransactionItem
            id={item.id}
            key={item.id}
              type={item.type}
              category={
                item.transaction_categories?.name ??
                "-"
              }
              profile={
                item.profiles?.name ??
                "-"
              }
              amount={Number(item.amount)}
              date={new Date(
                item.transaction_date
              ).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
              })}
            />
          ))}

        </div>

      </main>

      <BottomNav items={navItems} />
    </>
  );
}