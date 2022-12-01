import { SavingsMonth } from "./savings-month";

export class SavingsSchedule {
  private initialBalance: number;
  private creditAmount: number;
  private savingsMonths: SavingsMonth[];

  public get netAmount(): number {
    return this.savingsMonths.reduce((prevBalance, savingsMonth) => savingsMonth.applyRunningBalance(prevBalance), this.initialBalance);
  }

  constructor(initialBalance: number, creditAmount: number, savingsMonths: SavingsMonth[]) {
    this.initialBalance = initialBalance;
    this.creditAmount = creditAmount;
    this.savingsMonths = savingsMonths;
  }
}
