"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Node_js_1 = __importDefault(require("../node/Node.cjs"));
const CharacterData_js_1 = __importDefault(require("../character-data/CharacterData.cjs"));
/**
 * Comment node.
 */
class Comment extends CharacterData_js_1.default {
    constructor() {
        super(...arguments);
        this.nodeType = Node_js_1.default.COMMENT_NODE;
    }
    /**
     * Node name.
     *
     * @returns Node name.
     */
    get nodeName() {
        return '#comment';
    }
    /**
     * Converts to string.
     *
     * @returns String.
     */
    toString() {
        return '[object Comment]';
    }
    /**
     * Clones a node.
     *
     * @override
     * @param [deep=false] "true" to clone deep.
     * @returns Cloned node.
     */
    cloneNode(deep = false) {
        return super.cloneNode(deep);
    }
}
exports.default = Comment;
//# sourceMappingURL=Comment.cjs.map