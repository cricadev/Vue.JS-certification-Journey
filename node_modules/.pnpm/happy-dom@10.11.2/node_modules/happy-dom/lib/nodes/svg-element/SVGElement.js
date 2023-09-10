import CSSStyleDeclaration from '../../css/declaration/CSSStyleDeclaration.js';
import Element from '../element/Element.js';
import Dataset from '../element/Dataset.js';
import HTMLElementUtility from '../html-element/HTMLElementUtility.js';
import SVGElementNamedNodeMap from './SVGElementNamedNodeMap.js';
/**
 * SVG Element.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/SVGElement.
 */
export default class SVGElement extends Element {
    constructor() {
        super(...arguments);
        this.attributes = new SVGElementNamedNodeMap(this);
        // Events
        this.onabort = null;
        this.onerror = null;
        this.onload = null;
        this.onresize = null;
        this.onscroll = null;
        this.onunload = null;
        // Private properties
        this._style = null;
        this._dataset = null;
    }
    /**
     * Returns viewport.
     *
     * @returns SVG rect.
     */
    get viewportElement() {
        return null;
    }
    /**
     * Returns current translate.
     *
     * @returns Element.
     */
    get ownerSVGElement() {
        let parent = this.parentNode;
        while (parent) {
            if (parent['tagName'] === 'SVG') {
                return parent;
            }
            parent = parent.parentNode;
        }
        return null;
    }
    /**
     * Returns data set.
     *
     * @returns Data set.
     */
    get dataset() {
        return (this._dataset ?? (this._dataset = new Dataset(this))).proxy;
    }
    /**
     * Returns style.
     *
     * @returns Style.
     */
    get style() {
        if (!this._style) {
            this._style = new CSSStyleDeclaration(this);
        }
        return this._style;
    }
    /**
     * Returns tab index.
     *
     * @returns Tab index.
     */
    get tabIndex() {
        const tabIndex = this.getAttribute('tabindex');
        return tabIndex !== null ? Number(tabIndex) : -1;
    }
    /**
     * Returns tab index.
     *
     * @param tabIndex Tab index.
     */
    set tabIndex(tabIndex) {
        if (tabIndex === -1) {
            this.removeAttribute('tabindex');
        }
        else {
            this.setAttribute('tabindex', String(tabIndex));
        }
    }
    /**
     * Triggers a blur event.
     */
    blur() {
        HTMLElementUtility.blur(this);
    }
    /**
     * Triggers a focus event.
     */
    focus() {
        HTMLElementUtility.focus(this);
    }
}
//# sourceMappingURL=SVGElement.js.map