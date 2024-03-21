import { Command } from './types';
export declare const commandReturnSymbol: unique symbol;
export declare abstract class AbstractCommand<T, R = unknown> implements Command<T, R> {
    payload: T;
    [commandReturnSymbol]?: R;
    constructor(payload: T);
}
export declare abstract class AbstractCommandWithoutPayload<R = unknown> implements Command<undefined, R> {
    [commandReturnSymbol]?: R;
    constructor();
}
