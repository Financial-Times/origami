/* eslint-env mocha */
import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import * as fixtures from './helpers/fixtures';

import OComments from '../main';

describe("OComments", () => {
	it('is defined', () => {
		proclaim.equal(typeof OComments, 'function');
	});

	it('has a static init method', () => {
		proclaim.equal(typeof OComments.init, 'function');
	});

	it("should autoinitialize", (done) => {
		const initSpy = sinon.spy(OComments, 'init');
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
		setTimeout(function(){
			proclaim.equal(initSpy.called, true);
			initSpy.restore();
			done();
		}, 100);
	});

	it("should not autoinitialize when the event is not dispached", () => {
		const initSpy = sinon.spy(OComments, 'init');
		proclaim.equal(initSpy.called, false);
	});

	describe("new Comments(oCommentsEl, opts)", () => {
		let boilerplate;
		let rootElement;
		let scriptElement;

		beforeEach(() => {
			fixtures.htmlCode();
			boilerplate = OComments.init('#element');
			rootElement = boilerplate.oCommentsEl;
			scriptElement = rootElement.querySelector('script');
		});

		afterEach(() => {
			fixtures.reset();
		});

		describe("._renderComments", () => {
			it("creates a script element", () => {
				proclaim.isNotNull(scriptElement);
			});

			it("sets the source to `embed.js`", () => {
				proclaim.include(scriptElement.src, 'embed.js');
			});

			it("sets an `onload` attribute", () => {
				const onloadAttribute = scriptElement.onload;
				proclaim.isNotNull(onloadAttribute);
				proclaim.isFunction(onloadAttribute);
			});
		});
	});
});
