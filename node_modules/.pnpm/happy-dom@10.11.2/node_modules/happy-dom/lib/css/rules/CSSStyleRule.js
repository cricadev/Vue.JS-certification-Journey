import CSSRule from '../CSSRule.js';
import CSSStyleDeclaration from '../declaration/CSSStyleDeclaration.js';
/**
 * CSSRule interface.
 */
export default class CSSStyleRule extends CSSRule {
    constructor() {
        super(...arguments);
        this.type = CSSRule.STYLE_RULE;
        this.selectorText = '';
        this.styleMap = new Map();
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
    /**
     * Returns css text.
     *
     * @returns CSS text.
     */
    get cssText() {
        return `${this.selectorText} { ${this.style.cssText} }`;
    }
}
//# sourceMappingURL=CSSStyleRule.js.map