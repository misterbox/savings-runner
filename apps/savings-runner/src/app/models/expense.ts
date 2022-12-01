import { DateRange } from "./date-range";

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
  private date!: Date;

  public get Date(): Date {
    return this.date;
  }

  constructor(amount: number, date: Date) {
    super(amount);
    this.date = date;
  }
}

export class RecurringExpense extends Expense {
  private dateRange: DateRange;

  constructor(amount: number, beginDate: Date, endDate: Date | undefined) {
    super(amount);
    this.dateRange = {
      beginDate,
      endDate
    };
  }
}
