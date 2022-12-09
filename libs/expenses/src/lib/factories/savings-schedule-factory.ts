import { SingleExpense, RecurringExpense } from "../models/expense";
import { ExpenseMap } from "../models/expense-map";
import { SavingsMonth } from "../models/savings-month";
import { SavingsSchedule } from "../models/savings-schedule";
import * as DateUtils from '../utilities/date-utilities'

export class SavingsScheduleFactory {
  private _startingBalance: number;
  private _monthlyCredit: number;
  private _singleExpenses: SingleExpense[];
  private _recurringExpenses: RecurringExpense[] | undefined;
  private _expenseMap: ExpenseMap;

  constructor(startingBalance: number, monthlyCredit: number, singleExpenses: SingleExpense[], recurringExpenses?: RecurringExpense[]) {
    this._startingBalance = startingBalance;
    this._monthlyCredit = monthlyCredit;
    this._singleExpenses = singleExpenses;
    this._recurringExpenses = recurringExpenses;
    this._expenseMap = new ExpenseMap(this._singleExpenses);
  }

  public build(dateThresholdInYears?: number): SavingsSchedule {
    const maxScheduleDate = DateUtils.getMaxExpenseDateOrThreshold(this._singleExpenses, dateThresholdInYears);
    const currentMonth = DateUtils.getStartOfCurrentMonth();
    const savingsMonths: SavingsMonth[] = this.buildSavingsMonths(currentMonth, maxScheduleDate);

    return new SavingsSchedule(this._startingBalance, savingsMonths);
  }

  private buildSavingsMonths(currentMonth: Date, maxScheduleDate: Date) {
    const savingsMonths: SavingsMonth[] = [];

    for (let month = currentMonth; month <= maxScheduleDate; month = DateUtils.incrementToStartOfNextMonth(month)) {
      const savingsMonth = this.buildSavingsMonth(month);
      savingsMonths.push(savingsMonth);
    }

    return savingsMonths;
  }

  private buildSavingsMonth(month: Date) {
    const monthDateRange = DateUtils.buildDateRangeFromDate(month);
    const savingsMonth = new SavingsMonth(this._monthlyCredit, monthDateRange);
    const key = DateUtils.buildDateKeyFromDate(month);

    if (this._expenseMap.has(key)) {
      const expensesToAdd = this._expenseMap.getExpensesAtKey(key) as SingleExpense[];
      savingsMonth.addManyExpenses(expensesToAdd);
    }

    return savingsMonth;
  }
}
