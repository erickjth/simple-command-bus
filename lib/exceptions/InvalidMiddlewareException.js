export class InvalidMiddlewareException extends Error {
    constructor(message = 'Invalid Middleware') {
        super(message);
    }
    static forMiddleware(middleware) {
        let message = 'Invalid middleware';
        if (middleware) {
            message += ` "${middleware.constructor.name}"`;
        }
        return new InvalidMiddlewareException(message);
    }
}
//# sourceMappingURL=InvalidMiddlewareException.js.map