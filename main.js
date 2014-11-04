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

/*
	See http://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html for formatting conventions used
*/
var formatReplacementsMap = {
	MMMM: 'months[date.getMonth()]',
	MMM: 'months[date.getMonth()].substr(0,3)',
	MM: 'pad2(date.getMonth() + 1, 2)',
	M: '(date.getMonth() + 1)',
	yyyy: 'date.getFullYear()',
	yy: '(""+date.getFullYear()).substr(-2, 2)',
	EEEE: 'days[date.getDay()]',
	EEE: 'days[date.getDay()].substr(0,3)',
	d: 'date.getDate()',
	dd: 'pad2(date.getDate(), 2)',
	m: 'date.getMinutes()',
	mm: 'pad2(date.getMinutes(), 2)',
	h: '((date.getHours() === 12 ? 12 : date.getHours() % 12))',
	hh: 'pad2((date.getHours() === 12 ? 12 : date.getHours() % 12), 2)',
	a: '(date.getHours() >= 12 ? "pm" : "am")'
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
	date = toDate(date)
	return date && tpl(date);
}

function update (noExec) {
	noExec || Array.prototype.forEach.call(document.querySelectorAll('[data-o-component="o-date"]'), function (el) {
		ftTime(el);
	});
	timer = setTimeout(update, 60000);
}

function autoUpdate () {
	timer || update(true);
}


function ftTime(el) {
	var date = el.getAttribute('datetime');
	var printer = el.querySelector('.o-date__printer') || el;

	if (date) {
		date = toDate(date);
	} else if (printer.innerHTML.length === 0) {
		// Only define new date if printer is empty
		date = new Date();
	}

	if (!date) return;

	var interval = Math.round(((new Date()) - date) / 1000);
	printer.innerHTML = interval < (365 * 60 * 60 * 24) ? timeAgo(date, interval) : format(date, 'date');
	el.title = format(date, 'datetime');
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
	if (el.getAttribute('data-o-component') === 'o-date') {
		ftTime(el);
		return;
	}
	var dateEls = el.querySelectorAll('[data-o-component~="o-date"]');
	for (var i = 0; i < dateEls.length; i++) {
		ftTime(dateEls[i]);
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
	init: init
};
