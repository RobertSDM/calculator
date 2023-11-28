var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import getDOMElement from "../../decorators/get-DOM-element.js";
export default class CalculatorView {
    constructor() {
        this._firstValue = "";
        this._secondValue = "";
        this._operation = "";
        this._result = "";
    }
    clear(restart = false) {
        if (restart) {
            this._firstValue = "";
            this._operation = "";
            this._result = "";
        }
        this._secondValue = "";
        this.updateCalcEl();
        this.updateResult(this._result);
    }
    addOperator(operator) {
        if (this._firstValue === "")
            return;
        this._operation = operator;
        this.updateCalcEl();
    }
    addNegativeIndication(currentValue) {
        if (currentValue === "FIRST") {
            this._firstValue = `-${this._firstValue}`;
        }
        this.updateCalcEl();
    }
    addDecimalIndication(currentValue) {
        if (currentValue === "FIRST") {
            this._firstValue = `${this._firstValue}.`;
        }
        else {
            this._secondValue = `${this._secondValue}.`;
        }
        this.updateCalcEl();
    }
    updateCalcEl() {
        const calcString = `${this._firstValue} ${this._operation} ${this._secondValue}`;
        this._calcEl.innerHTML = calcString;
    }
    updateResult(result) {
        this._result = result.toString();
        this._resultEl.innerHTML = result.toString();
    }
    addNumber(currentValue, number) {
        if (currentValue === "FIRST") {
            this._firstValue = number.toString();
        }
        else {
            this._secondValue = number.toString();
        }
        this.updateCalcEl();
    }
    get firstValue() {
        return this._firstValue;
    }
    get secondValue() {
        return this._secondValue;
    }
    get operation() {
        return this._operation;
    }
    get result() {
        return this._result;
    }
}
__decorate([
    getDOMElement("#__calc", false)
], CalculatorView.prototype, "_calcEl", void 0);
__decorate([
    getDOMElement("#__result", false)
], CalculatorView.prototype, "_resultEl", void 0);
