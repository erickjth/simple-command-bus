export const commandReturnSymbol = Symbol('command-return');
export class AbstractCommand {
    [commandReturnSymbol];
    payload;
    constructor(payload = void 0) {
        this.payload = payload;
    }
}
//# sourceMappingURL=AbstractCommand.js.map