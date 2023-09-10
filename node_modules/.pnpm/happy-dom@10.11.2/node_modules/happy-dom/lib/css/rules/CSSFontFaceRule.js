import CSSRule from '../CSSRule.js';
import CSSStyleDeclaration from '../declaration/CSSStyleDeclaration.js';
/**
 * CSSRule interface.
 */
export default class CSSFontFaceRule extends CSSRule {
    constructor() {
        super(...arguments);
        this.type = CSSRule.FONT_FACE_RULE;
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
            this._style = new CSSStyleDeclaration();
            this._style.parentRule = this;
            this._style.cssText = this._cssText;
        }
        return this._style;
    }
}
//# sourceMappingURL=CSSFontFaceRule.js.map