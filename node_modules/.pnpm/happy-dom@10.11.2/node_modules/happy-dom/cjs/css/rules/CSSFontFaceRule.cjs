"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CSSRule_js_1 = __importDefault(require("../CSSRule.cjs"));
const CSSStyleDeclaration_js_1 = __importDefault(require("../declaration/CSSStyleDeclaration.cjs"));
/**
 * CSSRule interface.
 */
class CSSFontFaceRule extends CSSRule_js_1.default {
    constructor() {
        super(...arguments);
        this.type = CSSRule_js_1.default.FONT_FACE_RULE;
        this._cssText = '';
        this._style = null;
    }
    /**
     * Returns style.
     *
     * @returns Style.
     */
    get style() {
        if (!this._style) {
            this._style = new CSSStyleDeclaration_js_1.default();
            this._style.parentRule = this;
            this._style.cssText = this._cssText;
        }
        return this._style;
    }
}
exports.default = CSSFontFaceRule;
//# sourceMappingURL=CSSFontFaceRule.cjs.map