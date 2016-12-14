/*global module*/

const months = '["' + 'January,February,March,April,May,June,July,August,September,October,November,December'.split(',').join('","') + '"]';
const days = '["' + 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday'.split(',').join('","') + '"]';
const formats = {
	datetime: 'MMMM d, yyyy h:mm a',
	date: 'MMMM d, yyyy'
};

const compiledTemplates = {};

/**
 * See http://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html for formatting conventions used
 *
 *Comments indicate the value returned for 3.05 pm on Tuesday 4th February 2014
*/
const formatReplacementsMap = {
	MMMM: 'months[date.getMonth()]',  // e.g. February
	MMM: 'months[date.getMonth()].substr(0,3)', // Feb
	MM: 'pad2(date.getMonth() + 1, 2)', // 02
	M: '(date.getMonth() + 1)', // 2
	yyyy: 'date.getFullYear()', // 2014
	yy: '(""+date.getFullYear()).substr(-2, 2)', // 14
	EEEE: 'days[date.getDay()]', // Tuesday
	EEE: 'days[date.getDay()].substr(0,3)', // Tue
	d: 'date.getDate()', // 4
	dd: 'pad2(date.getDate())', // 04
	m: 'date.getMinutes()', // 5
	mm: 'pad2(date.getMinutes())', // 05
	h: '(((date.getHours() + 11) % 12) + 1)', // 3
	hh: 'pad2(((date.getHours() + 11) % 12) + 1)', // 03
	H: 'date.getHours()', // 15
	HH: 'pad2(date.getHours())', // 15
	a: '(date.getHours() >= 12 ? "pm" : "am")' // pm
};

const inSeconds = {
	minute: 60,
	hour: 60 * 60,
	day: 24 * 60 * 60,
	week: 7 * 24 * 60 * 60,
	month: 60 * 60 * 24 * 30,
	year: 365 * 24 * 60 * 60
};

let interval;

function ODate(rootEl) {
	if (!rootEl) {
		rootEl = document.body;
	} else if (!(rootEl instanceof HTMLElement)) {
		rootEl = document.querySelector(rootEl);
	}

	if (rootEl.getAttribute('data-o-component') === "o-date") {
		this.el = rootEl;
	} else {
		this.el = rootEl.querySelector('[data-o-component~="o-date"]');
	}

	if (this.el !== undefined) {
		document.body.addEventListener('oDate.update', () => {
			this.update();
		});

		this.update();
	}

	if (!interval) {
		interval = setInterval(function() {
			document.body.dispatchEvent(new CustomEvent('oDate.update'));
		}, 60000);
	}
}

ODate.prototype.update = function() {
	let el = this.el;

	let date = el.getAttribute('datetime');
	let format = el.getAttribute('data-o-date-format');

	const printer = el.querySelector('.o-date__printer') || el;
	const hasTextNode = printer.firstChild && printer.firstChild.nodeType === 3;

	if (date) {
		date = ODate.toDate(date);
	} else if (hasTextNode) {
		// Only define new date if printer is empty
		date = new Date();
	}

	if (!date) return;

	let dateString;

	if (format === 'today-or-yesterday-or-nothing') {
		dateString = ODate.asTodayOrYesterdayOrNothing(date);
	} else if (format === 'date-only') {
		dateString = ODate.format(date, 'date');
	} else if (format === 'time-ago-limit-4-hours') {
		dateString = ODate.timeAgo(date, { limit: 4*inSeconds.hour });
	} else if (format === 'time-ago-abbreviated-limit-4-hours') {
		dateString = ODate.timeAgo(date, { abbreviated: true, limit: 4*inSeconds.hour });
	} else if (format === 'time-ago-no-seconds') {
		dateString = ODate.timeAgoNoSeconds(date);
	} else if (format !== null) {
		dateString = ODate.format(date, format);
	} else {
		dateString = ODate.ftTime(date);
	}

	// To avoid triggering a parent live region unnecessarily
	// <https://github.com/Financial-Times/o-date/pull/43>
	if (hasTextNode) {
		printer.firstChild.nodeValue = dateString;
	} else {
		printer.innerHTML = dateString;
	}

	el.title = ODate.format(date, 'datetime');
	el.setAttribute('data-o-date-js', '');
	el.setAttribute('aria-label', dateString);
};

function compile(format) {
	const tpl = formats[format] || format;

	let funcString = 'var months= ' + months + ', days= ' + days + ';';
	funcString +='function pad2 (number) {return ("0" + number).slice(-2)}';
	funcString += 'return "' + tpl.replace(/\\?[a-z]+/ig, function (match) {
		if (match.charAt(0) === '\\') {
			return match.substr(1);
		}
		const replacer = formatReplacementsMap[match];

		return replacer ? '" + ' + replacer + ' + "' : match;
	}) + '"';

	return (compiledTemplates[format] = new Function('date', funcString));  // jshint ignore:line
}

ODate.toDate = function(date) {
	date = date instanceof Date ? date : new Date(date);
	if (date.toString() !== 'Invalid Date') {
		return date;
	}
};

ODate.format = function(date, dateFormat) {
	dateFormat = dateFormat || 'datetime';
	const tpl = compiledTemplates[dateFormat] || compile(dateFormat);
	date = ODate.toDate(date);
	return date && tpl(date);
};

ODate.getSecondsBetween = function(time, otherTime) {
	return Math.round((time - otherTime) / 1000);
};

ODate.ftTime = function(dateObj) {
	const now = new Date();
	const interval = ODate.getSecondsBetween(now, dateObj);
	let dateString;

	// If the date will occur in the next 5 minutes. This check is to allow for
	// reasonably differences in machine clocks.
	if (ODate.isNearFuture(interval)) {
		dateString = 'just now';

	// If it's beyond 5 minutes, fall back to printing the whole date, the machine
	// clock could be way out.
	} else if (ODate.isFarFuture(interval)) {
		dateString = ODate.format(dateObj, 'date');

	// Relative times for today or within the last 4 hours
	} else if (ODate.isToday(dateObj, now, interval) || (interval < (4 * inSeconds.hour))) {
		dateString = ODate.timeAgo(dateObj, interval);

	// 'Yesterday' for dates that occurred yesterday
	} else if (ODate.isYesterday(dateObj, now, interval)) {
		dateString = 'yesterday';

	// Else print the date
	} else {
		dateString = ODate.format(dateObj, 'date');
	}

	return dateString;
};

ODate.isNearFuture = function(interval) {
	// If the interval within the next 5 minutes
	return (interval < 0 && interval > -(5 * inSeconds.minute));
};

ODate.isFarFuture = function(interval) {
	// If the interval is further in the future than 5 minutes
	return interval < -(5 * inSeconds.minute);
};

ODate.isToday = function(date, now, interval) {
	const within24Hours = interval < inSeconds.day;
	const sameDayOfWeek = now.getDay() === date.getDay();
	return (within24Hours && sameDayOfWeek);
};

ODate.isYesterday = function(date, now, interval) {
	const within48Hours = interval < 2 * inSeconds.day;
	const consecutiveDaysOfTheWeek = now.getDay() === date.getDay()+1;
	return (within48Hours && consecutiveDaysOfTheWeek);
};

ODate.timeAgo = function(date, interval, options) {

	date = ODate.toDate(date);
	if (!date) return;

	// Accept an interval argument for backwards compatibility
	if (arguments.length === 2 && typeof interval === 'object') {
		options = interval;
		interval = options.interval;
	}

	// Default the interval option to the time since the given date
	if (!interval) {
		interval = ODate.getSecondsBetween(new Date(), date);
	}

	// If a limit has been supplied and the interval is longer ago than that limit
	if (options && options.limit > 0 && (!interval || interval > options.limit)) {
		return '';
	}

	const abbreviated = options ? options.abbreviated : false;

	if (interval < inSeconds.minute) {
		return `${abbreviated ? interval + 's' : interval + ' seconds'} ago`;
	} else if (interval < (1.5 * inSeconds.minute)) {
		return `${abbreviated ? '1m' : 'a minute'} ago`;
	} else if (interval < (59 * inSeconds.minute) ) {
		return `${Math.round(interval / inSeconds.minute)}${abbreviated ? 'm' : ' minutes'} ago`;
	} else if (interval < (1.5 * inSeconds.hour)) {
		return `${abbreviated ? '1h' : 'an hour'} ago`;
	} else if (interval < 22 * inSeconds.hour) {
		return `${Math.round(interval / inSeconds.hour)}${abbreviated ? 'h' : ' hours'} ago`;
	} else if (interval < (1.5 * inSeconds.day)) {
		return `${abbreviated ? '1d' : 'a day'} ago`;
	} else if (interval < 25 * inSeconds.day) {
		return `${Math.round(interval / inSeconds.day)}${abbreviated ? 'd' : ' days'} ago`;
	} else if (interval < (45 * inSeconds.day)) {
		return `${abbreviated ? '1mth' : 'a month'} ago`;
	} else if (interval < 345 * inSeconds.day) {
		return `${Math.round(interval / inSeconds.month)}${abbreviated ? 'mth' : ' months'} ago`;
	} else if (interval < (547 * inSeconds.day)) {
		return `${abbreviated ? '1y' : 'a year'} ago`;
	} else {
		return `${ Math.max(2, Math.floor(interval / inSeconds.year))}${abbreviated ? 'y' : ' years'} ago`;
	}
};

ODate.asTodayOrYesterdayOrNothing = function(date){

	if (!date) return;

	const now = new Date();
	const interval = ODate.getSecondsBetween(now, date);

	let dateString;

	// If this was less than a day ago
	if (ODate.isToday(date, now, interval)) {
		dateString = 'today';
	} else if (ODate.isYesterday(date, now, interval)) {
		dateString = 'yesterday';
	} else {
		dateString = '';
	}

	return dateString;
};

ODate.timeAgoNoSeconds = function(date){

	if (!date) return;

	const now = new Date();
	const interval = ODate.getSecondsBetween(now, date);

	// If this was less than a minute ago
	if (interval < 60) {
		return 'Less than a minute ago';
	}
	return ODate.timeAgo(date);
};

ODate.init = function(el) {
	if (!el) {
		el = document.body;
	}
	if (!(el instanceof HTMLElement)) {
		el = document.querySelector(el);
	}
	/* If el's data-o-component has \bo-date\b in it, ie it is itself a date,
	 return a new o-date */
	if (/\bo-date\b/.test(el.getAttribute('data-o-component'))) {
		return new ODate(el);
	}

	// If el contains date components, return o-dates
	const dateEls = el.querySelectorAll('[data-o-component~="o-date"]');
	return [].map.call(dateEls, function(el) {
		return new ODate(el);
	});
};

const constructAll = function() {
	ODate.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

if (typeof window !== 'undefined') {
	document.addEventListener('o.DOMContentLoaded', constructAll);
}

module.exports = ODate;
