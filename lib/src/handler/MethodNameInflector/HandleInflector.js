"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleInflector = void 0;
const exceptions_1 = require("../../exceptions");
const utils_1 = require("../../utils");
class HandleInflector {
    constructor(methodName = 'handle') {
        this.methodName = methodName;
    }
    inflect(command, handler) {
        if (!(0, utils_1.isCallable)(handler[this.methodName])) {
            throw exceptions_1.InvalidHandlerMethodException.forMethod(this.methodName);
        }
        return this.methodName;
    }
}
exports.HandleInflector = HandleInflector;
//# sourceMappingURL=HandleInflector.js.map