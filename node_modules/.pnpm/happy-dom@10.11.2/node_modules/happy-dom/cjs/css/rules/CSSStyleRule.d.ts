import CSSRule from '../CSSRule.cjs';
import CSSStyleDeclaration from '../declaration/CSSStyleDeclaration.cjs';
/**
 * CSSRule interface.
 */
export default class CSSStyleRule extends CSSRule {
    readonly type: import("../CSSRuleTypeEnum.cjs").default;
    readonly selectorText = "";
    readonly styleMap: Map<any, any>;
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
//# sourceMappingURL=CSSStyleRule.d.ts.map