import getDOMElement from "../../decorators/get-DOM-element.js";

export default class CalculatorView {
    @getDOMElement("#__calc", false)
    private _calcEl!: HTMLElement;

    @getDOMElement("#__result", false)
    private _resultEl!: HTMLElement;

    private _firstValue: string = "";
    private _secondValue: string = "";
    private _operation: string = "";
    private _result: string = "";

    constructor() {}

    public clear(restart: boolean) {
        if (restart) {
            this._firstValue = "";
            this._operation = "";
            this._result = "";
        }

        this._secondValue = "";
        this.updateCalcEl();
        this.updateResult(this._result);
    }

    public addOperator(operator: string) {
        if (this._firstValue === "") return;
        this._operation = operator;
        this.updateCalcEl();
    }

    public addNegativeIndication(currentValue: "FIRST" | "SECOND") {
        if (currentValue === "FIRST") {
            this._firstValue = `-${this._firstValue}`;
        }
        this.updateCalcEl();
    }

    public addDecimalIndication(currentValue: "FIRST" | "SECOND") {
        if (currentValue === "FIRST") {
            this._firstValue = `${this._firstValue}.`;
        } else {
            this._secondValue = `${this._secondValue}.`;
        }
        this.updateCalcEl();
    }

    private updateCalcEl() {
        const calcString = `${this._firstValue} ${this._operation} ${this._secondValue}`;
        this._calcEl.innerHTML = calcString;
    }

    public updateResult(result: number | string) {
        this._result = result.toString();
        this._resultEl.innerHTML = result.toString();
    }

    public addNumber(currentValue: "FIRST" | "SECOND", number: number) {
        if (currentValue === "FIRST") {
            this._firstValue = number.toString();
        } else {
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
