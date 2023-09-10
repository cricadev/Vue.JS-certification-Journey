"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DocumentFragment_js_1 = __importDefault(require("../document-fragment/DocumentFragment.cjs"));
const XMLParser_js_1 = __importDefault(require("../../xml-parser/XMLParser.cjs"));
const XMLSerializer_js_1 = __importDefault(require("../../xml-serializer/XMLSerializer.cjs"));
/**
 * ShadowRoot.
 */
class ShadowRoot extends DocumentFragment_js_1.default {
    constructor() {
        super(...arguments);
        this.mode = 'open';
        this.host = null;
        this.adoptedStyleSheets = [];
        // Events
        this.onslotchange = null;
    }
    /**
     * Returns inner HTML.
     *
     * @returns HTML.
     */
    get innerHTML() {
        const xmlSerializer = new XMLSerializer_js_1.default({
            escapeEntities: false
        });
        let xml = '';
        for (const node of this._childNodes) {
            xml += xmlSerializer.serializeToString(node);
        }
        return xml;
    }
    /**
     * Sets inner HTML.
     *
     * @param html HTML.
     */
    set innerHTML(html) {
        for (const child of this._childNodes.slice()) {
            this.removeChild(child);
        }
        XMLParser_js_1.default.parse(this.ownerDocument, html, { rootNode: this });
    }
    /**
     * Returns active element.
     *
     * @returns Active element.
     */
    get activeElement() {
        const activeElement = this.ownerDocument['_activeElement'];
        if (activeElement && activeElement.isConnected && activeElement.getRootNode() === this) {
            return activeElement;
        }
        return null;
    }
    /**
     * Converts to string.
     *
     * @returns String.
     */
    toString() {
        return this.innerHTML;
    }
    /**
     * Clones a node.
     *
     * @override
     * @param [deep=false] "true" to clone deep.
     * @returns Cloned node.
     */
    cloneNode(deep = false) {
        const clone = super.cloneNode(deep);
        clone.mode = this.mode;
        return clone;
    }
}
exports.default = ShadowRoot;
//# sourceMappingURL=ShadowRoot.cjs.map