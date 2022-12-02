import { RecurringExpense, SingleExpense } from "../models/expense";
import { SavingsMonth } from "../models/savings-month";
import { SavingsSchedule } from "../models/savings-schedule";
import { buildDateRange } from "../utilities/expense-test-utilities";

export class SavingsScheduleFactory {
  private _startingBalance: number;
  private _monthlyCredit: number;
  private _singleExpenses: SingleExpense[];
  private _recurringExpenses: RecurringExpense[] | undefined;

  constructor(startingBalance: number, monthlyCredit: number, singleExpenses: SingleExpense[], recurringExpenses?: RecurringExpense[]) {
    this._startingBalance = startingBalance;
    this._monthlyCredit = monthlyCredit;
    this._singleExpenses = singleExpenses;
    this._recurringExpenses = recurringExpenses;
  }

  public build(): SavingsSchedule {
    const savingsMonth = new SavingsMonth(0, buildDateRange());
    savingsMonth.addManyExpenses(this._singleExpenses);
    return new SavingsSchedule(0, [savingsMonth]);
  }
}
