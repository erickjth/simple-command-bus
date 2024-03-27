import { Handler, Command } from '../../types';

export type Handlers<C extends Command = any> = Map<Instantiable<C>, Handler<C>>;
export type Instantiable<T = unknown> = new (...args: any[]) => T;

export type HandlerParam<C extends Command = any> = [Instantiable<C>, Handler<C>];
export type HandlerParams = HandlerParam[];
