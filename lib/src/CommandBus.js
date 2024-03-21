"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandBus = void 0;
/**
 * Bus that run and handle commands through middlewares
 */
class CommandBus {
    /**
     * Class constructor
     * @param middlewares set of middlewares
     */
    constructor(middlewares = []) {
        this.stack = [];
        this.stack = middlewares;
    }
    /**
     * Returns middleware stack
     */
    getMiddlewareStack() {
        return this.stack;
    }
    /**
     * Handles a command through the middleware stack
     * @param command
     */
    handle(command) {
        const runCommandInMiddlewareStack = this.stack.reduceRight((next, middleware) => {
            return middleware.execute.bind(middleware, command, next);
        }, () => null);
        const result = runCommandInMiddlewareStack();
        return result;
    }
}
exports.CommandBus = CommandBus;
//# sourceMappingURL=CommandBus.js.map