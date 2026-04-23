export default function createException(name, options = {}) {
	class Exception extends Error {
		constructor(message, code) {
			super(options.message || message);

			if (Error.captureStackTrace) {
				Error.captureStackTrace(this, this.constructor);
			} else {
				this.stack = (new Error()).stack;
			}

			this.code = options.code || code;
		}
	}

	Exception.prototype.name = name;
	Exception.prototype.type = 'Exception';
	Exception.prototype.constructor = Exception;

	return Exception;
}
