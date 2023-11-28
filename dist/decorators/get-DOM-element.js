function getDOMElement(elementSelector, getNodeList = true) {
    return function (target, propertyName) {
        let element;
        const getElement = function () {
            if (!element) {
                if (getNodeList) {
                    element = document.querySelectorAll(elementSelector);
                }
                else {
                    element = document.querySelector(elementSelector);
                }
            }
            return element;
        };
        Object.defineProperty(target, propertyName, { get: getElement });
    };
}
export default getDOMElement;
