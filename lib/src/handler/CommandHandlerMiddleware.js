"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandlerMiddleware = void 0;
const utils_1 = require("../utils");
class CommandHandlerMiddleware {
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
                if ((0, utils_1.isCallable)(handler[methodName])) {
                    return handler[methodName].call(handler, command);
                }
            }
        }
        return;
    }
}
exports.CommandHandlerMiddleware = CommandHandlerMiddleware;
//# sourceMappingURL=CommandHandlerMiddleware.js.map