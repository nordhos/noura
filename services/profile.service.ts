import { supabase } from "@/lib/supabase";

export interface Profile {
  id: string;
  name: string;
  salary_day: number | null;
  base_salary: number | null;
  auto_salary_enabled: boolean;
  created_at: string;
}

export interface UpdateProfileInput {
  id: string;
  name: string;
  salary_day: number | null;
  base_salary: number | null;
  auto_salary_enabled: boolean;
}

export async function getProfiles(): Promise<Profile[]> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as Profile[];
}

export async function getProfile(
  id: string
): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }

    throw new Error(error.message);
  }

  return data as Profile;
}

export async function createProfile(
  name: string
): Promise<Profile> {
  const { data, error } = await supabase
    .from("profiles")
    .insert({
      name: name.trim(),
      salary_day: null,
      base_salary: null,
      auto_salary_enabled: false,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Profile;
}

export async function updateProfile(
  profile: UpdateProfileInput
): Promise<Profile> {
  const { data, error } = await supabase
    .from("profiles")
    .update({
      name: profile.name.trim(),
      salary_day: profile.salary_day,
      base_salary: profile.base_salary,
      auto_salary_enabled: profile.auto_salary_enabled,
    })
    .eq("id", profile.id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Profile;
}

export async function deleteProfile(
  id: string
): Promise<void> {
  const { error } = await supabase
    .from("profiles")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}