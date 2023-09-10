import IDocumentFragment from '../document-fragment/IDocumentFragment.cjs';
import IElement from '../element/IElement.cjs';
import Event from '../../event/Event.cjs';
/**
 * ShadowRoot.
 */
export default interface IShadowRoot extends IDocumentFragment {
    mode: string;
    innerHTML: string;
    host: IElement;
    readonly activeElement: IElement | null;
    onslotchange: (event: Event) => void | null;
    /**
     * Clones a node.
     *
     * @override
     * @param [deep=false] "true" to clone deep.
     * @returns Cloned node.
     */
    cloneNode(deep?: boolean): IShadowRoot;
}
//# sourceMappingURL=IShadowRoot.d.ts.map