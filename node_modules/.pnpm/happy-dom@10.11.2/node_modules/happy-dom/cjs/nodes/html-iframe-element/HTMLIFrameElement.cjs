"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HTMLElement_js_1 = __importDefault(require("../html-element/HTMLElement.cjs"));
const HTMLIFrameUtility_js_1 = __importDefault(require("./HTMLIFrameUtility.cjs"));
const HTMLIFrameElementNamedNodeMap_js_1 = __importDefault(require("./HTMLIFrameElementNamedNodeMap.cjs"));
/**
 * HTML Iframe Element.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement.
 */
class HTMLIFrameElement extends HTMLElement_js_1.default {
    constructor() {
        super(...arguments);
        this.attributes = new HTMLIFrameElementNamedNodeMap_js_1.default(this);
        // Events
        this.onload = null;
        this.onerror = null;
        // Internal properties
        this._contentWindow = null;
    }
    /**
     * Returns source.
     *
     * @returns Source.
     */
    get src() {
        return this.getAttribute('src') || '';
    }
    /**
     * Sets source.
     *
     * @param src Source.
     */
    set src(src) {
        this.setAttribute('src', src);
    }
    /**
     * Returns allow.
     *
     * @returns Allow.
     */
    get allow() {
        return this.getAttribute('allow') || '';
    }
    /**
     * Sets allow.
     *
     * @param allow Allow.
     */
    set allow(allow) {
        this.setAttribute('allow', allow);
    }
    /**
     * Returns height.
     *
     * @returns Height.
     */
    get height() {
        return this.getAttribute('height') || '';
    }
    /**
     * Sets height.
     *
     * @param height Height.
     */
    set height(height) {
        this.setAttribute('height', height);
    }
    /**
     * Returns width.
     *
     * @returns Width.
     */
    get width() {
        return this.getAttribute('width') || '';
    }
    /**
     * Sets width.
     *
     * @param width Width.
     */
    set width(width) {
        this.setAttribute('width', width);
    }
    /**
     * Returns name.
     *
     * @returns Name.
     */
    get name() {
        return this.getAttribute('name') || '';
    }
    /**
     * Sets name.
     *
     * @param name Name.
     */
    set name(name) {
        this.setAttribute('name', name);
    }
    /**
     * Returns sandbox.
     *
     * @returns Sandbox.
     */
    get sandbox() {
        return this.getAttribute('sandbox') || '';
    }
    /**
     * Sets sandbox.
     *
     * @param sandbox Sandbox.
     */
    set sandbox(sandbox) {
        this.setAttribute('sandbox', sandbox);
    }
    /**
     * Returns srcdoc.
     *
     * @returns Srcdoc.
     */
    get srcdoc() {
        return this.getAttribute('srcdoc') || '';
    }
    /**
     * Sets sandbox.
     *
     * @param srcdoc Srcdoc.
     */
    set srcdoc(srcdoc) {
        this.setAttribute('srcdoc', srcdoc);
    }
    /**
     * Returns content document.
     *
     * @returns Content document.
     */
    get contentDocument() {
        return this._contentWindow?.document || null;
    }
    /**
     * Returns content window.
     *
     * @returns Content window.
     */
    get contentWindow() {
        return this._contentWindow;
    }
    /**
     * @override
     */
    _connectToNode(parentNode = null) {
        const isConnected = this.isConnected;
        const isParentConnected = parentNode ? parentNode.isConnected : false;
        super._connectToNode(parentNode);
        if (isParentConnected && isConnected !== isParentConnected) {
            HTMLIFrameUtility_js_1.default.loadPage(this);
        }
    }
    /**
     * Clones a node.
     *
     * @override
     * @param [deep=false] "true" to clone deep.
     * @returns Cloned node.
     */
    cloneNode(deep = false) {
        return super.cloneNode(deep);
    }
}
exports.default = HTMLIFrameElement;
//# sourceMappingURL=HTMLIFrameElement.cjs.map