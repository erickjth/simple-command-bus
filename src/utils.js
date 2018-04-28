import fs from 'fs';
import path from 'path';
import capitalizeStr from 'lodash/capitalize';

const isDirectory = dir => fs.lstatSync(dir).isDirectory();

const walkSync = file =>
	(isDirectory(file) ? fs.readdirSync(file).map(f => walkSync(path.join(file, f))) : file);

const capitalize = s => capitalizeStr(s);

const isString = s => typeof s === 'string';

const isFunction = f => typeof f === 'function';

export {
	isDirectory,
	walkSync,
	capitalize,
	isString,
	isFunction
};
