"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerMiddleware = void 0;
class LoggerMiddleware {
    constructor(logger) {
        this.logger = logger;
    }
    execute(command, next) {
        var _a, _b, _c, _d;
        (_b = (_a = this.logger) === null || _a === void 0 ? void 0 : _a.log) === null || _b === void 0 ? void 0 : _b.call(_a, 'Before command: ', command);
        const returnValue = next(command);
        (_d = (_c = this.logger) === null || _c === void 0 ? void 0 : _c.log) === null || _d === void 0 ? void 0 : _d.call(_c, 'After command result: ', command, returnValue);
        return returnValue;
    }
}
exports.LoggerMiddleware = LoggerMiddleware;
//# sourceMappingURL=LoggerMiddleware.js.map