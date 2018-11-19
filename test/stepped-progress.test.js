
/* eslint-env mocha */

import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import * as fixtures from './helpers/fixtures';

import SteppedProgress from '../main';

describe('SteppedProgress', () => {

	it('is defined', () => {
		proclaim.equal(typeof SteppedProgress, 'function');
	});

	it('has a static init method', () => {
		proclaim.equal(typeof SteppedProgress.init, 'function');
	});

	it('should autoinitialize', (done) => {
		const initSpy = sinon.spy(SteppedProgress, 'init');
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
		setTimeout(function(){
			proclaim.equal(initSpy.called, true);
			initSpy.restore();
			done();
		}, 100);
	});

	it('should not autoinitialize when the event is not dispached', () => {
		const initSpy = sinon.spy(SteppedProgress, 'init');
		proclaim.equal(initSpy.called, false);
	});

	describe('should create a new', () => {

		beforeEach(() => {
			fixtures.htmlCode();
		});

		afterEach(() => {
			fixtures.reset();
		});

		it('component array when initialized', () => {
			const boilerplate = SteppedProgress.init();
			proclaim.equal(boilerplate instanceof Array, true);
			proclaim.equal(boilerplate[0] instanceof SteppedProgress, true);
		});

		it('single component when initialized with a root element', () => {
			const boilerplate = SteppedProgress.init('#element');
			proclaim.equal(boilerplate instanceof SteppedProgress, true);
		});

	});

});
