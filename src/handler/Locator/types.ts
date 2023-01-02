import { CallableHandler, Command } from '../../types';

export type Handlers<C extends Command = any> = Map<Instantiable<C>, CallableHandler<C>>;
export type Instantiable<T = unknown> = new (...args: any[]) => T;

export type HandlerParams = [Instantiable<Command>, CallableHandler<Command>][];
