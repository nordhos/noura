"use client";

import { useRecentTransactions } from "@/hooks/useTransactions";
import { TransactionItem } from "./TransactionItem";
import { useRouter } from "next/navigation";

export default function RecentTransactions() {
    const router = useRouter();
    const {
        data = [],
        isLoading,
    } = useRecentTransactions();

    if (isLoading) {
        return (
            <section className="space-y-3">
                <h2 className="text-lg font-semibold text-white">
                    Transaksi Terbaru
                </h2>

                <p className="text-sm text-zinc-400">
                    Memuat...
                </p>
            </section>
        );
    }

    if (data.length === 0) {
        return (
            <section className="space-y-3">
                <h2 className="text-lg font-semibold text-white">
                    Transaksi Terbaru
                </h2>

                <p className="text-sm text-zinc-400">
                    Belum ada transaksi.
                </p>
            </section>
        );
    }

    return (
        <section className="space-y-3">

            <div className="flex items-center justify-between">

                <h2 className="text-lg font-semibold">
                    Transaksi Terbaru
                </h2>

                <button
                    type="button"
                    onClick={() => router.push("/transaksi")}
                    className="text-sm font-medium text-accent transition hover:opacity-80"
                >
                    Lihat Semua
                </button>

            </div>

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
                            month: "short",
                        })}
                    />
                ))}

            </div>

        </section>
    );
}