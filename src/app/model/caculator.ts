class Calculator {
    private _currentValue: "FIRST" | "SECOND" = "FIRST";
    private _firstValue: number = 0;
    private _operation: string = "";
    private _secondValue: number = 0;
    private _result: number = 0;
    private _isDecimal: boolean = false;
    private _isNegative: boolean = false;
    private _operations: Record<string, Function>;

    constructor() {
        this._operations = {
            "+": this.sum,
            "-": this.subtract,
            "*": this.multiply,
            "÷": this.divide,
            "%": this.percentage,
        };
    }

    public addOperator(operator: string) {
        if (this.firstValue === null) return;

        this._operation = operator;
        this._isNegative = false;
        this._currentValue = "SECOND";
        this._isDecimal = false;
    }

    public executeOperation(): number {
        this._result = this._operations[this._operation](
            this._firstValue,
            this._secondValue
        );

        this._firstValue = this.result;
        this._operation = "";
        this._isDecimal = false;
        this.clear();

        return this._result;
    }

    protected turnNumberNegative(value: number): number {
        const negativeNumber = -Math.abs(value);
        return negativeNumber;
    }

    private turnDecimal(number: number) {
        if (this._currentValue === "FIRST") {
            const stringNumber: string =
                this._firstValue.toString() + `.${number}`;
            this._firstValue = parseFloat(stringNumber);
        } else {
            const stringNumber: string =
                this._secondValue?.toString() + `.${number}`;
            this._secondValue = parseFloat(stringNumber);
        }
    }

    public addNumber(number: number) {
        if (this._currentValue === "SECOND") {
            if (this._isDecimal) {
                this.turnDecimal(number);
                return;
            }
            this._secondValue = parseFloat(`${this._secondValue}${number}`);

            if (this._isNegative) {
                this._secondValue = this.turnNumberNegative(this._secondValue);
            }
        } else {
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

    private sum(a: number, b: number): number {
        if (!b) return a;
        return a + b;
    }

    private subtract(a: number, b: number): number {
        if (!b) return a;
        return a - b;
    }

    private divide(a: number, b: number): number {
        if (!b) return a;
        if (b === 0) return 0;
        return a / b;
    }
    private multiply(a: number, b: number): number {
        if (!b) return a;
        return a * b;
    }
    private percentage(a: number, b: number): number {
        if (!b) return 100;
        return (b * a) / 100;
    }

    public clear(restart = false) {
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

    set isNegative(active: boolean) {
        this._isNegative = active;
    }

    get firstValue(): number {
        return this._firstValue as number;
    }

    get secondValue(): number {
        return this._secondValue as number;
    }

    get operation(): string {
        return this._operation;
    }

    get result(): number {
        return this._result as number;
    }

    set isDecimal(active: boolean) {
        this._isDecimal = active;
    }

    get isDecimal(): boolean {
        return this._isDecimal;
    }
}

export default Calculator;
