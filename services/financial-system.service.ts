import { completeOnboarding } from "@/services/app-settings.service";
import { getCategoryId } from "@/services/category.service";
import {
  createProfile,
  Profile,
} from "@/services/profile.service";
import { createOpeningBalanceTransaction } from "@/services/transaction.service";

export interface FinancialProfileInput {
  name: string;
  openingBalance: number;
}

export interface CreateFinancialSystemInput {
  profiles: FinancialProfileInput[];
}

function todayString(): string {
  return new Date().toISOString().split("T")[0];
}

export async function createFinancialSystem(
  input: CreateFinancialSystemInput
): Promise<void> {
  if (input.profiles.length === 0) {
    throw new Error("Minimal satu profil harus dibuat.");
  }

  if (input.profiles.length > 2) {
    throw new Error(
      "NOURA hanya mendukung maksimal dua profil."
    );
  }

  const transactionDate = todayString();

  const openingBalanceCategoryId =
    await getCategoryId(
      "income",
      "Saldo Awal"
    );

  // 1. Buat seluruh profil terlebih dahulu
  const createdProfiles: Array<{
    profile: Profile;
    openingBalance: number;
  }> = [];

  for (const item of input.profiles) {
    const profile = await createProfile(item.name);

    createdProfiles.push({
      profile,
      openingBalance: item.openingBalance,
    });
  }

  // 2. Inisialisasi sistem keuangan
  await completeOnboarding();

  // 3. Baru buat transaksi saldo awal
  for (const item of createdProfiles) {
    await createOpeningBalanceTransaction({
      profileId: item.profile.id,
      categoryId: openingBalanceCategoryId,
      amount: item.openingBalance,
      transactionDate,
    });
  }
}