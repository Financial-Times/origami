/* eslint-env mocha */
/* global proclaim sinon */

import * as fixtures from './helpers/fixtures.js';

import Typography from './../main.js';

describe("Typography", () => {
	it('is defined', () => {
		proclaim.equal(typeof Typography, 'function');
	});

	it('has a static init method', () => {
		proclaim.equal(typeof Typography.init, 'function');
	});

	it("should autoinitialize", (done) => {
		const initSpy = sinon.spy(Typography, 'init');
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
		setTimeout(function(){
			proclaim.equal(initSpy.called, true);
			initSpy.restore();
			done();
		}, 100);
	});

	it("should not autoinitialize when the event is not dispached", () => {
		const initSpy = sinon.spy(Typography, 'init');
		proclaim.equal(initSpy.called, false);
	});

	describe("should create a new", () => {
		beforeEach(() => {
			fixtures.htmlCode();
		});

		afterEach(() => {
			fixtures.reset();
		});

		it("single component when initialized with a root element", () => {
			const typography = Typography.init('html');
			proclaim.equal(typography instanceof Typography, true);
		});
	});
});
