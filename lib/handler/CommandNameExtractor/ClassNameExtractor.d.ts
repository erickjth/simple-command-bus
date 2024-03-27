import { Command, CommandNameExtractor } from '../../types';
export declare class ClassNameExtractor implements CommandNameExtractor {
    extractName(command: Command): string;
}
