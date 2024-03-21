import { isCallable, isDirectory, walkSync } from '../../utils';
import { MissingHandlerException } from '../../exceptions';
export class NamespaceHandlerLocator {
    handlers;
    constructor(handlersPath) {
        if (!handlersPath || !isDirectory(handlersPath)) {
            throw new Error('Invalid commands path.');
        }
        this.handlers = walkSync(handlersPath);
    }
    getHandlerForCommand(command) {
        const commandName = command.constructor?.name ?? undefined;
        const handlerName = commandName.replace('Command', 'Handler');
        const foundHandler = this.handlers.find(handler => handler.endsWith(handlerName));
        if (foundHandler === undefined) {
            throw MissingHandlerException.forCommand(commandName);
        }
        const Handler = require(foundHandler);
        if (isCallable(Handler) === false) {
            throw MissingHandlerException.forCommand(commandName);
        }
        return new Handler();
    }
}
//# sourceMappingURL=NamespaceHandlerLocator.js.map