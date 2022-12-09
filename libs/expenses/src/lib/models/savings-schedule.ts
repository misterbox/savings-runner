import { SavingsMonth } from "./savings-month";
import { ShortfallMonth } from "./shortfall-month";

export class SavingsSchedule {
  private _initialBalance: number;
  private _savingsMonths: SavingsMonth[];
  private _shortfallMonths: ShortfallMonth[] = [];
  private _netAmount!: number | undefined;

  public get netAmount(): number {
    if (this._netAmount) return this._netAmount;

    const netAmount = this._savingsMonths.reduce((prevBalance, savingsMonth) => {
      const runningBalance = savingsMonth.applyRunningBalance(prevBalance)

      if (runningBalance < 0) {
        this.addShortfallMonth(savingsMonth, runningBalance);
      }

      return runningBalance;
    }, this._initialBalance);

    return netAmount;
  }

  public get shortfallMonths(): ShortfallMonth[] {
    return this._shortfallMonths;
  }

  constructor(initialBalance: number, savingsMonths: SavingsMonth[]) {
    this._initialBalance = initialBalance;
    this._savingsMonths = savingsMonths;
  }

  private addShortfallMonth(savingsMonth: SavingsMonth, runningBalance: number): void {
    this._shortfallMonths.push({
      balance: runningBalance,
      monthKey: savingsMonth.key,
      savingsMonth: savingsMonth
    });
  }
}
