/* global describe, it, beforeEach, afterEach */
const getDomPathTokens = require('../../src/libs/get-dom-path-tokens');

describe('Get DOM Path Tokens', () => {

	let el;

	beforeEach(() => {
		el = document.createElement('div');
		el.setAttribute('data-trackable', 'parent');
		document.body.appendChild(el);
	});

	afterEach(() => {
		document.body.removeChild(el);
	});

	it('should exist', () => {
		getDomPathTokens.should.exist;
	});

	it('should get correct token', () => {
		getDomPathTokens(el).should.eql(['parent']);
	});

	it('should get correct tokens', () => {
		const childEl = document.createElement('div');
		childEl.setAttribute('data-trackable', 'child');
		el.appendChild(childEl);

		getDomPathTokens(childEl).should.eql(['child', 'parent']);
	});

});
