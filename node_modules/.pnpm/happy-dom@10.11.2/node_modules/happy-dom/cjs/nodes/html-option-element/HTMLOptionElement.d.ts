import INamedNodeMap from '../../named-node-map/INamedNodeMap.cjs';
import HTMLElement from '../html-element/HTMLElement.cjs';
import IHTMLFormElement from '../html-form-element/IHTMLFormElement.cjs';
import INode from '../node/INode.cjs';
import IHTMLOptionElement from './IHTMLOptionElement.cjs';
/**
 * HTML Option Element.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLOptionElement.
 */
export default class HTMLOptionElement extends HTMLElement implements IHTMLOptionElement {
    readonly attributes: INamedNodeMap;
    _index: number;
    _selectedness: boolean;
    _dirtyness: boolean;
    /**
     * Returns inner text, which is the rendered appearance of text.
     *
     * @returns Inner text.
     */
    get text(): string;
    /**
     * Sets the inner text, which is the rendered appearance of text.
     *
     * @param innerText Inner text.
     */
    set text(text: string);
    /**
     * Returns index.
     *
     * @returns Index.
     */
    get index(): number;
    /**
     * Returns the parent form element.
     *
     * @returns Form.
     */
    get form(): IHTMLFormElement;
    /**
     * Returns selected.
     *
     * @returns Selected.
     */
    get selected(): boolean;
    /**
     * Sets selected.
     *
     * @param selected Selected.
     */
    set selected(selected: boolean);
    /**
     * Returns disabled.
     *
     * @returns Disabled.
     */
    get disabled(): boolean;
    /**
     * Sets disabled.
     *
     * @param disabled Disabled.
     */
    set disabled(disabled: boolean);
    /**
     * Returns value.
     *
     * @returns Value.
     */
    get value(): string;
    /**
     * Sets value.
     *
     * @param value Value.
     */
    set value(value: string);
    /**
     * @override
     */
    _connectToNode(parentNode?: INode): void;
}
//# sourceMappingURL=HTMLOptionElement.d.ts.map