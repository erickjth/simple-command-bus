const fs = require('fs');
const path = require('path');
const isCallable = require('is-callable');
const camelCase = require('camelcase');

export const isDirectory = (dir: string) => fs.lstatSync(dir).isDirectory();

export const walkSync = (file: string) =>
	isDirectory(file) ? fs.readdirSync(file).map(f => walkSync(path.join(file, f))) : file;

export const upperFirst = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const isString = s => typeof s === 'string';

export const isFunction = f => typeof f === 'function';

export { isCallable, camelCase };
