'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Middleware2 = require('../Middleware');

var _Middleware3 = _interopRequireDefault(_Middleware2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoggerMiddleware = function (_Middleware) {
	_inherits(LoggerMiddleware, _Middleware);

	function LoggerMiddleware(logger) {
		_classCallCheck(this, LoggerMiddleware);

		var _this = _possibleConstructorReturn(this, (LoggerMiddleware.__proto__ || Object.getPrototypeOf(LoggerMiddleware)).call(this));

		_this.logger = logger;
		return _this;
	}

	_createClass(LoggerMiddleware, [{
		key: 'execute',
		value: function execute(command, next) {
			this.logger.log('Before command: ', command);
			var returnValue = next(command);
			this.logger.log('After command result: ', command, returnValue);
			return returnValue;
		}
	}]);

	return LoggerMiddleware;
}(_Middleware3.default);

exports.default = LoggerMiddleware;