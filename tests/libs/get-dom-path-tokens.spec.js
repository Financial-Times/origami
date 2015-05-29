/* global describe, it, beforeEach, afterEach */
'use strict';

var getDomPathTokens = require('../../src/libs/get-dom-path-tokens');

describe('Get DOM Path Tokens', function () {

	var el;

	beforeEach(function () {
		el = document.createElement('div');
		el.setAttribute('data-trackable', 'parent');
		document.body.appendChild(el);
	});

	afterEach(function () {
		document.body.removeChild(el);
	});

	it('should exist', function () {
		getDomPathTokens.should.exist;
	});

	it('should get correct token', function () {
		getDomPathTokens(el).should.eql(['parent']);
	});

	it('should get correct tokens', function () {
		var childEl = document.createElement('div');
		childEl.setAttribute('data-trackable', 'child');
		el.appendChild(childEl);

		getDomPathTokens(childEl).should.eql(['child', 'parent']);
	});

});
