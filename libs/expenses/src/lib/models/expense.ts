import { DateRange } from "./date-range";
import * as DateUtils from '../utilities/date-utilities'

export abstract class Expense {
  private _amount!: number;

  public get amount(): number {
    return this._amount;
  }

  constructor(amount: number) {
    this._amount = amount;
  }
}

export class SingleExpense extends Expense {
  private _date!: Date;

  public get date(): Date {
    return this._date;
  }

  constructor(amount: number, date: Date) {
    super(amount);
    this._date = date;
  }
}

// TODO: Assumes the expense repeats on the same date monthly
export class RecurringExpense extends Expense {
  private dateRange: DateRange;

  constructor(amount: number, beginDate: Date, endDate: Date) {
    super(amount);
    this.dateRange = {
      beginDate,
      endDate
    };
  }

  public toSingleExpenses(): SingleExpense[] {
   const singleExpenses: SingleExpense[] = [];

    for (let dateIterator = this.dateRange.beginDate; dateIterator <= this.dateRange.endDate; dateIterator = DateUtils.incrementMonth(dateIterator, 1)) {
      singleExpenses.push(new SingleExpense(this.amount, dateIterator));
    }

    return singleExpenses;
  }
}

export type ExpenseKey = `${number}-${number}-${number}`;
