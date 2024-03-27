export class InvalidCommandException extends Error {
    constructor(message = 'Invalid Command') {
        super(message);
    }
    static forCommand(command) {
        let message = 'invalid command';
        if (command) {
            message += ` "${command.constructor.name}"`;
        }
        return new InvalidCommandException(message);
    }
}
//# sourceMappingURL=InvalidCommandException.js.map