import { InvalidCommandException } from '../../exceptions';
export class ClassNameExtractor {
    extractName(command) {
        if (!command?.constructor?.name) {
            throw new InvalidCommandException('Invalid Command Name. Make sure the command is a class or function with a name. Anonymous functions are not allowed.');
        }
        return command.constructor.name;
    }
}
//# sourceMappingURL=ClassNameExtractor.js.map