export class MissingHandlerException extends Error {
    constructor(message = 'Missing Handler') {
        super(message);
    }
    static forCommand(commandName) {
        let message = 'Missing handler for command';
        if (commandName) {
            message += ` "${commandName}"`;
        }
        return new MissingHandlerException(message);
    }
}
//# sourceMappingURL=MissingHandlerException.js.map