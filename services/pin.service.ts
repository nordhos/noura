import { supabase } from "@/lib/supabase";

export async function savePin(pin: string) {
    const { data, error } = await supabase
        .from("app_setting")
        .select("id")
        .maybeSingle();

    if (error) {
        throw error;
    }

    if (!data) {
        throw new Error(
            "App setting belum dibuat."
        );
    }

    const { error: updateError } = await supabase
        .from("app_setting")
        .update({
            pin_hash: pin,
            updated_at: new Date().toISOString(),
        })
        .eq("id", data.id);

    if (updateError) {
        throw updateError;
    }
}

export async function getStoredPin(): Promise<string | null> {
    const { data, error } = await supabase
        .from("app_setting")
        .select("pin_hash")
        .maybeSingle();

    if (error) {
        throw error;
    }

    return data?.pin_hash ?? null;
}