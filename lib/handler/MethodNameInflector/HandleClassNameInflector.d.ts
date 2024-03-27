import { HandleInflector } from './HandleInflector';
import { Handler, Command } from '../../types';
export declare class HandleClassNameInflector extends HandleInflector {
    inflect<C extends Command>(command: Command, handler: Handler<C>): string;
}
