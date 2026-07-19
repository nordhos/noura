import { getAppSetting } from "@/services/app-settings.service";
import { normalizeDate } from "@/utils/date";

export async function validateTransactionTimeline(
  transactionDate: string
): Promise<void> {
  const appSetting = await getAppSetting();

  if (!appSetting) {
    throw new Error(
      "Financial Start Date belum diinisialisasi."
    );
  }

  const today = normalizeDate(new Date());

  const startDate = normalizeDate(
    new Date(appSetting.financial_start_date)
  );

  const selectedDate = normalizeDate(
    new Date(transactionDate)
  );

  // Tidak boleh sebelum Financial Start Date
  if (selectedDate < startDate) {
    throw new Error(
      "Transaksi tidak dapat dicatat sebelum menggunakan NOURA."
    );
  }

  // Tidak boleh di masa depan
  if (selectedDate > today) {
    throw new Error(
      "Transaksi tidak dapat dicatat untuk tanggal di masa depan."
    );
  }
}