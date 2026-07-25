"use client";

import { useQuery } from "@tanstack/react-query";

import { getProfiles } from "@/services/profile.service";

export function useProfiles() {
  return useQuery({
    queryKey: ["profiles"],
    queryFn: getProfiles,
  });
}