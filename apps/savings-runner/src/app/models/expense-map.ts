import { SingleExpense } from "./expense";

export class ExpenseMap {
  private _expenses: SingleExpense[];
  private _expenseMap = new Map<string, SingleExpense[]>();

  public get expenses(): SingleExpense[] {
    return [];
  }

  constructor(expenses: SingleExpense[]) {
    this._expenses = expenses;
  }

  private sortAndMap(): void {
    return;
  }
}
