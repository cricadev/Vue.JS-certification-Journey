import IElement from '../element/IElement.js';
import NodeList from '../node/NodeList.js';
import IRadioNodeList from './IRadioNodeList.js';
/**
 * RadioNodeList
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/RadioNodeList
 */
export default class RadioNodeList extends NodeList<IElement> implements IRadioNodeList {
    /**
     * Returns value.
     *
     * @returns Value.
     */
    get value(): string;
}
//# sourceMappingURL=RadioNodeList.d.ts.map