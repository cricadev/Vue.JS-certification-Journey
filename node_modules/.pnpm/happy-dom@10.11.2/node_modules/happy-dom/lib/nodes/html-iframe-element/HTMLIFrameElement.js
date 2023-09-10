import HTMLElement from '../html-element/HTMLElement.js';
import HTMLIFrameUtility from './HTMLIFrameUtility.js';
import HTMLIFrameElementNamedNodeMap from './HTMLIFrameElementNamedNodeMap.js';
/**
 * HTML Iframe Element.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement.
 */
export default class HTMLIFrameElement extends HTMLElement {
    constructor() {
        super(...arguments);
        this.attributes = new HTMLIFrameElementNamedNodeMap(this);
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
            HTMLIFrameUtility.loadPage(this);
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
//# sourceMappingURL=HTMLIFrameElement.js.map