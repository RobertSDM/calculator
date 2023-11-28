import Calculator from "../../app/model/caculator.js";

describe("Testing the class Calculator", () => {
    let calculator: Calculator;
    beforeEach(() => {
        calculator = new Calculator();
    });

    test("Test if firstValue and secondValue is added", () => {
        const number = 1;
        calculator.addNumber(number);
        expect(calculator.firstValue).toEqual(number);

        calculator.addOperator("+");

        calculator.addNumber(number);
        expect(calculator.secondValue).toEqual(number);
    });

    test("Test if addOperator is not added if firstValue not exist", () => {
        const operator = "+";
        calculator.addOperator(operator);
        expect(calculator.operation).toContain("");
    });

    test("Test if the firstValue turn negative", () => {
        const number = 20;

        calculator.isNegative = true;

        calculator.addNumber(number);
        expect(calculator.firstValue).toBe(-number);
        expect(calculator.isNegative).toBeFalsy();
    });

    test("Test if executeOperation and clear works", () => {
        const number = 1;
        calculator.addNumber(number);
        expect(calculator.firstValue).toEqual(number);

        calculator.addOperator("+");

        calculator.addNumber(number);
        expect(calculator.secondValue).toEqual(number);

        calculator.executeOperation();
        expect(calculator.result).toBe(2);
        expect(calculator.operation).toContain("");
        expect(calculator.firstValue).toBe(2);
        expect(calculator.secondValue).toBeFalsy();

        // Test if it clear all the calculator when secondValue is null
        calculator.clear();
        expect(calculator.result).toBeFalsy();
        expect(calculator.firstValue).toBeFalsy();
    });

    test("Test if the number turn into a decimal and the operation is executed", () => {
        calculator.addNumber(2);
        calculator.isDecimal = true;
        calculator.addNumber(3);
        expect(calculator.firstValue).toBe(2.3);

        calculator.addOperator("+");
        expect(calculator.isDecimal).toBeFalsy();

        calculator.addNumber(2);
        calculator.isDecimal = true;
        calculator.addNumber(4);
        expect(calculator.secondValue).toBe(2.4);

        calculator.executeOperation();
        expect(calculator.result).toBeCloseTo(4.7);
    });
});
