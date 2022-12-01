import { Random } from "random-test-values";
import * as ExpenseUtils from "../utilities/expense-test-utilities";
import { DateRange } from "./date-range";
import { SingleExpense } from "./expense";
import { SavingsMonth } from "./savings-month";

describe('SavingsMonth', () => {
  const irrelevantDateRange: DateRange = { beginDate: new Date('2022-12-01'), endDate: new Date('2022-12-31')}
  const irrelevantCreditAmount = Random.Number({ min: 1, max: 100 });

  describe('GET sumExpenses', () => {
    it('should return 0 given no expenses', () => {
      const savingsMonth = new SavingsMonth(irrelevantCreditAmount, irrelevantDateRange);

      expect(savingsMonth.sumExpenses).toEqual(0);
    });

    it('should return the expected total given expenses', () => {
      const savingsMonth = new SavingsMonth(irrelevantCreditAmount, irrelevantDateRange);
      const expectedExpense1 = new SingleExpense(100, new Date('2022-12-01'));
      const expectedExpense2 = new SingleExpense(150, new Date('2022-12-02'));
      savingsMonth.addSingleExpense(expectedExpense1);
      savingsMonth.addSingleExpense(expectedExpense2);

      expect(savingsMonth.sumExpenses).toEqual(250);
    });
  });

  describe('GET netBalance', () => {
    it('should return the expected balance given no expenses', () => {
      const savingsMonth = new SavingsMonth(irrelevantCreditAmount, irrelevantDateRange);

      expect(savingsMonth.netBalance).toEqual(irrelevantCreditAmount);
    });

    it('should return the expected balance given one expense', () => {
      const savingsMonth = new SavingsMonth(irrelevantCreditAmount, irrelevantDateRange);
      const expense = ExpenseUtils.buildSingleExpense(irrelevantDateRange);
      savingsMonth.addSingleExpense(expense);
      const expectedBalance = irrelevantCreditAmount - expense.amount;

      expect(savingsMonth.netBalance).toEqual(expectedBalance);
    });

    it('should return the expected balance given many expenses', () => {
      const savingsMonth = new SavingsMonth(irrelevantCreditAmount, irrelevantDateRange);
      const expenses = ExpenseUtils.buildManySingleExpenses(Random.Number({ min: 5, max: 20 }), irrelevantDateRange);
      savingsMonth.addManyExpenses(expenses);
      const expectedBalance = irrelevantCreditAmount - expenses.map((exp) => exp.amount).reduce((prev, curr) => prev + curr, 0);

      expect(savingsMonth.netBalance).toEqual(expectedBalance);
    });
  });

  describe('addSingleExpense', () => {
    it('should add the expected valid expense', () => {
      const savingsMonth = new SavingsMonth(irrelevantCreditAmount, irrelevantDateRange);
      const expectedExpense = new SingleExpense(100, new Date('2022-12-01'));

      savingsMonth.addSingleExpense(expectedExpense);

      const expenses = savingsMonth.expenses;

      expect(expenses[0]).toEqual(expectedExpense);
    });

    it('should throw the expected error given an invalid expense', () => {
      const savingsMonth = new SavingsMonth(irrelevantCreditAmount, { beginDate: new Date('2022-12-01'), endDate: new Date('2022-12-31')});
      const expectedExpense = new SingleExpense(100, new Date('2022-11-01'));

      expect(() => savingsMonth.addSingleExpense(expectedExpense)).toThrowError('INVALID EXPENSE');
    });
  });


  describe('addManyExpenses', () => {
    it('should add the expected valid expense', () => {
      const savingsMonth = new SavingsMonth(irrelevantCreditAmount, irrelevantDateRange);
      const expectedExpense = new SingleExpense(100, new Date('2022-12-01'));

      savingsMonth.addManyExpenses([expectedExpense]);

      const expenses = savingsMonth.expenses;

      expect(expenses[0]).toEqual(expectedExpense);
    });

    it('should add the expected two expenses', () => {
      const savingsMonth = new SavingsMonth(irrelevantCreditAmount, irrelevantDateRange);
      const expectedExpense1 = new SingleExpense(100, new Date('2022-12-01'));
      const expectedExpense2 = new SingleExpense(150, new Date('2022-12-02'));

      savingsMonth.addManyExpenses([expectedExpense1, expectedExpense2]);

      const expenses = savingsMonth.expenses;

      expect(expenses.includes(expectedExpense1)).toBeTruthy();
      expect(expenses.includes(expectedExpense2)).toBeTruthy();
    });

    it('should add the expected many expenses', () => {
      const savingsMonth = new SavingsMonth(irrelevantCreditAmount, irrelevantDateRange);
      const expectedExpense1 = new SingleExpense(100, new Date('2022-12-01'));
      const expectedExpense2 = new SingleExpense(150, new Date('2022-12-02'));
      const expectedExpense3 = new SingleExpense(150, new Date('2022-12-03'));
      const expectedExpense4 = new SingleExpense(150, new Date('2022-12-04'));
      const expectedExpense5 = new SingleExpense(150, new Date('2022-12-05'));

      savingsMonth.addManyExpenses([expectedExpense1, expectedExpense2, expectedExpense3, expectedExpense4, expectedExpense5]);

      const expenses = savingsMonth.expenses;

      expect(expenses.includes(expectedExpense1)).toBeTruthy();
      expect(expenses.includes(expectedExpense2)).toBeTruthy();
      expect(expenses.includes(expectedExpense3)).toBeTruthy();
      expect(expenses.includes(expectedExpense4)).toBeTruthy();
      expect(expenses.includes(expectedExpense5)).toBeTruthy();
    });
  });

  describe('applyRunningBalance', () => {
    it('should return the expected running balance given no expenses and no credit amount', () => {
      const savingsMonth = new SavingsMonth(0, irrelevantDateRange);
      const runningBalance = 10;

      expect(savingsMonth.applyRunningBalance(runningBalance)).toEqual(runningBalance);
    });

    it('should return the expected running balance given one expense with a positive running balance', () => {
      const savingsMonth = new SavingsMonth(irrelevantCreditAmount, irrelevantDateRange);
      const expense = ExpenseUtils.buildSingleExpense(irrelevantDateRange);
      savingsMonth.addSingleExpense(expense);
      const runningBalance = 10;
      const expectedBalance = runningBalance + (irrelevantCreditAmount - expense.amount);

      expect(savingsMonth.applyRunningBalance(runningBalance)).toEqual(expectedBalance);
    });

    it('should return the expected running balance given one expense with a positive running balance', () => {
      const savingsMonth = new SavingsMonth(irrelevantCreditAmount, irrelevantDateRange);
      const expense = ExpenseUtils.buildSingleExpense(irrelevantDateRange);
      savingsMonth.addSingleExpense(expense);
      const runningBalance = -10;
      const expectedBalance = runningBalance + (irrelevantCreditAmount - expense.amount);

      expect(savingsMonth.applyRunningBalance(runningBalance)).toEqual(expectedBalance);
    });

    it('should return the expected running balance given many expenses', () => {
      const savingsMonth = new SavingsMonth(irrelevantCreditAmount, irrelevantDateRange);
      const expenses = ExpenseUtils.buildManySingleExpenses(Random.Number({ min: 5, max: 20 }), irrelevantDateRange);
      savingsMonth.addManyExpenses(expenses);
      const runningBalance = 10;
      const expectedBalance = runningBalance + irrelevantCreditAmount - expenses.map((exp) => exp.amount).reduce((prev, curr) => prev + curr, 0);

      expect(savingsMonth.applyRunningBalance(runningBalance)).toEqual(expectedBalance);
    });
  });
});
