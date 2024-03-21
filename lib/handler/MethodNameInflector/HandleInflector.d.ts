import { MethodNameInflector, Command, CallableHandler } from '../../types';
export declare class HandleInflector implements MethodNameInflector {
    protected methodName: string;
    constructor(methodName?: string);
    inflect<C extends Command>(command: Command, handler: CallableHandler<C>): string;
}
