import lod from 'lodash';
import createException from './createException';

const MissingHandlerException = createException('MissingHandlerException', {
	message: 'Invalid Command'
});

MissingHandlerException.forCommand = (commandName) => {
	let message = null;

	if (lod.isString(commandName)) {
		message = `There is no a handler for "${commandName}" Command.`;
	}

	throw new MissingHandlerException(message);
};

export default MissingHandlerException;
