import Element from '../element/Element.js';
/**
 * Non Document Child node utility.
 */
export default class NonDocumentChildNodeUtility {
    /**
     * Previous element sibling.
     *
     * @param childNode Child node.
     * @returns Element.
     */
    static previousElementSibling(childNode) {
        let sibling = childNode.previousSibling;
        while (sibling && sibling.nodeType !== Element.ELEMENT_NODE) {
            sibling = sibling.previousSibling;
        }
        return sibling;
    }
    /**
     * Next element sibling.
     *
     * @param childNode Child node.
     * @returns Element.
     */
    static nextElementSibling(childNode) {
        let sibling = childNode.nextSibling;
        while (sibling && sibling.nodeType !== Element.ELEMENT_NODE) {
            sibling = sibling.nextSibling;
        }
        return sibling;
    }
}
//# sourceMappingURL=NonDocumentChildNodeUtility.js.map