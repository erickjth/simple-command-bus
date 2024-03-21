"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidHandlerMethodException = void 0;
class InvalidHandlerMethodException extends Error {
    constructor(message = 'Invalid handler method.') {
        super(message);
    }
    static forMethod(method) {
        return new InvalidHandlerMethodException(`Invalid handler method ${method}.`);
    }
}
exports.InvalidHandlerMethodException = InvalidHandlerMethodException;
//# sourceMappingURL=InvalidHandlerMethodException.js.map