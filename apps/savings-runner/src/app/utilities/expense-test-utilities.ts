import { Random } from 'random-test-values';
import { DateRange } from '../models/date-range';
import { RecurringExpense, SingleExpense } from "../models/expense";
import { SavingsMonth } from '../models/savings-month';

export function buildSingleExpense(dateRange?: DateRange): SingleExpense {
  const expenseAmount = Random.Number({ min: 1, max: 100 });

  if (dateRange === null) {
    return new SingleExpense(expenseAmount, Random.Date());
  }

  return new SingleExpense(expenseAmount, Random.Date({ before: dateRange?.endDate, after: dateRange?.beginDate }));
}

export function buildManySingleExpenses(count: number = 5, dateRange?: DateRange): SingleExpense[] {
  const expenses: SingleExpense[] = [];

  for (let i = 0; i < count; i++) {
    expenses.push(buildSingleExpense(dateRange));
  }

  return expenses;
}

export function buildRecurringExpense(): RecurringExpense {
  const beginingDate = Random.Date();
  const endDate = Random.Date({ after: beginingDate });

  return new RecurringExpense(Random.Number(), beginingDate, endDate);
}

export function buildManyRecurringExpenses(count: number = 5): RecurringExpense[] {
  const expenses: RecurringExpense[] = [];

  for (let i = 0; i < count; i++) {
    expenses.push(buildRecurringExpense());
  }

  return expenses;
}

export function buildDateRange(): DateRange {
  const beginDate = Random.Date();
  const endDate = Random.Date({ after: beginDate });

  return {
    beginDate,
    endDate
  };
}

export function buildSavingsMonth(credit?: number): SavingsMonth {
  const dateRange: DateRange = {
    beginDate: new Date("2022-12-01"),
    endDate: new Date("2022-12-31")
  };
  const expenses = buildManySingleExpenses(Random.Number({ min: 1, max: 20 }), dateRange);
  const creditAmount = credit ?? Random.Number({ min: 1, max: 100 });
  const savingsMonth = new SavingsMonth(creditAmount, dateRange);
  savingsMonth.addManyExpenses(expenses);

  return savingsMonth;
}

export function buildManySavingsMonths(credit?: number, count: number = 5): SavingsMonth[] {
  const months: SavingsMonth[] = [];

  for (let i = 0; i < count; i++) {
    months.push(buildSavingsMonth(credit));
  }

  return months;
}
