"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidCommandException = void 0;
class InvalidCommandException extends Error {
    constructor(message = 'Invalid Command') {
        super(message);
    }
    static forCommand(command) {
        let message = 'invalid command';
        if (command) {
            message += ` "${command.constructor.name}"`;
        }
        return new InvalidCommandException(message);
    }
}
exports.InvalidCommandException = InvalidCommandException;
//# sourceMappingURL=InvalidCommandException.js.map