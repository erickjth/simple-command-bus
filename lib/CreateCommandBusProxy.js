import { camelCase, isDirectory, walkSync, isFunction } from './utils';
const cachedCommands = {};
const CreateCommandBusProxy = function CreateCommandBusProxy(commandBus, commandsDir) {
    if (!commandsDir || !isDirectory(commandsDir)) {
        throw new Error('Invalid commands path.');
    }
    const availableCommands = walkSync(commandsDir).reduce((carry, command) => {
        const fileName = command.split('/').pop();
        const commandName = fileName.split('.').slice(0, -1).join('.');
        if (commandName) {
            const key = camelCase(commandName).replace(/command|Command$/, '');
            return {
                ...carry,
                [key]: command,
            };
        }
        return carry;
    }, {});
    return new Proxy({}, {
        get(target, propKey) {
            const commandName = camelCase(propKey);
            if (!cachedCommands[commandName]) {
                const foundCommand = availableCommands?.[commandName];
                if (!foundCommand) {
                    throw new Error(`Command "${commandName}" not found.`);
                }
                cachedCommands[commandName] = require(foundCommand);
            }
            const CommandToHandle = cachedCommands[commandName];
            if (isFunction(CommandToHandle) === false) {
                throw new Error(`Command "${commandName}" is not callable.`);
            }
            return (...args) => commandBus.handle(new CommandToHandle(...args));
        },
    });
};
export default CreateCommandBusProxy;
//# sourceMappingURL=CreateCommandBusProxy.js.map