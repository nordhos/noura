"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { LoginScreen } from "@/components/auth/LoginScreen";
import { getAppSetting } from "@/services/app-settings.service";

export default function HomePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initialize() {
      try {
        const appSetting = await getAppSetting();

        if (!appSetting) {
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