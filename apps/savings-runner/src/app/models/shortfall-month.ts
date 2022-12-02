import { SavingsMonth } from "./savings-month";

export interface ShortfallMonth {
  balance: number;
  monthKey: string;
  savingsMonth: SavingsMonth;
}
