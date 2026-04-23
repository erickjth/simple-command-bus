declare class Command {}

declare class Middleware {
    execute(command: any, next: (...args: any[]) => any): any;
}

declare class CommandBus {
    constructor(middlewares?: Middleware[]);
    getMiddlewareStack(): Middleware[];
    handle(command: any): any;
}

declare function CreateCommandBusProxy(commandBus: CommandBus, commandsDir: string): any;

declare class InvalidCommandException extends Error {
    static forCommand(command?: any): never;
}

declare class InvalidMiddlewareException extends Error {
    static forMiddleware(middleware?: any): never;
}

declare class InvalidHandlerMethodException extends Error {
    static forMethod(method?: any): never;
}

declare class MissingHandlerException extends Error {
    static forCommand(commandName?: string): never;
}

declare class CommandNameExtractor {
    extractName(command: any): string;
}

declare class ClassNameExtractor extends CommandNameExtractor {}

declare class MethodNameInflector {
    inflect(commandName: string, handler: any): string;
}

declare class HandleInflector extends MethodNameInflector {
    constructor(methodName?: string);
}

declare class HandleClassNameInflector extends MethodNameInflector {}

declare class HandlerLocator {
    getHandlerForCommand(commandName: string): any;
}

declare class InMemoryLocator extends HandlerLocator {
    constructor(handlers?: Record<string, any>);
}

declare class NamespaceHandlerLocator extends HandlerLocator {
    constructor(handlersPath: string);
}

declare class CommandHandlerMiddleware extends Middleware {
    constructor(commandNameExtractor?: CommandNameExtractor, handlerLocator?: HandlerLocator, methodNameInflector?: MethodNameInflector);
    set commandNameExtractor(v: CommandNameExtractor);
    set handlerLocator(v: HandlerLocator);
    set methodNameInflector(v: MethodNameInflector);
}

declare class LoggerMiddleware extends Middleware {
    constructor(logger: any);
    execute(command: any, next: (...args: any[]) => any): any;
}

export default CommandBus;
export {
    CommandBus,
    Middleware,
    Command,
    CreateCommandBusProxy,
    InvalidMiddlewareException,
    InvalidCommandException,
    InvalidHandlerMethodException,
    MissingHandlerException,
    CommandHandlerMiddleware,
    CommandNameExtractor,
    MethodNameInflector,
    HandlerLocator,
    LoggerMiddleware,
    ClassNameExtractor,
    HandleInflector,
    InMemoryLocator,
    NamespaceHandlerLocator
};
