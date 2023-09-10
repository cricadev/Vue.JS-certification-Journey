import Node from '../node/Node.js';
import QuerySelector from '../../query-selector/QuerySelector.js';
import ParentNodeUtility from '../parent-node/ParentNodeUtility.js';
import ElementUtility from '../element/ElementUtility.js';
import HTMLCollection from '../element/HTMLCollection.js';
/**
 * DocumentFragment.
 */
export default class DocumentFragment extends Node {
    constructor() {
        super(...arguments);
        this.nodeType = Node.DOCUMENT_FRAGMENT_NODE;
        this._children = new HTMLCollection();
        this._rootNode = this;
    }
    /**
     * Returns the document fragment children.
     */
    get children() {
        return this._children;
    }
    /**
     * Last element child.
     *
     * @returns Element.
     */
    get childElementCount() {
        return this._children.length;
    }
    /**
     * First element child.
     *
     * @returns Element.
     */
    get firstElementChild() {
        return this._children[0] ?? null;
    }
    /**
     * Last element child.
     *
     * @returns Element.
     */
    get lastElementChild() {
        return this._children[this._children.length - 1] ?? null;
    }
    /**
     * Get text value of children.
     *
     * @returns Text content.
     */
    get textContent() {
        let result = '';
        for (const childNode of this._childNodes) {
            if (childNode.nodeType === Node.ELEMENT_NODE || childNode.nodeType === Node.TEXT_NODE) {
                result += childNode.textContent;
            }
        }
        return result;
    }
    /**
     * Sets text content.
     *
     * @param textContent Text content.
     */
    set textContent(textContent) {
        for (const child of this._childNodes.slice()) {
            this.removeChild(child);
        }
        if (textContent) {
            this.appendChild(this.ownerDocument.createTextNode(textContent));
        }
    }
    /**
     * Inserts a set of Node objects or DOMString objects after the last child of the ParentNode. DOMString objects are inserted as equivalent Text nodes.
     *
     * @param nodes List of Node or DOMString.
     */
    append(...nodes) {
        ParentNodeUtility.append(this, ...nodes);
    }
    /**
     * Inserts a set of Node objects or DOMString objects before the first child of the ParentNode. DOMString objects are inserted as equivalent Text nodes.
     *
     * @param nodes List of Node or DOMString.
     */
    prepend(...nodes) {
        ParentNodeUtility.prepend(this, ...nodes);
    }
    /**
     * Replaces the existing children of a node with a specified new set of children.
     *
     * @param nodes List of Node or DOMString.
     */
    replaceChildren(...nodes) {
        ParentNodeUtility.replaceChildren(this, ...nodes);
    }
    /**
     * Query CSS selector to find matching nodes.
     *
     * @param selector CSS selector.
     * @returns Matching elements.
     */
    querySelectorAll(selector) {
        return QuerySelector.querySelectorAll(this, selector);
    }
    /**
     * Query CSS Selector to find matching node.
     *
     * @param selector CSS selector.
     * @returns Matching element.
     */
    querySelector(selector) {
        return QuerySelector.querySelector(this, selector);
    }
    /**
     * Returns an element by ID.
     *
     * @param id ID.
     * @returns Matching element.
     */
    getElementById(id) {
        return ParentNodeUtility.getElementById(this, id);
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
        if (deep) {
            for (const node of clone._childNodes) {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    clone._children.push(node);
                }
            }
        }
        return clone;
    }
    /**
     * @override
     */
    appendChild(node) {
        // We do not call super here as this will be handled by ElementUtility to improve performance by avoiding validation and other checks.
        return ElementUtility.appendChild(this, node);
    }
    /**
     * @override
     */
    removeChild(node) {
        // We do not call super here as this will be handled by ElementUtility to improve performance by avoiding validation and other checks.
        return ElementUtility.removeChild(this, node);
    }
    /**
     * @override
     */
    insertBefore(newNode, referenceNode) {
        if (arguments.length < 2) {
            throw new TypeError(`Failed to execute 'insertBefore' on 'Node': 2 arguments required, but only ${arguments.length} present.`);
        }
        // We do not call super here as this will be handled by ElementUtility to improve performance by avoiding validation and other checks.
        return ElementUtility.insertBefore(this, newNode, referenceNode);
    }
}
//# sourceMappingURL=DocumentFragment.js.map