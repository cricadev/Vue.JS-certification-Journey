import IAttr from '../attr/IAttr.js';
import HTMLElementNamedNodeMap from '../html-element/HTMLElementNamedNodeMap.js';
import HTMLScriptElement from './HTMLScriptElement.js';
/**
 * Named Node Map.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap
 */
export default class HTMLScriptElementNamedNodeMap extends HTMLElementNamedNodeMap {
    protected _ownerElement: HTMLScriptElement;
    /**
     * @override
     */
    setNamedItem(item: IAttr): IAttr | null;
}
//# sourceMappingURL=HTMLScriptElementNamedNodeMap.d.ts.map