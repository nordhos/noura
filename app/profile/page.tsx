"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { ProfileScreen } from "@/components/profile/ProfileScreen";
import { isAuthenticated } from "@/hooks/useAuth";


export default function ProfilePage() {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/");
    }
  }, [router]);

  return <ProfileScreen />;
}