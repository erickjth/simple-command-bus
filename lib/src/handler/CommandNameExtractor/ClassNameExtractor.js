"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassNameExtractor = void 0;
const exceptions_1 = require("../../exceptions");
class ClassNameExtractor {
    extractName(command) {
        var _a;
        if (!((_a = command === null || command === void 0 ? void 0 : command.constructor) === null || _a === void 0 ? void 0 : _a.name)) {
            throw new exceptions_1.InvalidCommandException('Invalid Command Name. Make sure the command is a class or function with a name. Anonymous functions are not allowed.');
        }
        return command.constructor.name;
    }
}
exports.ClassNameExtractor = ClassNameExtractor;
//# sourceMappingURL=ClassNameExtractor.js.map