import { RecurringExpense, SingleExpense } from "./expense";

describe('RecurringExpense', () => {
    describe('toSingleExpense', () => {
        it('should create the expected single expense', () => {
            const expectedAmount = 100;
            const beginDate = new Date('2022-12-15T00:00');
            const endDate = new Date('2022-12-15T00:00');
            const expectedExpense1 = new SingleExpense(expectedAmount, beginDate);
            const recurringExpense = new RecurringExpense(expectedAmount, beginDate, endDate);

            const singleExpenses = recurringExpense.toSingleExpenses();

            expect(singleExpenses.length).toEqual(1);
            expect(singleExpenses[0]).toEqual(expectedExpense1);
        });
    });

    it('should create the expected single expenses', () => {
        const expectedAmount = 100;
        const beginDate = new Date('2022-12-01T00:00');
        const endDate = new Date('2023-01-01T00:00');
        const expectedExpense1 = new SingleExpense(expectedAmount, beginDate);
        const expectedExpense2 = new SingleExpense(expectedAmount, endDate);
        const recurringExpense = new RecurringExpense(expectedAmount, beginDate, endDate);

        const singleExpenses = recurringExpense.toSingleExpenses();

        expect(singleExpenses.length).toEqual(2);
        expect(singleExpenses[0]).toEqual(expectedExpense1);
        expect(singleExpenses[1]).toEqual(expectedExpense2);
    });

    it('should create the expected single expenses given a large date range', () => {
        const expectedAmount = 100;
        const beginDate = new Date('2022-01-01T00:00');
        const endDate = new Date('2024-12-01T00:00');
        const recurringExpense = new RecurringExpense(expectedAmount, beginDate, endDate);

        const singleExpenses = recurringExpense.toSingleExpenses();

        expect(singleExpenses.length).toEqual(36);
        expect(singleExpenses.every((exp) => exp.amount === expectedAmount)).toBeTruthy();
    });
});
