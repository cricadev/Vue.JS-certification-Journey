import DocumentFragment from '../document-fragment/DocumentFragment.js';
import XMLParser from '../../xml-parser/XMLParser.js';
import XMLSerializer from '../../xml-serializer/XMLSerializer.js';
/**
 * ShadowRoot.
 */
export default class ShadowRoot extends DocumentFragment {
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
        const xmlSerializer = new XMLSerializer({
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
        XMLParser.parse(this.ownerDocument, html, { rootNode: this });
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
//# sourceMappingURL=ShadowRoot.js.map