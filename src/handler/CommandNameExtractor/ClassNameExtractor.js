import { has, isObject, isString } from 'lodash';
import CommandNameExtractor from './CommandNameExtractor';
import InvalidCommandException from '../../exceptions/InvalidCommandException';

export default class ClassNameExtractor extends CommandNameExtractor {
	extractName(command) {
		if (isObject(command) === false ||
			isString(command.constructor.name) === false
		) {
			throw new InvalidCommandException('Invalid Command Name.');
		}

		return command.constructor.name;
	}
}
