"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryLocator = void 0;
const exceptions_1 = require("@/exceptions");
const utils_1 = require("@/utils");
class InMemoryLocator {
    constructor(handlers = {}) {
        this.handlers = handlers;
    }
    getHandlerForCommand(commandName) {
        if (typeof commandName !== 'string') {
            throw new exceptions_1.InvalidCommandException('Invalid command name');
        }
        const handlerName = commandName.replace('Command', 'Handler');
        if (!(0, utils_1.isCallable)(this.handlers[handlerName])) {
            exceptions_1.MissingHandlerException.forCommand(commandName);
        }
        return this.handlers[handlerName];
    }
}
exports.InMemoryLocator = InMemoryLocator;
//# sourceMappingURL=InMemoryLocator.js.map