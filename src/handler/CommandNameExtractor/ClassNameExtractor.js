import CommandNameExtractor from './CommandNameExtractor';

export default class ClassNameExtractor extends CommandNameExtractor {
	extractName(command) {
		return command.constructor.name;
	}
}
