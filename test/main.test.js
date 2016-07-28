/*global describe,beforeEach,afterEach,it*/

import * as Utils from './../main';
import sinon from 'sinon/pkg/sinon';
import expect from 'expect.js';

describe("getIndex()", function() {

	let clock;

	beforeEach(function() {
		clock = sinon.useFakeTimers();
	});

	afterEach(function() {
		clock.restore();
	});

	it('should throttle callback to every 100ms', function(done) {
		const callback = sinon.spy();
		const throttled = Utils.throttle(callback, 100);

		throttled();
		throttled();

		clock.tick(99);
		expect(callback.callCount).to.be(0);

		clock.tick(1);
		expect(callback.callCount).to.be(1);

		done();
	});

	it('should debounce callback by 100ms', function(done) {
		const callback = sinon.spy();
		const debounced = Utils.debounce(callback, 100);

		debounced();

		clock.tick(99);
		expect(callback.callCount).to.be(0);

		debounced();

		clock.tick(99);
		expect(callback.callCount).to.be(0);

		clock.tick(1);
		expect(callback.callCount).to.be(1);

		done();
	});
});
