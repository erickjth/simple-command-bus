import { readdirSync, lstatSync } from 'node:fs';
import { join } from 'node:path';
import isCallable from 'is-callable';

export const isDirectory = (dir: string) => lstatSync(dir).isDirectory();

export const walkSync = (file: string) =>
	isDirectory(file) ? readdirSync(file).map(f => walkSync(join(file, f))) : file;

export const upperFirst = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const isString = s => typeof s === 'string';

export const isFunction = f => typeof f === 'function';

/**
 * Convert a string to lower camel case. Example: "hello world" to "helloWorld"
 *
 * @param {string} s
 * @returns {string}
 */
export const lowerCamelCase = (s: string) => {
	// Implement lower camel case
	const parts = s.split(/[^a-zA-Z0-9]/);
	const camel = parts
		.map((part, i) => (i === 0 ? part.toLowerCase() : upperFirst(part)))
		.join('');

	return camel;
};

/**
 * Convert a string to camel case. Example: "hello world" to "HelloWorld"
 *
 * @param {string} s
 * @return {string}
 */
export const camelCase = (s: string) => {
	const parts = s.split(/[^a-zA-Z0-9]/);
	const camel = parts.map(part => upperFirst(part)).join('');
	return camel;
};

export { isCallable };

export default {
	isDirectory,
	walkSync,
	upperFirst,
	isString,
	isFunction,
	lowerCamelCase,
	camelCase,
	isCallable,
};
