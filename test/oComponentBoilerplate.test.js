/* eslint-env mocha, sinon, proclaim */
import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import * as fixtures from './helpers/fixtures';

const ComponentBoilerplate = require('./../main');

describe("ComponentBoilerplate", () => {
	it('is defined', () => {
		proclaim.equal(typeof ComponentBoilerplate, 'function');
	});

	it('has a static init method', () => {
		proclaim.equal(typeof ComponentBoilerplate.init, 'function');
	});

	it("should create a new component when initialized", () => {
		fixtures.htmlCode();
		document.querySelector('[data-o-component="o-component-boilerplate"]');
		const boilerplate = ComponentBoilerplate.init();
		proclaim.equal(boilerplate instanceof ComponentBoilerplate, true);
		fixtures.reset();
	});

	it("should autoinitialize", (done) => {
		const initSpy = sinon.spy(ComponentBoilerplate, 'init');
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
		setTimeout(function(){
			proclaim.equal(initSpy.called, true);
			initSpy.restore();
			done();
		}, 100);
	});

	it("should not autoinitialize when the event is not dispached", () => {
		const initSpy = sinon.spy(ComponentBoilerplate, 'init');
		proclaim.equal(initSpy.called, false);
	});
});
