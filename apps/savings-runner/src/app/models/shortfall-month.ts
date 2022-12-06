import { ExpenseKey } from "./expense";
import { SavingsMonth } from "./savings-month";

export interface ShortfallMonth {
  balance: number;
  monthKey: ExpenseKey;
  savingsMonth: SavingsMonth;
}
