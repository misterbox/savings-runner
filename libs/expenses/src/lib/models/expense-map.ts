import { buildDateKeyFromDate } from "../utilities/date-utilities";
import { ExpenseKey, SingleExpense } from "./expense";

export class ExpenseMap {
  private _expenses: SingleExpense[];
  private _expenseMap = new Map<ExpenseKey, SingleExpense[]>();

  public get expenses(): SingleExpense[] {
    return this._expenses;
  }

  constructor(expenses: SingleExpense[]) {
    this._expenses = expenses;
    this.sortAndMap();
  }

  // TODO: test
  public has(key: ExpenseKey): boolean {
    return this._expenseMap.has(key);
  }

  public getExpensesAtKey(key: ExpenseKey): SingleExpense[] | undefined {
    return this._expenseMap.get(key)
  }

  private sortAndMap(): void {
    this.sortExpenses();
    this.mapExpenses();
  }

  private sortExpenses(): void {
    this._expenses = this._expenses.sort((a, b) => {
        if (a.date < b.date) return -1;
        if (a.date === b.date) return 0;
        return 1;
      });
  }

  private mapExpenses(): void {
    this._expenses.forEach((expense) => {
      const key = buildDateKeyFromDate(expense.date);

      if (this._expenseMap.has(key)) {
        const expenses = this._expenseMap.get(key);

        if (expenses) {
          expenses?.push(expense);
          this._expenseMap.set(key, expenses);
        }
      }
      else {
        this._expenseMap.set(key, [expense]);
      }
    });
  }
}
