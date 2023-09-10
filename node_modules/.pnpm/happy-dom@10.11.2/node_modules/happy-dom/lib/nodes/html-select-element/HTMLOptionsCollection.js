import DOMException from '../../exception/DOMException.js';
import HTMLCollection from '../element/HTMLCollection.js';
/**
 * HTML Options Collection.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLOptionsCollection.
 */
export default class HTMLOptionsCollection extends HTMLCollection {
    /**
     *
     * @param selectElement
     */
    constructor(selectElement) {
        super();
        this._selectElement = selectElement;
    }
    /**
     * Returns selectedIndex.
     *
     * @returns SelectedIndex.
     */
    get selectedIndex() {
        return this._selectElement.selectedIndex;
    }
    /**
     * Sets selectedIndex.
     *
     * @param selectedIndex SelectedIndex.
     */
    set selectedIndex(selectedIndex) {
        this._selectElement.selectedIndex = selectedIndex;
    }
    /**
     * Returns item by index.
     *
     * @param index Index.
     */
    item(index) {
        return this[index];
    }
    /**
     *
     * @param element
     * @param before
     */
    add(element, before) {
        if (!before && before !== 0) {
            this._selectElement.appendChild(element);
            return;
        }
        if (!Number.isNaN(Number(before))) {
            if (before < 0) {
                return;
            }
            this._selectElement.insertBefore(element, this[before]);
            return;
        }
        const index = this.indexOf(before);
        if (index === -1) {
            throw new DOMException("Failed to execute 'add' on 'DOMException': The node before which the new node is to be inserted is not a child of this node.");
        }
        this._selectElement.insertBefore(element, this[index]);
    }
    /**
     * Removes indexed element from collection.
     *
     * @param index Index.
     */
    remove(index) {
        if (this[index]) {
            this._selectElement.removeChild(this[index]);
        }
    }
}
//# sourceMappingURL=HTMLOptionsCollection.js.map