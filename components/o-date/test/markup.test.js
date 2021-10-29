/* eslint-env mocha */
/* global proclaim, sinon */

import ODate from '../main.js';
import ftDateFormat from '@financial-times/ft-date-format';

describe('o-date DOM', () => {
	let clock;
	let sandbox;
	let mockDateElement;

	describe('11 minutes ago', () => {
		let elevenMinutesAgo;
		let elevenMinutesAgoDateTime;

		beforeEach(() => {
			const fakeNow = new Date();
			elevenMinutesAgo = new Date(fakeNow);

			elevenMinutesAgo.setMinutes(fakeNow.getMinutes() - 11);
			clock = sinon.useFakeTimers(fakeNow);

			elevenMinutesAgoDateTime = ftDateFormat.format(elevenMinutesAgo, 'datetime');

			sandbox = document.createElement('div');
			sandbox.innerHTML = `<time data-o-component="o-date" datetime="${elevenMinutesAgo.toISOString()}" class="o-date"></time>`;
			mockDateElement = sandbox.querySelector('[data-o-component="o-date"]');
		});

		afterEach(() => {
			clock.restore();
			sandbox = null;
			mockDateElement = null;
		});

		describe('multiple prints with multiple formats', () => {
			let elevenMinutesAgoCustomFormat;
			beforeEach(() => {
				const customFormat = 'h:mm';
				elevenMinutesAgoCustomFormat = ftDateFormat.format(elevenMinutesAgo, customFormat);

				mockDateElement.dataset.odateformat = 'date-only';
				mockDateElement.innerHTML = `
					<!-- render date-only here, set on the parent "time" element -->
					<span data-o-date-printer>
					</span>
					<!-- render a custom format here, the absolute time -->
					<span data-o-date-printer data-o-date-format="${customFormat}">
					</span>
				`;
				new ODate(mockDateElement);
			});

			it('renders all dates in the element', () => {
				proclaim.include(mockDateElement.textContent, '11 minutes ago');
				proclaim.include(mockDateElement.textContent, elevenMinutesAgoCustomFormat);
			});

			it('adds a title attribute to all printers containing the full date', () => {
				proclaim.equal(mockDateElement.getAttribute('title'), elevenMinutesAgoDateTime);
			});
		});

		describe('time-ago-limit-4-hours', () => {
			beforeEach(() => {
				mockDateElement.dataset.odateformat = 'time-ago-limit-4-hours';
				new ODate(mockDateElement);
			});

			it('renders the date in the element', () => {
				proclaim.equal(mockDateElement.innerHTML, '11 minutes ago');
			});

			it('adds a title attribute containing the full date', () => {
				proclaim.equal(mockDateElement.getAttribute('title'), elevenMinutesAgoDateTime);
			});
		});

		describe('time-ago-limit-24-hours', () => {
			beforeEach(() => {
				mockDateElement.dataset.odateformat = 'time-ago-limit-24-hours';
				new ODate(mockDateElement);
			});

			it('renders the date in the element', () => {
				proclaim.equal(mockDateElement.innerHTML, '11 minutes ago');
			});

			it('adds a title attribute containing the full date', () => {
				proclaim.equal(mockDateElement.getAttribute('title'), elevenMinutesAgoDateTime);
			});
		});

		describe('time-ago-abbreviated (deprecated)', () => {

			beforeEach(() => {
				mockDateElement.dataset.oDateFormat = 'time-ago-abbreviated';
				new ODate(mockDateElement);
			});

			it('renders the date in the element without abbreviation (abbreviation is deprecated)', () => {
				proclaim.equal(mockDateElement.innerHTML, '11 minutes ago');
			});

			it('adds a title attribute containing the full date', () => {
				proclaim.equal(mockDateElement.getAttribute('title'), elevenMinutesAgoDateTime);
			});
		});

		describe('time-ago-abbreviated-limit-4-hours (deprecated)', () => {
			beforeEach(() => {
				mockDateElement.dataset.oDateFormat = 'time-ago-abbreviated-limit-4-hours';
				new ODate(mockDateElement);
			});

			it('renders the date in the element without abbreviation (abbreviation is deprecated)', () => {
				proclaim.equal(mockDateElement.innerHTML, '11 minutes ago');
			});

			it('adds a title attribute containing the full date', () => {
				proclaim.equal(mockDateElement.getAttribute('title'), elevenMinutesAgoDateTime);
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

			it('adds a title attribute containing the full date', () => {
				proclaim.equal(mockDateElement.getAttribute('title'), elevenMinutesAgoDateTime);
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

			it('adds a title attribute containing the full date', () => {
				proclaim.equal(mockDateElement.getAttribute('title'), elevenMinutesAgoDateTime);
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

			it('adds a title attribute containing the full date', () => {
				proclaim.equal(mockDateElement.getAttribute('title'), elevenMinutesAgoDateTime);
			});
		});
	});

	describe('5 hours ago', () => {
		let fiveHoursAgoDateTime;

		beforeEach(() => {
			const fakeNow = new Date();
			const fiveHoursAgo = new Date(fakeNow);

			fiveHoursAgo.setHours(fakeNow.getHours() - 5);
			clock = sinon.useFakeTimers(fakeNow);

			fiveHoursAgoDateTime = ftDateFormat.format(fiveHoursAgo, 'datetime');

			sandbox = document.createElement('div');
			sandbox.innerHTML = `<time data-o-component="o-date" datetime="${fiveHoursAgo.toISOString()}" class="o-date"></time>`;
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
				proclaim.equal(mockDateElement.innerHTML, '5 hours ago');
			});

			it('adds a title attribute containing the full date', () => {
				proclaim.equal(mockDateElement.getAttribute('title'), fiveHoursAgoDateTime);
			});
		});

		describe('time-ago-limit-24-hours', () => {
			beforeEach(() => {
				mockDateElement.dataset.odateformat = 'time-ago-limit-24-hours';
				new ODate(mockDateElement);
			});

			it('renders the date in the element', () => {
				proclaim.equal(mockDateElement.innerHTML, '5 hours ago');
			});

			it('adds a title attribute containing the full date', () => {
				proclaim.equal(mockDateElement.getAttribute('title'), fiveHoursAgoDateTime);
			});
		});

		describe('time-ago-abbreviated (deprecated)', () => {

			beforeEach(() => {
				mockDateElement.dataset.oDateFormat = 'time-ago-abbreviated';
				new ODate(mockDateElement);
			});

			it('renders the date in the element without abbreviation (abbreviation is deprecated)', () => {
				proclaim.equal(mockDateElement.innerHTML, '5 hours ago');
			});

			it('adds a title attribute containing the full date', () => {
				proclaim.equal(mockDateElement.getAttribute('title'), fiveHoursAgoDateTime);
			});
		});

		describe('time-ago-abbreviated-limit-4-hours (deprecated)', () => {
			beforeEach(() => {
				mockDateElement.dataset.oDateFormat = 'time-ago-abbreviated-limit-4-hours';
				new ODate(mockDateElement);
			});

			it('renders nothing in the element', () => {
				proclaim.equal(mockDateElement.innerHTML, '');
			});

			it('removes the title attribute', () => {
				proclaim.isNull(mockDateElement.getAttribute('title'));
			});

			it('adds an aria-hidden attribute', () => {
				proclaim.equal(mockDateElement.getAttribute('aria-hidden'), 'true');
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

			it('adds a title attribute containing the full date', () => {
				proclaim.equal(mockDateElement.getAttribute('title'), fiveHoursAgoDateTime);
			});
		});

		describe('date-only', () => {
			beforeEach(() => {
				mockDateElement.dataset.odateformat = 'date-only';
				new ODate(mockDateElement);
			});

			it('renders the date in the element', () => {
				proclaim.equal(mockDateElement.innerHTML, '5 hours ago');
			});

			it('adds a title attribute containing the full date', () => {
				proclaim.equal(mockDateElement.getAttribute('title'), fiveHoursAgoDateTime);
			});
		});

	});

});
