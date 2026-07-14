import { Card } from "@/components/ui/Card";

interface FinancialInsightProps {
  totalIncome: number;
  totalExpense: number;
}

export function FinancialInsight({
  totalIncome,
  totalExpense,
}: FinancialInsightProps) {

  const expenseRatio =
    totalIncome === 0
      ? 0
      : (totalExpense / totalIncome) * 100;

  const score = Math.max(
    0,
    Math.round(100 - expenseRatio)
  );

  let emoji = "🟢";
  let status = "Excellent";

  let title =
    "Kondisi keuangan sangat baik.";

  let description =
    "Pengeluaran masih sangat terkendali sehingga ruang menabung dan berinvestasi masih besar.";

  if (score < 90) {
    status = "Healthy";

    title =
      "Keuangan masih sehat.";

    description =
      "Arus kas masih positif. Pertahankan pola pengeluaran seperti sekarang.";
  }

  if (score < 70) {
    emoji = "🟡";

    status = "Caution";

    title =
      "Mulai perhatikan pengeluaran.";

    description =
      "Pengeluaran mulai mengambil porsi besar dari total penghasilan.";
  }

  if (score < 50) {
    emoji = "🔴";

    status = "Critical";

    title =
      "Keuangan membutuhkan perhatian.";

    description =
      "Pengeluaran hampir menyamai total penghasilan. Sebaiknya mulai melakukan evaluasi anggaran.";
  }

  return (
    <Card className="border-accent/20">

      <div className="flex items-start justify-between gap-5">

        <div className="flex-1">

          <p className="text-xs uppercase tracking-[0.25em] text-accent">

            Financial Health

          </p>

          <div className="mt-5 flex items-end gap-3">

            <span className="text-6xl font-bold">

              {score}

            </span>

            <span className="pb-2 text-xl text-zinc-500">

              /100

            </span>

          </div>

          <div className="mt-4 flex items-center gap-3">

            <span className="text-3xl">

              {emoji}

            </span>

            <div>

              <h3 className="font-semibold">

                {status}

              </h3>

              <p className="text-sm text-zinc-400">

                {title}

              </p>

            </div>

          </div>

          <p className="mt-5 text-sm text-zinc-400">
  {description}
</p>

          <div className="mt-6 rounded-2xl bg-accent/10 px-4 py-4">

            <p className="text-sm leading-6">

              Pengeluaran saat ini sebesar{" "}

              <span className="font-semibold text-accent">

                {Math.round(expenseRatio)}%

              </span>{" "}

              dari total penghasilan keluarga.

            </p>

          </div>

        </div>

      </div>

    </Card>
  );
}