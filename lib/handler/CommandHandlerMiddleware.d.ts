import { Middleware, MethodNameInflector, HandlerLocator, Command } from '../types';
export declare class CommandHandlerMiddleware implements Middleware {
    private handlerLocator?;
    private methodNameInflector?;
    constructor(handlerLocator?: HandlerLocator, methodNameInflector?: MethodNameInflector);
    setHandlerLocator(handlerLocator: HandlerLocator): void;
    setMethodNameInflector(methodNameInflector: MethodNameInflector): void;
    execute(command: Command): any;
}
