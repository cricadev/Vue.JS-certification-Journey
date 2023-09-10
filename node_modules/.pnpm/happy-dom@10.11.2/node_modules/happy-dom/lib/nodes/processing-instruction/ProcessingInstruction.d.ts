import IProcessingInstruction from './IProcessingInstruction.js';
import CharacterData from '../character-data/CharacterData.js';
import NodeTypeEnum from '../node/NodeTypeEnum.js';
/**
 * Processing instruction node interface.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/API/ProcessingInstruction.
 */
export default class ProcessingInstruction extends CharacterData implements IProcessingInstruction {
    readonly nodeType = NodeTypeEnum.processingInstructionNode;
    target: string;
}
//# sourceMappingURL=ProcessingInstruction.d.ts.map