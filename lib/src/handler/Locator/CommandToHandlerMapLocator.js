"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandToHandlerMapLocator = void 0;
const exceptions_1 = require("../../exceptions");
class CommandToHandlerMapLocator {
    constructor(handlers) {
        this.handlers = new Map();
        handlers === null || handlers === void 0 ? void 0 : handlers.forEach(([command, handler]) => {
            this.setHandlerForCommand(command, handler);
        });
    }
    setHandlerForCommand(command, handler) {
        this.handlers.set(command, handler);
    }
    setHandlersForCommands(handlers) {
        handlers.forEach(([command, handler]) => {
            this.setHandlerForCommand(command, handler);
        });
    }
    getHandlerForCommand(command) {
        var _a, _b;
        const handler = (_a = this.handlers.get(command.constructor)) !== null && _a !== void 0 ? _a : null;
        if (!handler) {
            throw exceptions_1.MissingHandlerException.forCommand((_b = command.constructor) === null || _b === void 0 ? void 0 : _b.name);
        }
        return handler;
    }
}
exports.CommandToHandlerMapLocator = CommandToHandlerMapLocator;
//# sourceMappingURL=CommandToHandlerMapLocator.js.map