"use client";

import { useDashboard } from "@/hooks/useDashboard";

export default function TestPage() {
  const { data, isLoading, error } = useDashboard();

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error</div>;

  return (
    <pre>
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}