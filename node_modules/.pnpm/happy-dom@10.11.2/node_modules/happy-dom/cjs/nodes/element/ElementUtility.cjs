"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NodeTypeEnum_js_1 = __importDefault(require("../node/NodeTypeEnum.cjs"));
const NodeUtility_js_1 = __importDefault(require("../node/NodeUtility.cjs"));
const DOMException_js_1 = __importDefault(require("../../exception/DOMException.cjs"));
const DOMExceptionNameEnum_js_1 = __importDefault(require("../../exception/DOMExceptionNameEnum.cjs"));
const NAMED_ITEM_ATTRIBUTES = ['id', 'name'];
/**
 * Element utility.
 */
class ElementUtility {
    /**
     * Handles appending a child element to the "children" property.
     *
     * @param ancestorNode Ancestor node.
     * @param node Node to append.
     * @param [options] Options.
     * @param [options.disableAncestorValidation] Disables validation for checking if the node is an ancestor of the ancestorNode.
     * @returns Appended node.
     */
    static appendChild(ancestorNode, node, options) {
        if (node.nodeType === NodeTypeEnum_js_1.default.elementNode && node !== ancestorNode) {
            if (!options?.disableAncestorValidation &&
                NodeUtility_js_1.default.isInclusiveAncestor(node, ancestorNode)) {
                throw new DOMException_js_1.default("Failed to execute 'appendChild' on 'Node': The new node is a parent of the node to insert to.", DOMExceptionNameEnum_js_1.default.domException);
            }
            if (node.parentNode) {
                const parentNodeChildren = (node.parentNode._children);
                if (parentNodeChildren) {
                    const index = parentNodeChildren.indexOf(node);
                    if (index !== -1) {
                        for (const attributeName of NAMED_ITEM_ATTRIBUTES) {
                            const attribute = node.attributes.getNamedItem(attributeName);
                            if (attribute) {
                                parentNodeChildren._removeNamedItem(node, attribute.value);
                            }
                        }
                        parentNodeChildren.splice(index, 1);
                    }
                }
            }
            const ancestorNodeChildren = ancestorNode._children;
            for (const attributeName of NAMED_ITEM_ATTRIBUTES) {
                const attribute = node.attributes.getNamedItem(attributeName);
                if (attribute) {
                    ancestorNodeChildren._appendNamedItem(node, attribute.value);
                }
            }
            ancestorNodeChildren.push(node);
            NodeUtility_js_1.default.appendChild(ancestorNode, node, { disableAncestorValidation: true });
        }
        else {
            NodeUtility_js_1.default.appendChild(ancestorNode, node, options);
        }
        return node;
    }
    /**
     * Handles removing a child element from the "children" property.
     *
     * @param ancestorNode Ancestor node.
     * @param node Node.
     * @returns Removed node.
     */
    static removeChild(ancestorNode, node) {
        if (node.nodeType === NodeTypeEnum_js_1.default.elementNode) {
            const ancestorNodeChildren = ancestorNode._children;
            const index = ancestorNodeChildren.indexOf(node);
            if (index !== -1) {
                for (const attributeName of NAMED_ITEM_ATTRIBUTES) {
                    const attribute = node.attributes.getNamedItem(attributeName);
                    if (attribute) {
                        ancestorNodeChildren._removeNamedItem(node, attribute.value);
                    }
                }
                ancestorNodeChildren.splice(index, 1);
            }
        }
        NodeUtility_js_1.default.removeChild(ancestorNode, node);
        return node;
    }
    /**
     *
     * Handles inserting a child element to the "children" property.
     *
     * @param ancestorNode Ancestor node.
     * @param newNode Node to insert.
     * @param referenceNode Node to insert before.
     * @param [options] Options.
     * @param [options.disableAncestorValidation] Disables validation for checking if the node is an ancestor of the ancestorNode.
     * @returns Inserted node.
     */
    static insertBefore(ancestorNode, newNode, referenceNode, options) {
        // NodeUtility.insertBefore() will call appendChild() for the scenario where "referenceNode" is "null" or "undefined"
        if (newNode.nodeType === NodeTypeEnum_js_1.default.elementNode && referenceNode) {
            if (!options?.disableAncestorValidation &&
                NodeUtility_js_1.default.isInclusiveAncestor(newNode, ancestorNode)) {
                throw new DOMException_js_1.default("Failed to execute 'insertBefore' on 'Node': The new node is a parent of the node to insert to.", DOMExceptionNameEnum_js_1.default.domException);
            }
            if (newNode.parentNode) {
                const parentNodeChildren = (newNode.parentNode._children);
                if (parentNodeChildren) {
                    const index = parentNodeChildren.indexOf(newNode);
                    if (index !== -1) {
                        for (const attributeName of NAMED_ITEM_ATTRIBUTES) {
                            const attribute = newNode.attributes.getNamedItem(attributeName);
                            if (attribute) {
                                parentNodeChildren._removeNamedItem(newNode, attribute.value);
                            }
                        }
                        parentNodeChildren.splice(index, 1);
                    }
                }
            }
            const ancestorNodeChildren = ancestorNode._children;
            if (referenceNode.nodeType === NodeTypeEnum_js_1.default.elementNode) {
                const index = ancestorNodeChildren.indexOf(referenceNode);
                if (index !== -1) {
                    ancestorNodeChildren.splice(index, 0, newNode);
                }
            }
            else {
                ancestorNodeChildren.length = 0;
                for (const node of ancestorNode._childNodes) {
                    if (node === referenceNode) {
                        ancestorNodeChildren.push(newNode);
                    }
                    if (node.nodeType === NodeTypeEnum_js_1.default.elementNode) {
                        ancestorNodeChildren.push(node);
                    }
                }
            }
            for (const attributeName of NAMED_ITEM_ATTRIBUTES) {
                const attribute = newNode.attributes.getNamedItem(attributeName);
                if (attribute) {
                    ancestorNodeChildren._appendNamedItem(newNode, attribute.value);
                }
            }
            NodeUtility_js_1.default.insertBefore(ancestorNode, newNode, referenceNode, {
                disableAncestorValidation: true
            });
        }
        else {
            NodeUtility_js_1.default.insertBefore(ancestorNode, newNode, referenceNode, options);
        }
        return newNode;
    }
}
exports.default = ElementUtility;
//# sourceMappingURL=ElementUtility.cjs.map