import { DateTime } from "luxon";
import { DateRange } from "../models/date-range";
import { buildDateKeyFromDate, buildDateKeyFromExpense } from "../utilities/date-utilities";
import { buildSingleExpense } from "../utilities/expense-test-utilities";
import { SavingsScheduleFactory } from "./savings-schedule-factory";

describe('SavingsScheduleFactory', () => {
  describe('build', () => {
    it('should return a minimum savings schedule given no expenses', () => {
      const factory = new SavingsScheduleFactory(0, 0, []);

      const schedule = factory.build();

      expect(schedule.netAmount).toEqual(0);
    });

    it('should return the expected savings schedule given one single expense under the date threshold', () => {
      const threshold = 5;
      const dateRange: DateRange = {
        beginDate: DateTime.now().plus({ 'years': 1 }).startOf('month').toJSDate(),
        endDate: DateTime.now().plus({ 'years': 4 }).startOf('month').toJSDate(),
      };
      const expense = buildSingleExpense(100, dateRange);
      const factory = new SavingsScheduleFactory(0, 0, [expense]);

      const schedule = factory.build(threshold);

      expect(schedule.netAmount).toEqual(0 - expense.amount);
      expect(schedule.shortfallMonths[0].savingsMonth.expenses.includes(expense)).toBeTruthy();
    });

    it('should return the expected savings schedule given multiple single expenses under the date threshold', () => {
      const threshold = 5;
      const dateRange: DateRange = {
        beginDate: DateTime.now().plus({ 'years': 1 }).startOf('month').toJSDate(),
        endDate: DateTime.now().plus({ 'years': 4 }).startOf('month').toJSDate(),
      };
      const expense1 = buildSingleExpense(100, dateRange);
      const expense2 = buildSingleExpense(100, dateRange);
      const expense3 = buildSingleExpense(100, dateRange);
      const expectedShortfallKeys = [buildDateKeyFromExpense(expense1), buildDateKeyFromExpense(expense2), buildDateKeyFromExpense(expense3)];
      const expectedNetAmount = -300;
      const factory = new SavingsScheduleFactory(0, 0, [expense1, expense2, expense3]);

      const schedule = factory.build(threshold);

      expect(schedule.netAmount).toEqual(expectedNetAmount);
      const actualShortFallKeys = schedule.shortfallMonths.map((shortFall) => shortFall.monthKey);
      expect(expectedShortfallKeys.every((key) => actualShortFallKeys.includes(key))).toBeTruthy();
    });

    it('should return the expected savings schedule given one single expense over the date threshold', () => {
      const threshold = 0;
      const dateRange: DateRange = {
        beginDate: DateTime.now().plus({ 'years': 1 }).startOf('month').toJSDate(),
        endDate: DateTime.now().plus({ 'years': 4 }).startOf('month').toJSDate(),
      };
      const expense = buildSingleExpense(100, dateRange);
      const factory = new SavingsScheduleFactory(0, 0, [expense]);

      const schedule = factory.build(threshold);

      expect(schedule.netAmount).toEqual(0);
      expect(schedule.shortfallMonths.length).toEqual(0);
    });

    // TODO: test with recurring expenses
  });
});
