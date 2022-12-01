import { Random } from "random-test-values";
import { buildSavingsMonth } from "../utilities/expense-test-utilities";
import { SavingsSchedule } from "./savings-schedule";

describe('savingsSchedule', () => {
  describe('GET netAmount', () => {
    it('should return the expected amount given one savings month', () => {
      const savingsMonth = buildSavingsMonth();
      const creditAmount = Random.Number({ min: 1, max: 100 });
      const schedule = new SavingsSchedule(0, creditAmount, [savingsMonth]);
      const expectedAmount = savingsMonth.netBalance;

      expect(schedule.netAmount).toEqual(expectedAmount);
    });

    it('should return the expected amount given two savings months', () => {
      const creditAmount = Random.Number({ min: 1, max: 100 });
      const savingsMonth1 = buildSavingsMonth(creditAmount);
      const savingsMonth2 = buildSavingsMonth(creditAmount);
      const schedule = new SavingsSchedule(0, creditAmount, [savingsMonth1, savingsMonth2]);
      const expectedAmount = savingsMonth2.applyRunningBalance(savingsMonth1.applyRunningBalance(0));

      expect(schedule.netAmount).toEqual(expectedAmount);
    });
  });
});
