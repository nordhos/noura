import { supabase } from "@/lib/supabase";

export async function processSalary() {
  console.log("🚀 Salary Engine Started");

  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("*");

  if (error) throw error;

  console.log("👤 Profiles", profiles);

  const { data: salaryCategory, error: categoryError } = await supabase
    .from("transaction_categories")
    .select("id, name")
    .eq("name", "Gaji")
    .single();

  if (categoryError) throw categoryError;

  console.log("💰 Salary Category", salaryCategory);

  const today = new Date();

  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();

  console.log({
    currentYear,
    currentMonth,
    currentDay,
  });

  for (const profile of profiles ?? []) {
    console.log(
      `${profile.name} payday = ${profile.payday}`
    );
  }
}