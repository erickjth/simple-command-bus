'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _MethodNameInflector2 = require('./MethodNameInflector');

var _MethodNameInflector3 = _interopRequireDefault(_MethodNameInflector2);

var _InvalidHandlerMethodException = require('../../exceptions/InvalidHandlerMethodException');

var _InvalidHandlerMethodException2 = _interopRequireDefault(_InvalidHandlerMethodException);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HandleInflector = function (_MethodNameInflector) {
	_inherits(HandleInflector, _MethodNameInflector);

	function HandleInflector(methodName) {
		_classCallCheck(this, HandleInflector);

		var _this = _possibleConstructorReturn(this, (HandleInflector.__proto__ || Object.getPrototypeOf(HandleInflector)).call(this));

		_this.methodName = methodName || 'handle';
		return _this;
	}

	_createClass(HandleInflector, [{
		key: 'inflect',
		value: function inflect(commandName, handler) {
			if ((0, _lodash.isFunction)(handler[this.methodName]) === false) {
				_InvalidHandlerMethodException2.default.forMethod(this.methodName);
			}

			return this.methodName;
		}
	}]);

	return HandleInflector;
}(_MethodNameInflector3.default);

exports.default = HandleInflector;