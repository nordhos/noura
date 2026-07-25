import { supabase } from '@/lib/supabase';

export interface Profile {
  id: string;
  name: string;
  created_at: string;
}

export async function getProfiles(): Promise<Profile[]> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function getProfile(id: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }

    throw new Error(error.message);
  }

  return data;
}

export async function createProfile(name: string): Promise<Profile> {
  const { data, error } = await supabase
    .from('profiles')
    .insert({
      name: name.trim(),
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateProfile(
  id: string,
  name: string
): Promise<Profile> {
  const { data, error } = await supabase
    .from('profiles')
    .update({
      name: name.trim(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteProfile(id: string): Promise<void> {
  const { error } = await supabase
    .from('profiles')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }
}