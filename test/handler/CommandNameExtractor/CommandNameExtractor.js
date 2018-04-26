/* global it, describe */
import { expect } from 'chai';
import CommandNameExtractor from '../../../src/handler/CommandNameExtractor/CommandNameExtractor';

describe('Testing Abstract CommandNameExtractor', () => {
	it('Abstract instance thrown an error', () => {
		const nameExtractor = new CommandNameExtractor();
		expect(nameExtractor.extractName).to.throw();
	});
});
