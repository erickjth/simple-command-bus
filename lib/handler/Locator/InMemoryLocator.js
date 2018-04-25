'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _HandlerLocator2 = require('./HandlerLocator');

var _HandlerLocator3 = _interopRequireDefault(_HandlerLocator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InMemoryLocator = function (_HandlerLocator) {
	_inherits(InMemoryLocator, _HandlerLocator);

	function InMemoryLocator() {
		var handlers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

		_classCallCheck(this, InMemoryLocator);

		var _this = _possibleConstructorReturn(this, (InMemoryLocator.__proto__ || Object.getPrototypeOf(InMemoryLocator)).call(this));

		_this.handlers = {};
		if ((0, _lodash.isObject)(handlers)) {
			_this.handlers = (0, _lodash.reduce)(handlers, function (carry, Handler, key) {
				carry[key] = (0, _lodash.isFunction)(Handler) ? new Handler() : Handler; // eslint-disable-line
				return carry;
			}, {});
		}
		return _this;
	}

	_createClass(InMemoryLocator, [{
		key: 'getHandlerForCommand',
		value: function getHandlerForCommand(commandName) {
			if ((0, _lodash.isString)(commandName) === false) {
				throw new Error('Invalid Command Name.');
			}

			var handlerName = commandName.replace('Command', 'Handler');

			if ((0, _lodash.has)(this.handlers, handlerName) === false) {
				throw new Error('There is no a handler for "' + commandName + '" Command.');
			}

			return this.handlers[handlerName];
		}
	}]);

	return InMemoryLocator;
}(_HandlerLocator3.default);

exports.default = InMemoryLocator;