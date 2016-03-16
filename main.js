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
	const printer = el.querySelector('.o-date__printer') || el;
	const hasTextNode = printer.firstChild && printer.firstChild.nodeType === 3;

	if (date) {
		date = toDate(date);
	} else if (hasTextNode) {
		// Only define new date if printer is empty
		date = new Date();
	}

	if (!date) return;

	// To avoid triggering a parent live region unnecessarily
	// <https://github.com/Financial-Times/o-date/pull/43>
	if (hasTextNode) {
		printer.firstChild.nodeValue = ODate.ftTime(date);
	} else {
		printer.innerHTML = ODate.ftTime(date);
	}

	el.title = ODate.format(date, 'datetime');
	el.setAttribute('data-o-date-js', '');
	el.setAttribute('aria-label', ODate.ftTime(date));
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

function toDate(date) {
	date = date instanceof Date ? date : new Date(date);
	if (date.toString() !== 'Invalid Date') {
		return date;
	}
}

ODate.format = function(date, dateFormat) {
	dateFormat = dateFormat || 'datetime';
	const tpl = compiledTemplates[dateFormat] || compile(dateFormat);
	date = toDate(date);
	return date && tpl(date);
}

ODate.ftTime = function(dateObj) {
	const now = new Date();
	const interval = Math.round((now - dateObj) / 1000);
	let dateString;

	// if date has not yet passed
	if (interval < 0) {
		// if date will occur within the next 5 minutes allow for reasonable difference in machine clocks
		if (interval > -300) {
			dateString = 'just now';
		// if beyond the next 5 minutes fall back to printing the full date - the machine clock could be way out
		} else {
			dateString = ODate.format(dateObj, 'date');
		}
	// Within 24 hours, and if not crossing in to yesterday, show relative time
	} else if (interval < 24 * 60 * 60 && now.getDay() === dateObj.getDay()) {
		dateString = ODate.timeAgo(dateObj, interval);
	// Within 48 hours, if the day is yesterday show 'yesterday'
	} else if (interval < 48 * 60 * 60 && (now.getDay() === dateObj.getDay() + 1)) {
		dateString = 'yesterday';
	// Otherwise print the date
	} else {
		dateString = ODate.format(dateObj, 'date');
	}
	return dateString;
}

ODate.timeAgo = function(date, interval) {

	date = toDate(date);
	if (!date) return;

	interval = interval || Math.round(((new Date()) - date) / 1000);
	if (interval < 45) {
		return interval + ' seconds ago';
	} else if (interval < 90) {
		return 'a minute ago';
	} else if (interval < 45 * 60) {
		return Math.round(interval / 60) + ' minutes ago';
	} else if (interval < 90 * 60) {
		return 'an hour ago';
	} else if (interval < 22 * 60 * 60) {
		return Math.round(interval / (60 * 60)) + ' hours ago';
	} else if (interval < 36 * 60 * 60) {
		return 'a day ago';
	} else if (interval < 25 * 60 * 60 * 24) {
		return Math.round(interval / (60 * 60 * 24)) + ' days ago';
	} else if (interval < 45 * 60 * 60 * 24) {
		return 'a month ago';
	} else if (interval < 345 * 60 * 60 * 24) {
		return Math.round(interval / (60 * 60 * 24 * 30)) + ' months ago';
	} else if (interval < 547 * 60 * 60 * 24) {
		return 'a year ago';
	} else {
		return Math.max(2, Math.round(interval / (60 * 60 * 24 * 365))) + ' years ago';
	}
}

ODate.init = function(el) {
	if (!el) {
		el = document.body;
	}
	if (!(el instanceof HTMLElement)) {
		el = document.querySelector(el);
	}
	if (/\bo-date\b/.test(el.getAttribute('data-o-component'))) {
		return new ODate(el);
	}
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
