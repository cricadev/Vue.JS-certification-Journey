"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HTMLElementNamedNodeMap_js_1 = __importDefault(require("../html-element/HTMLElementNamedNodeMap.cjs"));
const HTMLScriptElementUtility_js_1 = __importDefault(require("./HTMLScriptElementUtility.cjs"));
/**
 * Named Node Map.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap
 */
class HTMLScriptElementNamedNodeMap extends HTMLElementNamedNodeMap_js_1.default {
    /**
     * @override
     */
    setNamedItem(item) {
        const replacedItem = super.setNamedItem(item);
        if (item.name === 'src' && item.value !== null && this._ownerElement.isConnected) {
            HTMLScriptElementUtility_js_1.default.loadExternalScript(this._ownerElement);
        }
        return replacedItem || null;
    }
}
exports.default = HTMLScriptElementNamedNodeMap;
//# sourceMappingURL=HTMLScriptElementNamedNodeMap.cjs.map