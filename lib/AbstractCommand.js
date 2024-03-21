export const commandReturnSymbol = Symbol('command-return');
export class AbstractCommand {
    payload;
    [commandReturnSymbol];
    constructor(payload) {
        this.payload = payload;
    }
}
export class AbstractCommandWithoutPayload {
    [commandReturnSymbol];
    constructor() { }
}
//# sourceMappingURL=AbstractCommand.js.map