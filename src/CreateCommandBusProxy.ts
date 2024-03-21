import { CommandBus } from './types';
import { lowerCamelCase, camelCase, isDirectory, walkSync, isFunction } from './utils';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const cachedCommands: {
	[key: string]: any;
} = {};

const CreateCommandBusProxy = function CreateCommandBusProxy(
	commandBus: CommandBus,
	commandsDir: string
) {
	if (!commandsDir || !isDirectory(commandsDir)) {
		throw new Error('Invalid commands path.');
	}

	const commands = walkSync(commandsDir) as string[];

	const availableCommands = commands.reduce((carry, command) => {
		const fileName = command.split('/').pop() as string;
		const commandName = fileName.split('.').slice(0, -1).join('.');

		if (commandName) {
			const key = lowerCamelCase(commandName).replace(/command|Command$/, '');
			carry.set(key, { path: command, command: commandName });
		}

		return carry;
	}, new Map<string, { path: string; command: string }>());

	return new Proxy<{ [key: string]: (...arg: any[]) => any }>(
		{},
		{
			get(target, propKey: string) {
				const commandName = lowerCamelCase(propKey);

				if (!cachedCommands[commandName]) {
					const record = availableCommands.get(commandName);

					if (!record) {
						throw new Error(`Command "${commandName}" not found.`);
					}

					const { path, command } = record;

					const module = require(path);

					const callable =
						module?.[command] ??
						module?.[camelCase(command)] ??
						module?.default ??
						undefined;

					if (!isFunction(callable)) {
						throw new Error(
							`Command "${commandName}" is not callable or not found with that name. Please make sure the command is exported with correct name.`
						);
					}

					cachedCommands[commandName] = callable;
				}

				const Command = cachedCommands[commandName];

				if (isFunction(Command) === false) {
					throw new Error(`Command "${commandName}" is not callable.`);
				}

				return (...args) => commandBus.handle(new Command(...args));
			},
		}
	);
};

export default CreateCommandBusProxy;
