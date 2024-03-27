"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractCommandWithoutPayload = exports.AbstractCommand = exports.commandReturnSymbol = void 0;
exports.commandReturnSymbol = Symbol('command-return');
class AbstractCommand {
    constructor(payload) {
        this.payload = payload;
    }
}
exports.AbstractCommand = AbstractCommand;
class AbstractCommandWithoutPayload {
    constructor() { }
}
exports.AbstractCommandWithoutPayload = AbstractCommandWithoutPayload;
//# sourceMappingURL=AbstractCommand.js.map