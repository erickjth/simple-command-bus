import { Command } from './types';

export const commandReturnSymbol = Symbol('command-return');

export abstract class AbstractCommand<P = never, R = void> implements Command<P, R> {
  [commandReturnSymbol]: R;
  payload: P;

  constructor(payload: P = void 0 as P) {
    this.payload = payload;
  }
}
