'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _CommandNameExtractor2 = require('./CommandNameExtractor');

var _CommandNameExtractor3 = _interopRequireDefault(_CommandNameExtractor2);

var _InvalidCommandException = require('../../exceptions/InvalidCommandException');

var _InvalidCommandException2 = _interopRequireDefault(_InvalidCommandException);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ClassNameExtractor = function (_CommandNameExtractor) {
	_inherits(ClassNameExtractor, _CommandNameExtractor);

	function ClassNameExtractor() {
		_classCallCheck(this, ClassNameExtractor);

		return _possibleConstructorReturn(this, (ClassNameExtractor.__proto__ || Object.getPrototypeOf(ClassNameExtractor)).apply(this, arguments));
	}

	_createClass(ClassNameExtractor, [{
		key: 'extractName',
		value: function extractName(command) {
			if ((0, _lodash.isObject)(command) === false || (0, _lodash.isString)(command.constructor.name) === false) {
				throw new _InvalidCommandException2.default('Invalid Command Name.');
			}

			return command.constructor.name;
		}
	}]);

	return ClassNameExtractor;
}(_CommandNameExtractor3.default);

exports.default = ClassNameExtractor;