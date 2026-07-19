export function normalizeDate(date: Date): Date {
    const normalized = new Date(date);
    normalized.setHours(0, 0, 0, 0);
    return normalized;
  }
  
  export function isAfterOrEqualDate(
    today: Date,
    startDate: string
  ): boolean {
    return (
      normalizeDate(today) >=
      normalizeDate(new Date(startDate))
    );
  }