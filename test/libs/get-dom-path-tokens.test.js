/* global describe, xit, beforeEach, afterEach */
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

	xit('should exist', () => {
		getDomPathTokens.should.exist;
	});

	xit('should get correct token', () => {
		getDomPathTokens(el).should.eql(['parent']);
	});

	xit('should get correct tokens', () => {
		const childEl = document.createElement('div');
		childEl.setAttribute('data-trackable', 'child');
		el.appendChild(childEl);

		getDomPathTokens(childEl).should.eql(['child', 'parent']);
	});

});
