/**
 * Formats a number as Indonesian Rupiah, e.g. 120000 -> "Rp120.000".
 * Uses the id-ID locale so thousands separators match local convention (periods, not commas).
 */
export function formatIDR(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Clamps a value into the 0–100 range, useful for progress bars / rings. */
export function clampPercent(value: number): number {
  return Math.min(100, Math.max(0, value));
}
