import { Command, CommandReturn, Handler } from './types';

export const commandHandledSymbol = Symbol('command-handled');

export abstract class AbstractHandler<C extends Command<unknown, unknown>> implements Handler<C> {
  constructor() {
    return new Proxy(this, {
      get(target, prop, receiver) {
        if (prop in target && typeof Reflect.get(target, prop, receiver) === 'function') {
          // return function with the handler method
          return (command: C): CommandReturn<C> => {
            return Reflect.get(target, prop, receiver)(command);
          };
        }

        return Reflect.get(target, prop, receiver);
      },
    });
  }

  [key: string]: (command: C) => CommandReturn<C>;
}
