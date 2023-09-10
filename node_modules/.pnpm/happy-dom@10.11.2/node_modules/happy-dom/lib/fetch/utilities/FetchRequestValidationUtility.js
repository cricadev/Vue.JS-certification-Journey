import DOMException from '../../exception/DOMException.js';
import DOMExceptionNameEnum from '../../exception/DOMExceptionNameEnum.js';
const VALID_REFERRER_POLICIES = [
    '',
    'no-referrer',
    'no-referrer-when-downgrade',
    'same-origin',
    'origin',
    'strict-origin',
    'origin-when-cross-origin',
    'strict-origin-when-cross-origin',
    'unsafe-url'
];
const VALID_REDIRECTS = ['error', 'manual', 'follow'];
/**
 * Fetch request validation utility.
 */
export default class FetchRequestValidationUtility {
    /**
     * Validates request body.
     *
     * @throws DOMException
     * @param request Request.
     */
    static validateBody(request) {
        if (request.body && (request.method === 'GET' || request.method === 'HEAD')) {
            throw new DOMException(`Request with GET/HEAD method cannot have body.`, DOMExceptionNameEnum.invalidStateError);
        }
    }
    /**
     * Validates request URL.
     *
     * @throws DOMException
     * @param url URL.
     */
    static validateURL(url) {
        if (url.username !== '' || url.password !== '') {
            throw new DOMException(`${url} is an url with embedded credentials.`, DOMExceptionNameEnum.notSupportedError);
        }
    }
    /**
     * Validates request referrer policy.
     *
     * @throws DOMException
     * @param referrerPolicy Referrer policy.
     */
    static validateReferrerPolicy(referrerPolicy) {
        if (!VALID_REFERRER_POLICIES.includes(referrerPolicy)) {
            throw new DOMException(`Invalid referrer policy "${referrerPolicy}".`, DOMExceptionNameEnum.syntaxError);
        }
    }
    /**
     * Validates request redirect.
     *
     * @throws DOMException
     * @param redirect Redirect.
     */
    static validateRedirect(redirect) {
        if (!VALID_REDIRECTS.includes(redirect)) {
            throw new DOMException(`Invalid redirect "${redirect}".`, DOMExceptionNameEnum.syntaxError);
        }
    }
}
//# sourceMappingURL=FetchRequestValidationUtility.js.map