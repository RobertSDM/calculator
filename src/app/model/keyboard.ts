import { match } from "assert";
import getDOMElement from "../../decorators/get-DOM-element.js";

class Keyboard {
    @getDOMElement("[data-operator]")
    private operationsBtn!: NodeList;

    @getDOMElement("[data-func]")
    private functionsBtn!: NodeList;

    @getDOMElement("[data-number]")
    private numbersBtn!: NodeList;

    public handleKeyDown(event: KeyboardEvent) {}

    public addEventListener(
        btnType: "FUNCTION" | "OPERATION" | "NUMBER" | "KEYBOARD",
        callback: (...args: any[]) => any
    ) {
        switch (btnType) {
            case "FUNCTION":
                this.functionsBtn.forEach((button) =>
                    button.addEventListener("click", function (event) {
                        const targetElement = event.target as HTMLElement;
                        const func = targetElement.dataset.func;
                        callback(func);
                    })
                );
                break;
            case "NUMBER":
                this.numbersBtn.forEach((button) =>
                    button.addEventListener("click", function (event) {
                        const targetElement = event.target as HTMLElement;
                        const number = parseFloat(
                            targetElement.dataset.number as string
                        );
                        callback(number);
                    })
                );
                break;
            case "OPERATION":
                this.operationsBtn.forEach((button) =>
                    button.addEventListener("click", function (event) {
                        const targetElement = event.target as HTMLElement;
                        const operation = targetElement.dataset.operator!;
                        callback(operation);
                    })
                );
                break;
            case "KEYBOARD":
                window.onkeydown = (event: KeyboardEvent) => {
                    if (
                        event.key.match(
                            /^(?:[0-9]|Numpad[0-9]|Enter|[+\-*÷%=]|Delete|\.)$/
                        )
                    ) {
                        event.preventDefault();
                        if(event.ctrlKey && event.key === "Delete"){
                            callback("ctrl + Delete");
                        }
                        callback(event.key);
                    }
                };
        }
    }

    get operators() {
        return this.operationsBtn;
    }

    get numbers() {
        return this.numbersBtn;
    }

    get functions() {
        return this.functionsBtn;
    }
}

export default Keyboard;
