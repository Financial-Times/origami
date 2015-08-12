const test = require("tape").test;
const oDate = require('../main');

test('error handling', function (t) {
	t.plan(2);
	t.equal(oDate.format('not a date'), undefined);
	t.equal(oDate.timeAgo('not a date'), undefined);
});

test('formatting dates using standard formats', function (t) {
	const date = new Date(2000, 5, 15, 6, 37, 22, 499);
	const expected = 'June 15, 2000 6:37 am';
	const isoDate = date.toISOString();

	t.plan(5);
	t.equal(oDate.format(date), expected);
	t.equal(oDate.format(isoDate), expected);
	t.equal(oDate.format(date, 'datetime'), expected);
	t.equal(oDate.format(date, 'date'), expected.replace(' 6:37 am', ''));
	// testing padding
	t.equal(oDate.format(new Date(2000, 5, 15, 6, 7), 'datetime'), 'June 15, 2000 6:07 am');
});

test('formatting dates using custom formats', function (t) {
	const date = new Date(2000, 1, 5, 6, 7, 22, 499);

	t.plan(8);

	t.equal(oDate.format(date, 'yyyy yy'), '2000 00');
	t.equal(oDate.format(date, 'MMMM MMM MM M'), 'February Feb 02 2');
	t.equal(oDate.format(date, 'EEEE EEE'), 'Saturday Sat');
	t.equal(oDate.format(date, 'd dd'), '5 05');
	t.equal(oDate.format(date, 'h hh'), '6 06');
	t.equal(oDate.format(date, 'm mm'), '7 07');
	t.equal(oDate.format(date, 'a'), 'am');
	t.equal(oDate.format(date, 'This is \\a co\\mmon string mm'), 'This is a common string 07');
});

test('getting time ago', function (t) {
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
	t.plan(Object.keys(formatsLow).length + Object.keys(formatsHigh).length);

	Object.keys(formatsLow).forEach(function (format) {
		let date = new Date();
		date = date - (formatsLow[format] * 1000);
		t.equal(oDate.timeAgo(date), format);
	});

	Object.keys(formatsHigh).forEach(function (format) {
		let date = new Date();
		date = date - (formatsHigh[format] * 1000);
		t.equal(oDate.timeAgo(date), format);
	});
});


test('getting standard FT timeformat', function (t) {

	const today = new Date(new Date().getTime() - 10000);
	const yesterday = new Date(new Date().getTime() - (1000 * 60 * 60 * 24));
	const dayBeforeYesterday = new Date(new Date().getTime() - (1000 * 60 * 60 * 48));

	t.plan(3);
	t.ok(/ago/.test(oDate.ftTime(today)), 'today\'s dates are relative');
	t.equal(oDate.ftTime(yesterday), 'yesterday');
	t.ok(/^January|February|March|April|May|June|July|August|September|October|November|December/.test(oDate.ftTime(dayBeforeYesterday)), 'older dates are printed in full');
});

test('formatting hours', function (t) {
	t.plan(24);

	let date;

	date = new Date(2000, 1, 5, 0, 7, 22, 499);
	t.equal(oDate.format(date, 'h'), '12');
	t.equal(oDate.format(date, 'hh'), '12');
	t.equal(oDate.format(date, 'H'), '0');
	t.equal(oDate.format(date, 'HH'), '00');

	date = new Date(2000, 1, 5, 1, 7, 22, 499);
	t.equal(oDate.format(date, 'h'), '1');
	t.equal(oDate.format(date, 'hh'), '01');
	t.equal(oDate.format(date, 'H'), '1');
	t.equal(oDate.format(date, 'HH'), '01');

	date = new Date(2000, 1, 5, 10, 7, 22, 499);
	t.equal(oDate.format(date, 'h'), '10');
	t.equal(oDate.format(date, 'hh'), '10');
	t.equal(oDate.format(date, 'H'), '10');
	t.equal(oDate.format(date, 'HH'), '10');

	date = new Date(2000, 1, 5, 12, 7, 22, 499);
	t.equal(oDate.format(date, 'h'), '12');
	t.equal(oDate.format(date, 'hh'), '12');
	t.equal(oDate.format(date, 'H'), '12');
	t.equal(oDate.format(date, 'HH'), '12');

	date = new Date(2000, 1, 5, 13, 7, 22, 499);
	t.equal(oDate.format(date, 'h'), '1');
	t.equal(oDate.format(date, 'hh'), '01');
	t.equal(oDate.format(date, 'H'), '13');
	t.equal(oDate.format(date, 'HH'), '13');

	date = new Date(2000, 1, 5, 23, 7, 22, 499);
	t.equal(oDate.format(date, 'h'), '11');
	t.equal(oDate.format(date, 'hh'), '11');
	t.equal(oDate.format(date, 'H'), '23');
	t.equal(oDate.format(date, 'HH'), '23');

});
