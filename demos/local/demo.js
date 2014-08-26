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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hbGJlcnRvLmVsaWFzL29yaWdhbWkvb3JpZ2FtaS1idWlsZC10b29scy9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2FsYmVydG8uZWxpYXMvb3JpZ2FtaS9vLWRhdGUvZGVtb3Mvc3JjL2RlbW8uanMiLCIvVXNlcnMvYWxiZXJ0by5lbGlhcy9vcmlnYW1pL28tZGF0ZS9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJyZXF1aXJlKCcuLi8uLi9tYWluJyk7XG5cbnZhciB0aW1lcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW8tY29tcG9uZW50PVwiby1kYXRlXCJdJyk7XG5cbnZhciBub3cgPSBuZXcgRGF0ZSgpO1xudmFyIHRvZGF5ICA9IG5ldyBEYXRlKCk7XG50b2RheS5zZXRIb3Vycyhub3cuZ2V0SG91cnMoKSAtIDYpO1xudmFyIGxhc3RNb250aCA9IG5ldyBEYXRlKCk7XG5sYXN0TW9udGguc2V0TW9udGgobm93LmdldE1vbnRoKCkgLSA2KTtcblxudGltZXNbMF0uc2V0QXR0cmlidXRlKCdkYXRldGltZScsIHRvZGF5LnRvSVNPU3RyaW5nKCkpO1xudGltZXNbMV0uc2V0QXR0cmlidXRlKCdkYXRldGltZScsIGxhc3RNb250aC50b0lTT1N0cmluZygpKTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ28uRE9NQ29udGVudExvYWRlZCcpKTtcbn0pOyIsIi8qZ2xvYmFsIHJlcXVpcmUsIG1vZHVsZSovXG4ndXNlIHN0cmljdCc7XG5cbnZhciBtb250aHMgPSAnW1wiJyArICdKYW51YXJ5LEZlYnJ1YXJ5LE1hcmNoLEFwcmlsLE1heSxKdW5lLEp1bHksQXVndXN0LFNlcHRlbWJlcixPY3RvYmVyLE5vdmVtYmVyLERlY2VtYmVyJy5zcGxpdCgnLCcpLmpvaW4oJ1wiLFwiJykgKyAnXCJdJztcbnZhciBkYXlzID0gJ1tcIicgKyAnU3VuZGF5LE1vbmRheSxUdWVzZGF5LFdlZG5lc2RheSxUaHVyc2RheSxGcmlkYXksU2F0dXJkYXknLnNwbGl0KCcsJykuam9pbignXCIsXCInKSArICdcIl0nO1xudmFyIGZvcm1hdHMgPSB7XG5cdGRhdGV0aW1lOiAnTU1NTSBkLCB5eXl5IGg6bW0gYScsXG5cdGRhdGU6ICdNTU1NIGQsIHl5eXknXG59O1xuXG52YXIgY29tcGlsZWRUZW1wbGF0ZXMgPSB7fTtcbnZhciB0aW1lcjtcblxuLypcblx0U2VlIGh0dHA6Ly9kb2NzLm9yYWNsZS5jb20vamF2YXNlLzcvZG9jcy9hcGkvamF2YS90ZXh0L1NpbXBsZURhdGVGb3JtYXQuaHRtbCBmb3IgZm9ybWF0dGluZyBjb252ZW50aW9ucyB1c2VkXG4qL1xudmFyIGZvcm1hdFJlcGxhY2VtZW50c01hcCA9IHtcblx0TU1NTTogJ21vbnRoc1tkYXRlLmdldE1vbnRoKCldJyxcblx0TU1NOiAnbW9udGhzW2RhdGUuZ2V0TW9udGgoKV0uc3Vic3RyKDAsMyknLFxuXHRNTTogJ3BhZDIoZGF0ZS5nZXRNb250aCgpICsgMSwgMiknLFxuXHRNOiAnKGRhdGUuZ2V0TW9udGgoKSArIDEpJyxcblx0eXl5eTogJ2RhdGUuZ2V0RnVsbFllYXIoKScsXG5cdHl5OiAnKFwiXCIrZGF0ZS5nZXRGdWxsWWVhcigpKS5zdWJzdHIoLTIsIDIpJyxcblx0RUVFRTogJ2RheXNbZGF0ZS5nZXREYXkoKV0nLFxuXHRFRUU6ICdkYXlzW2RhdGUuZ2V0RGF5KCldLnN1YnN0cigwLDMpJyxcblx0ZDogJ2RhdGUuZ2V0RGF0ZSgpJyxcblx0ZGQ6ICdwYWQyKGRhdGUuZ2V0RGF0ZSgpLCAyKScsXG5cdG06ICdkYXRlLmdldE1pbnV0ZXMoKScsXG5cdG1tOiAncGFkMihkYXRlLmdldE1pbnV0ZXMoKSwgMiknLFxuXHRoOiAnKChkYXRlLmdldEhvdXJzKCkgJSAxMikpJyxcblx0aGg6ICdwYWQyKChkYXRlLmdldEhvdXJzKCkgJSAxMiksIDIpJyxcblx0YTogJyhkYXRlLmdldEhvdXJzKCkgPj0gMTIgPyBcInBtXCIgOiBcImFtXCIpJ1xufTtcblxuZnVuY3Rpb24gY29tcGlsZSAoZm9ybWF0KSB7XG5cdHZhciB0cGwgPSBmb3JtYXRzW2Zvcm1hdF0gfHwgZm9ybWF0O1xuXHRcblx0dmFyIGZ1bmNTdHJpbmcgPSAndmFyIG1vbnRocz0gJyArIG1vbnRocyArICcsIGRheXM9ICcgKyBkYXlzICsgJzsnO1xuXHRmdW5jU3RyaW5nICs9J2Z1bmN0aW9uIHBhZDIgKG51bWJlcikge3JldHVybiAoXCIwXCIgKyBudW1iZXIpLnNsaWNlKC0yKX0nO1xuXHRmdW5jU3RyaW5nICs9ICdyZXR1cm4gXCInICsgdHBsLnJlcGxhY2UoL1xcXFw/W2Etel0rL2lnLCBmdW5jdGlvbiAobWF0Y2gpIHtcblx0XHRpZiAobWF0Y2guY2hhckF0KDApID09PSAnXFxcXCcpIHtcblx0XHRcdHJldHVybiBtYXRjaC5zdWJzdHIoMSk7XG5cdFx0fVxuXHRcdHZhciByZXBsYWNlciA9IGZvcm1hdFJlcGxhY2VtZW50c01hcFttYXRjaF07XG5cblx0XHRyZXR1cm4gcmVwbGFjZXIgPyAnXCIgKyAnICsgcmVwbGFjZXIgKyAnICsgXCInIDogbWF0Y2g7XG5cdH0pICsgJ1wiJztcblxuXHRyZXR1cm4gKGNvbXBpbGVkVGVtcGxhdGVzW2Zvcm1hdF0gPSBGdW5jdGlvbignZGF0ZScsIGZ1bmNTdHJpbmcpKTtcbn1cblxuZnVuY3Rpb24gdG9EYXRlIChkYXRlKSB7XG5cdHJldHVybiBkYXRlIGluc3RhbmNlb2YgRGF0ZSA/IGRhdGUgOiBuZXcgRGF0ZShkYXRlKTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0IChkYXRlLCBmb3JtYXQpIHtcblx0Zm9ybWF0ID0gZm9ybWF0IHx8ICdkYXRldGltZSc7XG5cdHZhciB0cGwgPSBjb21waWxlZFRlbXBsYXRlc1tmb3JtYXRdIHx8IGNvbXBpbGUoZm9ybWF0KTtcblx0cmV0dXJuIHRwbCh0b0RhdGUoZGF0ZSkpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGUgKG5vRXhlYykge1xuXHRub0V4ZWMgfHwgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1vLWNvbXBvbmVudD1cIm8tZGF0ZVwiXScpLCBmdW5jdGlvbiAoZWwpIHtcblx0XHRmdFRpbWUoZWwpO1xuXHR9KTtcblx0dGltZXIgPSBzZXRUaW1lb3V0KHVwZGF0ZSwgNjAwMDApO1xufVxuXG5mdW5jdGlvbiBhdXRvVXBkYXRlICgpIHtcblx0dGltZXIgfHwgdXBkYXRlKHRydWUpO1xufVxuXG5cbmZ1bmN0aW9uIGZ0VGltZShlbCkge1xuXHR2YXIgZGF0ZSA9IGVsLmdldEF0dHJpYnV0ZSgnZGF0ZXRpbWUnKTtcblx0Ly8gS2VlcCBkYXRlIGFzIG51bGwgaWYgZGF0ZXRpbWUgaGFzbid0IGJlZW4gZGVmaW5lZFxuXHRpZiAoZGF0ZSkgZGF0ZSA9IHRvRGF0ZShkYXRlKTtcblx0dmFyIHByaW50ZXIgPSBlbC5xdWVyeVNlbGVjdG9yKCcuby1kYXRlX19wcmludGVyJykgfHwgZWw7XG5cdC8vIElmIGRhdGUgaGFzbid0IGJlZW4gZGVmaW5lZCBhbmQgcHJpbnRlciBpc24ndCBlbXB0eSwga2VlcCB0aGUgY29udGVudCBvZiB0aGUgcHJpbnRlclxuXHRpZiAoZGF0ZSB8fCAoIWRhdGUgJiYgcHJpbnRlci5pbm5lckhUTUwubGVuZ3RoID09PSAwKSkge1xuXHRcdC8vIElmIGRhdGUgaGFzbid0IGJlZW4gZGVmaW5lZCwgYW5kIHRoZSBwcmludGVyIGlzIGVtcHR5LCB3ZSdsbCBzZXQgdGhlIGRlZmF1bHQgdG8gYmUgdGhlIGN1cnJlbnQgZGF0ZVxuXHRcdGlmICghZGF0ZSkgZGF0ZSA9IG5ldyBEYXRlKCk7XG5cdFx0dmFyIGludGVydmFsID0gTWF0aC5yb3VuZCgoKG5ldyBEYXRlKCkpIC0gZGF0ZSkgLyAxMDAwKTtcblx0XHRwcmludGVyLmlubmVySFRNTCA9IGludGVydmFsIDwgKDM2NSAqIDYwICogNjAgKiAyNCkgPyB0aW1lQWdvKGRhdGUsIGludGVydmFsKSA6IGZvcm1hdChkYXRlLCAnZGF0ZScpO1xuXHR9XG5cdGVsLnRpdGxlID0gZm9ybWF0KGRhdGUsICdkYXRldGltZScpO1xufVxuXG5mdW5jdGlvbiB0aW1lQWdvIChkYXRlLCBpbnRlcnZhbCkge1xuXHRkYXRlID0gdG9EYXRlKGRhdGUpO1xuXHRpbnRlcnZhbCA9IGludGVydmFsIHx8IE1hdGgucm91bmQoKChuZXcgRGF0ZSgpKSAtIGRhdGUpIC8gMTAwMCk7XG5cdGlmIChpbnRlcnZhbCA8IDQ1KSB7XG5cdFx0cmV0dXJuIGludGVydmFsICsgJyBzZWNvbmRzIGFnbyc7XG5cdH0gZWxzZSBpZiAoaW50ZXJ2YWwgPCA5MCkge1xuXHRcdHJldHVybiAnYSBtaW51dGUgYWdvJztcblx0fSBlbHNlIGlmIChpbnRlcnZhbCA8IDQ1ICogNjApIHtcblx0XHRyZXR1cm4gTWF0aC5yb3VuZChpbnRlcnZhbCAvIDYwKSArICcgbWludXRlcyBhZ28nO1xuXHR9IGVsc2UgaWYgKGludGVydmFsIDwgOTAgKiA2MCkge1xuXHRcdHJldHVybiAnYW4gaG91ciBhZ28nO1xuXHR9IGVsc2UgaWYgKGludGVydmFsIDwgMjIgKiA2MCAqIDYwKSB7XG5cdFx0cmV0dXJuICBNYXRoLnJvdW5kKGludGVydmFsIC8gKDYwICogNjApKSArICcgaG91cnMgYWdvJztcblx0fSBlbHNlIGlmIChpbnRlcnZhbCA8IDM2ICogNjAgKiA2MCkge1xuXHRcdHJldHVybiAnYSBkYXkgYWdvJztcblx0fSBlbHNlIGlmIChpbnRlcnZhbCA8IDI1ICogNjAgKiA2MCAqIDI0KSB7XG5cdFx0cmV0dXJuIE1hdGgucm91bmQoaW50ZXJ2YWwgLyAoNjAgKiA2MCAqIDI0KSkgKyAnIGRheXMgYWdvJztcblx0fSBlbHNlIGlmIChpbnRlcnZhbCA8IDQ1ICogNjAgKiA2MCAqIDI0KSB7XG5cdFx0cmV0dXJuICdhIG1vbnRoIGFnbyc7XG5cdH0gZWxzZSBpZiAoaW50ZXJ2YWwgPCAzNDUgKiA2MCAqIDYwICogMjQpIHtcblx0XHRyZXR1cm4gTWF0aC5yb3VuZChpbnRlcnZhbCAvICg2MCAqIDYwICogMjQgKiAzMCkpICsgJyBtb250aHMgYWdvJztcblx0fSBlbHNlIGlmIChpbnRlcnZhbCA8IDU0NyAqIDYwICogNjAgKiAyNCkge1xuXHRcdHJldHVybiAnYSB5ZWFyIGFnbyc7XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIE1hdGgubWF4KDIsIE1hdGgucm91bmQoaW50ZXJ2YWwgLyAoNjAgKiA2MCAqIDI0ICogMzY1KSkpICsgJyB5ZWFycyBhZ28nO1xuXHR9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24oZWwpIHtcblx0aWYgKCFlbCkge1xuXHRcdGVsID0gZG9jdW1lbnQuYm9keTtcblx0fVxuXHR2YXIgZGF0ZUVscyA9IGVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW8tY29tcG9uZW50fj1cIm8tZGF0ZVwiXScpO1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRhdGVFbHMubGVuZ3RoOyBpKyspIHtcblx0XHRmdFRpbWUoZGF0ZUVsc1tpXSk7XG5cdH1cblx0YXV0b1VwZGF0ZSgpO1xufTtcblxudmFyIGNvbnN0cnVjdEFsbCA9IGZ1bmN0aW9uKCkge1xuICAgIGluaXQoKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdvLkRPTUNvbnRlbnRMb2FkZWQnLCBjb25zdHJ1Y3RBbGwpO1xufTtcblxuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ28uRE9NQ29udGVudExvYWRlZCcsIGNvbnN0cnVjdEFsbCk7XG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdGZvcm1hdDogZm9ybWF0LFxuXHR0aW1lQWdvOiB0aW1lQWdvLFxuXHRpbml0OiBpbml0XG59O1xuIl19
