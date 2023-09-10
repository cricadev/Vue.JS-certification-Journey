import CSSRule from '../CSSRule.cjs';
import CSSStyleDeclaration from '../declaration/CSSStyleDeclaration.cjs';
/**
 * CSSRule interface.
 */
export default class CSSFontFaceRule extends CSSRule {
    readonly type: import("../CSSRuleTypeEnum.cjs").default;
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