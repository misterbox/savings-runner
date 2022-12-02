import { buildSingleExpense } from "../utilities/expense-test-utilities";
import { SavingsScheduleFactory } from "./savings-schedule-factory";

describe('SavingsScheduleFactory', () => {
  describe('build', () => {
    it('should return a minimum savings schedule given no expenses', () => {
      const factory = new SavingsScheduleFactory(0, 0, []);

      const schedule = factory.build();

      expect(schedule.netAmount).toEqual(0);
    });

    xit('should return the expected savings schedule given one single expense', () => {
      const expense = buildSingleExpense();
      const factory = new SavingsScheduleFactory(0, 0, [expense]);

      const schedule = factory.build();

      expect(schedule.netAmount).toEqual(0 - expense.amount);
    });
  });
});
