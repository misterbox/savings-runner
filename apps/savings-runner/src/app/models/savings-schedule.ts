import { SavingsMonth } from "./savings-month";

export class SavingsSchedule {
  private initialBalance: number;
  private creditAmount: number;
  private savingsMonths: SavingsMonth[];

  public get netAmount(): number {
    const result = this.savingsMonths.reduce((prevBalance, savingsMonth, index) =>
    {
      return savingsMonth.applyRunningBalance(prevBalance);
    }, this.initialBalance);

    return result;
  }

  constructor(initialBalance: number, creditAmount: number, savingsMonths: SavingsMonth[]) {
    this.initialBalance = initialBalance;
    this.creditAmount = creditAmount;
    this.savingsMonths = savingsMonths;
  }
}
