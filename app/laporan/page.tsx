"use client";

import Link from "next/link";
import { ArrowLeft, FileDown } from "lucide-react";

import { BottomNav } from "@/components/layout/BottomNav";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

import { navItems } from "@/lib/mock-data";
import { formatIDR } from "@/lib/format-currency";

import { useReport } from "@/hooks/useReport";

import { FinancialInsight } from "@/components/report/FinancialInsight";
import { CashFlowChart } from "@/components/report/CashFlowChart";

export default function ReportPage() {
    const {
        data,
        isLoading,
        error,
    } = useReport();

    if (isLoading) {
        return (
            <>
                <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 pt-6 pb-28">
                    <p>Memuat laporan...</p>
                </main>

                <BottomNav items={navItems} />
            </>
        );
    }

    if (error || !data) {
        return (
            <>
                <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 pt-6 pb-28">
                    <p>Gagal mengambil laporan.</p>
                </main>

                <BottomNav items={navItems} />
            </>
        );
    }

    return (
        <>
            <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 pt-6 pb-28">

                <div className="mb-10 flex items-center gap-3">

                    <Link
                        href="/dashboard"
                        className="rounded-2xl border border-border bg-card p-3 transition hover:border-accent"
                    >
                        <ArrowLeft size={18} />
                    </Link>

                    <div>

                        <p className="text-xs uppercase tracking-[0.25em] text-accent">
                            NOURA
                        </p>

                        <h1 className="mt-1 text-3xl font-bold">
                            Laporan
                        </h1>

                        <p className="mt-1 text-sm text-zinc-400">
                            Ringkasan keuanganmu sejak awal menggunakan NOURA.
                        </p>

                    </div>

                </div>

                <div className="space-y-5">

                    {/* HERO BALANCE */}

                    <Card className="overflow-hidden border border-accent/30 bg-gradient-to-br from-[#1b140c] via-[#171514] to-card">

                        <div className="flex items-start justify-between">

                            <div>

                                <p className="text-sm text-zinc-400">
                                    Saldo Saat Ini
                                </p>

                                <h2 className="mt-3 text-4xl font-bold text-white">
                                    {formatIDR(data.totalBalance)}
                                </h2>

                                <p className="mt-3 text-sm text-accent">
                                    Sejak pertama menggunakan NOURA
                                </p>

                            </div>

                            <div className="rounded-2xl bg-accent/15 p-4 text-3xl">
                                💰
                            </div>

                        </div>

                    </Card>

                    <FinancialInsight
                        totalIncome={data.totalIncome}
                        totalExpense={data.totalExpense}
                    />

                    {/* TOTAL PENGHASILAN */}

                    <Card>

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-zinc-400">
                                    Total Penghasilan
                                </p>

                                <h2 className="mt-2 text-3xl font-bold text-emerald-400">
                                    {formatIDR(data.totalIncome)}
                                </h2>

                            </div>

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 text-3xl">

                                💵

                            </div>

                        </div>

                    </Card>

                    {/* TOTAL PENGELUARAN */}

                    <Card>

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-zinc-400">
                                    Total Pengeluaran
                                </p>

                                <h2 className="mt-2 text-3xl font-bold text-red-400">
                                    {formatIDR(data.totalExpense)}
                                </h2>

                            </div>

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/15 text-3xl">

                                💸

                            </div>

                        </div>

                    </Card>

                    {/* TOTAL TRANSAKSI */}

                    <Card>

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-zinc-400">
                                    Total Transaksi
                                </p>

                                <h2 className="mt-2 text-3xl font-bold">
                                    {data.totalTransaction}
                                </h2>

                            </div>

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/15 text-3xl">

                                🧾

                            </div>

                        </div>

                    </Card>

                    <Card className="mt-2">

                        <div className="flex items-center justify-between">

                            <div>

                                <h2 className="text-lg font-semibold">
                                    Cash Flow Bulanan
                                </h2>

                                <p className="mt-1 text-sm text-zinc-400">
                                    Perbandingan penghasilan dan pengeluaran setiap bulan.
                                </p>

                            </div>

                            <div className="rounded-2xl bg-accent/15 px-3 py-2 text-lg">

                                📈

                            </div>

                        </div>

                        {data.monthly.length <= 1 ? (

                            <div className="mt-8 flex h-56 flex-col items-center justify-center rounded-2xl border border-dashed border-border">

                                <div className="text-5xl">
                                    📊
                                </div>

                                <h3 className="mt-4 font-semibold">
                                    Grafik belum tersedia
                                </h3>

                                <p className="mt-2 max-w-xs text-center text-sm text-zinc-500">
                                    Grafik Cash Flow akan muncul setelah
                                    terdapat histori transaksi minimal
                                    dua bulan.
                                </p>

                            </div>

                        ) : (

                            <CashFlowChart
                                data={data.monthly}
                            />

                        )}

                    </Card>

                    <Button
                        type="button"
                        disabled
                        className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl"
                    >
                        <FileDown size={20} />

                        <span className="font-medium">
                            Segera hadir
                        </span>
                    </Button>

                </div>

            </main>

            <BottomNav items={navItems} />
        </>
    );
}