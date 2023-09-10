import NodeList from '../node/NodeList.js';
/**
 * Utility for finding labels associated with a form element.
 */
export default class HTMLLabelElementUtility {
    /**
     * Returns label elements for a form element.
     *
     * @param element Element to get labels for.
     * @returns Label elements.
     */
    static getAssociatedLabelElements(element) {
        const id = element.id;
        let labels;
        if (id) {
            const rootNode = element.getRootNode();
            labels = rootNode.querySelectorAll(`label[for="${id}"]`);
        }
        else {
            labels = new NodeList();
        }
        let parent = element.parentNode;
        while (parent) {
            if (parent['tagName'] === 'LABEL') {
                labels.push(parent);
                break;
            }
            parent = parent.parentNode;
        }
        return labels;
    }
}
//# sourceMappingURL=HTMLLabelElementUtility.js.map