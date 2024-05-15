/* eslint-env mocha */

import * as fixtures from './helpers/fixtures.js';
// import { fireEvent, createEvent } from '@testing-library/dom';
import {assert} from '@open-wc/testing';
import sinon from 'sinon/pkg/sinon-esm.js';
import Tabs from '../main.js';

describe("Tabs", () => {
	it('is defined', () => {
		assert.isFunction(Tabs);
	});

	it('has a static init method', () => {
		assert.isFunction(Tabs.init);
	});

	// it("should autoinitialize", (done) => {
	// 	let initSpy;
	// 	try {
	// 		initSpy = sinon.spy(Tabs, 'init');
	// 		fireEvent(document, createEvent('o.DOMContentLoaded', document));
	// 		setTimeout(function() {
	// 			try {
	// 				assert.isTrue(initSpy.called);
	// 				done();
	// 			} catch(error) {
	// 				done(error);
	// 			}
	// 		}, 100);
	// 	} finally {
	// 		initSpy.restore();
	// 	}
	// });

	it("should not autoinitialize when the event is not dispached", () => {
		let initSpy;
		try {
			initSpy = sinon.spy(Tabs, 'init');
			assert.isFalse(initSpy.called);
		} finally {
			initSpy.restore();
		}
	});

	describe("should create a new", () => {
		beforeEach(() => {
			fixtures.insertSimple();
		});

		afterEach(() => {
			fixtures.reset();
		});

		it("component array when initialized", () => {
			const tab = Tabs.init();
			assert.instanceOf(tab, Array);
			assert.instanceOf(tab[0], Tabs);
		});

		it("single component when initialized with a root element", () => {
			const tab = Tabs.init('#tab-element');
			assert.instanceOf(tab, Tabs);
		});
	});
});
