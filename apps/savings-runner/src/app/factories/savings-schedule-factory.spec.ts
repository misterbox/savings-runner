import { DateTime } from "luxon";
import { DateRange } from "../models/date-range";
import { buildSingleExpense } from "../utilities/expense-test-utilities";
import { SavingsScheduleFactory } from "./savings-schedule-factory";

describe('SavingsScheduleFactory', () => {
  describe('build', () => {
    it('should return a minimum savings schedule given no expenses', () => {
      const factory = new SavingsScheduleFactory(0, 0, []);

      const schedule = factory.build();

      expect(schedule.netAmount).toEqual(0);
    });

    xit('should return the expected savings schedule given one single expense under the date threshold', () => {
      const dateRange: DateRange = {
        beginDate: DateTime.now().plus({ 'years': 1 }).startOf('month').toJSDate(),
        endDate: DateTime.now().plus({ 'years': 4 }).startOf('month').toJSDate(),
      };
      const expense = buildSingleExpense(-100, dateRange);
      const factory = new SavingsScheduleFactory(0, 0, [expense]);

      const schedule = factory.build();

      expect(schedule.netAmount).toEqual(0 - expense.amount);
      expect(schedule.shortfallMonths[0].savingsMonth.expenses.includes(expense)).toBeTruthy();
      expect(schedule.shortfallMonths[0].savingsMonth.key).toEqual(expense)
    });
  });
});
