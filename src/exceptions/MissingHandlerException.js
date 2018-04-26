import { isString } from 'lodash';
import createException from './createException';

const MissingHandlerException = createException('MissingHandlerException', {
	message: 'Invalid Command'
});

MissingHandlerException.forCommand = (commandName) => {
	let message = null;

	if (isString(commandName)) {
		message = `There is no a handler for "${commandName}" Command.`;
	}

	throw new MissingHandlerException(message);
};

export default MissingHandlerException;
