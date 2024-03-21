import { MissingHandlerException } from '../../exceptions';
export class CommandToHandlerMapLocator {
    handlers = new Map();
    constructor(handlers) {
        handlers?.forEach(([command, handler]) => {
            this.setHandlerForCommand(command, handler);
        });
    }
    setHandlerForCommand(command, handler) {
        this.handlers.set(command, handler);
    }
    setHandlersForCommands(handlers) {
        handlers.forEach(([command, handler]) => {
            this.setHandlerForCommand(command, handler);
        });
    }
    getHandlerForCommand(command) {
        const handler = this.handlers.get(command.constructor) ?? null;
        if (!handler) {
            throw MissingHandlerException.forCommand(command.constructor?.name);
        }
        return handler;
    }
}
//# sourceMappingURL=CommandToHandlerMapLocator.js.map