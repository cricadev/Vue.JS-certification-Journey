"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CharacterData_js_1 = __importDefault(require("../character-data/CharacterData.cjs"));
const NodeTypeEnum_js_1 = __importDefault(require("../node/NodeTypeEnum.cjs"));
/**
 * Processing instruction node interface.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/API/ProcessingInstruction.
 */
class ProcessingInstruction extends CharacterData_js_1.default {
    constructor() {
        super(...arguments);
        this.nodeType = NodeTypeEnum_js_1.default.processingInstructionNode;
    }
}
exports.default = ProcessingInstruction;
//# sourceMappingURL=ProcessingInstruction.cjs.map