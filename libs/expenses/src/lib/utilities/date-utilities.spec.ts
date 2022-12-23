import { enableProdMode } from "@angular/core";
import { DateTime } from "luxon";
import { Random } from "random-test-values";
import { DateRange } from "../models/date-range";
import { ExpenseKey } from "../models/expense";
import * as DateUtils from "./date-utilities";
import { buildManySingleExpenses, buildSingleExpense } from "./expense-test-utilities";

describe('date utilities', () => {
  describe('getMaxExpenseDate', () => {
    it('should return the expected date given a single expense', () => {
      const expense = buildSingleExpense();

      const maxDate = DateUtils.getMaxExpenseDate([expense]);

      expect(maxDate).toEqual(expense.date);
    });

    it('should return the expected date given two expenses', () => {
      const expense1 = buildSingleExpense(0, { beginDate: new Date('2022-10-01T00:00'), endDate: new Date('2022-10-31T00:00')});
      const expense2 = buildSingleExpense(0, { beginDate: new Date('2022-12-01T00:00'), endDate: new Date('2022-12-31T00:00')});

      const maxDate = DateUtils.getMaxExpenseDate([expense1, expense2]);

      expect(maxDate).toEqual(expense2.date);
    });

    it('should return the expected date given many expenses', () => {
      const expense1 = buildSingleExpense(0, { beginDate: new Date('2022-10-01T00:00'), endDate: new Date('2022-10-31T00:00')});
      const expense2 = buildSingleExpense(0, { beginDate: new Date('2021-12-01T00:00'), endDate: new Date('2021-12-31T00:00')});
      const expense3 = buildSingleExpense(0, { beginDate: new Date('2020-12-01T00:00'), endDate: new Date('2020-12-31T00:00')});
      const expense4 = buildSingleExpense(0, { beginDate: new Date('2019-12-01T00:00'), endDate: new Date('2019-12-31T00:00')});
      const expense5 = buildSingleExpense(0, { beginDate: new Date('2018-12-01T00:00'), endDate: new Date('2018-12-31T00:00')});

      const maxDate = DateUtils.getMaxExpenseDate([expense1, expense2, expense3, expense4, expense5]);

      expect(maxDate).toEqual(expense1.date);
    });
  });

  describe('getMaxExpenseDateOrThreshold', () => {
    it('should return the expected date given one expense under the threshold', () => {
      const threshold = 1;
      const expenseMonth = DateTime.now().plus({ 'months': 5 });
      const dateRange: DateRange = {
        beginDate: expenseMonth.startOf('month').toJSDate(),
        endDate: expenseMonth.endOf('month').toJSDate()
      };
      const expense = buildSingleExpense(0, dateRange);
      const expectedDate = expense.date;

      const actualDate = DateUtils.getMaxExpenseDateOrThreshold([expense], threshold);

      expect(actualDate).toEqual(expectedDate);
    });

    it('should return the expected date given one expense over the threshold', () => {
      const threshold = 1;
      const expenseMonth = DateTime.now().plus({ 'years': 5 });
      const dateRange: DateRange = {
        beginDate: expenseMonth.startOf('month').toJSDate(),
        endDate: expenseMonth.endOf('month').toJSDate()
      };
      const expense = buildSingleExpense(0, dateRange);
      const expectedDate = DateTime.now().plus({ 'years': threshold }).startOf('month').toJSDate();

      const actualDate = DateUtils.getMaxExpenseDateOrThreshold([expense], threshold);

      expect(actualDate).toEqual(expectedDate);
    });

    it('should return the expected date given many expenses under the threshold', () => {
      const threshold = 5;
      const dateRange: DateRange = {
        beginDate: DateTime.now().plus({ 'years': 1 }).startOf('month').toJSDate(),
        endDate: DateTime.now().plus({ 'years': 4 }).startOf('month').toJSDate(),
      };
      const expenses = buildManySingleExpenses(10, dateRange);
      const expectedDate = expenses.map(exp => DateTime.fromJSDate(exp.date)).reduce((prev, current) => DateTime.max(prev, current)).toJSDate();

      const actualDate = DateUtils.getMaxExpenseDateOrThreshold(expenses, threshold);

      expect(actualDate).toEqual(expectedDate);
    });
  });

  describe('getMaxExpenseDate', () => {
    it('should return the expected date', () => {
      const expenses = buildManySingleExpenses(10);
      const expectedDate = expenses.map(exp => DateTime.fromJSDate(exp.date)).reduce((prev, current) => DateTime.max(prev, current)).toJSDate();

      const actualDate = DateUtils.getMaxExpenseDate(expenses);

      expect(actualDate).toEqual(expectedDate);
    });
  });

  describe('getMaxDate', () => {
    it('should return the expected date', () => {
      const date1 = new Date('2022-12-15T00:00');
      const date2 = new Date('2022-11-15T00:00');
      const date3 = new Date('2022-10-15T00:00');
      const date4 = new Date('2022-09-15T00:00');
      const date5 = new Date('2022-08-15T00:00');

      const maxDate = DateUtils.getMaxDate([date1, date2, date3, date4, date5]);

      expect(maxDate).toEqual(date1);
    });
  });

  describe('getStartOfMonth', () => {
    it('should return the expected date', () => {
      const expectedDate = new Date('2022-12-01T00:00');
      const inputDate = new Date('2022-12-15T00:00');

      const actualDate = DateUtils.getStartOfMonth(inputDate);

      expect(actualDate).toEqual(expectedDate);
    });
  });

  describe('getStartOfMonthInFutureInYears', () => {
    it('should return the expected date given 0 years ahead', () => {
      const inputDate = DateTime.now();
      const expectedDate = inputDate.startOf('month').toJSDate();

      const actualDate = DateUtils.getStartOfMonthInFutureInYears(0);

      expect(actualDate).toEqual(expectedDate);
    });

    it('should return the expected date given 1 years ahead', () => {
      const inputDate = DateTime.now().plus({ 'years': 1 });
      const expectedDate = inputDate.startOf('month').toJSDate();

      const actualDate = DateUtils.getStartOfMonthInFutureInYears(1);

      expect(actualDate).toEqual(expectedDate);
    });

    it('should return the expected date given many years ahead', () => {
      const yearsAhead = Random.Number({ 'min': 5, 'max': 20 });
      const inputDate = DateTime.now().plus({ 'years': yearsAhead });
      const expectedDate = inputDate.startOf('month').toJSDate();

      const actualDate = DateUtils.getStartOfMonthInFutureInYears(yearsAhead);

      expect(actualDate).toEqual(expectedDate);
    });
  });

  describe('buildDateKeyFromRange', () => {
    it('should return the expected key', () => {
      const dateRange: DateRange = {
        beginDate: new Date('2022-12-01T00:00'),
        endDate: new Date('2022-12-31T00:00')
      };
      const expectedKey: ExpenseKey = '2022-12-01';

      const actualKey = DateUtils.buildDateKeyFromRange(dateRange);

      expect(actualKey).toEqual(expectedKey);
    });
  });
});
