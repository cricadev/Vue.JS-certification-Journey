"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NodeList_js_1 = __importDefault(require("../node/NodeList.cjs"));
/**
 * Utility for finding labels associated with a form element.
 */
class HTMLLabelElementUtility {
    /**
     * Returns label elements for a form element.
     *
     * @param element Element to get labels for.
     * @returns Label elements.
     */
    static getAssociatedLabelElements(element) {
        const id = element.id;
        let labels;
        if (id) {
            const rootNode = element.getRootNode();
            labels = rootNode.querySelectorAll(`label[for="${id}"]`);
        }
        else {
            labels = new NodeList_js_1.default();
        }
        let parent = element.parentNode;
        while (parent) {
            if (parent['tagName'] === 'LABEL') {
                labels.push(parent);
                break;
            }
            parent = parent.parentNode;
        }
        return labels;
    }
}
exports.default = HTMLLabelElementUtility;
//# sourceMappingURL=HTMLLabelElementUtility.cjs.map