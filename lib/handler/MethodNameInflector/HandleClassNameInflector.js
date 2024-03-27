import { HandleInflector } from './HandleInflector';
import { InvalidHandlerMethodException } from '../../exceptions';
import { isCallable } from '../../utils';
export class HandleClassNameInflector extends HandleInflector {
    inflect(command, handler) {
        const commandName = (command?.constructor?.name || '').replace('Command', '');
        const methodName = `${this.methodName}${commandName}`;
        if (!isCallable(handler[methodName])) {
            throw InvalidHandlerMethodException.forMethod(methodName);
        }
        return methodName;
    }
}
//# sourceMappingURL=HandleClassNameInflector.js.map