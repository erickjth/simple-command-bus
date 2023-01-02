export type Probably<T> = T | undefined;
export type Nullable<T> = T | null;

export type NextFunction<C extends Command> = (command: C) => any;
export type HandlerFunction<C extends Command> = (command: C) => any;

export interface CommandBus {
	handle(command: Command): any;
}

export interface Command<P = unknown> {
	payload?: P;
}

export interface Handler<C extends Command> {
	handle(command: C): any;
}

export type CallableHandler<C extends Command> = Handler<C> | HandlerFunction<C>;

export interface Middleware {
	execute: <C extends Command, R = any>(command: C, next: NextFunction<C>) => R;
}

export interface MethodNameInflector {
	inflect<C extends Command>(command: C, handler: CallableHandler<C>): string;
}

export interface HandlerLocator {
	getHandlerForCommand<C extends Command>(command: C): CallableHandler<C>;
}

export interface CommandNameExtractor {
	extractName(command: Command): string;
}

export interface LoggerInterface {
	log(message: string, ...data: any[]): void;
	error(message: string, ...data: any[]): void;
	info(message: string, ...data: any[]): void;
	warn(message: string, ...data: any[]): void;
	verbose(message: string, ...data: any[]): void;
	debug(message: string, ...data: any[]): void;
}
