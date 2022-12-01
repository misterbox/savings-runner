import { buildDateKey, isDateInRange } from "../utilities/date-utilities";
import { DateRange } from "./date-range";
import { Expense, SingleExpense } from "./expense";

export class SavingsMonth {
  private _dateRange!: DateRange;
  private _expenses: Expense[] = [];
  private _creditAmnt: number;

  get expenses(): Expense[] {
    return this._expenses;
  }

  get netBalance(): number {
    return this._creditAmnt - this.sumExpenses;
  }

  get sumExpenses(): number {
    return this._expenses.map((exp: Expense) => exp.amount).reduce((prev, curr) => prev + curr, 0);
  }

  get key(): string {
    return buildDateKey(this._dateRange);
  }

  constructor(creditAmnt: number, dateRange: DateRange) {
    this._creditAmnt = creditAmnt;
    this._dateRange = dateRange;
  }

  public addSingleExpense(expense: SingleExpense): void {
    if (!isDateInRange(expense.Date, this._dateRange)) {
      throw new Error(`INVALID EXPENSE: Cannot add an expense with date ${expense.Date} to a SavingsMonth with interval ${this._dateRange.beginDate}-${this._dateRange.endDate}`);
    }

    this._expenses.push(expense);
  }

  public addManyExpenses(expenses: SingleExpense[]): void {
    return expenses.forEach((exp) => this.addSingleExpense(exp));
  }

  public applyRunningBalance(runningBalance: number): number {
    return runningBalance + this.netBalance;
  }
}
