import CSSRule from '../CSSRule.js';
import CSSStyleDeclaration from '../declaration/CSSStyleDeclaration.js';
/**
 * CSSRule interface.
 */
export default class CSSKeyframeRule extends CSSRule {
    readonly type: import("../CSSRuleTypeEnum.js").default;
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