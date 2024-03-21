import { Command } from '../types';
export declare class InvalidCommandException extends Error {
    constructor(message?: string);
    static forCommand(command?: Command): InvalidCommandException;
}
