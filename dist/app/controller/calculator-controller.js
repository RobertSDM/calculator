import Calculator from "../model/caculator.js";
import Keyboard from "../model/keyboard.js";
import CalculatorView from "../view/calculator-view.js";
class CalculatorController {
    constructor() {
        this.calc = new Calculator();
        this.view = new CalculatorView();
        this.keyboard = new Keyboard();
        this.keyboard.addEventListener("NUMBER", this.eventNumber.bind(this));
        this.keyboard.addEventListener("OPERATION", this.eventOperator.bind(this));
        this.keyboard.addEventListener("FUNCTION", this.eventFunction.bind(this));
        this.keyboard.addEventListener("KEYBOARD", this.handleEventKeyboard.bind(this));
    }
    handleEventKeyboard(key) {
        if (key === "Enter") {
            const result = this.calc.executeOperation();
            this.view.clear(true);
            this.view.addNumber(this.calc.currentValue, result);
            return;
        }
        if (["+", "-", "*", "÷", "%", "="].includes(key)) {
            this.eventOperator(key);
            return;
        }
        if (key === "Delete") {
            this.eventFunction("CE");
            return;
        }
        else if (key === ".") {
            this.eventFunction(key);
            return;
        }
        else if (key === "ctrl + Delete") {
            this.eventFunction("C");
            return;
        }
        const intNumber = parseInt(key);
        this.eventNumber(intNumber);
    }
    eventOperator(operation) {
        switch (operation) {
            case "=":
                const result = this.calc.executeOperation();
                this.view.clear(true);
                this.view.addNumber(this.calc.currentValue, result);
                return;
            case "-":
                if (!this.calc.firstValue &&
                    !this.calc.isNegative &&
                    this.calc.currentValue === "FIRST") {
                    this.calc.isNegative = true;
                    this.view.addNegativeIndication(this.calc.currentValue);
                    return;
                }
        }
        if (this.calc.secondValue) {
            const result = this.calc.executeOperation();
            this.view.clear(true);
            this.view.addNumber(this.calc.currentValue, result);
            this.calc.addOperator(operation);
            this.view.addOperator(operation);
        }
        else {
            this.calc.addOperator(operation);
            this.view.addOperator(operation);
        }
    }
    eventNumber(number) {
        let lastValue;
        lastValue = this.calc.addNumber(number);
        this.view.addNumber(this.calc.currentValue, lastValue);
        const result = this.calc.executeOperation(false);
        this.view.updateResult(result);
    }
    eventFunction(func) {
        switch (func) {
            case "C":
                this.calc.clear(true);
                this.view.clear(true);
                break;
            case "CE":
                this.calc.clear(false);
                this.view.clear(false);
                break;
            case ".":
                this.calc.isDecimal = true;
                this.view.addDecimalIndication(this.calc.currentValue);
                break;
        }
    }
}
new CalculatorController();
