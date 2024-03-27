export class LoggerMiddleware {
    logger;
    constructor(logger) {
        this.logger = logger;
    }
    execute(command, next) {
        this.logger?.log?.('Before command: ', command);
        const returnValue = next(command);
        this.logger?.log?.('After command result: ', command, returnValue);
        return returnValue;
    }
}
//# sourceMappingURL=LoggerMiddleware.js.map