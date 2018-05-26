'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.isFunction = exports.isString = exports.startCase = exports.camelCase = exports.capitalize = exports.walkSync = exports.isDirectory = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _capitalize = require('lodash/capitalize');

var _capitalize2 = _interopRequireDefault(_capitalize);

var _camelCase = require('lodash/camelCase');

var _camelCase2 = _interopRequireDefault(_camelCase);

var _startCase = require('lodash/startCase');

var _startCase2 = _interopRequireDefault(_startCase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isDirectory = function isDirectory(dir) {
	return _fs2.default.lstatSync(dir).isDirectory();
};

var walkSync = function walkSync(file) {
	return isDirectory(file) ? _fs2.default.readdirSync(file).map(function (f) {
		return walkSync(_path2.default.join(file, f));
	}) : file;
};

var capitalize = function capitalize(s) {
	return (0, _capitalize2.default)(s);
};

var camelCase = function camelCase(s) {
	return (0, _camelCase2.default)(s);
};

var startCase = function startCase(s) {
	return (0, _startCase2.default)(s);
};

var isString = function isString(s) {
	return typeof s === 'string';
};

var isFunction = function isFunction(f) {
	return typeof f === 'function';
};

exports.isDirectory = isDirectory;
exports.walkSync = walkSync;
exports.capitalize = capitalize;
exports.camelCase = camelCase;
exports.startCase = startCase;
exports.isString = isString;
exports.isFunction = isFunction;