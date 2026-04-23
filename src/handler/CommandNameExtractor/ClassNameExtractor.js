import lod from 'lodash';
import CommandNameExtractor from './CommandNameExtractor';
import InvalidCommandException from '../../exceptions/InvalidCommandException';

export default class ClassNameExtractor extends CommandNameExtractor {
	extractName(command) {
		if (lod.isObject(command) === false ||
			lod.isString(command.constructor.name) === false
		) {
			throw new InvalidCommandException('Invalid Command Name.');
		}

		return command.constructor.name;
	}
}
