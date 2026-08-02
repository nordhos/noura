"use client";

import { Download } from "lucide-react";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { YearSelector } from "@/components/period/YearSelector";
import { navItems } from "@/lib/mock-data";
import { formatIDR } from "@/lib/format-currency";
import { useState } from "react";
import { useAnnualReport } from "@/hooks/useReport";
import { CashFlowChart } from "@/components/report/CashFlowChart";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { AnnualReport } from "@/components/report/AnnualReport";
import { BackButton } from "@/components/ui/BackButton";

export default function ReportPage() {

    const currentYear = new Date().getFullYear();

    const [selectedYear, setSelectedYear] = useState(currentYear);

    const years = Array.from(
        { length: 9 },
        (_, index) => 2026 + index
    );

    const {
        data,
        isLoading,
        error,
    } = useAnnualReport(selectedYear);

    const monthlyPdfData =
    data?.monthly.map((item) => ({
        month: String(item.month),
        income: item.income,
        expense: item.expense,
        balance: item.income - item.expense,
    })) ?? [];

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

                <BackButton href="/dashboard" />

                    <div>

                        <h1 className="mt-1 text-3xl font-bold">
                            Laporan
                        </h1>

                        <p className="mt-2 text-sm text-zinc-400">
                            Ringkasan laporan lifetime dan yearly.
                        </p>

                        <YearSelector
                            year={selectedYear}
                            years={years}
                            onChange={setSelectedYear}
                        />
                    </div>

                </div>

                <div className="space-y-5">

                    {/* HERO BALANCE */}

                    <Card className="overflow-hidden border border-accent/30 bg-gradient-to-br from-[#1b140c] via-[#171514] to-card">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-zinc-400">
                                    Saldo Berjalan (Lifetime)
                                </p>

                                <h2 className="mt-3 text-3xl font-bold text-emerald-400">
                                    {formatIDR(data.lifetime.balance)}
                                </h2>

                                <p className="mt-2 text-sm text-zinc-500">
                                    Sejak pertama menggunakan NOURA
                                </p>

                            </div>

                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/15 text-1xl">

                                💸

                            </div>

                        </div>

                    </Card>

                    <Card>

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-zinc-400">
                                    Saldo Bersih (Yearly)
                                </p>

                                <h2 className="mt-2 text-3xl font-bold text-accent">

                                    {formatIDR(data.annual.balance)}

                                </h2>

                                <p className="mt-2 text-sm text-zinc-500">
                                    Tahun {selectedYear}
                                </p>

                            </div>

                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/15 text-1xl">

                                💰

                            </div>

                        </div>

                    </Card>

                    {/* TOTAL PENGHASILAN */}

                    <Card>

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-zinc-400">
                                    Total Pemasukan (Yearly)
                                </p>

                                <h2 className="mt-2 text-2xl font-bold text-white-400">
                                    {formatIDR(data.annual.income.total)}
                                </h2>

                                <div className="mt-5 border-t border-border pt-4 space-y-3">

                                    {data.annual.income.profiles.map((profile) => (

                                        <div
                                            key={profile.profileId}
                                            className="flex items-center justify-between"
                                        >

                                            <span className="text-sm text-zinc-500">
                                                {profile.name}
                                            </span>

                                            <span className="font-medium">
                                                {formatIDR(profile.amount)}
                                            </span>

                                        </div>

                                    ))}

                                </div>

                                <p className="mt-2 text-sm text-zinc-500">
                                    Tahun {selectedYear}
                                </p>

                            </div>

                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/15 text-1xl">

                                💼

                            </div>

                        </div>

                    </Card>

                    {/* TOTAL PENGELUARAN */}

                    <Card>

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-zinc-400">
                                    Total Pengeluaran (Yearly)
                                </p>

                                <h2 className="mt-2 text-2xl font-bold text-red-400">
                                    {formatIDR(data.annual.expense.total)}
                                </h2>

                                <div className="mt-5 border-t border-border pt-4 space-y-3">

                                    {data.annual.expense.profiles.map((profile) => (

                                        <div
                                            key={profile.profileId}
                                            className="flex items-center justify-between"
                                        >

                                            <span className="text-sm text-zinc-500">
                                                {profile.name}
                                            </span>

                                            <span className="font-medium">
                                                {formatIDR(profile.amount)}
                                            </span>

                                        </div>

                                    ))}

                                </div>

                                <p className="mt-2 text-sm text-zinc-500">
                                    Tahun {selectedYear}
                                </p>

                            </div>

                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-red-500/15 text-1xl">

                                🛍️

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

                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/15 px-3 py-2 text-lg">

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

                    <PDFDownloadLink
                        document={
                            <AnnualReport
                                year={selectedYear}
                                lifetimeBalance={data.lifetime.balance}
                                annualBalance={data.annual.balance}
                                totalIncome={data.annual.income.total}
                                totalExpense={data.annual.expense.total}
                                incomeProfiles={data.annual.income.profiles}
                                expenseProfiles={data.annual.expense.profiles}
                                monthly={monthlyPdfData}
                            />
                        }
                        fileName={`NOURA_Laporan_${selectedYear}.pdf`}
                        className="mt-5 w-full"
                    >
                        {({ loading }) => (
                            <Button
                                type="button"
                                className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl"
                            >
                                <Download size={20} />

                                <span className="font-medium">
                                    {loading
                                        ? "Menyiapkan PDF..."
                                        : "Download PDF"}
                                </span>
                            </Button>
                        )}
                    </PDFDownloadLink>

                </div>

            </main>

            <BottomNav items={navItems} />
        </>
    );
}