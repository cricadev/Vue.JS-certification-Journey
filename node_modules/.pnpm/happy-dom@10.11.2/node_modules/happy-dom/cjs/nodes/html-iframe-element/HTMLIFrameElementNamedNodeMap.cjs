"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HTMLElementNamedNodeMap_js_1 = __importDefault(require("../html-element/HTMLElementNamedNodeMap.cjs"));
const HTMLIFrameUtility_js_1 = __importDefault(require("./HTMLIFrameUtility.cjs"));
/**
 * Named Node Map.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap
 */
class HTMLIFrameElementNamedNodeMap extends HTMLElementNamedNodeMap_js_1.default {
    /**
     * @override
     */
    setNamedItem(item) {
        const replacedAttribute = super.setNamedItem(item);
        if (item.name === 'src' && item.value && item.value !== replacedAttribute?.value) {
            HTMLIFrameUtility_js_1.default.loadPage(this._ownerElement);
        }
        return replacedAttribute || null;
    }
}
exports.default = HTMLIFrameElementNamedNodeMap;
//# sourceMappingURL=HTMLIFrameElementNamedNodeMap.cjs.map