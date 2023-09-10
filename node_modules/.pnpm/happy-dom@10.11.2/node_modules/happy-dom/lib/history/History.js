import HistoryScrollRestorationEnum from './HistoryScrollRestorationEnum.js';
/**
 * History API.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/History.
 */
export default class History {
    constructor() {
        this.length = 0;
        this.state = null;
        this._scrollRestoration = HistoryScrollRestorationEnum.auto;
    }
    /**
     * Returns scroll restoration.
     *
     * @returns Sroll restoration.
     */
    get scrollRestoration() {
        return this._scrollRestoration;
    }
    /**
     * Sets scroll restoration.
     *
     * @param scrollRestoration Sroll restoration.
     */
    set scrollRestoration(scrollRestoration) {
        this._scrollRestoration = HistoryScrollRestorationEnum[scrollRestoration]
            ? scrollRestoration
            : this._scrollRestoration;
    }
    /**
     * Goes to the previous page in session history.
     */
    back() {
        // Do nothing.
    }
    /**
     * Goes to the next page in session history.
     */
    forward() {
        // Do nothing.
    }
    /**
     * Load a specific page from the session history.
     *
     * @param delta Delta.
     * @param _delta
     */
    go(_delta) {
        // Do nothing.
    }
    /**
     * Pushes the given data onto the session history stack.
     *
     * @param state State.
     * @param title Title.
     * @param [url] URL.
     * @param _state
     * @param _title
     * @param _url
     */
    pushState(_state, _title, _url) {
        // Do nothing.
    }
    /**
     * This method modifies the current history entry, replacing it with a new state.
     *
     * @param state State.
     * @param title Title.
     * @param [url] URL.
     * @param _state
     * @param _title
     * @param _url
     */
    replaceState(_state, _title, _url) {
        // Do nothing.
    }
}
//# sourceMappingURL=History.js.map