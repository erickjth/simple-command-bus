"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidMiddlewareException = void 0;
class InvalidMiddlewareException extends Error {
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
exports.InvalidMiddlewareException = InvalidMiddlewareException;
//# sourceMappingURL=InvalidMiddlewareException.js.map