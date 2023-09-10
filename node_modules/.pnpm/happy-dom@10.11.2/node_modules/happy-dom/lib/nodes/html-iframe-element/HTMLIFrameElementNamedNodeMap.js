import HTMLElementNamedNodeMap from '../html-element/HTMLElementNamedNodeMap.js';
import HTMLIFrameUtility from './HTMLIFrameUtility.js';
/**
 * Named Node Map.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap
 */
export default class HTMLIFrameElementNamedNodeMap extends HTMLElementNamedNodeMap {
    /**
     * @override
     */
    setNamedItem(item) {
        const replacedAttribute = super.setNamedItem(item);
        if (item.name === 'src' && item.value && item.value !== replacedAttribute?.value) {
            HTMLIFrameUtility.loadPage(this._ownerElement);
        }
        return replacedAttribute || null;
    }
}
//# sourceMappingURL=HTMLIFrameElementNamedNodeMap.js.map