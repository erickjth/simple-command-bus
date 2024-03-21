export class InvalidHandlerMethodException extends Error {
    constructor(message = 'Invalid handler method.') {
        super(message);
    }
    static forMethod(method) {
        return new InvalidHandlerMethodException(`Invalid handler method ${method}.`);
    }
}
//# sourceMappingURL=InvalidHandlerMethodException.js.map