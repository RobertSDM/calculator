import getDOMElement from "../../decorators/get-DOM-element.js";

export default class CalculatorView {
    private _calcEl: HTMLElement = document.querySelector(
        "#__calc"
    ) as HTMLElement;

    private _resultEl: HTMLElement = document.querySelector(
        "#__result"
    ) as HTMLElement;

    private _currentValue: "FIRST" | "SECOND" = "FIRST";
    private _firstValue: string = "";
    private _secondValue: string = "";
    private _operation: string = "";
    private _result: string = "";

    constructor() {}

    public clear(restart = false) {
        if (restart) {
            this._firstValue = "";
            this._operation = "";
            this._currentValue = "FIRST";
            this._result = "";
        }

        this._secondValue = "";
    }

    public addOperator(operator: string) {
        this._operation = operator;
        this.changeCurrentValue();
        this.updateCalcEl();
    }

    public addNegativeIndication() {
        if (this._currentValue === "FIRST") {
            this.updateValues(false, `-`);
        } else {
            this.updateValues(false, this._firstValue, `-`);
        }
    }

    public addDecimalIndication() {
        if ((this._currentValue = "FIRST")) {
            this.updateValues(false, `${this._firstValue}.`);
        } else {
            this.updateValues(false, this._firstValue, `${this._secondValue}.`);
        }
    }

    private changeCurrentValue() {
        this._currentValue === "FIRST"
            ? (this._currentValue = "SECOND")
            : (this._currentValue = "FIRST");
    }

    private updateCalcEl() {
        const calcString = `${this._firstValue} ${this._operation} ${this._secondValue}`;
        console.log(this._calcEl);
        this._calcEl.innerHTML = calcString;
    }

    public updateResult(result: number) {
        this._result = result.toString();
        this._resultEl.innerHTML = result.toString();
    }

    public updateValues(
        changeCurrentValue: boolean,
        firstValue?: number | string,
        secondValue?: number | string
    ) {
        if (changeCurrentValue) this.changeCurrentValue();
        this._firstValue = firstValue?.toString() ?? this._firstValue;
        this._secondValue = secondValue?.toString() ?? this._secondValue;
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
