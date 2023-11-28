class Calculator {
    constructor() {
        this._currentValue = "FIRST";
        this._firstValue = 0;
        this._operation = "";
        this._secondValue = 0;
        this._result = 0;
        this._isDecimal = false;
        this._isNegative = false;
        this._operations = {
            "+": this.sum,
            "-": this.subtract,
            "*": this.multiply,
            "÷": this.divide,
            "%": this.percentage,
        };
    }
    addOperator(operator) {
        if (this.firstValue === null)
            return;
        this._operation = operator;
        this._isNegative = false;
        this._currentValue = "SECOND";
        this._isDecimal = false;
    }
    executeOperation() {
        this._result = this._operations[this._operation](this._firstValue, this._secondValue);
        this._firstValue = this.result;
        this._operation = "";
        this._isDecimal = false;
        this.clear();
        return this._result;
    }
    turnNumberNegative(value) {
        const negativeNumber = -Math.abs(value);
        return negativeNumber;
    }
    turnDecimal(number) {
        var _a;
        if (this._currentValue === "FIRST") {
            const stringNumber = this._firstValue.toString() + `.${number}`;
            this._firstValue = parseFloat(stringNumber);
        }
        else {
            const stringNumber = ((_a = this._secondValue) === null || _a === void 0 ? void 0 : _a.toString()) + `.${number}`;
            this._secondValue = parseFloat(stringNumber);
        }
    }
    addNumber(number) {
        if (this._currentValue === "SECOND") {
            if (this._isDecimal) {
                this.turnDecimal(number);
                return;
            }
            this._secondValue = parseFloat(`${this._secondValue}${number}`);
            if (this._isNegative) {
                this._secondValue = this.turnNumberNegative(this._secondValue);
            }
        }
        else {
            if (this._isDecimal) {
                this.turnDecimal(number);
                return;
            }
            this._firstValue = parseFloat(`${this._firstValue}${number}`);
            if (this._isNegative) {
                this._firstValue = this.turnNumberNegative(this._firstValue);
            }
        }
    }
    sum(a, b) {
        if (!b)
            return a;
        return a + b;
    }
    subtract(a, b) {
        if (!b)
            return a;
        return a - b;
    }
    divide(a, b) {
        if (!b)
            return a;
        if (b === 0)
            return 0;
        return a / b;
    }
    multiply(a, b) {
        if (!b)
            return a;
        return a * b;
    }
    percentage(a, b) {
        if (!b)
            return 100;
        return (b * a) / 100;
    }
    clear(restart = false) {
        // TODO: comment what does that is doing!!
        if (this.secondValue === 0) {
            restart = true;
        }
        if (restart) {
            this._firstValue = 0;
            this._operation = "";
            this._result = 0;
        }
        this._secondValue = 0;
        this._isNegative = false;
    }
    set isNegative(active) {
        this._isNegative = active;
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
    set isDecimal(active) {
        this._isDecimal = active;
    }
    get isDecimal() {
        return this._isDecimal;
    }
}
export default Calculator;
