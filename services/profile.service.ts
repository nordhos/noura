import { supabase } from "@/lib/supabase";

export interface Profile {
  id: string;
  role: "husband" | "wife";
  name: string;
  salary: number;
  payday: number;
}

export interface UpdateProfilePayload {
  id: string;
  name: string;
  salary: number;
  payday: number;
}

export async function getProfiles(): Promise<Profile[]> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("role", { ascending: true });

  if (error) throw error;

  return (data ?? []).map((item) => ({
    id: item.id,
    role: item.role,
    name: item.name,
    salary: Number(item.salary),
    payday: Number(item.payday),
  }));
}

export async function updateProfile(
  payload: UpdateProfilePayload
) {
  const { error } = await supabase
    .from("profiles")
    .update({
      name: payload.name,
      salary: payload.salary,
      payday: payload.payday,
    })
    .eq("id", payload.id);

  if (error) throw error;
}