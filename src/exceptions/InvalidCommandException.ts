import { Command } from '../types';

export class InvalidCommandException extends Error {
  constructor(message: string = 'Invalid Command') {
    super(message);
  }

  static forCommand(command?: Command) {
    let message = 'invalid command';

    if (command) {
      message += ` "${command.constructor.name}"`;
    }

    return new InvalidCommandException(message);
  }
}
