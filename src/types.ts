import { commandReturnSymbol } from './AbstractCommand';

export type Probably<T> = T | undefined;
export type Nullable<T> = T | null;

export type NextFunction<C extends Command> = (command: C) => any;

export interface CommandBus {
	handle(command: Command): any;
}

export interface Command<Payload = unknown, Return = unknown> {
	[commandReturnSymbol]: Return;
	payload: Payload;
}

export interface CommandWithPayload<Payload = unknown, Return = unknown>
	extends Command<Payload, Return> {
	payload: Payload;
}

export type CommandPayload<C> = C extends Command<infer Payload, any> ? Payload : never;

export type CommandReturn<C> = C extends Command<any, infer Return> ? Return : never;

export type CommandType<TCommand> = Command<CommandReturn<TCommand>, CommandPayload<TCommand>>;

export interface Handler<C> {
	[key: string]: (command: C) => CommandReturn<C>;
}

export interface Middleware {
	execute: <C extends Command>(command: C, next: NextFunction<C>) => unknown;
}

export interface MethodNameInflector {
	inflect<C extends Command>(command: C, handler: Handler<C>): string;
}

export interface HandlerLocator {
	getHandlerForCommand<C extends Command>(command: C): Handler<C>;
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
