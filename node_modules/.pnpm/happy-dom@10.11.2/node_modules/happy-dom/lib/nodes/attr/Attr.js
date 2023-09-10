import Node from '../node/Node.js';
/**
 * Attribute node interface.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/API/Attr.
 */
export default class Attr extends Node {
    constructor() {
        super(...arguments);
        this.nodeType = Node.ATTRIBUTE_NODE;
        this.value = null;
        this.name = null;
        this.namespaceURI = null;
        /**
         * @deprecated
         */
        this.ownerElement = null;
        /**
         * @deprecated
         */
        this.specified = true;
    }
    /**
     * Returns local name.
     *
     * @returns Local name.
     */
    get localName() {
        return this.name ? this.name.split(':').reverse()[0] : null;
    }
    /**
     * Returns prefix.
     *
     * @returns Prefix.
     */
    get prefix() {
        return this.name ? this.name.split(':')[0] : null;
    }
    /**
     * @override
     */
    get textContent() {
        return this.value;
    }
}
//# sourceMappingURL=Attr.js.map