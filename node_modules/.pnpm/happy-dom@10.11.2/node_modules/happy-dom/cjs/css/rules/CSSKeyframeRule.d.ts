import CSSRule from '../CSSRule.cjs';
import CSSStyleDeclaration from '../declaration/CSSStyleDeclaration.cjs';
/**
 * CSSRule interface.
 */
export default class CSSKeyframeRule extends CSSRule {
    readonly type: import("../CSSRuleTypeEnum.cjs").default;
    readonly keyText: string;
    _cssText: string;
    private _style;
    /**
     * Returns style.
     *
     * @returns Style.
     */
    get style(): CSSStyleDeclaration;
    /**
     * Returns css text.
     *
     * @returns CSS text.
     */
    get cssText(): string;
}
//# sourceMappingURL=CSSKeyframeRule.d.ts.map