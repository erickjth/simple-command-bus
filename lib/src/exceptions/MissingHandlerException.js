"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissingHandlerException = void 0;
class MissingHandlerException extends Error {
    constructor(message = 'Missing Handler') {
        super(message);
    }
    static forCommand(commandName) {
        let message = 'Missing handler for command';
        if (commandName) {
            message += ` "${commandName}"`;
        }
        return new MissingHandlerException(message);
    }
}
exports.MissingHandlerException = MissingHandlerException;
//# sourceMappingURL=MissingHandlerException.js.map