import utils from './utils';
import nodeModule from 'module';
const cachedCommands = {};
const CreateCommandBusProxy = function CreateCommandBusProxy(commandBus, commandsDir) {
    if (!commandsDir || !utils.isDirectory(commandsDir)) {
        throw new Error('Invalid commands path.');
    }
    const commands = utils.walkSync(commandsDir);
    const availableCommands = commands.reduce((carry, command) => {
        const fileName = command.split('/').pop();
        const commandName = fileName.split('.').slice(0, -1).join('.');
        if (commandName) {
            const key = utils.lowerCamelCase(commandName).replace(/command|Command$/, '');
            carry.set(key, { path: command, command: commandName });
        }
        return carry;
    }, new Map());
    return new Proxy({}, {
        get(target, propKey) {
            const commandName = utils.lowerCamelCase(propKey);
            if (!cachedCommands[commandName]) {
                const record = availableCommands.get(commandName);
                if (!record) {
                    throw new Error(`Command "${commandName}" not found.`);
                }
                const { path, command } = record;
                const module = nodeModule.createRequire(import.meta.url)(path);
                const callable = module?.[command] ??
                    module?.[utils.camelCase(command)] ??
                    module?.default ??
                    undefined;
                if (!utils.isFunction(callable)) {
                    throw new Error(`Command "${commandName}" is not callable or not found with that name. Please make sure the command is exported with correct name.`);
                }
                cachedCommands[commandName] = callable;
            }
            const Command = cachedCommands[commandName];
            if (utils.isFunction(Command) === false) {
                throw new Error(`Command "${commandName}" is not callable.`);
            }
            return (...args) => commandBus.handle(new Command(...args));
        },
    });
};
export default CreateCommandBusProxy;
//# sourceMappingURL=CreateCommandBusProxy.js.map