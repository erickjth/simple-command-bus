'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _CommandNameExtractor = require('./CommandNameExtractor/CommandNameExtractor');

var _CommandNameExtractor2 = _interopRequireDefault(_CommandNameExtractor);

var _MethodNameInflector = require('./MethodNameInflector/MethodNameInflector');

var _MethodNameInflector2 = _interopRequireDefault(_MethodNameInflector);

var _HandlerLocator = require('./Locator/HandlerLocator');

var _HandlerLocator2 = _interopRequireDefault(_HandlerLocator);

var _Middleware2 = require('../Middleware');

var _Middleware3 = _interopRequireDefault(_Middleware2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Intend to define private property
var _commandNameExtractor = Symbol('commandNameExtractor');
var _handlerLocator = Symbol('handlerLocator');
var _methodNameInflector = Symbol('methodNameInflector');

var CommandHandlerMiddleware = function (_Middleware) {
	_inherits(CommandHandlerMiddleware, _Middleware);

	function CommandHandlerMiddleware(commandNameExtractor, handlerLocator, methodNameInflector) {
		_classCallCheck(this, CommandHandlerMiddleware);

		var _this = _possibleConstructorReturn(this, (CommandHandlerMiddleware.__proto__ || Object.getPrototypeOf(CommandHandlerMiddleware)).call(this));

		_this[_commandNameExtractor] = commandNameExtractor;
		_this[_handlerLocator] = handlerLocator;
		_this[_methodNameInflector] = methodNameInflector;
		return _this;
	}

	_createClass(CommandHandlerMiddleware, [{
		key: 'execute',
		value: function execute(command, next) {
			var commandName = null;
			var handler = null;
			var methodName = null;
			var result = null;

			if (this[_commandNameExtractor] instanceof _CommandNameExtractor2.default) {
				commandName = this[_commandNameExtractor].extractName(command);
			}

			if (commandName && this[_handlerLocator] instanceof _HandlerLocator2.default) {
				handler = this[_handlerLocator].getHandlerForCommand(commandName);
			}

			if (commandName && handler && this[_methodNameInflector] instanceof _MethodNameInflector2.default) {
				methodName = this[_methodNameInflector].inflect(commandName, handler);
			}

			if (handler && (0, _lodash.isFunction)(handler[methodName])) {
				result = handler[methodName].call(handler, command);
			}

			return result || null;
		}
	}, {
		key: 'commandNameExtractor',
		set: function set(commandNameExtractor) {
			this[_commandNameExtractor] = commandNameExtractor;
		}
	}, {
		key: 'handlerLocator',
		set: function set(handlerLocator) {
			this[_handlerLocator] = handlerLocator;
		}
	}, {
		key: 'methodNameInflector',
		set: function set(methodNameInflector) {
			this[_methodNameInflector] = methodNameInflector;
		}
	}]);

	return CommandHandlerMiddleware;
}(_Middleware3.default);

exports.default = CommandHandlerMiddleware;