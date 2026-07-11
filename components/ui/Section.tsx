import { Card } from "./Card";

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export function Section({
  title,
  children,
}: SectionProps) {
  return (
    <Card>
      <h2 className="mb-5 text-base font-semibold text-white">
        {title}
      </h2>

      <div className="space-y-4">
        {children}
      </div>
    </Card>
  );
}