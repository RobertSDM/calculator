import Calculator from "../model/caculator.js";
import Keyboard from "../model/keyboard.js";
import CalculatorView from "../view/calculator-view.js";
class CalculatorController {
    constructor() {
        this.calc = new Calculator();
        this.view = new CalculatorView();
        this.keyboard = new Keyboard();
        this.view.addNumber(this.calc.currentValue, 0);
        this.view.updateResult(0);
        this.keyboard.addEventListener("NUMBER", this.eventNumber.bind(this));
        this.keyboard.addEventListener("OPERATION", this.eventOperator.bind(this));
        this.keyboard.addEventListener("FUNCTION", this.eventFunction.bind(this));
    }
    eventOperator(event) {
        const targetElement = event.target;
        const operation = targetElement.dataset.operator;
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
            console.log("Primeiro: " + this.calc.firstValue);
            this.calc.addOperator(operation);
            this.view.addOperator(operation);
            console.log("Primeiro: " + this.calc.firstValue);
        }
        console.log(this.calc.secondValue);
        console.log("Valor atual: " + this.calc.currentValue);
    }
    eventNumber(event) {
        const targetElement = event.target;
        const number = parseFloat(targetElement.dataset.number);
        const lastValue = this.calc.addNumber(number);
        this.view.addNumber(this.calc.currentValue, lastValue);
        console.log(this.calc.secondValue);
        const result = this.calc.executeOperation(false);
        this.view.updateResult(result);
    }
    eventFunction(event) {
        const targetElement = event.target;
        const func = targetElement.dataset.func;
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
