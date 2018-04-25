'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Middleware = require('./Middleware');

var _Middleware2 = _interopRequireDefault(_Middleware);

var _Command = require('./Command');

var _Command2 = _interopRequireDefault(_Command);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var commandBus = function () {
	function commandBus() {
		var middlewares = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

		_classCallCheck(this, commandBus);

		this.middlewaresStack = middlewares;
	}

	_createClass(commandBus, [{
		key: 'applyMiddleware',
		value: function applyMiddleware(command) {
			var run = this.middlewaresStack.reduceRight(function (next, middleware) {
				if (middleware instanceof _Middleware2.default === false) {
					throw new Error('Invalid middleware', middleware);
				}

				return middleware.execute.bind(middleware, command, next);
			}, function () {});

			return run();
		}
	}, {
		key: 'handle',
		value: function handle(command) {
			if (command instanceof _Command2.default === false) {
				throw new Error('Invalid command', command);
			}

			var result = this.applyMiddleware(command);

			return result;
		}
	}]);

	return commandBus;
}();

exports.default = commandBus;