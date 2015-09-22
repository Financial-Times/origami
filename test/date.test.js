/*global describe, it*/

const oDate = require('../main');
const expect = require('expect.js');

describe('date', function() {
	it('error handling', function() {
		expect(oDate.format('not a date')).to.be(undefined);
		expect(oDate.timeAgo('not a date')).to.be(undefined);
	});

	it('formatting dates using standard formats', function() {
		const date = new Date(2000, 5, 15, 6, 37, 22, 499);
		const expected = 'June 15, 2000 6:37 am';
		const isoDate = date.toISOString();

		expect(oDate.format(date)).to.be(expected);

		expect(oDate.format(date)).to.be(expected);
		expect(oDate.format(isoDate)).to.be(expected);
		expect(oDate.format(date, 'datetime')).to.be(expected);
		expect(oDate.format(date, 'date')).to.be(expected.replace(' 6:37 am', ''));
		// testing padding
		expect(oDate.format(new Date(2000, 5, 15, 6, 7), 'datetime')).to.be('June 15, 2000 6:07 am');
	});

	it('formatting dates using custom formats', function() {
		const date = new Date(2000, 1, 5, 6, 7, 22, 499);

		expect(oDate.format(date, 'yyyy yy')).to.be('2000 00');
		expect(oDate.format(date, 'MMMM MMM MM M')).to.be('February Feb 02 2');
		expect(oDate.format(date, 'EEEE EEE')).to.be('Saturday Sat');
		expect(oDate.format(date, 'd dd')).to.be('5 05');
		expect(oDate.format(date, 'h hh')).to.be('6 06');
		expect(oDate.format(date, 'm mm')).to.be('7 07');
		expect(oDate.format(date, 'a')).to.be('am');
		expect(oDate.format(date, 'This is \\a co\\mmon string mm')).to.be('This is a common string 07');
	});

	it('getting time ago', function() {
		const formatsLow = {
			'2 seconds ago': 2,
			'a minute ago': 45,
			'2 minutes ago': 90,
			'an hour ago': 45 * 60,
			'2 hours ago': 90 * 60,
			'a day ago': 22 * 60 * 60,
			'2 days ago': 36 * 60 * 60,
			'a month ago': 25 * 60 * 60 * 24,
			'2 months ago': 45 * 60 * 60 * 24,
			'a year ago': 345 * 60 * 60 * 24,
			'2 years ago': 547 * 60 * 60 * 24,
		};
		const formatsHigh = {
			'44 seconds ago': (45) - 1,
			'a minute ago': (90) - 1,
			'45 minutes ago': (45 * 60) - 1,
			'an hour ago': (90 * 60) - 1,
			'22 hours ago': (22 * 60 * 60) - 1,
			'a day ago': (36 * 60 * 60) - 1,
			'25 days ago': (25 * 60 * 60 * 24) - 1,
			'a month ago': (45 * 60 * 60 * 24) - 1,
			'11 months ago': (345 * 60 * 60 * 24) - 1,
			'a year ago': (547 * 60 * 60 * 24) - 1,
		};

		Object.keys(formatsLow).forEach(function (format) {
			let date = new Date();
			date = date - (formatsLow[format] * 1000);
			expect(oDate.timeAgo(date)).to.be(format);
		});

		Object.keys(formatsHigh).forEach(function (format) {
			let date = new Date();
			date = date - (formatsHigh[format] * 1000);
			expect(oDate.timeAgo(date)).to.be(format);
		});
	});


	it('getting standard FT timeformat', function() {
		const today = new Date(new Date().getTime() - 10000);
		const yesterday = new Date(new Date().getTime() - (1000 * 60 * 60 * 24));
		const dayBeforeYesterday = new Date(new Date().getTime() - (1000 * 60 * 60 * 48));

		expect(/ago/.test(oDate.ftTime(today))).to.be.ok('today\'s dates are relative');
		expect(oDate.ftTime(yesterday)).to.be.ok('yesterday');
		expect(/^January|February|March|April|May|June|July|August|September|October|November|December/.test(oDate.ftTime(dayBeforeYesterday))).to.be.ok('older dates are printed in full');
	});

	it('formatting hours', function() {
		let date;

		date = new Date(2000, 1, 5, 0, 7, 22, 499);
		expect(oDate.format(date, 'h')).to.be('12');
		expect(oDate.format(date, 'hh')).to.be('12');
		expect(oDate.format(date, 'H')).to.be('0');
		expect(oDate.format(date, 'HH')).to.be('00');

		date = new Date(2000, 1, 5, 1, 7, 22, 499);
		expect(oDate.format(date, 'h')).to.be('1');
		expect(oDate.format(date, 'hh')).to.be('01');
		expect(oDate.format(date, 'H')).to.be('1');
		expect(oDate.format(date, 'HH')).to.be('01');

		date = new Date(2000, 1, 5, 10, 7, 22, 499);
		expect(oDate.format(date, 'h')).to.be('10');
		expect(oDate.format(date, 'hh')).to.be('10');
		expect(oDate.format(date, 'H')).to.be('10');
		expect(oDate.format(date, 'HH')).to.be('10');

		date = new Date(2000, 1, 5, 12, 7, 22, 499);
		expect(oDate.format(date, 'h')).to.be('12');
		expect(oDate.format(date, 'hh')).to.be('12');
		expect(oDate.format(date, 'H')).to.be('12');
		expect(oDate.format(date, 'HH')).to.be('12');

		date = new Date(2000, 1, 5, 13, 7, 22, 499);
		expect(oDate.format(date, 'h')).to.be('1');
		expect(oDate.format(date, 'hh')).to.be('01');
		expect(oDate.format(date, 'H')).to.be('13');
		expect(oDate.format(date, 'HH')).to.be('13');

		date = new Date(2000, 1, 5, 23, 7, 22, 499);
		expect(oDate.format(date, 'h')).to.be('11');
		expect(oDate.format(date, 'hh')).to.be('11');
		expect(oDate.format(date, 'H')).to.be('23');
		expect(oDate.format(date, 'HH')).to.be('23');

	});
});


