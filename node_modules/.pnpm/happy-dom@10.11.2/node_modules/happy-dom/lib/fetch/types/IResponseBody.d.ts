/// <reference types="node" resolution-mode="require"/>
/// <reference types="node" resolution-mode="require"/>
import { URLSearchParams } from 'url';
import FormData from '../../form-data/FormData.js';
import Blob from '../../file/Blob.js';
type IResponseBody = ArrayBuffer | ArrayBufferView | NodeJS.ReadableStream | string | URLSearchParams | Blob | FormData | null;
export default IResponseBody;
//# sourceMappingURL=IResponseBody.d.ts.map