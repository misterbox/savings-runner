import { Random } from "random-test-values";
import { buildManySavingsMonths, buildSavingsMonth } from '../utilities/expense-test-utilities';
import { SavingsSchedule } from "./savings-schedule";

describe('savingsSchedule', () => {
  describe('GET netAmount', () => {
    it('should return the expected amount given one savings month', () => {
      const savingsMonth = buildSavingsMonth();
      const schedule = new SavingsSchedule(0, [savingsMonth]);
      const expectedAmount = savingsMonth.netBalance;

      expect(schedule.netAmount).toEqual(expectedAmount);
    });

    it('should return the expected amount given two savings months', () => {
      const creditAmount = Random.Number({ min: 1, max: 100 });
      const savingsMonth1 = buildSavingsMonth(creditAmount);
      const savingsMonth2 = buildSavingsMonth(creditAmount);
      const schedule = new SavingsSchedule(0, [savingsMonth1, savingsMonth2]);
      const expectedAmount = savingsMonth2.applyRunningBalance(savingsMonth1.applyRunningBalance(0));

      expect(schedule.netAmount).toEqual(expectedAmount);
    });
  });

  describe('GET shortfallMonths', () => {
    it('should return the expected shortfall month given one savings month', () => {
      const savingsMonth = buildSavingsMonth(0);
      const schedule = new SavingsSchedule(0, [savingsMonth]);

      const netAmount = schedule.netAmount;
      const shortfallMonths = schedule.shortfallMonths;

      expect(shortfallMonths.length).toEqual(1);
      expect(shortfallMonths[0].balance).toEqual(savingsMonth.netBalance);
      expect(shortfallMonths[0].monthKey).toEqual(savingsMonth.key);
      expect(shortfallMonths[0].savingsMonth).toBe(savingsMonth);
    });

    it('should return the expected shortfall month given two savings months', () => {
      const savingsMonth1 = buildSavingsMonth(0);
      const savingsMonth2 = buildSavingsMonth(0);
      const schedule = new SavingsSchedule(0, [savingsMonth1, savingsMonth2]);

      const netAmount = schedule.netAmount;
      const shortfallMonths = schedule.shortfallMonths;
      const actualMonths = shortfallMonths.map((shortfall) => shortfall.savingsMonth);

      expect(shortfallMonths.length).toEqual(2);
      expect(actualMonths.includes(savingsMonth1)).toBeTruthy();
      expect(actualMonths.includes(savingsMonth2)).toBeTruthy();
    });

    it('should return the expected shortfall month given many savings months', () => {
      const savingsMonths = buildManySavingsMonths(0);
      const schedule = new SavingsSchedule(0, savingsMonths);

      const netAmount = schedule.netAmount;
      const shortfallMonths = schedule.shortfallMonths;

      expect(shortfallMonths.length).toEqual(savingsMonths.length);
    });
  });
});
