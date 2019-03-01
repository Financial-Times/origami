/* eslint-env mocha */
import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';

const ftDateFormat = require('../src/js/ft-date-format');

describe('o-date', () => {

	const inSeconds = {
		second: 1,
		minute: 60,
		hour: 60 * 60,
		day: 24 * 60 * 60,
		week: 7 * 24 * 60 * 60,
		month: 30 * 24 * 60 * 60,
		year: 365 * 24 * 60 * 60,
	};

	describe('toDate', () => {
		it('returns `undefined` if the passed in argument isnt a date', () => {
			proclaim.isUndefined(ftDateFormat.toDate('hello'));
		});

		it('returns a date object if the date passed in is valid', () => {
			const validDates = [
				'03/11/16',
				'2016-07-15T16:18:12+00:00',
				new Date(2000, 5, 15, 6, 37, 22, 499),
			];

			for (let date of validDates) {
				let testDate = ftDateFormat.toDate(date);
				let testDateAsDate = new Date(testDate);

				proclaim.isInstanceOf(testDate, Date); // It should be a Date object
				proclaim.strictEqual(testDateAsDate.getTime(), testDate.getTime()); // It should represent the date passed in
			}
		});
	});

	describe('ftDateFormat.format', () => {
		const someDate = new Date("Mon Jul 18 2016 23:12:11");

		const someTimes = {
			"midnight": new Date("Monday July 18 00:01"),
			"1am":		new Date("Monday July 18 01:00"),
			"10am":	 new Date("Monday July 18 10:00"),
			"midday":	 new Date("Monday July 18 12:00"),
			"1pm":		new Date("Monday July 18 13:00"),
			"11pm":	 new Date("Monday July 18 23:00"),
		};

		it('calls ftDateFormat.toDate() with the date argument passed in', () => {
			try {
				sinon.spy(ftDateFormat, 'toDate');
				ftDateFormat.format(someDate);
				proclaim.isTrue(ftDateFormat.toDate.withArgs(someDate).calledOnce);
			} finally {
				ftDateFormat.toDate.restore();
			}
		});

		it('returns a date if "date" is passed in as a second argument', () => {
			proclaim.strictEqual(ftDateFormat.format(someDate, "date"), 'July 18, 2016');
		});

		it('returns a datetime if "datetime" is passed in as a second argument', () => {
			proclaim.strictEqual(ftDateFormat.format(someDate, "datetime"), 'July 18, 2016 11:12 pm');
		});

		it('doesnt zero pad single digit hours', () => {
			const someDate = new Date("Mon Jul 18 2016 06:12:11");
			proclaim.strictEqual(ftDateFormat.format(someDate, "datetime"), 'July 18, 2016 6:12 am');
		});

		// This is a bit of a cop-out really as what we're testing here is ftDateFormat's
		// compile() and tpl() functions
		it('accepts date formatting functions', () => {
			const date = new Date(2000, 1, 5, 6, 7, 22, 499);

			proclaim.strictEqual(ftDateFormat.format(date, 'yyyy yy'), '2000 00');
			proclaim.strictEqual(ftDateFormat.format(date, 'MMMM MMM MM M'), 'February Feb 02 2');
			proclaim.strictEqual(ftDateFormat.format(date, 'EEEE EEE'), 'Saturday Sat');
			proclaim.strictEqual(ftDateFormat.format(date, 'd dd'), '5 05');
			proclaim.strictEqual(ftDateFormat.format(date, 'h hh'), '6 06');
			proclaim.strictEqual(ftDateFormat.format(date, 'm mm'), '7 07');
			proclaim.strictEqual(ftDateFormat.format(date, 'a'), 'am');
			proclaim.strictEqual(ftDateFormat.format(date, 'This is \\a co\\mmon string mm'), 'This is a common string 07');
		});

		it('returns an unpadded 12hour clock value for `h` format', () => {
			proclaim.strictEqual(ftDateFormat.format(someTimes["midnight"], 'h'), '12');
			proclaim.strictEqual(ftDateFormat.format(someTimes["1am"], 'h'), '1');
			proclaim.strictEqual(ftDateFormat.format(someTimes["10am"], 'h'), '10');
			proclaim.strictEqual(ftDateFormat.format(someTimes["midday"], 'h'), '12');
			proclaim.strictEqual(ftDateFormat.format(someTimes["1pm"], 'h'), '1');
			proclaim.strictEqual(ftDateFormat.format(someTimes["11pm"], 'h'), '11');
		});

		it('returns a padded 12hour clock value for `hh` format', () => {
			proclaim.strictEqual(ftDateFormat.format(someTimes["midnight"], 'hh'), '12');
			proclaim.strictEqual(ftDateFormat.format(someTimes["1am"], 'hh'), '01');
			proclaim.strictEqual(ftDateFormat.format(someTimes["10am"], 'hh'), '10');
			proclaim.strictEqual(ftDateFormat.format(someTimes["midday"], 'hh'), '12');
			proclaim.strictEqual(ftDateFormat.format(someTimes["1pm"], 'hh'), '01');
			proclaim.strictEqual(ftDateFormat.format(someTimes["11pm"], 'hh'), '11');
		});

		it('returns an unpadded 24hour clock value for `H` format', () => {
			proclaim.strictEqual(ftDateFormat.format(someTimes["midnight"], 'H'), '0');
			proclaim.strictEqual(ftDateFormat.format(someTimes["1am"], 'H'), '1');
			proclaim.strictEqual(ftDateFormat.format(someTimes["10am"], 'H'), '10');
			proclaim.strictEqual(ftDateFormat.format(someTimes["midday"], 'H'), '12');
			proclaim.strictEqual(ftDateFormat.format(someTimes["1pm"], 'H'), '13');
			proclaim.strictEqual(ftDateFormat.format(someTimes["11pm"], 'H'), '23');
		});

		it('returns an padded 24hour clock value for `HH` format', () => {
			proclaim.strictEqual(ftDateFormat.format(someTimes["midnight"], 'HH'), '00');
			proclaim.strictEqual(ftDateFormat.format(someTimes["1am"], 'HH'), '01');
			proclaim.strictEqual(ftDateFormat.format(someTimes["10am"], 'HH'), '10');
			proclaim.strictEqual(ftDateFormat.format(someTimes["midday"], 'HH'), '12');
			proclaim.strictEqual(ftDateFormat.format(someTimes["1pm"], 'HH'), '13');
			proclaim.strictEqual(ftDateFormat.format(someTimes["11pm"], 'HH'), '23');
		});
	});

	describe('ftDateFormat.ftTime', () => {

		const someDate = new Date("Jul 13 2016 00:02:00");

		it('returns "just now" if ftDateFormat.isNearFuture returns true', () => {
			try {
				sinon.stub(ftDateFormat, 'isNearFuture').returns(true);
				proclaim.strictEqual(ftDateFormat.ftTime(someDate), 'just now');
			} finally {
				ftDateFormat.isNearFuture.restore();
			}
		});

		it('doesnt return just now if ftDateFormat.isNearFuture returns false', () => {
			try {
				sinon.stub(ftDateFormat, 'isNearFuture').returns(false);
				proclaim.notStrictEqual(ftDateFormat.ftTime(someDate), 'just now');
			} finally {
				ftDateFormat.isNearFuture.restore();
			}
		});

		it('returns a result from ftDateFormat.format if ftDateFormat.isFarFuture returns true', () => {
			try {
				const ftDateFormatFormatReturn = "spy return value";
				sinon.stub(ftDateFormat, 'isNearFuture').returns(false);
				sinon.stub(ftDateFormat, 'isFarFuture').returns(true);
				sinon.stub(ftDateFormat, 'format').returns(ftDateFormatFormatReturn);

				proclaim.strictEqual(ftDateFormat.ftTime(someDate), ftDateFormatFormatReturn);
				proclaim.isTrue(ftDateFormat.format.withArgs(someDate, 'date').calledOnce);
			} finally {
				ftDateFormat.isNearFuture.restore();
				ftDateFormat.isFarFuture.restore();
				ftDateFormat.format.restore();
			}
		});

		it('returns a result from ftDateFormat.timeAgo if ftDateFormat.isToday returns true', () => {
			try {
				const ftDateFormatTimeAgoReturn = "mocked timeAgo date";
				sinon.stub(ftDateFormat, 'isNearFuture').returns(false);
				sinon.stub(ftDateFormat, 'isFarFuture').returns(false);
				sinon.stub(ftDateFormat, 'isToday').returns(true);
				sinon.stub(ftDateFormat, 'timeAgo').returns(ftDateFormatTimeAgoReturn);

				proclaim.strictEqual(ftDateFormat.ftTime(someDate), ftDateFormatTimeAgoReturn);
				const call = ftDateFormat.timeAgo.firstCall;
				proclaim.strictEqual(call.args[0], someDate);
				proclaim.isNumber(call.args[1]);
			} finally {
				ftDateFormat.isNearFuture.restore();
				ftDateFormat.isFarFuture.restore();
				ftDateFormat.isToday.restore();
				ftDateFormat.timeAgo.restore();
			}
		});

		it('returns a result from timeAgo if the publish date is less than 4 hours ago even if that date is also yesterday', ()=>{
			try {
				const ftDateFormatTimeAgoReturn = "mocked timeAgo date";
				sinon.stub(ftDateFormat, 'timeAgo').returns(ftDateFormatTimeAgoReturn);

				const publishDatesInTheLast4Hours = [
					new Date("Jul 13 2016 23:02:49"),
					new Date("Jul 13 2016 22:02:49"),
					new Date("Jul 13 2016 21:02:49"),
					new Date("Jul 13 2016 20:02:50")
				];

				const now = Date.now;
				const fakeNow = new Date("Jul 14 2016 00:02:49");
				sinon.stub(window, 'Date').returns(fakeNow);
				Date.now = now;

				for (let date of publishDatesInTheLast4Hours) {
					proclaim.strictEqual(ftDateFormat.ftTime(date), ftDateFormatTimeAgoReturn);
					proclaim.isTrue(ftDateFormat.timeAgo.withArgs(date).called);
				}
			} finally {
				ftDateFormat.timeAgo.restore();
				window.Date.restore();
			}
		});

		it('doesnt return a result from timeAgo if the publish date is more than 4 hours ago and isToday is false', ()=>{
			try {
				const ftDateFormatTimeAgoReturn = "mocked timeAgo date";
				sinon.stub(ftDateFormat, 'timeAgo').returns(ftDateFormatTimeAgoReturn);
				sinon.stub(ftDateFormat, 'isNearFuture').returns(false);
				sinon.stub(ftDateFormat, 'isFarFuture').returns(false);
				sinon.stub(ftDateFormat, 'isToday').returns(false);

				const publishDatesInTheLast4Hours = [
					new Date("Jul 13 2016 19:02:49"),
					new Date("Jul 13 2016 18:02:49"),
					new Date("Jul 13 2016 17:02:49"),
					new Date("Jul 13 2016 00:02:50")
				];

				const now = Date.now;
				const fakeNow = new Date("Jul 14 2016 00:02:49");
				sinon.stub(window, 'Date').returns(fakeNow);
				Date.now = now;

				for (let date of publishDatesInTheLast4Hours) {
					proclaim.notStrictEqual(ftDateFormat.ftTime(date), ftDateFormatTimeAgoReturn);
					proclaim.isTrue(ftDateFormat.timeAgo.neverCalledWith(date));
				}
			} finally {
				ftDateFormat.timeAgo.restore();
				ftDateFormat.isNearFuture.restore();
				ftDateFormat.isFarFuture.restore();
				ftDateFormat.isToday.restore();
				window.Date.restore();
			}
		});

		it('returns a result from "yesterday" if ftDateFormat.isYesterday returns true', () => {
			try {
				sinon.stub(ftDateFormat, 'isNearFuture').returns(false);
				sinon.stub(ftDateFormat, 'isFarFuture').returns(false);
				sinon.stub(ftDateFormat, 'isToday').returns(false);
				sinon.stub(ftDateFormat, 'isYesterday').returns(true);

				proclaim.strictEqual(ftDateFormat.ftTime(someDate), 'yesterday');
			} finally {
				ftDateFormat.isNearFuture.restore();
				ftDateFormat.isFarFuture.restore();
				ftDateFormat.isToday.restore();
				ftDateFormat.isYesterday.restore();
			}
		});

		it('returns the result of ftDateFormat.format if none of the date matchers return true', () => {
			try {
				sinon.stub(ftDateFormat, 'isNearFuture').returns(false);
				sinon.stub(ftDateFormat, 'isFarFuture').returns(false);
				sinon.stub(ftDateFormat, 'isToday').returns(false);
				sinon.stub(ftDateFormat, 'isYesterday').returns(false);
				sinon.stub(ftDateFormat, 'format').returns('a pretend date string');

				proclaim.strictEqual(ftDateFormat.ftTime(someDate), 'a pretend date string');
			} finally {
				ftDateFormat.isNearFuture.restore();
				ftDateFormat.isFarFuture.restore();
				ftDateFormat.isToday.restore();
				ftDateFormat.isYesterday.restore();
				ftDateFormat.format.restore();
			}
		});
	});

	describe('isNearFuture', () => {
		it('returns true if the interval is less than 5 mins in the future', () => {
			proclaim.isTrue(ftDateFormat.isNearFuture(- inSeconds.minute));
			proclaim.isTrue(ftDateFormat.isNearFuture(- inSeconds.second));
		});
		it('returns false if the interval is more than 5 mins in the future', () => {
			proclaim.isFalse(ftDateFormat.isNearFuture(- 100 * inSeconds.hour));
			proclaim.isFalse(ftDateFormat.isNearFuture(- inSeconds.hour));
			proclaim.isFalse(ftDateFormat.isNearFuture(- 10 * inSeconds.minute));
		});
		it('returns false if the interval in the past', () => {
			proclaim.isFalse(ftDateFormat.isNearFuture(inSeconds.hour));
			proclaim.isFalse(ftDateFormat.isNearFuture(10 * inSeconds.minute));
			proclaim.isFalse(ftDateFormat.isNearFuture(5 * inSeconds.minute));
			proclaim.isFalse(ftDateFormat.isNearFuture(inSeconds.second));
		});
	});

	describe('isFarFuture', () => {
		it('returns true if the interval ismore than 5 mins in the future', () => {
			proclaim.isTrue(ftDateFormat.isFarFuture(- 100 * inSeconds.hour));
			proclaim.isTrue(ftDateFormat.isFarFuture(- inSeconds.hour));
			proclaim.isTrue(ftDateFormat.isFarFuture(- 10 * inSeconds.minute));
		});
		it('returns false if the interval is less than 5 mins in the future', () => {
			proclaim.isFalse(ftDateFormat.isFarFuture(- 5 * inSeconds.minute));
			proclaim.isFalse(ftDateFormat.isFarFuture(- inSeconds.minute));
			proclaim.isFalse(ftDateFormat.isFarFuture(- inSeconds.second));

		});
		it('returns false if the interval in the past', () => {
			proclaim.isFalse(ftDateFormat.isFarFuture(inSeconds.hour));
			proclaim.isFalse(ftDateFormat.isFarFuture(10 * inSeconds.minute));
			proclaim.isFalse(ftDateFormat.isFarFuture(5 * inSeconds.minute));
			proclaim.isFalse(ftDateFormat.isFarFuture(inSeconds.second));
		});
	});

	describe('isToday', () => {
		it('returns true if the dates passed in are the same day', () => {
			const publishDate = new Date("Jul 13 2016 10:02:00");
			const interval = inSeconds.hour;
			const now = new Date(publishDate.getTime() + (interval * 1000));
			proclaim.isTrue(ftDateFormat.isToday(publishDate, now, interval));
		});
		it('returns false if the dates passed in are not same day', () => {
			const publishDate = new Date("Jul 13 2016 10:02:00");
			const interval = inSeconds.day;
			const now = new Date(publishDate.getTime() + (interval * 1000));
			proclaim.isFalse(ftDateFormat.isToday(publishDate, now, interval));
		});
		it('returns false if the dates are both tuesday but more than 24h apart', () => {
			const publishDate = new Date("Jul 13 2016 10:02:00");
			const interval = inSeconds.week;
			const now = new Date(publishDate.getTime() + (interval * 1000));

			// These two dates are the "same day" but a week apart.
			proclaim.strictEqual(publishDate.getDay(), now.getDay());
			proclaim.isFalse(ftDateFormat.isToday(publishDate, now, interval));
		});
	});

	describe('isYesterday', () => {
		it('returns true if the date passed in is yesterday', () => {
			const publishDate = new Date("Jul 13 2016 10:02:00");
			const interval = inSeconds.day;
			const now = new Date(publishDate.getTime() + (interval * 1000));
			proclaim.isTrue(ftDateFormat.isYesterday(publishDate, now, interval));
		});

		it('returns false if the dates passed are the same day', () => {
			const publishDate = new Date("Jul 13 2016 10:02:00");
			const interval = inSeconds.hour;
			const now = new Date(publishDate.getTime() + (interval * 1000));
			proclaim.isFalse(ftDateFormat.isYesterday(publishDate, now, interval));
		});

		it('returns false if the weekdays are 1 apart but more than 24h apart', () => {
			const publishDate = new Date("Jul 13 2016 10:02:00");
			const interval = inSeconds.week + inSeconds.day;
			const now = new Date(publishDate.getTime() + (interval * 1000));

			// These two dates are the "day after eachother (wednesday and thursday)"
			// but a week apart.
			proclaim.strictEqual(publishDate.getDay(), now.getDay() - 1);
			proclaim.isFalse(ftDateFormat.isYesterday(publishDate, now, interval));
		});
	});

	describe('ftDateFormat.timeAgo', () => {
		let OriginalDate;
		let mockDate;

		beforeEach(() => {
			// This is a convoluted way of ensuring that we always get
			// the same date when `Date` is called. We default the input
			// to a fixed point in time, but allow it to be specified –
			// this ensures that `ftDateFormat.toDate` still works.
			OriginalDate = Date;
			mockDate = 'Jul 13 2016 10:02:49';
			Date = sinon.spy(input => { // eslint-disable-line no-global-assign
				input = input || mockDate;
				return new OriginalDate(input);
			});
		});

		afterEach(() => {
			Date = OriginalDate; // eslint-disable-line no-global-assign
		});

		it('accepts a value in seconds and returns a corresponding string', () => {
			const formatsLow = {
				'2 seconds ago': 2 * inSeconds.second,
				'a minute ago': inSeconds.minute,
				'2 minutes ago': 90 * inSeconds.second,
				'an hour ago': inSeconds.hour,
				'2 hours ago': 90 * inSeconds.minute,
				'a day ago': 22 * inSeconds.hour,
				'2 days ago': 36 * inSeconds.hour,
				'a month ago': 25 * inSeconds.day,
				'2 months ago': 45 * inSeconds.day,
				'a year ago': 345 * inSeconds.day,
				'2 years ago': 547 * inSeconds.day
			};
			const formatsHigh = {
				'59 seconds ago': 59 * inSeconds.second,
				'a minute ago': 89 * inSeconds.second,
				'59 minutes ago': 59 * inSeconds.minute - inSeconds.second,
				'an hour ago': 90 * inSeconds.minute - inSeconds.second,
				'22 hours ago': 22 * inSeconds.hour - inSeconds.second,
				'a day ago': 36 * inSeconds.hour - inSeconds.second,
				'25 days ago': 25 * inSeconds.day - inSeconds.second,
				'a month ago': 45 * inSeconds.day - inSeconds.second,
				'11 months ago': 345 * inSeconds.day - inSeconds.second,
				'a year ago': 547 * inSeconds.day - inSeconds.second
			};

			Object.keys(formatsLow).forEach(function (format) {
				let date = new Date();
				date = date - (formatsLow[format] * 1000);
				proclaim.strictEqual(ftDateFormat.timeAgo(date), format);
			});

			Object.keys(formatsHigh).forEach(function (format) {
				let date = new Date();
				date = date - (formatsHigh[format] * 1000);
				proclaim.strictEqual(ftDateFormat.timeAgo(date), format, `HIGH: ${format}`);
			});
			Date = OriginalDate; // eslint-disable-line no-global-assign
		});

		it('returns `undefined` if the param passed in is not a date', () => {
			proclaim.strictEqual(ftDateFormat.timeAgo('not a date'), undefined);
			Date = OriginalDate; // eslint-disable-line no-global-assign
		});

		it('returns the timeAgo up to a limit if a limit value is provided', () => {
			const publishDate = new Date('Jul 13 2016 10:02:49');
			const datesWithinLimit = [
				'Jul 13 2016 11:02:48', // 59 minutes and 59 seconds later
				'Jul 13 2016 10:02:50' // 1 second later
			];

			for (let date of datesWithinLimit) {
				mockDate = date;
				proclaim.notStrictEqual(ftDateFormat.timeAgo(publishDate, {limit: inSeconds.hour}), '');
			}
			Date = OriginalDate; // eslint-disable-line no-global-assign
		});

		it('returns nothing if a limit is provided and the timeAgo is longer than that limit', () => {
			const publishDate = new Date('Jul 13 2016 10:02:49');
			const datesWithinLimit = [
				'Jul 13 2016 11:02:51', // 60 minutes, 2 seconds later
				'Jul 13 2016 23:02:52', // 12 hours, 3 seconds later
				'Jul 14 2016 10:02:49' // the next day
			];

			for (let date of datesWithinLimit) {
				mockDate = date;
				proclaim.strictEqual(ftDateFormat.timeAgo(publishDate, {limit: inSeconds.hour}), '');
			}
			Date = OriginalDate; // eslint-disable-line no-global-assign
		});

		it('accepts an interval option', () => {
			const publishDate = new Date('Jul 13 2016 10:02:49');
			const dates = [
				'Jul 13 2016 11:02:51',
				'Jul 13 2016 23:02:52',
				'Jul 14 2016 10:02:49'
			];

			for (let date of dates) {
				mockDate = date;
				proclaim.strictEqual(ftDateFormat.timeAgo(publishDate, {interval: 5}), '5 seconds ago');
			}
			Date = OriginalDate; // eslint-disable-line no-global-assign
		});

		it('accepts the interval option as a second argument for backwards compatibility', () => {
			const publishDate = new Date('Jul 13 2016 10:02:49');
			const dates = [
				'Jul 13 2016 11:02:51',
				'Jul 13 2016 23:02:52',
				'Jul 14 2016 10:02:49'
			];

			for (let date of dates) {
				mockDate = date;
				proclaim.strictEqual(ftDateFormat.timeAgo(publishDate, 5), '5 seconds ago');
			}
			Date = OriginalDate; // eslint-disable-line no-global-assign
		});

		it('returns abbreviations if the abbreviated option is provided', () => {
			const abbreviations = {
				'2s ago': 2 * inSeconds.second,
				'1m ago': inSeconds.minute,
				'2m ago': 90 * inSeconds.second,
				'1h ago': inSeconds.hour,
				'2h ago': 90 * inSeconds.minute,
				'1d ago': 22 * inSeconds.hour,
				'2d ago': 36 * inSeconds.hour,
				'1mth ago': 25 * inSeconds.day,
				'2mth ago': 45 * inSeconds.day,
				'1y ago': 345 * inSeconds.day,
				'2y ago': 547 * inSeconds.day
			};

			Object.keys(abbreviations).forEach(function (abbreviation) {
				let date = new Date();
				date = date - (abbreviations[abbreviation] * 1000);
				proclaim.strictEqual(ftDateFormat.timeAgo(date, { abbreviated: true }), abbreviation);
			});
			Date = OriginalDate; // eslint-disable-line no-global-assign
		});
	});

	// THIS ONE
	describe('ftDateFormat.asTodayOrYesterdayOrNothing', () => {
		let OriginalDate;
		let mockDate;

		beforeEach(() => {
			// This is a convoluted way of ensuring that we always get
			// the same date when `Date` is called. We default the input
			// to a fixed point in time, but allow it to be specified –
			// this ensures that `ftDateFormat.toDate` still works.
			OriginalDate = Date;
			mockDate = 'Jul 13 2016 10:02:49';
			Date = sinon.spy(input => { // eslint-disable-line no-global-assign
				input = input || mockDate;
				return new OriginalDate(input);
			});
		});

		afterEach(() => {
			Date = OriginalDate; // eslint-disable-line no-global-assign
		});

		it('returns "today" if isToday returns true', () => {
			try {
				sinon.stub(ftDateFormat, 'isToday').returns(true);
				sinon.spy(ftDateFormat, 'isYesterday');

				const mockDate = "some date";
				proclaim.strictEqual(ftDateFormat.asTodayOrYesterdayOrNothing(mockDate), 'today');

				const call = ftDateFormat.isToday.firstCall;
				proclaim.strictEqual(call.args[0], mockDate);
				proclaim.isInstanceOf(call.args[1], OriginalDate);
				proclaim.isNumber(call.args[2]);
				proclaim.isFalse(ftDateFormat.isYesterday.called);
			} finally {
				ftDateFormat.isToday.restore();
				ftDateFormat.isYesterday.restore();
				Date = OriginalDate; // eslint-disable-line no-global-assign
			}
		});

		it('returns "yesterday" if isYesterday returns true AND isToday is false', () => {
			try {
				sinon.stub(ftDateFormat, 'isToday').returns(false);
				sinon.stub(ftDateFormat, 'isYesterday').returns(true);

				const mockDate = "some date";
				proclaim.strictEqual(ftDateFormat.asTodayOrYesterdayOrNothing(mockDate), 'yesterday');

				const todayCall = ftDateFormat.isToday.firstCall;
				proclaim.strictEqual(todayCall.args[0], mockDate);
				proclaim.isInstanceOf(todayCall.args[1], OriginalDate);
				proclaim.isNumber(todayCall.args[2]);

				const yesterdayCall = ftDateFormat.isToday.firstCall;
				proclaim.strictEqual(yesterdayCall.args[0], mockDate);
				proclaim.isInstanceOf(yesterdayCall.args[1], OriginalDate);
				proclaim.isNumber(yesterdayCall.args[2]);
			} finally {
				ftDateFormat.isToday.restore();
				ftDateFormat.isYesterday.restore();
				Date = OriginalDate; // eslint-disable-line no-global-assign
			}
		});

		it("returns '' if isToday and isYesterday are both false", () => {
			try {
				sinon.stub(ftDateFormat, 'isToday').returns(false);
				sinon.stub(ftDateFormat, 'isYesterday').returns(false);

				const mockDate = "some date";
				proclaim.strictEqual(ftDateFormat.asTodayOrYesterdayOrNothing(mockDate), '');

				const todayCall = ftDateFormat.isToday.firstCall;
				proclaim.strictEqual(todayCall.args[0], mockDate);
				proclaim.isInstanceOf(todayCall.args[1], OriginalDate);
				proclaim.isNumber(todayCall.args[2]);

				const yesterdayCall = ftDateFormat.isToday.firstCall;
				proclaim.strictEqual(yesterdayCall.args[0], mockDate);
				proclaim.isInstanceOf(yesterdayCall.args[1], OriginalDate);
				proclaim.isNumber(yesterdayCall.args[2]);
			} finally {
				ftDateFormat.isToday.restore();
				ftDateFormat.isYesterday.restore();
				Date = OriginalDate; // eslint-disable-line no-global-assign
			}
		});
	});

	describe('ftDateFormat.timeAgoNoSeconds', () => {
		it('returns \'Less than a minute ago\' if time was less than a minute ago', () => {
			try {
				let date;
				date = new Date() - (2 * inSeconds.second * 1000); // 1 second ago
				proclaim.strictEqual(ftDateFormat.timeAgoNoSeconds(date), 'Less than a minute ago');

				date = new Date() - (59 * inSeconds.second * 1000); // 59 seconds ago
				proclaim.strictEqual(ftDateFormat.timeAgoNoSeconds(date), 'Less than a minute ago');

				date = new Date() - (60 * inSeconds.second * 1000); // 1 minute ago
				sinon.spy(ftDateFormat, 'timeAgo');
				ftDateFormat.timeAgoNoSeconds(date);
				proclaim.isTrue(ftDateFormat.timeAgo.withArgs(date).calledOnce);
			} finally {
				ftDateFormat.timeAgo.restore();
			}
		});
	});
});
