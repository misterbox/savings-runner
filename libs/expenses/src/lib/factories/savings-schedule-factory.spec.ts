import { DateTime } from "luxon";
import { DateRange } from "../models/date-range";
import { buildDateKeyFromExpense } from "../utilities/date-utilities";
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

    it('should return the expected savings schedule given multiple single expenses under and over the date threshold', () => {
      const threshold = 5;
      const underDateRange: DateRange = {
        beginDate: DateTime.now().plus({ 'years': 1 }).startOf('month').toJSDate(),
        endDate: DateTime.now().plus({ 'years': 4 }).startOf('month').toJSDate(),
      };
      const underExpense1 = buildSingleExpense(100, underDateRange);
      const underExpense2 = buildSingleExpense(250, underDateRange);
      const underExpense3 = buildSingleExpense(350, underDateRange);
      const underExpenses = [underExpense1, underExpense2, underExpense3];
      const expectedShortfallKeys = [buildDateKeyFromExpense(underExpense1), buildDateKeyFromExpense(underExpense2), buildDateKeyFromExpense(underExpense3)];
      const expectedNetAmount = -700;
      const overDateRange: DateRange = {
        beginDate: DateTime.now().plus({ 'years': 10 }).startOf('month').toJSDate(),
        endDate: DateTime.now().plus({ 'years': 14 }).startOf('month').toJSDate(),
      };
      const overExpense1 = buildSingleExpense(100, overDateRange);
      const overExpense2 = buildSingleExpense(100, overDateRange);
      const overExpense3 = buildSingleExpense(100, overDateRange);
      const overExpenses = [overExpense1, overExpense2, overExpense3];
      const factory = new SavingsScheduleFactory(0, 0, underExpenses.concat(overExpenses));

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

    it('should return the expected savings schedule given multiple single expenses over the date threshold', () => {
      const threshold = 0;
      const dateRange: DateRange = {
        beginDate: DateTime.now().plus({ 'years': 1 }).startOf('month').toJSDate(),
        endDate: DateTime.now().plus({ 'years': 4 }).startOf('month').toJSDate(),
      };
      const expense1 = buildSingleExpense(100, dateRange);
      const expense2 = buildSingleExpense(100, dateRange);
      const expense3 = buildSingleExpense(100, dateRange);
      const factory = new SavingsScheduleFactory(0, 0, [expense1, expense2, expense3]);

      const schedule = factory.build(threshold);

      expect(schedule.netAmount).toEqual(0);
      expect(schedule.shortfallMonths.length).toEqual(0);
    });

    // it('should return the expected savings schedule given one single expense and a short recurring expense under the threshold', () => {
    //   const expenseAmount = 100;
    //   const expectedNetAmount = -300;
    //   const threshold = 5;
    //   const dateRange: DateRange = {
    //     beginDate: DateTime.now().plus({ 'years': 1 }).startOf('month').toJSDate(),
    //     endDate: DateTime.now().plus({ 'years': 4 }).startOf('month').toJSDate(),
    //   };
    //   const singleExpense = buildSingleExpense(expenseAmount, dateRange);
    //   const beginDate = new Date('2022-12-01T00:00');
    //   const endDate = new Date('2023-01-01T00:00');
    //   const recurringExpense = new RecurringExpense(expenseAmount, beginDate, endDate);
    //   const factory = new SavingsScheduleFactory(0, 0, [singleExpense], [recurringExpense]);

    //   const schedule = factory.build(threshold);

    //   expect(schedule.netAmount).toEqual(expectedNetAmount);
    //   expect(schedule.shortfallMonths.length).toEqual(3);
    // });
  });
});
