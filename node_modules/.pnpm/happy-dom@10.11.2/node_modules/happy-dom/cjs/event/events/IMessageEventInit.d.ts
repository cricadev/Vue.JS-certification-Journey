import IEventInit from '../IEventInit.cjs';
import IWindow from '../../window/IWindow.cjs';
import IMessagePort from '../IMessagePort.cjs';
export default interface IMessageEventInit extends IEventInit {
    data?: unknown | null;
    origin?: string;
    lastEventId?: string;
    source?: IWindow | null;
    ports?: IMessagePort[];
}
//# sourceMappingURL=IMessageEventInit.d.ts.map