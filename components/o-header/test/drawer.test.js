/* eslint-env mocha */
/* global proclaim sinon */

import Drawer from '../src/js/drawer.js';

describe('Drawer instance', () => {

	describe('handleMouseleave', () => {
		let windowSpy;

		beforeEach (() => {
			windowSpy = sinon.spy(window, 'setTimeout');
		});

		afterEach(() => {
			windowSpy.restore();
		});

		it('sets a timeout for a callback if the drawer does not take up the full screen', () => {
			const originalWindowValue = window.innerWidth;
			window.innerWidth = 401;

			const scope = { offsetWidth: 400 };
			const callback = () => {};


			Drawer.handleCloseEvents(scope, callback).handleMouseleave();

			proclaim.isTrue(windowSpy.called);
			window.innerWidth = originalWindowValue;
		});

		it('does nothing if the drawer is full width', () => {
			const originalWindowValue = window.innerWidth;
			window.innerWidth = 400;

			const scope = { offsetWidth: 401 };
			const callback = () => {};


			Drawer.handleCloseEvents(scope, callback).handleMouseleave();

			proclaim.isFalse(windowSpy.called);
			window.innerWidth = originalWindowValue;
		});
	});
});
