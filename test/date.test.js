/*global describe, it, expect, spyOn*/
/*eslint-env jasmine */
const oDate = require('../main');

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
			expect(oDate.toDate('hello')).toBe(undefined);
		});

		it('returns a date object if the date passed in is valid', () => {
			const validDates = [
				'03/11/16',
				'2016-07-15T16:18:12+00:00',
				new Date(2000, 5, 15, 6, 37, 22, 499),
			];

			for (let date of validDates) {
				let testDate = oDate.toDate(date);
				let testDateAsDate = new Date(testDate);

				expect(testDate instanceof Date).toBe(true); // It should be a Date object
				expect(testDateAsDate.getTime()).toBe(testDate.getTime()); // It should represent the date passed in
			}
		});
	});

	describe('ODate.format', () => {
		const someDate = new Date("Mon Jul 18 2016 23:12:11");

		const someTimes = {
			"midnight": new Date("Monday July 18 00:01"),
			"1am":		new Date("Monday July 18 01:00"),
			"10am":	 new Date("Monday July 18 10:00"),
			"midday":	 new Date("Monday July 18 12:00"),
			"1pm":		new Date("Monday July 18 13:00"),
			"11pm":	 new Date("Monday July 18 23:00"),
		};

		it('calls ODate.toDate() with the date argument passed in', () => {
			spyOn(oDate, 'toDate');
			oDate.format(someDate);
			expect(oDate.toDate).toHaveBeenCalledWith(someDate);
		});

		it('returns a date if "date" is passed in as a second argument', () => {
			expect(oDate.format(someDate, "date")).toBe('July 18, 2016');
		});

		it('returns a datetime if "datetime" is passed in as a second argument', () => {
			expect(oDate.format(someDate, "datetime")).toBe('July 18, 2016 11:12 pm');
		});

		it('doesnt zero pad single digit hours', () => {
			const someDate = new Date("Mon Jul 18 2016 06:12:11");
			expect(oDate.format(someDate, "datetime")).toBe('July 18, 2016 6:12 am');
		});

		// This is a bit of a cop-out really as what we're testing here is oDate's
		// compile() and tpl() functions
		it('accepts date formatting functions', () => {
			const date = new Date(2000, 1, 5, 6, 7, 22, 499);

			expect(oDate.format(date, 'yyyy yy')).toBe('2000 00');
			expect(oDate.format(date, 'MMMM MMM MM M')).toBe('February Feb 02 2');
			expect(oDate.format(date, 'EEEE EEE')).toBe('Saturday Sat');
			expect(oDate.format(date, 'd dd')).toBe('5 05');
			expect(oDate.format(date, 'h hh')).toBe('6 06');
			expect(oDate.format(date, 'm mm')).toBe('7 07');
			expect(oDate.format(date, 'a')).toBe('am');
			expect(oDate.format(date, 'This is \\a co\\mmon string mm')).toBe('This is a common string 07');
		});

		it('returns an unpadded 12hour clock value for `h` format', () => {
			expect(oDate.format(someTimes["midnight"], 'h')).toBe('12');
			expect(oDate.format(someTimes["1am"], 'h')).toBe('1');
			expect(oDate.format(someTimes["10am"], 'h')).toBe('10');
			expect(oDate.format(someTimes["midday"], 'h')).toBe('12');
			expect(oDate.format(someTimes["1pm"], 'h')).toBe('1');
			expect(oDate.format(someTimes["11pm"], 'h')).toBe('11');
		});

		it('returns a padded 12hour clock value for `hh` format', () => {
			expect(oDate.format(someTimes["midnight"], 'hh')).toBe('12');
			expect(oDate.format(someTimes["1am"], 'hh')).toBe('01');
			expect(oDate.format(someTimes["10am"], 'hh')).toBe('10');
			expect(oDate.format(someTimes["midday"], 'hh')).toBe('12');
			expect(oDate.format(someTimes["1pm"], 'hh')).toBe('01');
			expect(oDate.format(someTimes["11pm"], 'hh')).toBe('11');
		});

		it('returns an unpadded 24hour clock value for `H` format', () => {
			expect(oDate.format(someTimes["midnight"], 'H')).toBe('0');
			expect(oDate.format(someTimes["1am"], 'H')).toBe('1');
			expect(oDate.format(someTimes["10am"], 'H')).toBe('10');
			expect(oDate.format(someTimes["midday"], 'H')).toBe('12');
			expect(oDate.format(someTimes["1pm"], 'H')).toBe('13');
			expect(oDate.format(someTimes["11pm"], 'H')).toBe('23');
		});

		it('returns an padded 24hour clock value for `HH` format', () => {
			expect(oDate.format(someTimes["midnight"], 'HH')).toBe('00');
			expect(oDate.format(someTimes["1am"], 'HH')).toBe('01');
			expect(oDate.format(someTimes["10am"], 'HH')).toBe('10');
			expect(oDate.format(someTimes["midday"], 'HH')).toBe('12');
			expect(oDate.format(someTimes["1pm"], 'HH')).toBe('13');
			expect(oDate.format(someTimes["11pm"], 'HH')).toBe('23');
		});
	});

	describe('ODate.ftTime', () => {

		const someDate = new Date("Jul 13 2016 00:02:00");
		beforeEach(() => {
			jasmine.clock().install();
		});

		afterEach(() => {
			jasmine.clock().uninstall();
		});

		it('returns "just now" if ODate.isNearFuture returns true', () => {
			spyOn(oDate, 'isNearFuture').and.returnValue(true);
			expect(oDate.ftTime(someDate)).toEqual('just now');
		});

		it('doesnt return just now if ODate.isNearFuture returns false', () => {
			spyOn(oDate, 'isNearFuture').and.returnValue(false);
			expect(oDate.ftTime(someDate)).not.toEqual('just now');
		});

		it('returns a result from ODate.format if ODate.isFarFuture returns true', () => {
			const oDateFormatReturn = "spy return value";
			spyOn(oDate, 'isNearFuture').and.returnValue(false);
			spyOn(oDate, 'isFarFuture').and.returnValue(true);
			spyOn(oDate, 'format').and.returnValue(oDateFormatReturn);

			expect(oDate.ftTime(someDate)).toBe(oDateFormatReturn);
			expect(oDate.format).toHaveBeenCalledWith(someDate, 'date');
		});

		it('returns a result from ODate.timeAgo if ODate.isToday returns true', () => {
			const oDateTimeAgoReturn = "mocked timeAgo date";
			spyOn(oDate, 'isNearFuture').and.returnValue(false);
			spyOn(oDate, 'isFarFuture').and.returnValue(false);
			spyOn(oDate, 'isToday').and.returnValue(true);

			spyOn(oDate, 'timeAgo').and.returnValue(oDateTimeAgoReturn);

			expect(oDate.ftTime(someDate)).toBe(oDateTimeAgoReturn);
			expect(oDate.timeAgo).toHaveBeenCalledWith(someDate, jasmine.any(Object));
		});

		it('returns a result from timeAgo if the publish date is less than 4 hours ago even if that date is also yesterday', ()=>{
			const oDateTimeAgoReturn = "mocked timeAgo date";
			spyOn(oDate, 'timeAgo').and.returnValue(oDateTimeAgoReturn);

			const publishDatesInTheLast4Hours = [
				new Date("Jul 13 2016 23:02:49"),
				new Date("Jul 13 2016 22:02:49"),
				new Date("Jul 13 2016 21:02:49"),
				new Date("Jul 13 2016 20:02:50")
			];

			const fakeNow = new Date("Jul 14 2016 00:02:49");
			jasmine.clock().mockDate(fakeNow);
			for (let date of publishDatesInTheLast4Hours) {
				expect(oDate.ftTime(date)).toBe(oDateTimeAgoReturn);
				expect(oDate.timeAgo).toHaveBeenCalledWith(date, jasmine.any(Object));
			}
		});

		it('doesnt return a result from timeAgo if the publish date is more than 4 hours ago and isToday is false', ()=>{
			const oDateTimeAgoReturn = "mocked timeAgo date";
			spyOn(oDate, 'timeAgo').and.returnValue(oDateTimeAgoReturn);

			spyOn(oDate, 'isNearFuture').and.returnValue(false);
			spyOn(oDate, 'isFarFuture').and.returnValue(false);
			spyOn(oDate, 'isToday').and.returnValue(false);

			const publishDatesInTheLast4Hours = [
				new Date("Jul 13 2016 19:02:49"),
				new Date("Jul 13 2016 18:02:49"),
				new Date("Jul 13 2016 17:02:49"),
				new Date("Jul 13 2016 00:02:50")
			];

			const fakeNow = new Date("Jul 14 2016 00:02:49");
			jasmine.clock().mockDate(fakeNow);
			for (let date of publishDatesInTheLast4Hours) {
				expect(oDate.ftTime(date)).not.toBe(oDateTimeAgoReturn);
				expect(oDate.timeAgo).not.toHaveBeenCalledWith(date, jasmine.any(Object));
			}
		});

		it('returns a result from "yesterday" if ODate.isYesterday returns true', () => {
			spyOn(oDate, 'isNearFuture').and.returnValue(false);
			spyOn(oDate, 'isFarFuture').and.returnValue(false);
			spyOn(oDate, 'isToday').and.returnValue(false);
			spyOn(oDate, 'isYesterday').and.returnValue(true);

			expect(oDate.ftTime(someDate)).toBe('yesterday');
		});

		it('returns the result of ODate.format if none of the date matchers return true', () => {
			spyOn(oDate, 'isNearFuture').and.returnValue(false);
			spyOn(oDate, 'isFarFuture').and.returnValue(false);
			spyOn(oDate, 'isToday').and.returnValue(false);
			spyOn(oDate, 'isYesterday').and.returnValue(false);
			spyOn(oDate, 'format').and.returnValue('a pretend date string');

			expect(oDate.ftTime(someDate)).toBe('a pretend date string');
		});
	});

	describe('isNearFuture', () => {
		it('returns true if the interval is less than 5 mins in the future', () => {
			expect(oDate.isNearFuture(- inSeconds.minute)).toEqual(true);
			expect(oDate.isNearFuture(- inSeconds.second)).toEqual(true);
		});
		it('returns false if the interval is more than 5 mins in the future', () => {
			expect(oDate.isNearFuture(- 100 * inSeconds.hour)).toEqual(false);
			expect(oDate.isNearFuture(- inSeconds.hour)).toEqual(false);
			expect(oDate.isNearFuture(- 10 * inSeconds.minute)).toEqual(false);

		});
		it('returns false if the interval in the past', () => {
			expect(oDate.isNearFuture(inSeconds.hour)).toEqual(false);
			expect(oDate.isNearFuture(10 * inSeconds.minute)).toEqual(false);
			expect(oDate.isNearFuture(5 * inSeconds.minute)).toEqual(false);
			expect(oDate.isNearFuture(inSeconds.second)).toEqual(false);
		});
	});

	describe('isFarFuture', () => {
		it('returns true if the interval ismore than 5 mins in the future', () => {
			expect(oDate.isFarFuture(- 100 * inSeconds.hour)).toEqual(true);
			expect(oDate.isFarFuture(- inSeconds.hour)).toEqual(true);
			expect(oDate.isFarFuture(- 10 * inSeconds.minute)).toEqual(true);
		});
		it('returns false if the interval is less than 5 mins in the future', () => {
			expect(oDate.isFarFuture(- 5 * inSeconds.minute)).toEqual(false);
			expect(oDate.isFarFuture(- inSeconds.minute)).toEqual(false);
			expect(oDate.isFarFuture(- inSeconds.second)).toEqual(false);

		});
		it('returns false if the interval in the past', () => {
			expect(oDate.isFarFuture(inSeconds.hour)).toEqual(false);
			expect(oDate.isFarFuture(10 * inSeconds.minute)).toEqual(false);
			expect(oDate.isFarFuture(5 * inSeconds.minute)).toEqual(false);
			expect(oDate.isFarFuture(inSeconds.second)).toEqual(false);
		});
	});

	describe('isToday', () => {
		it('returns true if the dates passed in are the same day', () => {
			const publishDate = new Date("Jul 13 2016 10:02:00");
			const interval = inSeconds.hour;
			const now = new Date(publishDate.getTime() + (interval*1000));
			expect(oDate.isToday(publishDate, now, interval)).toEqual(true);
		});
		it('returns false if the dates passed in are not same day', () => {
			const publishDate = new Date("Jul 13 2016 10:02:00");
			const interval = inSeconds.day;
			const now = new Date(publishDate.getTime() + (interval*1000));
			expect(oDate.isToday(publishDate, now, interval)).toEqual(false);
		});
		it('returns false if the dates are both tuesday but more than 24h apart', () => {
			const publishDate = new Date("Jul 13 2016 10:02:00");
			const interval = inSeconds.week;
			const now = new Date(publishDate.getTime() + (interval*1000));

			// These two dates are the "same day" but a week apart.
			expect(publishDate.getDay()).toEqual(now.getDay());
			expect(oDate.isToday(publishDate, now, interval)).toEqual(false);
		});
	});

	describe('isYesterday', () => {
		it('returns true if the date passed in is yesterday', () => {
			const publishDate = new Date("Jul 13 2016 10:02:00");
			const interval = inSeconds.day;
			const now = new Date(publishDate.getTime() + (interval*1000));
			expect(oDate.isYesterday(publishDate, now, interval)).toEqual(true);
		});

		it('returns false if the dates passed are the same day', () => {
			const publishDate = new Date("Jul 13 2016 10:02:00");
			const interval = inSeconds.hour;
			const now = new Date(publishDate.getTime() + (interval*1000));
			expect(oDate.isYesterday(publishDate, now, interval)).toEqual(false);
		});

		it('returns false if the weekdays are 1 apart but more than 24h apart', () => {
			const publishDate = new Date("Jul 13 2016 10:02:00");
			const interval = inSeconds.week + inSeconds.day;
			const now = new Date(publishDate.getTime() + (interval*1000));

			// These two dates are the "day after eachother (wednesday and thursday)"
			// but a week apart.
			expect(publishDate.getDay()).toEqual(now.getDay()-1);
			expect(oDate.isYesterday(publishDate, now, interval)).toEqual(false);
		});
	});

	describe('ODate.timeAgo', () => {
		beforeEach(() => {
			// Since these tests use now(), stub the time so that it's not possible
			// for these tests to pass at some times of day but fail at others.
			const fakeNow = new Date("Jul 13 2016 10:02:49");
			jasmine.clock().install();
			jasmine.clock().mockDate(fakeNow);
		});

		afterEach(() => {
			jasmine.clock().uninstall();
		});

		it('accepts a value in seconds and returns a corresponding string', () => {
			const formatsLow = {
				'2 seconds ago': 2 * inSeconds.second,
				'a minute ago':	inSeconds.minute,
				'2 minutes ago': 90 * inSeconds.second,
				'an hour ago':	 inSeconds.hour,
				'2 hours ago':	 90 * inSeconds.minute,
				'a day ago':		 22 * inSeconds.hour,
				'2 days ago':		36 * inSeconds.hour,
				'a month ago':	 25 * inSeconds.day,
				'2 months ago':	45 * inSeconds.day,
				'a year ago':	 345 * inSeconds.day,
				'2 years ago':	547 * inSeconds.day,
			};
			const formatsHigh = {
				'59 seconds ago': 59 * inSeconds.second,
				'a minute ago':	 89 * inSeconds.second,
				'59 minutes ago': 59 * inSeconds.minute - inSeconds.second,
				'an hour ago':		90 * inSeconds.minute - inSeconds.second,
				'22 hours ago':	 22 * inSeconds.hour - inSeconds.second,
				'a day ago':			36 * inSeconds.hour - inSeconds.second,
				'25 days ago':		25 * inSeconds.day - inSeconds.second,
				'a month ago':		45 * inSeconds.day - inSeconds.second,
				'11 months ago':	345 * inSeconds.day - inSeconds.second,
				'a year ago':		 547 * inSeconds.day - inSeconds.second,
			};

			Object.keys(formatsLow).forEach(function (format) {
				let date = new Date();
				date = date - (formatsLow[format] * 1000);
				expect(oDate.timeAgo(date)).toBe(format);
			});

			Object.keys(formatsHigh).forEach(function (format) {
				let date = new Date();
				date = date - (formatsHigh[format] * 1000);
				expect(oDate.timeAgo(date)).toBe(format);
			});
		});

		it('returns `undefined` if the param passed in is not a date', () => {
			expect(oDate.timeAgo('not a date')).toBe(undefined);
		});
	});

	describe('ODate.asTodayOrYesterdayOrNothing', () => {
		beforeEach(() => {
			// Since these tests use now(), stub the time so that it's not possible
			// for these tests to pass at some times of day but fail at others.
			const fakeNow = new Date("Jul 13 2016 10:02:49");
			jasmine.clock().install();
			jasmine.clock().mockDate(fakeNow);
		});

		afterEach(() => {
			jasmine.clock().uninstall();
		});

		it('returns "today" if isToday returns true', () => {
			spyOn(oDate, 'isToday').and.returnValue(true);
			spyOn(oDate, 'isYesterday');

			const mockDate = "some date";
			expect(oDate.asTodayOrYesterdayOrNothing(mockDate)).toBe('today');

			expect(oDate.isToday).toHaveBeenCalledWith(mockDate, jasmine.any(Date), jasmine.any(Number));
			expect(oDate.isYesterday).not.toHaveBeenCalled();

		});

		it('returns "yesterday" if isYesterday returns true AND isToday is false', () => {
			 spyOn(oDate, 'isToday').and.returnValue(false);
			 spyOn(oDate, 'isYesterday').and.returnValue(true);

			 const mockDate = "some date";
			 expect(oDate.asTodayOrYesterdayOrNothing(mockDate)).toBe('yesterday');

			 expect(oDate.isToday).toHaveBeenCalledWith(mockDate, jasmine.any(Date), jasmine.any(Number));
			 expect(oDate.isYesterday).toHaveBeenCalledWith(mockDate, jasmine.any(Date), jasmine.any(Number));
		});

		it("returns '' if isToday and isYesterday are both false", () => {
			spyOn(oDate, 'isToday').and.returnValue(false);
			spyOn(oDate, 'isYesterday').and.returnValue(false);

			const mockDate = "some date";
			expect(oDate.asTodayOrYesterdayOrNothing(mockDate)).toBe('');

			expect(oDate.isToday).toHaveBeenCalledWith(mockDate, jasmine.any(Date), jasmine.any(Number));
			expect(oDate.isYesterday).toHaveBeenCalledWith(mockDate, jasmine.any(Date), jasmine.any(Number));

		});
	});
});
