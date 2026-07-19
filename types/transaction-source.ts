export const TRANSACTION_SOURCE = {
    MANUAL: "manual",
    SALARY: "salary",
    FREELANCE: "freelance",
    BONUS: "bonus",
    THR: "thr",
    DIVIDEND: "dividend",
  } as const;
  
  export type TransactionSource =
    (typeof TRANSACTION_SOURCE)[keyof typeof TRANSACTION_SOURCE];