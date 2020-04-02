/* eslint-env mocha */
/* global proclaim sinon */

import * as fixtures from './helpers/fixtures';

import {SubsCard} from './../main';

describe("SubsCard", () => {
	it('is defined', () => {
		proclaim.equal(typeof SubsCard, 'function');
	});

	it('has a static init method', () => {
		proclaim.equal(typeof SubsCard.init, 'function');
	});

	it("should autoinitialize", (done) => {
		const initSpy = sinon.spy(SubsCard, 'init');
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
		setTimeout(function(){
			proclaim.equal(initSpy.called, true);
			initSpy.restore();
			done();
		}, 100);
	});

	it("should not autoinitialize when the event is not dispached", () => {
		const initSpy = sinon.spy(SubsCard, 'init');
		proclaim.equal(initSpy.called, false);
	});

	describe("should create a new", () => {
		beforeEach(() => {
			fixtures.htmlCode();
		});

		afterEach(() => {
			fixtures.reset();
		});

		it("component array when initialized", () => {
			const card = SubsCard.init();
			proclaim.equal(card instanceof Array, true);
			proclaim.equal(card[0] instanceof SubsCard, true);
		});

		it("single component when initialized with a root element", () => {
			const subsCard = SubsCard.init('.o-subs-card');
			proclaim.equal(subsCard instanceof SubsCard, true);
		});
	});

	describe('multiple components', () => {

		beforeEach(() => {
			fixtures.htmlCodeMulti();
		});

		afterEach(() => {
			fixtures.reset();
		});

		it('will all have matching top height', () => {
			const matchHeightsSpy = sinon.spy(SubsCard, 'matchHeights');

			console.log(matchHeightsSpy);

			SubsCard.init();

			proclaim.equal(matchHeightsSpy.called, true);
		});

	});

});
