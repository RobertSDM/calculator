class Calculator {
    constructor() {
        this._currentValue = "FIRST";
        this._firstValue = null;
        this._operation = "";
        this._secondValue = null;
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
        if (this._firstValue === null)
            return;
        console.log("Passou: " + operator);
        this._operation = operator;
        this._isNegative = false;
        this._currentValue = "SECOND";
        this._isDecimal = false;
    }
    executeOperation(updateAll = true) {
        var _a;
        if (this._operation === "" || this.isDecimal)
            return (_a = this._firstValue) !== null && _a !== void 0 ? _a : 0;
        this._result = this._operations[this._operation](this._firstValue, this._secondValue);
        if (updateAll) {
            this._firstValue = this.result;
            this._operation = "";
            this._isDecimal = false;
            this.clear();
            this._currentValue = "FIRST";
        }
        return this._result;
    }
    turnNumberNegative(value) {
        const negativeNumber = -Math.abs(value);
        this._isNegative = false;
        return negativeNumber;
    }
    turnDecimal(number) {
        var _a, _b, _c, _d;
        if (this._currentValue === "FIRST") {
            const stringNumber = `${(_b = (_a = this._firstValue) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : 0}.${number}`;
            this._firstValue = parseFloat(stringNumber);
        }
        else {
            const stringNumber = `${(_d = (_c = this._secondValue) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : 0}.${number}`;
            this._secondValue = parseFloat(stringNumber);
        }
        this.isDecimal = false;
    }
    addNumber(number) {
        var _a, _b;
        if (this._currentValue === "SECOND") {
            if (this._isDecimal) {
                this.turnDecimal(number);
                return this._secondValue;
            }
            this._secondValue = parseFloat(`${(_a = this._secondValue) !== null && _a !== void 0 ? _a : ""}${number}`);
            return this._secondValue;
        }
        else {
            if (this._isDecimal) {
                this.turnDecimal(number);
                return this._firstValue;
            }
            this._firstValue = parseFloat(`${(_b = this._firstValue) !== null && _b !== void 0 ? _b : ""}${number}`);
            if (this._isNegative) {
                this._firstValue = this.turnNumberNegative(this._firstValue);
            }
            return this._firstValue;
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
        if (!this.secondValue) {
            restart = true;
        }
        if (restart) {
            this._firstValue = null;
            this._operation = "";
            this._result = 0;
            this._currentValue = "FIRST";
        }
        this._secondValue = null;
        this._isNegative = false;
    }
    set isNegative(active) {
        this._isNegative = active;
    }
    get isNegative() {
        return this._isNegative;
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
    get currentValue() {
        return this._currentValue;
    }
}
export default Calculator;
