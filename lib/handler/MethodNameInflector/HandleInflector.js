import { InvalidHandlerMethodException } from '../../exceptions';
import { isCallable } from '../../utils';
export class HandleInflector {
    methodName;
    constructor(methodName = 'handle') {
        this.methodName = methodName;
    }
    inflect(command, handler) {
        if (!isCallable(handler[this.methodName])) {
            throw InvalidHandlerMethodException.forMethod(this.methodName);
        }
        return this.methodName;
    }
}
//# sourceMappingURL=HandleInflector.js.map