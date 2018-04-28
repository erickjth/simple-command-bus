'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('../../utils');

var _HandlerLocator2 = require('./HandlerLocator');

var _HandlerLocator3 = _interopRequireDefault(_HandlerLocator2);

var _MissingHandlerException = require('../../exceptions/MissingHandlerException');

var _MissingHandlerException2 = _interopRequireDefault(_MissingHandlerException);

var _InvalidCommandException = require('../../exceptions/InvalidCommandException');

var _InvalidCommandException2 = _interopRequireDefault(_InvalidCommandException);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NamespaceHandlerLocator = function (_HandlerLocator) {
	_inherits(NamespaceHandlerLocator, _HandlerLocator);

	function NamespaceHandlerLocator(handlersPath) {
		_classCallCheck(this, NamespaceHandlerLocator);

		var _this = _possibleConstructorReturn(this, (NamespaceHandlerLocator.__proto__ || Object.getPrototypeOf(NamespaceHandlerLocator)).call(this));

		if (!handlersPath || !(0, _utils.isDirectory)(handlersPath)) {
			throw new Error('Invalid commands path.');
		}

		_this.handlers = (0, _utils.walkSync)(handlersPath);
		return _this;
	}

	_createClass(NamespaceHandlerLocator, [{
		key: 'getHandlerForCommand',
		value: function getHandlerForCommand(commandName) {
			if ((0, _utils.isString)(commandName) === false) {
				throw new _InvalidCommandException2.default();
			}

			var handlerName = commandName.replace('Command', 'Handler') + '.js';
			var foundHandler = this.handlers.find(function (handler) {
				return handler.endsWith(handlerName);
			});

			if (!foundHandler) {
				_MissingHandlerException2.default.forCommand(commandName);
			}

			var Handler = require(foundHandler);

			if ((0, _utils.isFunction)(Handler) === false) {
				_MissingHandlerException2.default.forCommand(commandName);
			}

			return new Handler();
		}
	}]);

	return NamespaceHandlerLocator;
}(_HandlerLocator3.default);

exports.default = NamespaceHandlerLocator;