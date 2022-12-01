import { DateRange } from "../models/date-range";
import { DateTime, Interval } from 'luxon';

export function isDateInRange(date: Date, range: DateRange): boolean {
  if (range.endDate === undefined) return false;

  const source = DateTime.fromJSDate(date);
  const interval = Interval.fromDateTimes(range.beginDate, range.endDate);

  return interval.contains(source);
}
