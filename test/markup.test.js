/* eslint-env mocha */
import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';

const ODate = require('../main');

describe('o-date markup', () => {
	let clock;

	beforeEach(() => {
		const fakeNow = new Date("Jul 14 2016 00:12:49");
		clock = sinon.useFakeTimers(fakeNow);
	});

	afterEach(() => {
		clock.restore();
	});

	describe('time-ago-abbreviated', () => {
		it('updates the aria label with a non-abbreviated unit', () => {
			const sandbox = document.createElement('div');
			sandbox.innerHTML = '<time data-o-component="o-date" datetime="Jul 14 2016 00:01:49" class="o-date" data-o-date-format="time-ago-abbreviated"></time>';
			const mockDateElement = sandbox.querySelector('[data-o-component="o-date"]');
			new ODate(mockDateElement);

			proclaim.equal(mockDateElement.getAttribute('aria-label'), '11 minutes ago');
			proclaim.equal(mockDateElement.innerHTML, '11m ago');
		});
	});

	describe('time-ago-abbreviated-limit-4-hours', () => {
		it('updates the aria label with a non-abbreviated unit', () => {
			const sandbox = document.createElement('div');
			sandbox.innerHTML = '<time data-o-component="o-date" datetime="Jul 14 2016 00:01:49" class="o-date" data-o-date-format="time-ago-abbreviated-limit-4-hours"></time>';
			const mockDateElement = sandbox.querySelector('[data-o-component="o-date"]');
			new ODate(mockDateElement);

			proclaim.equal(mockDateElement.getAttribute('aria-label'), '11 minutes ago');
			proclaim.equal(mockDateElement.innerHTML, '11m ago');
		});
	});
});
