/* eslint-env mocha */
import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';

const ODate = require('../main');

describe('o-date DOM', () => {
	let clock;
	let sandbox;
	let mockDateElement;

	beforeEach(() => {
		const fakeNow = new Date();
		const elevenMinutesAgo = new Date(fakeNow);

		elevenMinutesAgo.setMinutes(fakeNow.getMinutes() - 11);
		clock = sinon.useFakeTimers(fakeNow);

		sandbox = document.createElement('div');
		sandbox.innerHTML = `<time data-o-component="o-date" datetime="${elevenMinutesAgo.toISOString()}" class="o-date"></time>`;
		mockDateElement = sandbox.querySelector('[data-o-component="o-date"]');
	});

	afterEach(() => {
		clock.restore();
		sandbox = null;
		mockDateElement = null;
	});


	describe('time-ago-limit-4-hours', () => {
		beforeEach(() => {
			mockDateElement.dataset.odateformat = 'time-ago-limit-4-hours';
			new ODate(mockDateElement);
		});

		it('renders the date in the element', () => {
			proclaim.equal(mockDateElement.innerHTML, '11 minutes ago');
		});
	});

	describe('time-ago-abbreviated', () => {

		beforeEach(() => {
			mockDateElement.dataset.oDateFormat = 'time-ago-abbreviated';
			new ODate(mockDateElement);
		});

		it('renders the date in the element', () => {
			proclaim.equal(mockDateElement.innerHTML, '11m ago');
		});

		it('adds a aria label with a non-abbreviated unit', () => {
			proclaim.equal(mockDateElement.getAttribute('aria-label'), '11 minutes ago');
		});
	});

	describe('time-ago-abbreviated-limit-4-hours', () => {
		beforeEach(() => {
			mockDateElement.dataset.oDateFormat = 'time-ago-abbreviated-limit-4-hours';
			new ODate(mockDateElement);
		});

		it('renders the date in the element', () => {
			proclaim.equal(mockDateElement.innerHTML, '11m ago');
		});

		it('adds a the aria label with a non-abbreviated unit', () => {
			proclaim.equal(mockDateElement.getAttribute('aria-label'), '11 minutes ago');
		});
	});

	describe('today-or-yesterday-or-nothing', () => {
		beforeEach(() => {
			mockDateElement.dataset.oDateFormat = 'today-or-yesterday-or-nothing';
			new ODate(mockDateElement);
		});

		it('renders the date in the element', () => {
			proclaim.equal(mockDateElement.innerHTML, 'today');
		});
	});

	describe('date-only', () => {
		beforeEach(() => {
			mockDateElement.dataset.odateformat = 'date-only';
			new ODate(mockDateElement);
		});

		it('renders the date in the element', () => {
			proclaim.equal(mockDateElement.innerHTML, '11 minutes ago');
		});
	});

	describe('time-ago-no-seconds', () => {
		beforeEach(() => {
			mockDateElement.dataset.odateformat = 'time-ago-no-seconds';
			new ODate(mockDateElement);
		});

		it('renders the date in the element', () => {
			proclaim.equal(mockDateElement.innerHTML, '11 minutes ago');
		});
	});
});
