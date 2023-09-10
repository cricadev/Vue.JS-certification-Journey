import IAttr from '../attr/IAttr.js';
import HTMLElementNamedNodeMap from '../html-element/HTMLElementNamedNodeMap.js';
import HTMLIFrameElement from './HTMLIFrameElement.js';
/**
 * Named Node Map.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap
 */
export default class HTMLIFrameElementNamedNodeMap extends HTMLElementNamedNodeMap {
    protected _ownerElement: HTMLIFrameElement;
    /**
     * @override
     */
    setNamedItem(item: IAttr): IAttr | null;
}
//# sourceMappingURL=HTMLIFrameElementNamedNodeMap.d.ts.map