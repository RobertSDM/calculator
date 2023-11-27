export default function getDOMElement(
    elementSelector: string,
    getNodeList = true
) {
    return function (target: any, propertyName: string): void {
        let element: NodeList | HTMLElement;

        const getElement = function (): NodeList | HTMLElement {
            if (!element) {
                if (getNodeList) {
                    element = document.querySelectorAll(elementSelector);
                } else {
                    element = document.querySelector(
                        elementSelector
                    ) as HTMLElement;
                }
            }

            return element;
        };
        Object.defineProperty(target, propertyName, { get: getElement });
    };
}
