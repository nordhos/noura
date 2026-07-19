import { getProfiles } from "@/services/profile.service";
import { processAutoSalary } from "@/services/auto-salary.service";
import {
  getAppSetting,
  initializeFinancialStartDate,
} from "@/services/app-settings.service";
import { isPaydayReached } from "@/utils/recurring";
import { isAfterOrEqualDate } from "@/utils/date";

export async function syncRecurringTransactions(): Promise<void> {
  const today = new Date();

  // Pastikan Financial Start Date sudah ada
  await initializeFinancialStartDate();

  console.log("[Recurring] initializeFinancialStartDate() selesai");

  const appSetting = await getAppSetting();

  console.log("[Recurring] appSetting:", appSetting);

  if (!appSetting) {
    console.warn("[Recurring] App setting tidak ditemukan.");
    return;
  }

  // Jangan jalankan recurring jika Financial Start Date belum tercapai
  if (!isAfterOrEqualDate(today, appSetting.financial_start_date)) {
    console.log("[Recurring] Financial Start Date belum tercapai.");
    return;
  }

  const profiles = await getProfiles();

  for (const profile of profiles) {
    // Skip profile yang belum waktunya gajian
    if (!isPaydayReached(today, profile.payday)) {
      continue;
    }

    await processAutoSalary(profile, today);
  }
}