import utils from '../../utils';
import { MissingHandlerException } from '../../exceptions';
import { createRequire } from 'module';
export class NamespaceHandlerLocator {
    handlers;
    constructor(handlersPath) {
        if (!handlersPath || !utils.isDirectory(handlersPath)) {
            throw new Error('Invalid commands path.');
        }
        this.handlers = utils.walkSync(handlersPath);
    }
    createInstanceForHandler(Module) {
        return new Module();
    }
    getHandlerForCommand(command) {
        const commandName = command.constructor?.name ?? undefined;
        const handlerName = commandName.replace('Command', 'Handler');
        const foundHandler = this.handlers.find(handler => {
            const handlerFileName = handler.split('/').pop();
            const name = handlerFileName?.replace('.ts', '').replace('.js', '');
            return handlerName === name;
        });
        if (foundHandler === undefined) {
            throw MissingHandlerException.forCommand(commandName);
        }
        const module = createRequire(import.meta.url)(foundHandler);
        const Handler = (module?.[handlerName] ??
            module?.[utils.lowerCamelCase(handlerName)] ??
            module?.[utils.camelCase(handlerName)] ??
            module?.default ??
            undefined);
        if (utils.isFunction(Handler) === false) {
            throw MissingHandlerException.forCommand(commandName);
        }
        return this.createInstanceForHandler(Handler);
    }
}
//# sourceMappingURL=NamespaceHandlerLocator.js.map