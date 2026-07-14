import { pdf } from "@react-pdf/renderer";

import {
  TransactionPdfItem,
  TransactionReport,
} from "@/components/pdf/TransactionReport";

interface DownloadTransactionReportProps {
  period: string;

  totalIncome: number;
  totalExpense: number;
  balance: number;
  transactionCount: number;

  transactions: TransactionPdfItem[];
}

export async function downloadTransactionReport({
  period,
  totalIncome,
  totalExpense,
  balance,
  transactionCount,
  transactions,
}: DownloadTransactionReportProps) {
  const blob = await pdf(
    <TransactionReport
      period={period}
      totalIncome={totalIncome}
      totalExpense={totalExpense}
      balance={balance}
      transactionCount={transactionCount}
      transactions={transactions}
    />
  ).toBlob();

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;

  link.download = `NOURA_Riwayat_${period.replace(
    /\s+/g,
    "_"
  )}.pdf`;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}