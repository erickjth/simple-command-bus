export class MissingHandlerException extends Error {
  constructor(message: string = 'Missing Handler') {
    super(message);
  }

  static forCommand(commandName?: string) {
    let message = 'Missing handler for command';

    if (commandName) {
      message += ` "${commandName}"`;
    }

    return new MissingHandlerException(message);
  }
}
