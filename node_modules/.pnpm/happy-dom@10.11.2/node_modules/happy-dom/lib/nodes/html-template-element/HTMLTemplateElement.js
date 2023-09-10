import HTMLElement from '../html-element/HTMLElement.js';
import XMLSerializer from '../../xml-serializer/XMLSerializer.js';
import XMLParser from '../../xml-parser/XMLParser.js';
/**
 * HTML Template Element.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLTemplateElement.
 */
export default class HTMLTemplateElement extends HTMLElement {
    constructor() {
        super(...arguments);
        this.content = this.ownerDocument.createDocumentFragment();
    }
    /**
     * @override
     */
    get innerHTML() {
        return this.getInnerHTML();
    }
    /**
     * @override
     */
    set innerHTML(html) {
        for (const child of this.content._childNodes.slice()) {
            this.content.removeChild(child);
        }
        XMLParser.parse(this.ownerDocument, html, { rootNode: this.content });
    }
    /**
     * @override
     */
    get firstChild() {
        return this.content.firstChild;
    }
    /**
     * @override
     */
    get lastChild() {
        return this.content.lastChild;
    }
    /**
     * @override
     */
    getInnerHTML(options) {
        const xmlSerializer = new XMLSerializer({
            includeShadowRoots: options && options.includeShadowRoots,
            escapeEntities: false
        });
        let xml = '';
        for (const node of this.content._childNodes) {
            xml += xmlSerializer.serializeToString(node);
        }
        return xml;
    }
    /**
     * @override
     */
    appendChild(node) {
        return this.content.appendChild(node);
    }
    /**
     * @override
     */
    removeChild(node) {
        return this.content.removeChild(node);
    }
    /**
     * @override
     */
    insertBefore(newNode, referenceNode) {
        return this.content.insertBefore(newNode, referenceNode);
    }
    /**
     * @override
     */
    replaceChild(newChild, oldChild) {
        return this.content.replaceChild(newChild, oldChild);
    }
    /**
     * @override
     */
    cloneNode(deep = false) {
        const clone = super.cloneNode(deep);
        clone.content = this.content.cloneNode(deep);
        return clone;
    }
}
//# sourceMappingURL=HTMLTemplateElement.js.map