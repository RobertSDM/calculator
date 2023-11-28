var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import getDOMElement from "../../decorators/get-DOM-element.js";
class Keyboard {
    handleKeyDown(event) { }
    addEventListener(btnType, callback) {
        switch (btnType) {
            case "FUNCTION":
                this.functionsBtn.forEach((button) => button.addEventListener("click", function (event) {
                    const targetElement = event.target;
                    const func = targetElement.dataset.func;
                    callback(func);
                }));
                break;
            case "NUMBER":
                this.numbersBtn.forEach((button) => button.addEventListener("click", function (event) {
                    const targetElement = event.target;
                    const number = parseFloat(targetElement.dataset.number);
                    callback(number);
                }));
                break;
            case "OPERATION":
                this.operationsBtn.forEach((button) => button.addEventListener("click", function (event) {
                    const targetElement = event.target;
                    const operation = targetElement.dataset.operator;
                    callback(operation);
                }));
                break;
            case "KEYBOARD":
                window.onkeydown = (event) => {
                    if (event.key.match(/^(?:[0-9]|Numpad[0-9]|Enter|[+\-*÷%=]|Delete|\.)$/)) {
                        event.preventDefault();
                        if (event.ctrlKey && event.key === "Delete") {
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
__decorate([
    getDOMElement("[data-operator]")
], Keyboard.prototype, "operationsBtn", void 0);
__decorate([
    getDOMElement("[data-func]")
], Keyboard.prototype, "functionsBtn", void 0);
__decorate([
    getDOMElement("[data-number]")
], Keyboard.prototype, "numbersBtn", void 0);
export default Keyboard;
