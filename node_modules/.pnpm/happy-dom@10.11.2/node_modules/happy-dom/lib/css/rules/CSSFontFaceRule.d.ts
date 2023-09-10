import CSSRule from '../CSSRule.js';
import CSSStyleDeclaration from '../declaration/CSSStyleDeclaration.js';
/**
 * CSSRule interface.
 */
export default class CSSFontFaceRule extends CSSRule {
    readonly type: import("../CSSRuleTypeEnum.js").default;
    _cssText: string;
    private _style;
    /**
     * Returns style.
     *
     * @returns Style.
     */
    get style(): CSSStyleDeclaration;
}
//# sourceMappingURL=CSSFontFaceRule.d.ts.map