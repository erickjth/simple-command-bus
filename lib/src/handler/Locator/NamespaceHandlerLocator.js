"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NamespaceHandlerLocator = void 0;
const utils_1 = require("../../utils");
const exceptions_1 = require("../../exceptions");
class NamespaceHandlerLocator {
    constructor(handlersPath) {
        if (!handlersPath || !(0, utils_1.isDirectory)(handlersPath)) {
            throw new Error('Invalid commands path.');
        }
        this.handlers = (0, utils_1.walkSync)(handlersPath);
    }
    getHandlerForCommand(command) {
        var _a, _b;
        const commandName = (_b = (_a = command.constructor) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : undefined;
        const handlerName = commandName.replace('Command', 'Handler');
        const foundHandler = this.handlers.find(handler => handler.endsWith(handlerName));
        if (foundHandler === undefined) {
            throw exceptions_1.MissingHandlerException.forCommand(commandName);
        }
        const Handler = require(foundHandler);
        if ((0, utils_1.isCallable)(Handler) === false) {
            throw exceptions_1.MissingHandlerException.forCommand(commandName);
        }
        return new Handler();
    }
}
exports.NamespaceHandlerLocator = NamespaceHandlerLocator;
//# sourceMappingURL=NamespaceHandlerLocator.js.map