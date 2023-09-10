import Node from '../node/Node.js';
import CharacterData from '../character-data/CharacterData.js';
import DOMException from '../../exception/DOMException.js';
import DOMExceptionNameEnum from '../../exception/DOMExceptionNameEnum.js';
/**
 * Text node.
 */
export default class Text extends CharacterData {
    constructor() {
        super(...arguments);
        this.nodeType = Node.TEXT_NODE;
    }
    /**
     * Node name.
     *
     * @returns Node name.
     */
    get nodeName() {
        return '#text';
    }
    /**
     * @override
     */
    get data() {
        return this._data;
    }
    /**
     * @override
     */
    set data(data) {
        super.data = data;
        if (this._textAreaNode) {
            this._textAreaNode._resetSelection();
        }
    }
    /**
     * Breaks the Text node into two nodes at the specified offset, keeping both nodes in the tree as siblings.
     *
     * @see https://dom.spec.whatwg.org/#dom-text-splittext
     * @param offset Offset.
     * @returns New text node.
     */
    splitText(offset) {
        const length = this._data.length;
        if (offset < 0 || offset > length) {
            throw new DOMException('The index is not in the allowed range.', DOMExceptionNameEnum.indexSizeError);
        }
        const count = length - offset;
        const newData = this.substringData(offset, count);
        const newNode = this.ownerDocument.createTextNode(newData);
        if (this.parentNode !== null) {
            this.parentNode.insertBefore(newNode, this.nextSibling);
        }
        this.replaceData(offset, count, '');
        return newNode;
    }
    /**
     * Converts to string.
     *
     * @returns String.
     */
    toString() {
        return '[object Text]';
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
    /**
     * @override
     */
    _connectToNode(parentNode = null) {
        const oldTextAreaNode = this._textAreaNode;
        super._connectToNode(parentNode);
        if (oldTextAreaNode !== this._textAreaNode) {
            if (oldTextAreaNode) {
                oldTextAreaNode._resetSelection();
            }
            if (this._textAreaNode) {
                this._textAreaNode._resetSelection();
            }
        }
    }
}
//# sourceMappingURL=Text.js.map