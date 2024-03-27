import { CommandBus } from './types';
declare const CreateCommandBusProxy: (commandBus: CommandBus, commandsDir: string) => {
    [key: string]: (...arg: any[]) => any;
};
export default CreateCommandBusProxy;
