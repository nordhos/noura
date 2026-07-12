export function formatIDR(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatIDRInput(value: string) {
  const number = value.replace(/\D/g, "");

  if (!number) return "";

  return new Intl.NumberFormat("id-ID").format(Number(number));
}

export function parseIDRInput(value: string) {
  return value.replace(/\D/g, "");
}

export function clampPercent(value: number): number {
  return Math.min(100, Math.max(0, value));
}