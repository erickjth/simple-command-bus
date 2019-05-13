"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFunction = exports.isString = exports.upperFirst = exports.camelCase = exports.capitalize = exports.walkSync = exports.isDirectory = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _capitalize = _interopRequireDefault(require("lodash/capitalize"));

var _camelCase = _interopRequireDefault(require("lodash/camelCase"));

var _upperFirst = _interopRequireDefault(require("lodash/upperFirst"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var isDirectory = function isDirectory(dir) {
  return _fs["default"].lstatSync(dir).isDirectory();
};

exports.isDirectory = isDirectory;

var walkSync = function walkSync(file) {
  return isDirectory(file) ? _fs["default"].readdirSync(file).map(function (f) {
    return walkSync(_path["default"].join(file, f));
  }) : file;
};

exports.walkSync = walkSync;

var capitalize = function capitalize(s) {
  return (0, _capitalize["default"])(s);
};

exports.capitalize = capitalize;

var camelCase = function camelCase(s) {
  return (0, _camelCase["default"])(s);
};

exports.camelCase = camelCase;

var upperFirst = function upperFirst(s) {
  return (0, _upperFirst["default"])(s);
};

exports.upperFirst = upperFirst;

var isString = function isString(s) {
  return typeof s === 'string';
};

exports.isString = isString;

var isFunction = function isFunction(f) {
  return typeof f === 'function';
};

exports.isFunction = isFunction;