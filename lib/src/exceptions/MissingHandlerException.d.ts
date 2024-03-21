export declare class MissingHandlerException extends Error {
    constructor(message?: string);
    static forCommand(commandName?: string): MissingHandlerException;
}
