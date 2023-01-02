/* global it, describe */
import { expect } from 'chai';
import { ClassNameExtractor } from '../../../src/handler/CommandNameExtractor/ClassNameExtractor';
import { Command } from '../../../src/types';

describe('Testing ClassNameExtractor', () => {
	it('Extract name from command', () => {
		const nameExtractor = new ClassNameExtractor();
		class FooCommand implements Command {}
		const commandName = nameExtractor.extractName(new FooCommand());
		expect(commandName).to.be.equal('FooCommand');
	});

	// it('Invalid Command Object', () => {
	// 	const nameExtractor = new ClassNameExtractor();
	// 	const fakeCommand = function fakeCommand() {};
	// 	expect(() => nameExtractor.extractName(fakeCommand)).to.throw();
	// });
});
