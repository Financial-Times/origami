/* eslint-env mocha */
/* global proclaim sinon */

import * as fixtures from './helpers/fixtures';
import Toggle from 'o-toggle';

import oFooter from './../main';

describe("oFooter", () => {

	beforeEach(() => {
		fixtures.htmlCode();
	});

	afterEach(() => {
		fixtures.reset();
	});

	describe("init behaviour", () => {

		let destroySpy;
		let setupSpy;

		beforeEach(() => {
			destroySpy = sinon.spy(oFooter.prototype, 'destroy');
			setupSpy = sinon.spy(oFooter.prototype, 'setup');

		});
		afterEach(() => {
			oFooter.prototype.destroy.restore();
			oFooter.prototype.setup.restore();
		});

		describe ("at a narrow screen", () => {

			beforeEach(() => {
				sinon.stub(oFooter, 'shouldCollapse').returns(true);
			});

			afterEach(() => {
				oFooter.shouldCollapse.restore();
			});

			it("does not call ofooter.destroy if shouldCollapse is true", () => {
				oFooter.init();
				proclaim.equal(destroySpy.called, false);
			});

			it("calls ofooter.setup if shouldCollapse returns true", () => {
				oFooter.init();
				proclaim.equal(setupSpy.called, true);
			});
		});

		describe ("at a desktop width screen", () => {
			beforeEach(() => {
				sinon.stub(oFooter, 'shouldCollapse').returns(false);
			});

			afterEach(() => {
				oFooter.shouldCollapse.restore();
			});

			it("does not call ofooter.destroy if shouldCollapse is false", () => {
				proclaim.equal(destroySpy.called, false);
			});

			it("does not call ofooter.setup if shouldCollapse returns false", () => {
				proclaim.equal(setupSpy.called, false);
			});
		});

		describe("setup()", () => {
			it("creates a new toggles for every toggle target on the page", () => {
				const footer = oFooter.init();

				proclaim.equal(typeof footer._toggles, 'undefined');

				footer.setup();

				proclaim.equal(typeof footer._toggles, 'object');
				proclaim.equal(footer._toggles.length, 2);
			});
		});
		describe("destroy()", () => {
			it("calls destroy on things found in _toggles and then sets _toggles to null", () => {
				const footer = oFooter.init();
				const toggle = new Toggle();
				const toggleSpy = sinon.stub(toggle, "destroy").returns(true);

				footer._toggles = [toggle];

				footer.destroy();

				proclaim.equal(toggleSpy.called, true);
				proclaim.equal(footer._toggles, null);

			});
		});

		describe("the shouldCollapse method", () => {
			it("returns true if the breakpoint passed in is in the COLLAPSIBLE_BREAKPOINTS array", () => {
				Array.prototype.forEach.call(oFooter.collapsibleBreakpoints, breakpoint => {
					proclaim.equal(oFooter.shouldCollapse(breakpoint), true);
				});
			});

			it("returns false if the breakpoint passed in is not in the COLLAPSIBLE_BREAKPOINTS array", () => {
				proclaim.equal(oFooter.shouldCollapse('madeUpBreakPoint'), false);
				proclaim.equal(oFooter.shouldCollapse('l'), false);
				proclaim.equal(oFooter.shouldCollapse('xl'), false);
				proclaim.equal(oFooter.shouldCollapse('m'), false);
			});
		});
	});
});
