import { Command } from './types';
export declare const commandReturnSymbol: unique symbol;
export declare abstract class AbstractCommand<P = never, R = void> implements Command<P, R> {
    [commandReturnSymbol]: R;
    payload: P;
    constructor(payload?: P);
}
