import { InvalidCommandException, MissingHandlerException } from '@/exceptions';
import { isCallable } from '@/utils';
export class InMemoryLocator {
    handlers;
    constructor(handlers = {}) {
        this.handlers = handlers;
    }
    getHandlerForCommand(commandName) {
        if (typeof commandName !== 'string') {
            throw new InvalidCommandException('Invalid command name');
        }
        const handlerName = commandName.replace('Command', 'Handler');
        if (!isCallable(this.handlers[handlerName])) {
            MissingHandlerException.forCommand(commandName);
        }
        return this.handlers[handlerName];
    }
}
//# sourceMappingURL=InMemoryLocator.js.map