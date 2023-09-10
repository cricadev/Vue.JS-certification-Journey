/**
 *
 */
export default class DataTransferItem {
    /**
     * Constructor.
     *
     * @param item Item.
     */
    constructor(item) {
        this.kind = '';
        this.type = '';
        this._item = null;
        this.kind = typeof item === 'string' ? 'string' : 'file';
        this._item = item;
    }
    /**
     * Returns file.
     */
    getAsFile() {
        if (this.kind === 'string') {
            return null;
        }
        return this._item;
    }
    /**
     * Returns string.
     */
    getAsString() {
        if (this.kind === 'file') {
            return null;
        }
        return this._item;
    }
}
//# sourceMappingURL=DataTransferItem.js.map