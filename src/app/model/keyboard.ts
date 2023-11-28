import getDOMElement from "../../decorators/get-DOM-element";

class Keyboard {
    @getDOMElement("[data-operator]")
    private operationsBtn!: NodeList;

    @getDOMElement("[data-func]")
    private functionsBtn!: NodeList;

    @getDOMElement("[data-number]")
    private numbersBtn!: NodeList;

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
