
export default function createException(name, options) {
	class Exception {
		constructor(message, code) {
			if (Error.captureStackTrace) {
				Error.captureStackTrace(this, this.constructor);
			} else {
				this.stack = (new Error()).stack;
			}

			this.message = options.message || message;
			this.code = options.code || code;
		}
	}

	Exception.prototype = new Error();
	Exception.prototype.name = name;
	Exception.prototype.type = 'Exception';
	Exception.prototype.constructor = Exception;

	return Exception;
}
