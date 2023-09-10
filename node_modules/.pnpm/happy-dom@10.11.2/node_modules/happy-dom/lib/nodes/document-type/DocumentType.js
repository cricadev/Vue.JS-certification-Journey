import Node from '../node/Node.js';
/**
 * DocumentType.
 */
export default class DocumentType extends Node {
    constructor() {
        super(...arguments);
        this.nodeType = Node.DOCUMENT_TYPE_NODE;
        this.name = null;
        this.publicId = '';
        this.systemId = '';
    }
    /**
     * Node name.
     *
     * @returns Node name.
     */
    get nodeName() {
        return this.name;
    }
    /**
     * Converts to string.
     *
     * @returns String.
     */
    toString() {
        return '[object DocumentType]';
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
        clone.name = this.name;
        clone.publicId = this.publicId;
        clone.systemId = this.systemId;
        return clone;
    }
}
//# sourceMappingURL=DocumentType.js.map