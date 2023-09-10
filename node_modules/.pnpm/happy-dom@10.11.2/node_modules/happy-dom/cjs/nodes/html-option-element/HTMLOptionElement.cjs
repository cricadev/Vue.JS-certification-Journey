"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HTMLElement_js_1 = __importDefault(require("../html-element/HTMLElement.cjs"));
const HTMLOptionElementNamedNodeMap_js_1 = __importDefault(require("./HTMLOptionElementNamedNodeMap.cjs"));
/**
 * HTML Option Element.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLOptionElement.
 */
class HTMLOptionElement extends HTMLElement_js_1.default {
    constructor() {
        super(...arguments);
        this.attributes = new HTMLOptionElementNamedNodeMap_js_1.default(this);
        this._selectedness = false;
        this._dirtyness = false;
    }
    /**
     * Returns inner text, which is the rendered appearance of text.
     *
     * @returns Inner text.
     */
    get text() {
        return this.innerText;
    }
    /**
     * Sets the inner text, which is the rendered appearance of text.
     *
     * @param innerText Inner text.
     */
    set text(text) {
        this.innerText = text;
    }
    /**
     * Returns index.
     *
     * @returns Index.
     */
    get index() {
        return this._index;
    }
    /**
     * Returns the parent form element.
     *
     * @returns Form.
     */
    get form() {
        return this._formNode;
    }
    /**
     * Returns selected.
     *
     * @returns Selected.
     */
    get selected() {
        return this._selectedness;
    }
    /**
     * Sets selected.
     *
     * @param selected Selected.
     */
    set selected(selected) {
        const selectNode = this._selectNode;
        this._dirtyness = true;
        this._selectedness = Boolean(selected);
        if (selectNode) {
            selectNode._updateOptionItems(this._selectedness ? this : null);
        }
    }
    /**
     * Returns disabled.
     *
     * @returns Disabled.
     */
    get disabled() {
        return this.getAttribute('disabled') !== null;
    }
    /**
     * Sets disabled.
     *
     * @param disabled Disabled.
     */
    set disabled(disabled) {
        if (!disabled) {
            this.removeAttribute('disabled');
        }
        else {
            this.setAttribute('disabled', '');
        }
    }
    /**
     * Returns value.
     *
     * @returns Value.
     */
    get value() {
        return this.getAttribute('value') || this.textContent;
    }
    /**
     * Sets value.
     *
     * @param value Value.
     */
    set value(value) {
        this.setAttribute('value', value);
    }
    /**
     * @override
     */
    _connectToNode(parentNode = null) {
        const oldSelectNode = this._selectNode;
        super._connectToNode(parentNode);
        if (oldSelectNode !== this._selectNode) {
            if (oldSelectNode) {
                oldSelectNode._updateOptionItems();
            }
            if (this._selectNode) {
                this._selectNode._updateOptionItems();
            }
        }
    }
}
exports.default = HTMLOptionElement;
//# sourceMappingURL=HTMLOptionElement.cjs.map