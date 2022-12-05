import { RecurringExpense, SingleExpense } from "../models/expense";
import { SavingsMonth } from "../models/savings-month";
import { SavingsSchedule } from "../models/savings-schedule";
import * as DateUtils from '../utilities/date-utilities';

export class SavingsScheduleFactory {
  private _startingBalance: number;
  private _monthlyCredit: number;
  private _singleExpenses: SingleExpense[];
  private _recurringExpenses: RecurringExpense[] | undefined;
  private _expenseMap = new Map<string, SingleExpense[]>();

  constructor(startingBalance: number, monthlyCredit: number, singleExpenses: SingleExpense[], recurringExpenses?: RecurringExpense[]) {
    this._startingBalance = startingBalance;
    this._monthlyCredit = monthlyCredit;
    this._singleExpenses = singleExpenses;
    this._recurringExpenses = recurringExpenses;
  }

  public build(): SavingsSchedule {
    // sort and map single expenses
    this.sortAndMapExpenses();

    // get max date
    const maxScheduleDate = DateUtils.getMaxExpenseDateOrThreshold(this._singleExpenses);
    const currentMonth = DateUtils.getStartOfCurrentMonth();
    const savingsMonths: SavingsMonth[] = [];

    /*
      find the current month
      for each month between now and the max date
        create savings month
        check map for expenses
        if any
          add to schedule
    */
    for (let month = currentMonth; month <= maxScheduleDate; month = DateUtils.incrementToStartOfMonth(month)) {
      const dateRange = DateUtils.buildDateRangeFromDate(month);
      const savingsMonth = new SavingsMonth(this._monthlyCredit, dateRange);

      // if (this._expenseMap.has())

      savingsMonth.addManyExpenses(this._singleExpenses);
      savingsMonths.push(savingsMonth);
    }

    return new SavingsSchedule(this._startingBalance, savingsMonths);
  }

  private sortAndMapExpenses(): void {
    return;
  }

  private getExpensesAtKey(key: string): SingleExpense[] {
    return [];
  }
}
