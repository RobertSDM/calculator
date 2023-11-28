export default class CalculatorView {
    constructor() {
        this._calcEl = document.querySelector("#__calc");
        this._resultEl = document.querySelector("#__result");
        this._currentValue = "FIRST";
        this._firstValue = "";
        this._secondValue = "";
        this._operation = "";
        this._result = "";
    }
    clear(restart = false) {
        if (restart) {
            this._firstValue = "";
            this._operation = "";
            this._currentValue = "FIRST";
            this._result = "";
        }
        this._secondValue = "";
    }
    addOperator(operator) {
        this._operation = operator;
        this.changeCurrentValue();
        this.updateCalcEl();
    }
    addNegativeIndication() {
        if (this._currentValue === "FIRST") {
            this.updateValues(false, `-`);
        }
        else {
            this.updateValues(false, this._firstValue, `-`);
        }
    }
    addDecimalIndication() {
        if ((this._currentValue = "FIRST")) {
            this.updateValues(false, `${this._firstValue}.`);
        }
        else {
            this.updateValues(false, this._firstValue, `${this._secondValue}.`);
        }
    }
    changeCurrentValue() {
        this._currentValue === "FIRST"
            ? (this._currentValue = "SECOND")
            : (this._currentValue = "FIRST");
    }
    updateCalcEl() {
        const calcString = `${this._firstValue} ${this._operation} ${this._secondValue}`;
        console.log(this._calcEl);
        this._calcEl.innerHTML = calcString;
    }
    updateResult(result) {
        this._result = result.toString();
        this._resultEl.innerHTML = result.toString();
    }
    updateValues(changeCurrentValue, firstValue, secondValue) {
        var _a, _b;
        if (changeCurrentValue)
            this.changeCurrentValue();
        this._firstValue = (_a = firstValue === null || firstValue === void 0 ? void 0 : firstValue.toString()) !== null && _a !== void 0 ? _a : this._firstValue;
        this._secondValue = (_b = secondValue === null || secondValue === void 0 ? void 0 : secondValue.toString()) !== null && _b !== void 0 ? _b : this._secondValue;
        this.updateCalcEl();
    }
    get currentValue() {
        return this._currentValue;
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
}
