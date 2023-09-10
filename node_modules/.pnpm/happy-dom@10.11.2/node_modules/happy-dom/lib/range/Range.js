import DOMRect from '../nodes/element/DOMRect.js';
import RangeHowEnum from './RangeHowEnum.js';
import DOMException from '../exception/DOMException.js';
import DOMExceptionNameEnum from '../exception/DOMExceptionNameEnum.js';
import RangeUtility from './RangeUtility.js';
import NodeTypeEnum from '../nodes/node/NodeTypeEnum.js';
import NodeUtility from '../nodes/node/NodeUtility.js';
import XMLParser from '../xml-parser/XMLParser.js';
import DOMRectListFactory from '../nodes/element/DOMRectListFactory.js';
/**
 * Range.
 *
 * Based on logic from:
 * https://github.com/jsdom/jsdom/blob/master/lib/jsdom/living/range/Range-impl.js
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/Range.
 */
class Range {
    /**
     * Constructor.
     */
    constructor() {
        this.END_TO_END = RangeHowEnum.endToEnd;
        this.END_TO_START = RangeHowEnum.endToStart;
        this.START_TO_END = RangeHowEnum.startToEnd;
        this.START_TO_START = RangeHowEnum.startToStart;
        this._ownerDocument = null;
        this._start = null;
        this._end = null;
        this._ownerDocument = this.constructor._ownerDocument;
        this._start = { node: this._ownerDocument, offset: 0 };
        this._end = { node: this._ownerDocument, offset: 0 };
    }
    /**
     * Returns start container.
     *
     * @see https://dom.spec.whatwg.org/#dom-range-startcontainer
     * @returns Start container.
     */
    get startContainer() {
        return this._start.node;
    }
    /**
     * Returns end container.
     *
     * @see https://dom.spec.whatwg.org/#dom-range-endcontainer
     * @returns End container.
     */
    get endContainer() {
        return this._end.node;
    }
    /**
     * Returns start offset.
     *
     * @see https://dom.spec.whatwg.org/#dom-range-startoffset
     * @returns Start offset.
     */
    get startOffset() {
        if (this._start.offset > 0) {
            const length = NodeUtility.getNodeLength(this._start.node);
            if (this._start.offset > length) {
                this._start.offset = length;
            }
        }
        return this._start.offset;
    }
    /**
     * Returns end offset.
     *
     * @see https://dom.spec.whatwg.org/#dom-range-endoffset
     * @returns End offset.
     */
    get endOffset() {
        if (this._end.offset > 0) {
            const length = NodeUtility.getNodeLength(this._end.node);
            if (this._end.offset > length) {
                this._end.offset = length;
            }
        }
        return this._end.offset;
    }
    /**
     * Returns a boolean value indicating whether the range's start and end points are at the same position.
     *
     * @see https://dom.spec.whatwg.org/#dom-range-collapsed
     * @returns Collapsed.
     */
    get collapsed() {
        return this._start.node === this._end.node && this.startOffset === this.endOffset;
    }
    /**
     * Returns the deepest Node that contains the startContainer and endContainer nodes.
     *
     * @see https://dom.spec.whatwg.org/#dom-range-commonancestorcontainer
     * @returns Node.
     */
    get commonAncestorContainer() {
        let container = this._start.node;
        while (container) {
            if (NodeUtility.isInclusiveAncestor(container, this._end.node)) {
                return container;
            }
            container = container.parentNode;
        }
        return null;
    }
    /**
     * Returns -1, 0, or 1 depending on whether the referenceNode is before, the same as, or after the Range.
     *
     * @see https://dom.spec.whatwg.org/#dom-range-collapse
     * @param toStart A boolean value: true collapses the Range to its start, false to its end. If omitted, it defaults to false.
     */
    collapse(toStart = false) {
        if (toStart) {
            this._end = Object.assign({}, this._start);
        }
        else {
            this._start = Object.assign({}, this._end);
        }
    }
    /**
     * Compares the boundary points of the Range with those of another range.
     *
     * @see https://dom.spec.whatwg.org/#dom-range-compareboundarypoints
     * @param how How.
     * @param sourceRange Range.
     * @returns A number, -1, 0, or 1, indicating whether the corresponding boundary-point of the Range is respectively before, equal to, or after the corresponding boundary-point of sourceRange.
     */
    compareBoundaryPoints(how, sourceRange) {
        if (how !== RangeHowEnum.startToStart &&
            how !== RangeHowEnum.startToEnd &&
            how !== RangeHowEnum.endToEnd &&
            how !== RangeHowEnum.endToStart) {
            throw new DOMException(`The comparison method provided must be one of '${RangeHowEnum.startToStart}', '${RangeHowEnum.startToEnd}', '${RangeHowEnum.endToEnd}' or '${RangeHowEnum.endToStart}'.`, DOMExceptionNameEnum.notSupportedError);
        }
        if (this._ownerDocument !== sourceRange._ownerDocument) {
            throw new DOMException(`The two Ranges are not in the same tree.`, DOMExceptionNameEnum.wrongDocumentError);
        }
        const thisPoint = {
            node: null,
            offset: 0
        };
        const sourcePoint = {
            node: null,
            offset: 0
        };
        switch (how) {
            case RangeHowEnum.startToStart:
                thisPoint.node = this._start.node;
                thisPoint.offset = this.startOffset;
                sourcePoint.node = sourceRange._start.node;
                sourcePoint.offset = sourceRange.startOffset;
                break;
            case RangeHowEnum.startToEnd:
                thisPoint.node = this._end.node;
                thisPoint.offset = this.endOffset;
                sourcePoint.node = sourceRange._start.node;
                sourcePoint.offset = sourceRange.startOffset;
                break;
            case RangeHowEnum.endToEnd:
                thisPoint.node = this._end.node;
                thisPoint.offset = this.endOffset;
                sourcePoint.node = sourceRange._end.node;
                sourcePoint.offset = sourceRange.endOffset;
                break;
            case RangeHowEnum.endToStart:
                thisPoint.node = this._start.node;
                thisPoint.offset = this.startOffset;
                sourcePoint.node = sourceRange._end.node;
                sourcePoint.offset = sourceRange.endOffset;
                break;
        }
        return RangeUtility.compareBoundaryPointsPosition(thisPoint, sourcePoint);
    }
    /**
     * Returns -1, 0, or 1 depending on whether the referenceNode is before, the same as, or after the Range.
     *
     * @see https://dom.spec.whatwg.org/#dom-range-comparepoint
     * @param node Reference node.
     * @param offset Offset.
     * @returns -1,0, or 1.
     */
    comparePoint(node, offset) {
        if (node.ownerDocument !== this._ownerDocument) {
            throw new DOMException(`The two Ranges are not in the same tree.`, DOMExceptionNameEnum.wrongDocumentError);
        }
        RangeUtility.validateBoundaryPoint({ node, offset });
        const boundaryPoint = { node, offset };
        if (RangeUtility.compareBoundaryPointsPosition(boundaryPoint, {
            node: this._start.node,
            offset: this.startOffset
        }) === -1) {
            return -1;
        }
        else if (RangeUtility.compareBoundaryPointsPosition(boundaryPoint, {
            node: this._end.node,
            offset: this.endOffset
        }) === 1) {
            return 1;
        }
        return 0;
    }
    /**
     * Returns a DocumentFragment copying the objects of type Node included in the Range.
     *
     * @see https://dom.spec.whatwg.org/#concept-range-clone
     * @returns Document fragment.
     */
    cloneContents() {
        const fragment = this._ownerDocument.createDocumentFragment();
        const startOffset = this.startOffset;
        const endOffset = this.endOffset;
        if (this.collapsed) {
            return fragment;
        }
        if (this._start.node === this._end.node &&
            (this._start.node.nodeType === NodeTypeEnum.textNode ||
                this._start.node.nodeType === NodeTypeEnum.processingInstructionNode ||
                this._start.node.nodeType === NodeTypeEnum.commentNode)) {
            const clone = this._start.node.cloneNode(false);
            clone['_data'] = clone.substringData(startOffset, endOffset - startOffset);
            fragment.appendChild(clone);
            return fragment;
        }
        let commonAncestor = this._start.node;
        while (!NodeUtility.isInclusiveAncestor(commonAncestor, this._end.node)) {
            commonAncestor = commonAncestor.parentNode;
        }
        let firstPartialContainedChild = null;
        if (!NodeUtility.isInclusiveAncestor(this._start.node, this._end.node)) {
            let candidate = commonAncestor.firstChild;
            while (!firstPartialContainedChild) {
                if (RangeUtility.isPartiallyContained(candidate, this)) {
                    firstPartialContainedChild = candidate;
                }
                candidate = candidate.nextSibling;
            }
        }
        let lastPartiallyContainedChild = null;
        if (!NodeUtility.isInclusiveAncestor(this._end.node, this._start.node)) {
            let candidate = commonAncestor.lastChild;
            while (!lastPartiallyContainedChild) {
                if (RangeUtility.isPartiallyContained(candidate, this)) {
                    lastPartiallyContainedChild = candidate;
                }
                candidate = candidate.previousSibling;
            }
        }
        const containedChildren = [];
        for (const node of commonAncestor._childNodes) {
            if (RangeUtility.isContained(node, this)) {
                if (node.nodeType === NodeTypeEnum.documentTypeNode) {
                    throw new DOMException('Invalid document type element.', DOMExceptionNameEnum.hierarchyRequestError);
                }
                containedChildren.push(node);
            }
        }
        if (firstPartialContainedChild !== null &&
            (firstPartialContainedChild.nodeType === NodeTypeEnum.textNode ||
                firstPartialContainedChild.nodeType === NodeTypeEnum.processingInstructionNode ||
                firstPartialContainedChild.nodeType === NodeTypeEnum.commentNode)) {
            const clone = this._start.node.cloneNode(false);
            clone['_data'] = clone.substringData(startOffset, NodeUtility.getNodeLength(this._start.node) - startOffset);
            fragment.appendChild(clone);
        }
        else if (firstPartialContainedChild !== null) {
            const clone = firstPartialContainedChild.cloneNode();
            fragment.appendChild(clone);
            const subRange = new Range();
            subRange._start.node = this._start.node;
            subRange._start.offset = startOffset;
            subRange._end.node = firstPartialContainedChild;
            subRange._end.offset = NodeUtility.getNodeLength(firstPartialContainedChild);
            const subDocumentFragment = subRange.cloneContents();
            clone.appendChild(subDocumentFragment);
        }
        for (const containedChild of containedChildren) {
            const clone = containedChild.cloneNode(true);
            fragment.appendChild(clone);
        }
        if (lastPartiallyContainedChild !== null &&
            (lastPartiallyContainedChild.nodeType === NodeTypeEnum.textNode ||
                lastPartiallyContainedChild.nodeType === NodeTypeEnum.processingInstructionNode ||
                lastPartiallyContainedChild.nodeType === NodeTypeEnum.commentNode)) {
            const clone = this._end.node.cloneNode(false);
            clone['_data'] = clone.substringData(0, endOffset);
            fragment.appendChild(clone);
        }
        else if (lastPartiallyContainedChild !== null) {
            const clone = lastPartiallyContainedChild.cloneNode(false);
            fragment.appendChild(clone);
            const subRange = new Range();
            subRange._start.node = lastPartiallyContainedChild;
            subRange._start.offset = 0;
            subRange._end.node = this._end.node;
            subRange._end.offset = endOffset;
            const subFragment = subRange.cloneContents();
            clone.appendChild(subFragment);
        }
        return fragment;
    }
    /**
     * Returns a Range object with boundary points identical to the cloned Range.
     *
     * @see https://dom.spec.whatwg.org/#dom-range-clonerange
     * @returns Range.
     */
    cloneRange() {
        const clone = new Range();
        clone._start.node = this._start.node;
        clone._start.offset = this._start.offset;
        clone._end.node = this._end.node;
        clone._end.offset = this._end.offset;
        return clone;
    }
    /**
     * Returns a DocumentFragment by invoking the HTML fragment parsing algorithm or the XML fragment parsing algorithm with the start of the range (the parent of the selected node) as the context node. The HTML fragment parsing algorithm is used if the range belongs to a Document whose HTMLness bit is set. In the HTML case, if the context node would be html, for historical reasons the fragment parsing algorithm is invoked with body as the context instead.
     *
     * @see https://w3c.github.io/DOM-Parsing/#dfn-fragment-parsing-algorithm
     * @param tagString Tag string.
     * @returns Document fragment.
     */
    createContextualFragment(tagString) {
        // TODO: We only have support for HTML in the parser currently, so it is not necessary to check which context it is
        return XMLParser.parse(this._ownerDocument, tagString);
    }
    /**
     * Removes the contents of the Range from the Document.
     *
     * @see https://dom.spec.whatwg.org/#dom-range-deletecontents
     */
    deleteContents() {
        const startOffset = this.startOffset;
        const endOffset = this.endOffset;
        if (this.collapsed) {
            return;
        }
        if (this._start.node === this._end.node &&
            (this._start.node.nodeType === NodeTypeEnum.textNode ||
                this._start.node.nodeType === NodeTypeEnum.processingInstructionNode ||
                this._start.node.nodeType === NodeTypeEnum.commentNode)) {
            this._start.node.replaceData(startOffset, endOffset - startOffset, '');
            return;
        }
        const nodesToRemove = [];
        let currentNode = this._start.node;
        const endNode = NodeUtility.nextDescendantNode(this._end.node);
        while (currentNode && currentNode !== endNode) {
            if (RangeUtility.isContained(currentNode, this) &&
                !RangeUtility.isContained(currentNode.parentNode, this)) {
                nodesToRemove.push(currentNode);
            }
            currentNode = NodeUtility.following(currentNode);
        }
        let newNode;
        let newOffset;
        if (NodeUtility.isInclusiveAncestor(this._start.node, this._end.node)) {
            newNode = this._start.node;
            newOffset = startOffset;
        }
        else {
            let referenceNode = this._start.node;
            while (referenceNode &&
                !NodeUtility.isInclusiveAncestor(referenceNode.parentNode, this._end.node)) {
                referenceNode = referenceNode.parentNode;
            }
            newNode = referenceNode.parentNode;
            newOffset = referenceNode.parentNode._childNodes.indexOf(referenceNode) + 1;
        }
        if (this._start.node.nodeType === NodeTypeEnum.textNode ||
            this._start.node.nodeType === NodeTypeEnum.processingInstructionNode ||
            this._start.node.nodeType === NodeTypeEnum.commentNode) {
            this._start.node.replaceData(this.startOffset, NodeUtility.getNodeLength(this._start.node) - this.startOffset, '');
        }
        for (const node of nodesToRemove) {
            const parent = node.parentNode;
            parent.removeChild(node);
        }
        if (this._end.node.nodeType === NodeTypeEnum.textNode ||
            this._end.node.nodeType === NodeTypeEnum.processingInstructionNode ||
            this._end.node.nodeType === NodeTypeEnum.commentNode) {
            this._end.node.replaceData(0, endOffset, '');
        }
        this._start.node = newNode;
        this._start.offset = newOffset;
        this._end.node = newNode;
        this._end.offset = newOffset;
    }
    /**
     * Does nothing. It used to disable the Range object and enable the browser to release associated resources. The method has been kept for compatibility.
     *
     * @see https://dom.spec.whatwg.org/#dom-range-detach
     */
    detach() {
        // Do nothing by spec
    }
    /**
     * Moves contents of the Range from the document tree into a DocumentFragment.
     *
     * @see https://dom.spec.whatwg.org/#dom-range-extractcontents
     * @returns Document fragment.
     */
    extractContents() {
        const fragment = this._ownerDocument.createDocumentFragment();
        const startOffset = this.startOffset;
        const endOffset = this.endOffset;
        if (this.collapsed) {
            return fragment;
        }
        if (this._start.node === this._end.node &&
            (this._start.node.nodeType === NodeTypeEnum.textNode ||
                this._start.node.nodeType === NodeTypeEnum.processingInstructionNode ||
                this._start.node.nodeType === NodeTypeEnum.commentNode)) {
            const clone = this._start.node.cloneNode(false);
            clone['_data'] = clone.substringData(startOffset, endOffset - startOffset);
            fragment.appendChild(clone);
            this._start.node.replaceData(startOffset, endOffset - startOffset, '');
            return fragment;
        }
        let commonAncestor = this._start.node;
        while (!NodeUtility.isInclusiveAncestor(commonAncestor, this._end.node)) {
            commonAncestor = commonAncestor.parentNode;
        }
        let firstPartialContainedChild = null;
        if (!NodeUtility.isInclusiveAncestor(this._start.node, this._end.node)) {
            let candidate = commonAncestor.firstChild;
            while (!firstPartialContainedChild) {
                if (RangeUtility.isPartiallyContained(candidate, this)) {
                    firstPartialContainedChild = candidate;
                }
                candidate = candidate.nextSibling;
            }
        }
        let lastPartiallyContainedChild = null;
        if (!NodeUtility.isInclusiveAncestor(this._end.node, this._start.node)) {
            let candidate = commonAncestor.lastChild;
            while (!lastPartiallyContainedChild) {
                if (RangeUtility.isPartiallyContained(candidate, this)) {
                    lastPartiallyContainedChild = candidate;
                }
                candidate = candidate.previousSibling;
            }
        }
        const containedChildren = [];
        for (const node of commonAncestor._childNodes) {
            if (RangeUtility.isContained(node, this)) {
                if (node.nodeType === NodeTypeEnum.documentTypeNode) {
                    throw new DOMException('Invalid document type element.', DOMExceptionNameEnum.hierarchyRequestError);
                }
                containedChildren.push(node);
            }
        }
        let newNode;
        let newOffset;
        if (NodeUtility.isInclusiveAncestor(this._start.node, this._end.node)) {
            newNode = this._start.node;
            newOffset = startOffset;
        }
        else {
            let referenceNode = this._start.node;
            while (referenceNode &&
                !NodeUtility.isInclusiveAncestor(referenceNode.parentNode, this._end.node)) {
                referenceNode = referenceNode.parentNode;
            }
            newNode = referenceNode.parentNode;
            newOffset = referenceNode.parentNode._childNodes.indexOf(referenceNode) + 1;
        }
        if (firstPartialContainedChild !== null &&
            (firstPartialContainedChild.nodeType === NodeTypeEnum.textNode ||
                firstPartialContainedChild.nodeType === NodeTypeEnum.processingInstructionNode ||
                firstPartialContainedChild.nodeType === NodeTypeEnum.commentNode)) {
            const clone = this._start.node.cloneNode(false);
            clone['_data'] = clone.substringData(startOffset, NodeUtility.getNodeLength(this._start.node) - startOffset);
            fragment.appendChild(clone);
            this._start.node.replaceData(startOffset, NodeUtility.getNodeLength(this._start.node) - startOffset, '');
        }
        else if (firstPartialContainedChild !== null) {
            const clone = firstPartialContainedChild.cloneNode(false);
            fragment.appendChild(clone);
            const subRange = new Range();
            subRange._start.node = this._start.node;
            subRange._start.offset = startOffset;
            subRange._end.node = firstPartialContainedChild;
            subRange._end.offset = NodeUtility.getNodeLength(firstPartialContainedChild);
            const subFragment = subRange.extractContents();
            clone.appendChild(subFragment);
        }
        for (const containedChild of containedChildren) {
            fragment.appendChild(containedChild);
        }
        if (lastPartiallyContainedChild !== null &&
            (lastPartiallyContainedChild.nodeType === NodeTypeEnum.textNode ||
                lastPartiallyContainedChild.nodeType === NodeTypeEnum.processingInstructionNode ||
                lastPartiallyContainedChild.nodeType === NodeTypeEnum.commentNode)) {
            const clone = this._end.node.cloneNode(false);
            clone['_data'] = clone.substringData(0, endOffset);
            fragment.appendChild(clone);
            this._end.node.replaceData(0, endOffset, '');
        }
        else if (lastPartiallyContainedChild !== null) {
            const clone = lastPartiallyContainedChild.cloneNode(false);
            fragment.appendChild(clone);
            const subRange = new Range();
            subRange._start.node = lastPartiallyContainedChild;
            subRange._start.offset = 0;
            subRange._end.node = this._end.node;
            subRange._end.offset = endOffset;
            const subFragment = subRange.extractContents();
            clone.appendChild(subFragment);
        }
        this._start.node = newNode;
        this._start.offset = newOffset;
        this._end.node = newNode;
        this._end.offset = newOffset;
        return fragment;
    }
    /**
     * Returns a DOMRect object that bounds the contents of the range; this is a rectangle enclosing the union of the bounding rectangles for all the elements in the range.
     *
     * @returns DOMRect object.
     */
    getBoundingClientRect() {
        // TODO: Not full implementation
        return new DOMRect();
    }
    /**
     * The Range.getClientRects() method returns a list of DOMRect objects representing the area of the screen occupied by the range. This is created by aggregating the results of calls to Element.getClientRects() for all the elements in the range.
     *
     * @returns DOMRect objects.
     */
    getClientRects() {
        // TODO: Not full implementation
        return DOMRectListFactory.create();
    }
    /**
     * Returns a boolean indicating whether the given point is in the Range.
     *
     * @see https://dom.spec.whatwg.org/#dom-range-ispointinrange
     * @param node Reference node.
     * @param offset Offset.
     * @returns "true" if in range.
     */
    isPointInRange(node, offset = 0) {
        if (node.ownerDocument !== this._ownerDocument) {
            return false;
        }
        const boundaryPoint = { node, offset };
        RangeUtility.validateBoundaryPoint(boundaryPoint);
        if (RangeUtility.compareBoundaryPointsPosition(boundaryPoint, {
            node: this._start.node,
            offset: this.startOffset
        }) === -1 ||
            RangeUtility.compareBoundaryPointsPosition(boundaryPoint, {
                node: this._end.node,
                offset: this.endOffset
            }) === 1) {
            return false;
        }
        return true;
    }
    /**
     * Inserts a node at the start of the Range.
     *
     * @see https://dom.spec.whatwg.org/#concept-range-insert
     * @param newNode New node.
     */
    insertNode(newNode) {
        if (this._start.node.nodeType === NodeTypeEnum.processingInstructionNode ||
            this._start.node.nodeType === NodeTypeEnum.commentNode ||
            (this._start.node.nodeType === NodeTypeEnum.textNode && !this._start.node.parentNode) ||
            newNode === this._start.node) {
            throw new DOMException('Invalid start node.', DOMExceptionNameEnum.hierarchyRequestError);
        }
        let referenceNode = this._start.node.nodeType === NodeTypeEnum.textNode
            ? this._start.node
            : this._start.node._childNodes[this.startOffset] || null;
        const parent = !referenceNode ? this._start.node : referenceNode.parentNode;
        if (this._start.node.nodeType === NodeTypeEnum.textNode) {
            referenceNode = this._start.node.splitText(this.startOffset);
        }
        if (newNode === referenceNode) {
            referenceNode = referenceNode.nextSibling;
        }
        const nodeParent = newNode.parentNode;
        if (nodeParent) {
            nodeParent.removeChild(newNode);
        }
        let newOffset = !referenceNode
            ? NodeUtility.getNodeLength(parent)
            : referenceNode.parentNode._childNodes.indexOf(referenceNode);
        newOffset +=
            newNode.nodeType === NodeTypeEnum.documentFragmentNode
                ? NodeUtility.getNodeLength(newNode)
                : 1;
        parent.insertBefore(newNode, referenceNode);
        if (this.collapsed) {
            this._end.node = parent;
            this._end.offset = newOffset;
        }
    }
    /**
     * Returns a boolean indicating whether the given Node intersects the Range.
     *
     * @see https://dom.spec.whatwg.org/#dom-range-intersectsnode
     * @param node Reference node.
     * @returns "true" if it intersects.
     */
    intersectsNode(node) {
        if (node.ownerDocument !== this._ownerDocument) {
            return false;
        }
        const parent = node.parentNode;
        if (!parent) {
            return true;
        }
        const offset = parent._childNodes.indexOf(node);
        return (RangeUtility.compareBoundaryPointsPosition({ node: parent, offset }, { node: this._end.node, offset: this.endOffset }) === -1 &&
            RangeUtility.compareBoundaryPointsPosition({ node: parent, offset: offset + 1 }, { node: this._start.node, offset: this.startOffset }) === 1);
    }
    /**
     * Sets the Range to contain the Node and its contents.
     *
     * @see https://dom.spec.whatwg.org/#concept-range-select
     * @param node Reference node.
     */
    selectNode(node) {
        if (!node.parentNode) {
            throw new DOMException(`The given Node has no parent.`, DOMExceptionNameEnum.invalidNodeTypeError);
        }
        const index = node.parentNode._childNodes.indexOf(node);
        this._start.node = node.parentNode;
        this._start.offset = index;
        this._end.node = node.parentNode;
        this._end.offset = index + 1;
    }
    /**
     * Sets the Range to contain the contents of a Node.
     *
     * @see https://dom.spec.whatwg.org/#dom-range-selectnodecontents
     * @param node Reference node.
     */
    selectNodeContents(node) {
        if (node.nodeType === NodeTypeEnum.documentTypeNode) {
            throw new DOMException("DocumentType Node can't be used as boundary point.", DOMExceptionNameEnum.invalidNodeTypeError);
        }
        this._start.node = node;
        this._start.offset = 0;
        this._end.node = node;
        this._end.offset = NodeUtility.getNodeLength(node);
    }
    /**
     * Sets the end position of a Range to be located at the given offset into the specified node x.
     *
     * @see https://dom.spec.whatwg.org/#dom-range-setend
     * @param node End node.
     * @param offset End offset.
     */
    setEnd(node, offset = 0) {
        RangeUtility.validateBoundaryPoint({ node, offset });
        const boundaryPoint = { node, offset };
        if (node.ownerDocument !== this._ownerDocument ||
            RangeUtility.compareBoundaryPointsPosition(boundaryPoint, {
                node: this._start.node,
                offset: this.startOffset
            }) === -1) {
            this._start.node = node;
            this._start.offset = offset;
        }
        this._end.node = node;
        this._end.offset = offset;
    }
    /**
     * Sets the start position of a Range.
     *
     * @see https://dom.spec.whatwg.org/#dom-range-setstart
     * @param node Start node.
     * @param offset Start offset.
     */
    setStart(node, offset = 0) {
        RangeUtility.validateBoundaryPoint({ node, offset });
        const boundaryPoint = { node, offset };
        if (node.ownerDocument !== this._ownerDocument ||
            RangeUtility.compareBoundaryPointsPosition(boundaryPoint, {
                node: this._end.node,
                offset: this.endOffset
            }) === 1) {
            this._end.node = node;
            this._end.offset = offset;
        }
        this._start.node = node;
        this._start.offset = offset;
    }
    /**
     * Sets the end position of a Range relative to another Node.
     *
     * @see https://dom.spec.whatwg.org/#dom-range-setendafter
     * @param node Reference node.
     */
    setEndAfter(node) {
        if (!node.parentNode) {
            throw new DOMException('The given Node has no parent.', DOMExceptionNameEnum.invalidNodeTypeError);
        }
        this.setEnd(node.parentNode, node.parentNode._childNodes.indexOf(node) + 1);
    }
    /**
     * Sets the end position of a Range relative to another Node.
     *
     * @see https://dom.spec.whatwg.org/#dom-range-setendbefore
     * @param node Reference node.
     */
    setEndBefore(node) {
        if (!node.parentNode) {
            throw new DOMException('The given Node has no parent.', DOMExceptionNameEnum.invalidNodeTypeError);
        }
        this.setEnd(node.parentNode, node.parentNode._childNodes.indexOf(node));
    }
    /**
     * Sets the start position of a Range relative to a Node.
     *
     * @see https://dom.spec.whatwg.org/#dom-range-setstartafter
     * @param node Reference node.
     */
    setStartAfter(node) {
        if (!node.parentNode) {
            throw new DOMException('The given Node has no parent.', DOMExceptionNameEnum.invalidNodeTypeError);
        }
        this.setStart(node.parentNode, node.parentNode._childNodes.indexOf(node) + 1);
    }
    /**
     * Sets the start position of a Range relative to another Node.
     *
     * @see https://dom.spec.whatwg.org/#dom-range-setstartbefore
     * @param node Reference node.
     */
    setStartBefore(node) {
        if (!node.parentNode) {
            throw new DOMException('The given Node has no parent.', DOMExceptionNameEnum.invalidNodeTypeError);
        }
        this.setStart(node.parentNode, node.parentNode._childNodes.indexOf(node));
    }
    /**
     * Moves content of the Range into a new node, placing the new node at the start of the specified range.
     *
     * @see https://dom.spec.whatwg.org/#dom-range-surroundcontents
     * @param newParent New parent.
     */
    surroundContents(newParent) {
        let node = this.commonAncestorContainer;
        const endNode = NodeUtility.nextDescendantNode(node);
        while (node !== endNode) {
            if (node.nodeType !== NodeTypeEnum.textNode &&
                RangeUtility.isPartiallyContained(node, this)) {
                throw new DOMException('The Range has partially contains a non-Text node.', DOMExceptionNameEnum.invalidStateError);
            }
            node = NodeUtility.following(node);
        }
        if (newParent.nodeType === NodeTypeEnum.documentNode ||
            newParent.nodeType === NodeTypeEnum.documentTypeNode ||
            newParent.nodeType === NodeTypeEnum.documentFragmentNode) {
            throw new DOMException('Invalid element type.', DOMExceptionNameEnum.invalidNodeTypeError);
        }
        const fragment = this.extractContents();
        while (newParent.firstChild) {
            newParent.removeChild(newParent.firstChild);
        }
        this.insertNode(newParent);
        newParent.appendChild(fragment);
        this.selectNode(newParent);
    }
    /**
     * Returns the text of the Range.
     *
     * @see https://dom.spec.whatwg.org/#dom-range-stringifier
     */
    toString() {
        const startOffset = this.startOffset;
        const endOffset = this.endOffset;
        let string = '';
        if (this._start.node === this._end.node &&
            this._start.node.nodeType === NodeTypeEnum.textNode) {
            return this._start.node.data.slice(startOffset, endOffset);
        }
        if (this._start.node.nodeType === NodeTypeEnum.textNode) {
            string += this._start.node.data.slice(startOffset);
        }
        const endNode = NodeUtility.nextDescendantNode(this._end.node);
        let currentNode = this._start.node;
        while (currentNode && currentNode !== endNode) {
            if (currentNode.nodeType === NodeTypeEnum.textNode &&
                RangeUtility.isContained(currentNode, this)) {
                string += currentNode.data;
            }
            currentNode = NodeUtility.following(currentNode);
        }
        if (this._end.node.nodeType === NodeTypeEnum.textNode) {
            string += this._end.node.data.slice(0, endOffset);
        }
        return string;
    }
}
// Owner document is set by a sub-class in the Window constructor
Range._ownerDocument = null;
Range.END_TO_END = RangeHowEnum.endToEnd;
Range.END_TO_START = RangeHowEnum.endToStart;
Range.START_TO_END = RangeHowEnum.startToEnd;
Range.START_TO_START = RangeHowEnum.startToStart;
export default Range;
//# sourceMappingURL=Range.js.map