import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  href: string;
}

export function BackButton({
  href,
}: BackButtonProps) {
  return (
    <Link
      href={href}
      className="
        rounded-2xl
        border
        border-border
        bg-card
        p-3
        transition-all
        duration-200
        hover:border-accent
        hover:bg-accent/10
      "
    >
      <ArrowLeft size={18} />
    </Link>
  );
}