import CharacterData from '../character-data/CharacterData.js';
import NodeTypeEnum from '../node/NodeTypeEnum.js';
/**
 * Processing instruction node interface.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/API/ProcessingInstruction.
 */
export default class ProcessingInstruction extends CharacterData {
    constructor() {
        super(...arguments);
        this.nodeType = NodeTypeEnum.processingInstructionNode;
    }
}
//# sourceMappingURL=ProcessingInstruction.js.map