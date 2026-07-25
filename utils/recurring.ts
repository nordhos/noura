export function isPaydayReached(
    today: Date,
    payday: number
  ): boolean {
    return today.getDate() >= payday;
  }
  
  export function getRecurringTransactionDate(
    year: number,
    month: number,
    payday: number
  ): string {
    const lastDay = new Date(year, month, 0).getDate();
  
    const day = Math.min(payday, lastDay);
  
    return new Date(year, month - 1, day)
      .toISOString()
      .split("T")[0];
  }