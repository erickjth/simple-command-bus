import fs from 'fs';
import path from 'path';
import capitalizeStr from 'lodash/capitalize';
import camelCaseStr from 'lodash/camelCase';
import startCaseStr from 'lodash/startCase';

const isDirectory = dir => fs.lstatSync(dir).isDirectory();

const walkSync = file =>
	(isDirectory(file) ? fs.readdirSync(file).map(f => walkSync(path.join(file, f))) : file);

const capitalize = s => capitalizeStr(s);

const camelCase = s => camelCaseStr(s);

const startCase = s => startCaseStr(s);

const isString = s => typeof s === 'string';

const isFunction = f => typeof f === 'function';

export {
	isDirectory,
	walkSync,
	capitalize,
	camelCase,
	startCase,
	isString,
	isFunction
};
