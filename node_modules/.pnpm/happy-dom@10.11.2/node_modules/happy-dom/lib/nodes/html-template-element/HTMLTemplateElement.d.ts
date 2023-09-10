import HTMLElement from '../html-element/HTMLElement.js';
import IDocumentFragment from '../document-fragment/IDocumentFragment.js';
import INode from '../node/INode.js';
import IHTMLTemplateElement from './IHTMLTemplateElement.js';
/**
 * HTML Template Element.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLTemplateElement.
 */
export default class HTMLTemplateElement extends HTMLElement implements IHTMLTemplateElement {
    readonly content: IDocumentFragment;
    /**
     * @override
     */
    get innerHTML(): string;
    /**
     * @override
     */
    set innerHTML(html: string);
    /**
     * @override
     */
    get firstChild(): INode;
    /**
     * @override
     */
    get lastChild(): INode;
    /**
     * @override
     */
    getInnerHTML(options?: {
        includeShadowRoots?: boolean;
    }): string;
    /**
     * @override
     */
    appendChild(node: INode): INode;
    /**
     * @override
     */
    removeChild(node: INode): INode;
    /**
     * @override
     */
    insertBefore(newNode: INode, referenceNode: INode): INode;
    /**
     * @override
     */
    replaceChild(newChild: INode, oldChild: INode): INode;
    /**
     * @override
     */
    cloneNode(deep?: boolean): IHTMLTemplateElement;
}
//# sourceMappingURL=HTMLTemplateElement.d.ts.map