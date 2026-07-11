"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { IncomeForm } from "@/components/income/IncomeForm";

export default function IncomePage() {
  return (
    <main className="min-h-screen bg-background px-5 py-6">
      <PageHeader title="Update Penghasilan" />

      <IncomeForm />
    </main>
  );
}