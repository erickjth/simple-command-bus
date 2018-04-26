import { isObject } from 'lodash';
import createException from './createException';

const InvalidCommandException = createException('InvalidCommandException', {
	message: 'Invalid Command'
});

InvalidCommandException.forCommand = (command) => {
	let message = null;

	if (isObject(command)) {
		message = `Command ${command.constructor.name} is invalid. It must extend from Command.`;
	}

	throw new InvalidCommandException(message);
};

export default InvalidCommandException;
