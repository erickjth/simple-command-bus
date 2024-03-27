import { isCallable } from '../utils';
export class CommandHandlerMiddleware {
    handlerLocator;
    methodNameInflector;
    constructor(handlerLocator, methodNameInflector) {
        this.handlerLocator = handlerLocator;
        this.methodNameInflector = methodNameInflector;
    }
    setHandlerLocator(handlerLocator) {
        this.handlerLocator = handlerLocator;
    }
    setMethodNameInflector(methodNameInflector) {
        this.methodNameInflector = methodNameInflector;
    }
    execute(command) {
        if (this.handlerLocator) {
            const handler = this.handlerLocator.getHandlerForCommand(command);
            if (this.methodNameInflector) {
                const methodName = this.methodNameInflector.inflect(command, handler);
                if (isCallable(handler[methodName])) {
                    return handler[methodName].call(handler, command);
                }
            }
        }
        return;
    }
}
//# sourceMappingURL=CommandHandlerMiddleware.js.map