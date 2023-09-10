"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Node_js_1 = __importDefault(require("../node/Node.cjs"));
const CharacterData_js_1 = __importDefault(require("../character-data/CharacterData.cjs"));
const DOMException_js_1 = __importDefault(require("../../exception/DOMException.cjs"));
const DOMExceptionNameEnum_js_1 = __importDefault(require("../../exception/DOMExceptionNameEnum.cjs"));
/**
 * Text node.
 */
class Text extends CharacterData_js_1.default {
    constructor() {
        super(...arguments);
        this.nodeType = Node_js_1.default.TEXT_NODE;
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
            throw new DOMException_js_1.default('The index is not in the allowed range.', DOMExceptionNameEnum_js_1.default.indexSizeError);
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
exports.default = Text;
//# sourceMappingURL=Text.cjs.map