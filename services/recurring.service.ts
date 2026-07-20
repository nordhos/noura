import { getProfiles } from "@/services/profile.service";
import { processAutoSalary } from "@/services/auto-salary.service";
import { getAppSetting } from "@/services/app-settings.service";
import { isPaydayReached } from "@/utils/recurring";
import { isAfterOrEqualDate } from "@/utils/date";

export async function syncRecurringTransactions(): Promise<void> {
  const today = new Date();

  const appSetting = await getAppSetting();

  // Belum onboarding → recurring tidak dijalankan
  if (!appSetting) {
    console.log(
      "[Recurring] Financial Setup belum selesai. Skip recurring."
    );
    return;
  }

  // Financial Start Date belum tercapai
  if (!isAfterOrEqualDate(today, appSetting.financial_start_date)) {
    console.log(
      "[Recurring] Financial Start Date belum tercapai."
    );
    return;
  }

  const profiles = await getProfiles();

  for (const profile of profiles) {
    if (!isPaydayReached(today, profile.payday)) {
      continue;
    }

    await processAutoSalary(profile, today);
  }
}