import { readdirSync, lstatSync } from 'node:fs';
import { join } from 'node:path';
import isCallable from 'is-callable';
export const isDirectory = (dir) => lstatSync(dir).isDirectory();
export const walkSync = (file) => isDirectory(file) ? readdirSync(file).map(f => walkSync(join(file, f))) : file;
export const upperFirst = (s) => s.charAt(0).toUpperCase() + s.slice(1);
export const isString = s => typeof s === 'string';
export const isFunction = f => typeof f === 'function';
export const camelCase = (s) => {
    const words = s.split(/[-_]/);
    const firstWord = words.shift();
    return [firstWord, ...words.map(upperFirst)].join('');
};
export { isCallable };
//# sourceMappingURL=utils.js.map