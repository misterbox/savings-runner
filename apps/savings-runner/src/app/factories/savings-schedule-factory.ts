import { Random } from "random-test-values";
import { DateRange } from "../models/date-range";
import { RecurringExpense, SingleExpense } from "../models/expense";
import { SavingsMonth } from "../models/savings-month";
import { SavingsSchedule } from "../models/savings-schedule";

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
    // get max date

    /*
      find the current month
      for each month between now and the max date
        create savings month
        check map for expenses
        if any
          add to schedule
    */
    return new SavingsSchedule(0, []);
  }
}
