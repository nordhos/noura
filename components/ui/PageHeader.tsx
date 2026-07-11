"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface PageHeaderProps {
  title: string;
}

export function PageHeader({
  title,
}: PageHeaderProps) {
  const router = useRouter();

  return (
    <header className="mb-8 flex items-center gap-4">
      <button
        onClick={() => router.back()}
        className="rounded-full border border-border p-2"
      >
        <ArrowLeft size={18} />
      </button>

      <h1 className="text-xl font-semibold">
        {title}
      </h1>
    </header>
  );
}