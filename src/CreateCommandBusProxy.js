import { camelCase, upperFirst, isDirectory, isFunction, walkSync } from './utils';

const cachedCommands = {};

const CreateCommandBusProxy = function CreateCommandBusProxy(commandBus, commandsDir) {
	if (!commandsDir || !isDirectory(commandsDir)) {
		throw new Error('Invalid commands path.');
	}

	const availableCommands = walkSync(commandsDir);

	return new Proxy({}, {
		get(target, propKey) {
			const commandName = `${upperFirst(camelCase(propKey))}Command.js`;

			if (!cachedCommands[commandName]) {
				const foundCommand = availableCommands.find(command => command.endsWith(commandName));

				if (!foundCommand) {
					throw new Error(`Command "${commandName}" not found.`);
				}

				cachedCommands[commandName] = require(foundCommand); // eslint-disable-line
			}

			const Command = cachedCommands[commandName];

			if (isFunction(Command) === false) {
				throw new Error(`Command "${commandName}" is not callable.`);
			}

			return (...args) => commandBus.handle(new Command(...args));
		}
	});
};

export default CreateCommandBusProxy;
