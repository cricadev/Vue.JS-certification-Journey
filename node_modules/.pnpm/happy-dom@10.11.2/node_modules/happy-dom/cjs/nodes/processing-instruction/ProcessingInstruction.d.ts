import IProcessingInstruction from './IProcessingInstruction.cjs';
import CharacterData from '../character-data/CharacterData.cjs';
import NodeTypeEnum from '../node/NodeTypeEnum.cjs';
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