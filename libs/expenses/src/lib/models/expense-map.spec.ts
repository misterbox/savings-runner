import { buildDateKeyFromDate } from "../utilities/date-utilities";
import { buildManySingleExpenses, buildSingleExpense } from "../utilities/expense-test-utilities";
import { SingleExpense } from "./expense";
import { ExpenseMap } from "./expense-map";

describe('ExpenseMap', () => {
  describe('GET expenses', () => {
    it('should return two expences sorted by date acending', () => {
      const expense1 = new SingleExpense(0, new Date('2022-12-01T00:00'));
      const expense2 = new SingleExpense(0, new Date('2021-09-01T00:00'));
      const expenseMap = new ExpenseMap([expense1, expense2]);

      const actualExpenses = expenseMap.expenses;

      expect(actualExpenses[0]).toEqual(expense2);
      expect(actualExpenses[1]).toEqual(expense1);
    });

    it('should return many expenses sorted by date ascending', () => {
      const expenses = buildManySingleExpenses();
      const expectedSortedExpenses = expenses.sort((a, b) => {
        if (a.date < b.date) return -1;
        if (a.date === b.date) return 0;
        return 1;
      });
      const expenseMap = new ExpenseMap(expenses);

      const actualExpenses = expenseMap.expenses;

      expect(actualExpenses).toEqual(expectedSortedExpenses);
    });
  });

  describe('getExpensesAtKey', () => {
    it('should return the expected expense at the given key', () => {
      const expense = buildSingleExpense();
      const key = buildDateKeyFromDate(expense.date);
      const expenseMap = new ExpenseMap([expense]);

      const actualExpense = expenseMap.getExpensesAtKey(key);

      expect(actualExpense).toBeDefined()

      if (actualExpense) {
        expect(actualExpense[0]).toEqual(expense);
      }
      else {
        fail();
      }
    });

    it('should return the expected expenses at the given key', () => {
      const randomExpenses = buildManySingleExpenses();
      const expectedExpense1 = new SingleExpense(0, new Date('2022-12-01T00:00'));
      const expectedExpense2 = new SingleExpense(0, new Date('2022-12-15T00:00'));
      const expectedExpenses = [expectedExpense1, expectedExpense2];
      const key = buildDateKeyFromDate(expectedExpense1.date);
      const expenseMap = new ExpenseMap(randomExpenses.concat(expectedExpenses));

      const actualExpense = expenseMap.getExpensesAtKey(key);

      expect(actualExpense).toStrictEqual(expectedExpenses);
    });
  });
});
