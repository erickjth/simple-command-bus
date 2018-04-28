'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.isFunction = exports.isString = exports.capitalize = exports.walkSync = exports.isDirectory = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _capitalize = require('lodash/capitalize');

var _capitalize2 = _interopRequireDefault(_capitalize);

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

var isString = function isString(s) {
	return typeof s === 'string';
};

var isFunction = function isFunction(f) {
	return typeof f === 'function';
};

exports.isDirectory = isDirectory;
exports.walkSync = walkSync;
exports.capitalize = capitalize;
exports.isString = isString;
exports.isFunction = isFunction;