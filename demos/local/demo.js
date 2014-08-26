(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('../../main');

var times = document.querySelectorAll('[data-o-component="o-date"]');

var now = new Date();
var today  = new Date();
today.setHours(now.getHours() - 6);
var lastMonth = new Date();
lastMonth.setMonth(now.getMonth() - 6);

times[0].setAttribute('datetime', today.toISOString());
times[1].setAttribute('datetime', lastMonth.toISOString());

document.addEventListener("DOMContentLoaded", function() {
	"use strict";
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});
},{"../../main":2}],2:[function(require,module,exports){
/*global require, module*/
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
	h: '((date.getHours() % 12))',
	hh: 'pad2((date.getHours() % 12), 2)',
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

	return (compiledTemplates[format] = Function('date', funcString));
}

function toDate (date) {
	return date instanceof Date ? date : new Date(date);
}

function format (date, format) {
	format = format || 'datetime';
	var tpl = compiledTemplates[format] || compile(format);
	return tpl(toDate(date));
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
	// Keep date as null if datetime hasn't been defined
	if (date) date = toDate(date);
	var printer = el.querySelector('.o-date__printer') || el;
	// If date hasn't been defined and printer isn't empty, keep the content of the printer
	if (date || (!date && printer.innerHTML.length === 0)) {
		// If date hasn't been defined, and the printer is empty, we'll set the default to be the current date
		if (!date) date = new Date();
		var interval = Math.round(((new Date()) - date) / 1000);
		printer.innerHTML = interval < (365 * 60 * 60 * 24) ? timeAgo(date, interval) : format(date, 'date');
	}
	el.title = format(date, 'datetime');
}

function timeAgo (date, interval) {
	date = toDate(date);
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hbGJlcnRvLmVsaWFzL29yaWdhbWkvb3JpZ2FtaS1idWlsZC10b29scy9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2FsYmVydG8uZWxpYXMvb3JpZ2FtaS9vLWRhdGUvZGVtb3Mvc3JjL2RlbW8uanMiLCIvVXNlcnMvYWxiZXJ0by5lbGlhcy9vcmlnYW1pL28tZGF0ZS9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJyZXF1aXJlKCcuLi8uLi9tYWluJyk7XG5cbnZhciB0aW1lcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW8tY29tcG9uZW50PVwiby1kYXRlXCJdJyk7XG5cbnZhciBub3cgPSBuZXcgRGF0ZSgpO1xudmFyIHRvZGF5ICA9IG5ldyBEYXRlKCk7XG50b2RheS5zZXRIb3Vycyhub3cuZ2V0SG91cnMoKSAtIDYpO1xudmFyIGxhc3RNb250aCA9IG5ldyBEYXRlKCk7XG5sYXN0TW9udGguc2V0TW9udGgobm93LmdldE1vbnRoKCkgLSA2KTtcblxudGltZXNbMF0uc2V0QXR0cmlidXRlKCdkYXRldGltZScsIHRvZGF5LnRvSVNPU3RyaW5nKCkpO1xudGltZXNbMV0uc2V0QXR0cmlidXRlKCdkYXRldGltZScsIGxhc3RNb250aC50b0lTT1N0cmluZygpKTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXHRkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnby5ET01Db250ZW50TG9hZGVkJykpO1xufSk7IiwiLypnbG9iYWwgcmVxdWlyZSwgbW9kdWxlKi9cbid1c2Ugc3RyaWN0JztcblxudmFyIG1vbnRocyA9ICdbXCInICsgJ0phbnVhcnksRmVicnVhcnksTWFyY2gsQXByaWwsTWF5LEp1bmUsSnVseSxBdWd1c3QsU2VwdGVtYmVyLE9jdG9iZXIsTm92ZW1iZXIsRGVjZW1iZXInLnNwbGl0KCcsJykuam9pbignXCIsXCInKSArICdcIl0nO1xudmFyIGRheXMgPSAnW1wiJyArICdTdW5kYXksTW9uZGF5LFR1ZXNkYXksV2VkbmVzZGF5LFRodXJzZGF5LEZyaWRheSxTYXR1cmRheScuc3BsaXQoJywnKS5qb2luKCdcIixcIicpICsgJ1wiXSc7XG52YXIgZm9ybWF0cyA9IHtcblx0ZGF0ZXRpbWU6ICdNTU1NIGQsIHl5eXkgaDptbSBhJyxcblx0ZGF0ZTogJ01NTU0gZCwgeXl5eSdcbn07XG5cbnZhciBjb21waWxlZFRlbXBsYXRlcyA9IHt9O1xudmFyIHRpbWVyO1xuXG4vKlxuXHRTZWUgaHR0cDovL2RvY3Mub3JhY2xlLmNvbS9qYXZhc2UvNy9kb2NzL2FwaS9qYXZhL3RleHQvU2ltcGxlRGF0ZUZvcm1hdC5odG1sIGZvciBmb3JtYXR0aW5nIGNvbnZlbnRpb25zIHVzZWRcbiovXG52YXIgZm9ybWF0UmVwbGFjZW1lbnRzTWFwID0ge1xuXHRNTU1NOiAnbW9udGhzW2RhdGUuZ2V0TW9udGgoKV0nLFxuXHRNTU06ICdtb250aHNbZGF0ZS5nZXRNb250aCgpXS5zdWJzdHIoMCwzKScsXG5cdE1NOiAncGFkMihkYXRlLmdldE1vbnRoKCkgKyAxLCAyKScsXG5cdE06ICcoZGF0ZS5nZXRNb250aCgpICsgMSknLFxuXHR5eXl5OiAnZGF0ZS5nZXRGdWxsWWVhcigpJyxcblx0eXk6ICcoXCJcIitkYXRlLmdldEZ1bGxZZWFyKCkpLnN1YnN0cigtMiwgMiknLFxuXHRFRUVFOiAnZGF5c1tkYXRlLmdldERheSgpXScsXG5cdEVFRTogJ2RheXNbZGF0ZS5nZXREYXkoKV0uc3Vic3RyKDAsMyknLFxuXHRkOiAnZGF0ZS5nZXREYXRlKCknLFxuXHRkZDogJ3BhZDIoZGF0ZS5nZXREYXRlKCksIDIpJyxcblx0bTogJ2RhdGUuZ2V0TWludXRlcygpJyxcblx0bW06ICdwYWQyKGRhdGUuZ2V0TWludXRlcygpLCAyKScsXG5cdGg6ICcoKGRhdGUuZ2V0SG91cnMoKSAlIDEyKSknLFxuXHRoaDogJ3BhZDIoKGRhdGUuZ2V0SG91cnMoKSAlIDEyKSwgMiknLFxuXHRhOiAnKGRhdGUuZ2V0SG91cnMoKSA+PSAxMiA/IFwicG1cIiA6IFwiYW1cIiknXG59O1xuXG5mdW5jdGlvbiBjb21waWxlIChmb3JtYXQpIHtcblx0dmFyIHRwbCA9IGZvcm1hdHNbZm9ybWF0XSB8fCBmb3JtYXQ7XG5cdFxuXHR2YXIgZnVuY1N0cmluZyA9ICd2YXIgbW9udGhzPSAnICsgbW9udGhzICsgJywgZGF5cz0gJyArIGRheXMgKyAnOyc7XG5cdGZ1bmNTdHJpbmcgKz0nZnVuY3Rpb24gcGFkMiAobnVtYmVyKSB7cmV0dXJuIChcIjBcIiArIG51bWJlcikuc2xpY2UoLTIpfSc7XG5cdGZ1bmNTdHJpbmcgKz0gJ3JldHVybiBcIicgKyB0cGwucmVwbGFjZSgvXFxcXD9bYS16XSsvaWcsIGZ1bmN0aW9uIChtYXRjaCkge1xuXHRcdGlmIChtYXRjaC5jaGFyQXQoMCkgPT09ICdcXFxcJykge1xuXHRcdFx0cmV0dXJuIG1hdGNoLnN1YnN0cigxKTtcblx0XHR9XG5cdFx0dmFyIHJlcGxhY2VyID0gZm9ybWF0UmVwbGFjZW1lbnRzTWFwW21hdGNoXTtcblxuXHRcdHJldHVybiByZXBsYWNlciA/ICdcIiArICcgKyByZXBsYWNlciArICcgKyBcIicgOiBtYXRjaDtcblx0fSkgKyAnXCInO1xuXG5cdHJldHVybiAoY29tcGlsZWRUZW1wbGF0ZXNbZm9ybWF0XSA9IEZ1bmN0aW9uKCdkYXRlJywgZnVuY1N0cmluZykpO1xufVxuXG5mdW5jdGlvbiB0b0RhdGUgKGRhdGUpIHtcblx0cmV0dXJuIGRhdGUgaW5zdGFuY2VvZiBEYXRlID8gZGF0ZSA6IG5ldyBEYXRlKGRhdGUpO1xufVxuXG5mdW5jdGlvbiBmb3JtYXQgKGRhdGUsIGZvcm1hdCkge1xuXHRmb3JtYXQgPSBmb3JtYXQgfHwgJ2RhdGV0aW1lJztcblx0dmFyIHRwbCA9IGNvbXBpbGVkVGVtcGxhdGVzW2Zvcm1hdF0gfHwgY29tcGlsZShmb3JtYXQpO1xuXHRyZXR1cm4gdHBsKHRvRGF0ZShkYXRlKSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZSAobm9FeGVjKSB7XG5cdG5vRXhlYyB8fCBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW8tY29tcG9uZW50PVwiby1kYXRlXCJdJyksIGZ1bmN0aW9uIChlbCkge1xuXHRcdGZ0VGltZShlbCk7XG5cdH0pO1xuXHR0aW1lciA9IHNldFRpbWVvdXQodXBkYXRlLCA2MDAwMCk7XG59XG5cbmZ1bmN0aW9uIGF1dG9VcGRhdGUgKCkge1xuXHR0aW1lciB8fCB1cGRhdGUodHJ1ZSk7XG59XG5cblxuZnVuY3Rpb24gZnRUaW1lKGVsKSB7XG5cdHZhciBkYXRlID0gZWwuZ2V0QXR0cmlidXRlKCdkYXRldGltZScpO1xuXHQvLyBLZWVwIGRhdGUgYXMgbnVsbCBpZiBkYXRldGltZSBoYXNuJ3QgYmVlbiBkZWZpbmVkXG5cdGlmIChkYXRlKSBkYXRlID0gdG9EYXRlKGRhdGUpO1xuXHR2YXIgcHJpbnRlciA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5vLWRhdGVfX3ByaW50ZXInKSB8fCBlbDtcblx0Ly8gSWYgZGF0ZSBoYXNuJ3QgYmVlbiBkZWZpbmVkIGFuZCBwcmludGVyIGlzbid0IGVtcHR5LCBrZWVwIHRoZSBjb250ZW50IG9mIHRoZSBwcmludGVyXG5cdGlmIChkYXRlIHx8ICghZGF0ZSAmJiBwcmludGVyLmlubmVySFRNTC5sZW5ndGggPT09IDApKSB7XG5cdFx0Ly8gSWYgZGF0ZSBoYXNuJ3QgYmVlbiBkZWZpbmVkLCBhbmQgdGhlIHByaW50ZXIgaXMgZW1wdHksIHdlJ2xsIHNldCB0aGUgZGVmYXVsdCB0byBiZSB0aGUgY3VycmVudCBkYXRlXG5cdFx0aWYgKCFkYXRlKSBkYXRlID0gbmV3IERhdGUoKTtcblx0XHR2YXIgaW50ZXJ2YWwgPSBNYXRoLnJvdW5kKCgobmV3IERhdGUoKSkgLSBkYXRlKSAvIDEwMDApO1xuXHRcdHByaW50ZXIuaW5uZXJIVE1MID0gaW50ZXJ2YWwgPCAoMzY1ICogNjAgKiA2MCAqIDI0KSA/IHRpbWVBZ28oZGF0ZSwgaW50ZXJ2YWwpIDogZm9ybWF0KGRhdGUsICdkYXRlJyk7XG5cdH1cblx0ZWwudGl0bGUgPSBmb3JtYXQoZGF0ZSwgJ2RhdGV0aW1lJyk7XG59XG5cbmZ1bmN0aW9uIHRpbWVBZ28gKGRhdGUsIGludGVydmFsKSB7XG5cdGRhdGUgPSB0b0RhdGUoZGF0ZSk7XG5cdGludGVydmFsID0gaW50ZXJ2YWwgfHwgTWF0aC5yb3VuZCgoKG5ldyBEYXRlKCkpIC0gZGF0ZSkgLyAxMDAwKTtcblx0aWYgKGludGVydmFsIDwgNDUpIHtcblx0XHRyZXR1cm4gaW50ZXJ2YWwgKyAnIHNlY29uZHMgYWdvJztcblx0fSBlbHNlIGlmIChpbnRlcnZhbCA8IDkwKSB7XG5cdFx0cmV0dXJuICdhIG1pbnV0ZSBhZ28nO1xuXHR9IGVsc2UgaWYgKGludGVydmFsIDwgNDUgKiA2MCkge1xuXHRcdHJldHVybiBNYXRoLnJvdW5kKGludGVydmFsIC8gNjApICsgJyBtaW51dGVzIGFnbyc7XG5cdH0gZWxzZSBpZiAoaW50ZXJ2YWwgPCA5MCAqIDYwKSB7XG5cdFx0cmV0dXJuICdhbiBob3VyIGFnbyc7XG5cdH0gZWxzZSBpZiAoaW50ZXJ2YWwgPCAyMiAqIDYwICogNjApIHtcblx0XHRyZXR1cm4gIE1hdGgucm91bmQoaW50ZXJ2YWwgLyAoNjAgKiA2MCkpICsgJyBob3VycyBhZ28nO1xuXHR9IGVsc2UgaWYgKGludGVydmFsIDwgMzYgKiA2MCAqIDYwKSB7XG5cdFx0cmV0dXJuICdhIGRheSBhZ28nO1xuXHR9IGVsc2UgaWYgKGludGVydmFsIDwgMjUgKiA2MCAqIDYwICogMjQpIHtcblx0XHRyZXR1cm4gTWF0aC5yb3VuZChpbnRlcnZhbCAvICg2MCAqIDYwICogMjQpKSArICcgZGF5cyBhZ28nO1xuXHR9IGVsc2UgaWYgKGludGVydmFsIDwgNDUgKiA2MCAqIDYwICogMjQpIHtcblx0XHRyZXR1cm4gJ2EgbW9udGggYWdvJztcblx0fSBlbHNlIGlmIChpbnRlcnZhbCA8IDM0NSAqIDYwICogNjAgKiAyNCkge1xuXHRcdHJldHVybiBNYXRoLnJvdW5kKGludGVydmFsIC8gKDYwICogNjAgKiAyNCAqIDMwKSkgKyAnIG1vbnRocyBhZ28nO1xuXHR9IGVsc2UgaWYgKGludGVydmFsIDwgNTQ3ICogNjAgKiA2MCAqIDI0KSB7XG5cdFx0cmV0dXJuICdhIHllYXIgYWdvJztcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gTWF0aC5tYXgoMiwgTWF0aC5yb3VuZChpbnRlcnZhbCAvICg2MCAqIDYwICogMjQgKiAzNjUpKSkgKyAnIHllYXJzIGFnbyc7XG5cdH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbihlbCkge1xuXHRpZiAoIWVsKSB7XG5cdFx0ZWwgPSBkb2N1bWVudC5ib2R5O1xuXHR9XG5cdGlmICghKGVsIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG5cdFx0ZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsKTtcblx0fVxuXHR2YXIgZGF0ZUVscyA9IGVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW8tY29tcG9uZW50fj1cIm8tZGF0ZVwiXScpO1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRhdGVFbHMubGVuZ3RoOyBpKyspIHtcblx0XHRmdFRpbWUoZGF0ZUVsc1tpXSk7XG5cdH1cblx0YXV0b1VwZGF0ZSgpO1xufTtcblxudmFyIGNvbnN0cnVjdEFsbCA9IGZ1bmN0aW9uKCkge1xuXHRpbml0KCk7XG5cdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ28uRE9NQ29udGVudExvYWRlZCcsIGNvbnN0cnVjdEFsbCk7XG59O1xuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignby5ET01Db250ZW50TG9hZGVkJywgY29uc3RydWN0QWxsKTtcbn1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0Zm9ybWF0OiBmb3JtYXQsXG5cdHRpbWVBZ286IHRpbWVBZ28sXG5cdGluaXQ6IGluaXRcbn07XG4iXX0=
