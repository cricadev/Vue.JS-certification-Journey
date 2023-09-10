import Event from '../../event/Event.cjs';
import IWindow from '../../window/IWindow.cjs';
import IDocument from '../document/IDocument.cjs';
import IHTMLElement from '../html-element/IHTMLElement.cjs';
import IFrameCrossOriginWindow from './IFrameCrossOriginWindow.cjs';
/**
 * HTML Iframe Element.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement.
 */
export default interface IHTMLIFrameElement extends IHTMLElement {
    src: string | null;
    allow: string | null;
    height: string | null;
    width: string | null;
    name: string | null;
    sandbox: string | null;
    srcdoc: string | null;
    readonly contentDocument: IDocument | null;
    readonly contentWindow: IWindow | IFrameCrossOriginWindow | null;
    onload: (event: Event) => void | null;
    onerror: (event: Event) => void | null;
}
//# sourceMappingURL=IHTMLIFrameElement.d.ts.map