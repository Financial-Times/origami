/*global describe, it, beforeEach, afterEach*/

const sinon = require('sinon/pkg/sinon');
import proclaim from 'proclaim';
const Drawer = require('./../src/js/drawer');

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
			let originalWindowValue = window.innerWidth;
			window.innerWidth = 401;

			let scope = { offsetWidth: 400 };
			let callback = () => {};


			Drawer.handleCloseEvents(scope, callback).handleMouseleave();

			proclaim.isTrue(windowSpy.called);
			window.innerWidth = originalWindowValue;
		});

		it('does nothing if the drawer is full width', () => {
			let originalWindowValue = window.innerWidth;
			window.innerWidth = 400;

			let scope = { offsetWidth: 401 };
			let callback = () => {};


			Drawer.handleCloseEvents(scope, callback).handleMouseleave();

			proclaim.isFalse(windowSpy.called);
			window.innerWidth = originalWindowValue;
		});
	});
});
