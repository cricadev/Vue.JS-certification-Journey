import IAttr from '../attr/IAttr.cjs';
import HTMLElementNamedNodeMap from '../html-element/HTMLElementNamedNodeMap.cjs';
import HTMLIFrameElement from './HTMLIFrameElement.cjs';
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