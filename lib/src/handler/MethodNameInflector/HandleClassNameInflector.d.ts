import { HandleInflector } from './HandleInflector';
import { CallableHandler, Command } from '../../types';
export declare class HandleClassNameInflector extends HandleInflector {
    inflect<C extends Command>(command: Command, handler: CallableHandler<C>): string;
}
