import HTMLElement from '../html-element/HTMLElement.cjs';
import INode from '../node/INode.cjs';
import IHTMLElement from '../html-element/IHTMLElement.cjs';
/**
 * HTML Unknown Element.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLUnknownElement.
 */
export default class HTMLUnknownElement extends HTMLElement implements IHTMLElement {
    private _customElementDefineCallback;
    /**
     * Connects this element to another element.
     *
     * @param parentNode Parent node.
     */
    _connectToNode(parentNode?: INode): void;
}
//# sourceMappingURL=HTMLUnknownElement.d.ts.map