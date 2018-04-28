const Command = require('../../../lib/Command').default;

class FooCommand extends Command {
	constructor(bar, baz) {
		super();
		this.bar = bar;
		this.baz = baz;
	}
}

module.exports = FooCommand;
