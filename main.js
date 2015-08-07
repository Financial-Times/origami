/*global module*/
'use strict';

var months = '["' + 'January,February,March,April,May,June,July,August,September,October,November,December'.split(',').join('","') + '"]';
var days = '["' + 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday'.split(',').join('","') + '"]';
var formats = {
	datetime: 'MMMM d, yyyy h:mm a',
	date: 'MMMM d, yyyy'
};

var compiledTemplates = {};
var timer;

/**
 * See http://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html for formatting conventions used
 *
 *Comments indicate the value returned for 3.05 pm on Tuesday 4th February 2014
*/
var formatReplacementsMap = {
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

function compile (format) {
	var tpl = formats[format] || format;

	var funcString = 'var months= ' + months + ', days= ' + days + ';';
	funcString +='function pad2 (number) {return ("0" + number).slice(-2)}';
	funcString += 'return "' + tpl.replace(/\\?[a-z]+/ig, function (match) {
		if (match.charAt(0) === '\\') {
			return match.substr(1);
		}
		var replacer = formatReplacementsMap[match];

		return replacer ? '" + ' + replacer + ' + "' : match;
	}) + '"';

	return (compiledTemplates[format] = new Function('date', funcString));  // jshint ignore:line
}

function toDate (date) {
	date = date instanceof Date ? date : new Date(date);
	if (date.toString() !== 'Invalid Date') {
		return date;
	}
}

function format (date, dateFormat) {
	dateFormat = dateFormat || 'datetime';
	var tpl = compiledTemplates[dateFormat] || compile(dateFormat);
	date = toDate(date);
	return date && tpl(date);
}

function update (noExec) {
	noExec || Array.prototype.forEach.call(document.querySelectorAll('[data-o-component="o-date"]'), function (el) {
		applyFtTimeToEl(el);
	});
	timer = setTimeout(update, 60000);
}

function autoUpdate () {
	timer || update(true);
}

function ftTime(dateObj) {
	var now = new Date();
	var interval = Math.round((now - dateObj) / 1000);
	var dateString;

	// Within 24 hours, and if not crossing in to yesterday, show relative time
	if (interval < 24 * 60 * 60 && now.getDay() === dateObj.getDay()) {
		dateString = timeAgo(dateObj, interval);
	// Within 48 hours, if the day is yesterday show 'yesterday'
	} else if (interval < 48 * 60 * 60 && (now.getDay() === dateObj.getDay() + 1)) {
		dateString = 'yesterday';
	// Otherwise print the date
	} else {
		dateString = format(dateObj, 'date');
	}
	return dateString;
}

function applyFtTimeToEl(el) {
	var date = el.getAttribute('datetime');
	var printer = el.querySelector('.o-date__printer') || el;

	if (date) {
		date = toDate(date);
	} else if (printer.innerHTML.length === 0) {
		// Only define new date if printer is empty
		date = new Date();
	}

	if (!date) return;

	printer.innerHTML = ftTime(date);

	el.title = format(date, 'datetime');
	el.setAttribute('data-o-date-js', '');
}


function timeAgo (date, interval) {

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
		return  Math.round(interval / (60 * 60)) + ' hours ago';
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

var init = function(el) {
	if (!el) {
		el = document.body;
	}
	if (!(el instanceof HTMLElement)) {
		el = document.querySelector(el);
	}
	if (/\bo-date\b/.test(el.getAttribute('data-o-component'))) {
		applyFtTimeToEl(el);
		return;
	}
	var dateEls = el.querySelectorAll('[data-o-component~="o-date"]');
	for (var i = 0; i < dateEls.length; i++) {
		applyFtTimeToEl(dateEls[i]);
	}
	autoUpdate();
};

var constructAll = function() {
	init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

if (typeof window !== 'undefined') {
	document.addEventListener('o.DOMContentLoaded', constructAll);
}

module.exports = {
	format: format,
	timeAgo: timeAgo,
	ftTime: ftTime,
	init: init
};
