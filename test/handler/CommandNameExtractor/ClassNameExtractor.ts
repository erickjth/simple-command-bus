/* global it, describe */
import { expect } from 'chai';
import { ClassNameExtractor } from '../../../src/handler/CommandNameExtractor/ClassNameExtractor';
import { AbstractCommand } from '../../../src/AbstractCommand';

describe('Testing ClassNameExtractor', () => {
	it('Extract name from command', () => {
		const nameExtractor = new ClassNameExtractor();
		class FooCommand extends AbstractCommand {}
		const commandName = nameExtractor.extractName(new FooCommand());
		expect(commandName).to.be.equal('FooCommand');
	});
});
