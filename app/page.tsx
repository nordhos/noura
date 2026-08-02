"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { LoginScreen } from "@/components/auth/LoginScreen";
import { getAppSetting } from "@/services/app-settings.service";

export default function HomePage() {
  console.log(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initialize() {
      try {
        console.log("[BOOT] initialize()");
        const appSetting = await getAppSetting();
        console.log("[BOOT] appSetting:", appSetting);

        if (!appSetting) {
          console.log("[BOOT] redirect to financial setup");
          router.replace("/financial-setup");
          return;
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }

    initialize();
  }, [router]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-zinc-500">
          Memuat...
        </p>
      </main>
    );
  }

  return <LoginScreen />;
}