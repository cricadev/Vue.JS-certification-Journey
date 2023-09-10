import CharacterData from '../character-data/CharacterData.js';
import IComment from './IComment.js';
/**
 * Comment node.
 */
export default class Comment extends CharacterData implements IComment {
    readonly nodeType = NodeTypeEnum.commentNode;
    /**
     * Node name.
     *
     * @returns Node name.
     */
    get nodeName(): string;
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
    cloneNode(deep?: boolean): IComment;
}
//# sourceMappingURL=Comment.d.ts.map