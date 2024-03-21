/**
 * Bus that run and handle commands through middlewares
 */
export class CommandBus {
    stack = [];
    /**
     * Class constructor
     * @param middlewares set of middlewares
     */
    constructor(middlewares = []) {
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
//# sourceMappingURL=CommandBus.js.map