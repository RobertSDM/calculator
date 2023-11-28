import { match } from "assert";
import getDOMElement from "../../decorators/get-DOM-element.js";

class Keyboard {
    @getDOMElement("[data-operator]")
    private operationsBtn!: NodeList;

    @getDOMElement("[data-func]")
    private functionsBtn!: NodeList;

    @getDOMElement("[data-number]")
    private numbersBtn!: NodeList;

    public addEventListener(
        btnType: "FUNCTION" | "OPERATION" | "NUMBER",
        callback: (...args: any[]) => any
    ) {
        switch (btnType) {
            case "FUNCTION":
                this.functionsBtn.forEach((button) =>
                    button.addEventListener("click", function (event) {
                        callback(event);
                    })
                );
                break;
            case "NUMBER":
                this.numbersBtn.forEach((button) =>
                    button.addEventListener("click", function (event) {
                        callback(event);
                    })
                );
                break;
            case "OPERATION":
                this.operationsBtn.forEach((button) =>
                    button.addEventListener("click", function (event) {
                        callback(event);
                    })
                );
                break;
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
