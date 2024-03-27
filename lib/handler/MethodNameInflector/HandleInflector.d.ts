import { MethodNameInflector, Command, Handler } from '../../types';
export declare class HandleInflector implements MethodNameInflector {
    protected methodName: string;
    constructor(methodName?: string);
    inflect<C extends Command>(command: C, handler: Handler<C>): string;
}
