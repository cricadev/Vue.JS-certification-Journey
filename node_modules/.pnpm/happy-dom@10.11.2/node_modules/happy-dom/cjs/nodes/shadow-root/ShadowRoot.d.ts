import DocumentFragment from '../document-fragment/DocumentFragment.cjs';
import IElement from '../element/IElement.cjs';
import CSSStyleSheet from '../../css/CSSStyleSheet.cjs';
import IShadowRoot from './IShadowRoot.cjs';
import IHTMLElement from '../../nodes/html-element/IHTMLElement.cjs';
import Event from '../../event/Event.cjs';
/**
 * ShadowRoot.
 */
export default class ShadowRoot extends DocumentFragment implements IShadowRoot {
    readonly mode = "open";
    readonly host: IElement;
    adoptedStyleSheets: CSSStyleSheet[];
    onslotchange: (event: Event) => void | null;
    /**
     * Returns inner HTML.
     *
     * @returns HTML.
     */
    get innerHTML(): string;
    /**
     * Sets inner HTML.
     *
     * @param html HTML.
     */
    set innerHTML(html: string);
    /**
     * Returns active element.
     *
     * @returns Active element.
     */
    get activeElement(): IHTMLElement | null;
    /**
     * Converts to string.
     *
     * @returns String.
     */
    toString(): string;
    /**
     * Clones a node.
     *
     * @override
     * @param [deep=false] "true" to clone deep.
     * @returns Cloned node.
     */
    cloneNode(deep?: boolean): IShadowRoot;
}
//# sourceMappingURL=ShadowRoot.d.ts.map