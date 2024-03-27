import { InvalidCommandException } from '../../exceptions';
import { Command, CommandNameExtractor } from '../../types';

export class ClassNameExtractor implements CommandNameExtractor {
	extractName(command: Command) {
		if (!command?.constructor?.name) {
			throw new InvalidCommandException(
				'Invalid Command Name. Make sure the command is a class or function with a name. Anonymous functions are not allowed.'
			);
		}

		return command.constructor.name;
	}
}
