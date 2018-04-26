/* global it, describe */
import { expect } from 'chai';
import Command from '../../../src/Command';
import ClassNameExtractor from '../../../src/handler/CommandNameExtractor/ClassNameExtractor';

describe('Testing ClassNameExtractor', () => {
	it('Extract name from command', () => {
		const nameExtractor = new ClassNameExtractor();
		class FooCommand extends Command {}
		const commandName = nameExtractor.extractName(new FooCommand());
		expect(commandName).to.be.equal('FooCommand');
	});

	it('Invalid Command Object', () => {
		const nameExtractor = new ClassNameExtractor();
		const fakeCommand = null;
		expect(() => nameExtractor.extractName(fakeCommand)).to.throw();
	});
});
