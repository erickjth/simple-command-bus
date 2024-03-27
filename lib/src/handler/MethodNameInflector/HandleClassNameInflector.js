"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleClassNameInflector = void 0;
const HandleInflector_1 = require("./HandleInflector");
const exceptions_1 = require("../../exceptions");
const utils_1 = require("../../utils");
class HandleClassNameInflector extends HandleInflector_1.HandleInflector {
    inflect(command, handler) {
        var _a;
        const commandName = (((_a = command === null || command === void 0 ? void 0 : command.constructor) === null || _a === void 0 ? void 0 : _a.name) || '').replace('Command', '');
        const methodName = `${this.methodName}${commandName}`;
        if (!(0, utils_1.isCallable)(handler[methodName])) {
            throw exceptions_1.InvalidHandlerMethodException.forMethod(methodName);
        }
        return methodName;
    }
}
exports.HandleClassNameInflector = HandleClassNameInflector;
//# sourceMappingURL=HandleClassNameInflector.js.map