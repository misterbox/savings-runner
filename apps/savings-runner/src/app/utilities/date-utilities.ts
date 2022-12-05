import { DateRange } from "../models/date-range";
import { DateTime, Interval } from 'luxon';
import { SingleExpense } from "../models/expense";

export function isDateInRange(date: Date, range: DateRange): boolean {
  if (range.endDate === undefined) return false;

  const source = DateTime.fromJSDate(date);
  const interval = Interval.fromDateTimes(range.beginDate, range.endDate);

  return interval.contains(source);
}

// TODO: test
export function buildDateKeyFromRange(dateRange: DateRange): string {
  const date = DateTime.fromJSDate(dateRange.beginDate);
  return date.toFormat('yyyyMMdd');
}

// TODO: test
export function buildDateKeyFromDate(input: Date): string {
  const date = DateTime.fromJSDate(input).startOf('month');
  return date.toFormat('yyyyMMdd');
}

export function getMaxExpenseDateOrThreshold(expenses: SingleExpense[], thresholdInYears: number = 5): Date {
  const thresholdDate = getStartOfMonthInFutureInYears(thresholdInYears);
  const maxExpenseDate = getMaxExpenseDate(expenses);


  return DateTime.min(DateTime.fromJSDate(thresholdDate), DateTime.fromJSDate(maxExpenseDate)).toJSDate();
}

export function getMaxExpenseDate(expenses: SingleExpense[]): Date {
  const expenseDates = expenses.map((expense) => expense.date);

  return getMaxDate(expenseDates);
}

export function getMaxDate(dates: Date[]): Date {
  const dateTimes: DateTime[] = dates.map(date => DateTime.fromJSDate(date));

  return DateTime.max(...dateTimes).toJSDate();
}

export function getStartOfMonthInFutureInYears(yearsAhead: number): Date {
  return DateTime.now().plus({ 'years': yearsAhead }).startOf('month').toJSDate();
}

// TODO: test
export function incrementToStartOfMonth(date: Date): Date {
  return DateTime.fromJSDate(date).plus({ 'months': 1 }).startOf('month').toJSDate();
}

// TODO: test
export function getStartOfMonth(date: Date): Date {
  return DateTime.fromJSDate(date).startOf('month').toJSDate();
}

// TODO: test
export function getStartOfCurrentMonth(): Date {
  return DateTime.now().startOf('month').toJSDate();
}

// TODO: test
export function buildDateRangeFromDate(input: Date): DateRange {
  const date = DateTime.fromJSDate(input);

  return {
    beginDate: date.startOf('month').toJSDate(),
    endDate: date.endOf('month').toJSDate()
  };
}
