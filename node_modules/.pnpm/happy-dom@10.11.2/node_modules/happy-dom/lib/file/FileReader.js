import WhatwgMIMEType from 'whatwg-mimetype';
import WhatwgEncoding from 'whatwg-encoding';
import ProgressEvent from '../event/events/ProgressEvent.js';
import DOMException from '../exception/DOMException.js';
import DOMExceptionNameEnum from '../exception/DOMExceptionNameEnum.js';
import FileReaderReadyStateEnum from './FileReaderReadyStateEnum.js';
import FileReaderFormatEnum from './FileReaderFormatEnum.js';
import EventTarget from '../event/EventTarget.js';
import FileReaderEventTypeEnum from './FileReaderEventTypeEnum.js';
/**
 * Reference:
 * https://developer.mozilla.org/sv-SE/docs/Web/API/FileReader.
 *
 * Based on:
 * https://github.com/jsdom/jsdom/blob/master/lib/jsdom/living/file-api/FileReader-impl.js (MIT licensed).
 */
class FileReader extends EventTarget {
    /**
     * Constructor.
     */
    constructor() {
        super();
        this.error = null;
        this.result = null;
        this.readyState = FileReaderReadyStateEnum.empty;
        this.onabort = null;
        this.onerror = null;
        this.onload = null;
        this.onloadstart = null;
        this.onloadend = null;
        this.onprogress = null;
        this._ownerDocument = null;
        this._isTerminated = false;
        this._loadTimeout = null;
        this._parseTimeout = null;
        this._ownerDocument = this.constructor._ownerDocument;
    }
    /**
     * Reads as ArrayBuffer.
     *
     * @param blob Blob.
     */
    readAsArrayBuffer(blob) {
        this._readFile(blob, FileReaderFormatEnum.buffer);
    }
    /**
     * Reads as binary string.
     *
     * @param blob Blob.
     */
    readAsBinaryString(blob) {
        this._readFile(blob, FileReaderFormatEnum.binaryString);
    }
    /**
     * Reads as data URL.
     *
     * @param blob Blob.
     */
    readAsDataURL(blob) {
        this._readFile(blob, FileReaderFormatEnum.dataURL);
    }
    /**
     * Reads as text.
     *
     * @param blob Blob.
     * @param [encoding] Encoding.
     */
    readAsText(blob, encoding = null) {
        this._readFile(blob, FileReaderFormatEnum.text, WhatwgEncoding.labelToName(encoding) || 'UTF-8');
    }
    /**
     * Aborts the file reader.
     */
    abort() {
        const window = this._ownerDocument.defaultView;
        window.clearTimeout(this._loadTimeout);
        window.clearTimeout(this._parseTimeout);
        if (this.readyState === FileReaderReadyStateEnum.empty ||
            this.readyState === FileReaderReadyStateEnum.done) {
            this.result = null;
            return;
        }
        if (this.readyState === FileReaderReadyStateEnum.loading) {
            this.readyState = FileReaderReadyStateEnum.done;
            this.result = null;
        }
        this._isTerminated = true;
        this.dispatchEvent(new ProgressEvent(FileReaderEventTypeEnum.abort));
        this.dispatchEvent(new ProgressEvent(FileReaderEventTypeEnum.loadend));
    }
    /**
     * Reads a file.
     *
     * @param blob Blob.
     * @param format Format.
     * @param [encoding] Encoding.
     */
    _readFile(blob, format, encoding = null) {
        const window = this._ownerDocument.defaultView;
        if (this.readyState === FileReaderReadyStateEnum.loading) {
            throw new DOMException('The object is in an invalid state.', DOMExceptionNameEnum.invalidStateError);
        }
        this.readyState = FileReaderReadyStateEnum.loading;
        this._loadTimeout = window.setTimeout(() => {
            if (this._isTerminated) {
                this._isTerminated = false;
                return;
            }
            this.dispatchEvent(new ProgressEvent(FileReaderEventTypeEnum.loadstart));
            let data = blob._buffer;
            if (!data) {
                data = Buffer.alloc(0);
            }
            this.dispatchEvent(new ProgressEvent(FileReaderEventTypeEnum.loadstart, {
                lengthComputable: !isNaN(blob.size),
                total: blob.size,
                loaded: data.length
            }));
            this._parseTimeout = window.setTimeout(() => {
                if (this._isTerminated) {
                    this._isTerminated = false;
                    return;
                }
                switch (format) {
                    default:
                    case FileReaderFormatEnum.buffer: {
                        this.result = new Uint8Array(data).buffer;
                        break;
                    }
                    case FileReaderFormatEnum.binaryString: {
                        this.result = data.toString('binary');
                        break;
                    }
                    case FileReaderFormatEnum.dataURL: {
                        // Spec seems very unclear here; see https://github.com/w3c/FileAPI/issues/104.
                        const contentType = WhatwgMIMEType.parse(blob.type) || 'application/octet-stream';
                        (this.result) = `data:${contentType};base64,${data.toString('base64')}`;
                        break;
                    }
                    case FileReaderFormatEnum.text: {
                        this.result = WhatwgEncoding.decode(data, encoding);
                        break;
                    }
                }
                this.readyState = FileReaderReadyStateEnum.done;
                this.dispatchEvent(new ProgressEvent(FileReaderEventTypeEnum.load));
                this.dispatchEvent(new ProgressEvent(FileReaderEventTypeEnum.loadend));
            });
        });
    }
}
// Owner document is set by a sub-class in the Window constructor
FileReader._ownerDocument = null;
export default FileReader;
//# sourceMappingURL=FileReader.js.map