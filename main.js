const ftDateFormat = require('ft-date-format');

const updateEventName = 'oDate.update';
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
		document.body.addEventListener(updateEventName, this);

		this.update();
	}

	if (!interval) {
		interval = setInterval(function() {
			document.body.dispatchEvent(new CustomEvent(updateEventName));
		}, 60000);
	}
}

// Use object-level event listener method so a new function doesn't need to be bound for each instance
ODate.prototype.handleEvent = function(e) {
	if (e.type === updateEventName) {
		this.update();
	}
};

ODate.prototype.update = function() {
	let el = this.el;

	let date = el.getAttribute('datetime');
	let format = el.getAttribute('data-o-date-format');

	const printer = el.querySelector('.o-date__printer') || el;
	const hasTextNode = printer.firstChild && printer.firstChild.nodeType === 3;

	if (date) {
		date = ftDateFormat.toDate(date);
	} else if (hasTextNode) {
		// Only define new date if printer is empty
		date = new Date();
	}

	if (!date) {
		return;
	}

	let dateString;
	let labelString;

	if (format === 'today-or-yesterday-or-nothing') {
		dateString = ftDateFormat.asTodayOrYesterdayOrNothing(date);
	} else if (format === 'date-only') {
		dateString = ftDateFormat.format(date, 'date');
	} else if (format === 'time-ago-limit-4-hours') {
		dateString = ftDateFormat.timeAgo(date, { limit: 4*ftDateFormat.inSeconds.hour });
	} else if (format === 'time-ago-abbreviated') {
		dateString = ftDateFormat.timeAgo(date, { abbreviated: true });
		labelString = ftDateFormat.timeAgo(date);
	} else if (format === 'time-ago-abbreviated-limit-4-hours') {
		dateString = ftDateFormat.timeAgo(date, { abbreviated: true, limit: 4*ftDateFormat.inSeconds.hour });
		labelString = ftDateFormat.timeAgo(date, { limit: 4*ftDateFormat.inSeconds.hour });
	} else if (format === 'time-ago-no-seconds') {
		dateString = ftDateFormat.timeAgoNoSeconds(date);
	} else if (format !== null) {
		dateString = ftDateFormat.format(date, format);
	} else {
		dateString = ftDateFormat.ftTime(date);
	}

	// To avoid triggering a parent live region unnecessarily
	// <https://github.com/Financial-Times/o-date/pull/43>
	if (hasTextNode) {
		printer.firstChild.nodeValue = dateString;
	} else {
		printer.innerHTML = dateString;
	}

	el.setAttribute('data-o-date-js', '');

	if (dateString) {
		el.setAttribute('title', ftDateFormat.format(date, 'datetime'));
		el.setAttribute('aria-label', labelString || dateString);
		el.removeAttribute('aria-hidden');
	} else {
		el.removeAttribute('title');
		el.removeAttribute('aria-label');
		el.setAttribute('aria-hidden', '');
	}
};

ODate.prototype.destroy = function() {
	document.body.removeEventListener(updateEventName, this);
	this.el = null;
};

ODate.toDate = ftDateFormat.toDate;
ODate.format = ftDateFormat.format;
ODate.getSecondsBetween = ftDateFormat.getSecondsBetween;
ODate.ftTime = ftDateFormat.ftTime;
ODate.isNearFuture = ftDateFormat.isNearFuture;
ODate.isFarFuture = ftDateFormat.isFarFuture;
ODate.isToday = ftDateFormat.isToday;
ODate.isYesterday = ftDateFormat.isYesterday;
ODate.timeAgo = ftDateFormat.timeAgo;
ODate.asTodayOrYesterdayOrNothing = ftDateFormat.asTodayOrYesterdayOrNothing;
ODate.timeAgoNoSeconds = ftDateFormat.timeAgoNoSeconds;

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
