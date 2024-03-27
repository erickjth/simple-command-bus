export class InvalidHandlerMethodException extends Error {
  constructor(message: string = 'Invalid handler method.') {
    super(message);
  }

  static forMethod(method: string) {
    return new InvalidHandlerMethodException(`Invalid handler method ${method}.`);
  }
}
