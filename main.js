import ftDateFormat from 'ft-date-format';

const updateEventName = 'oDate.update';
let interval;

/**
 * Initialise the o-date component.
 * @param {(HTMLElement|String)} rootElement - The root element or CSS selector to initialise
 */
export default function ODate(rootEl) {
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

/**
 * Re-render the formatted date within the `time` element.
 */
ODate.prototype.update = function() {
	const el = this.el;

	let date = el.getAttribute('datetime');
	const format = el.getAttribute('data-o-date-format');

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

/**
 * Remove o-date from the `time` element i.e. remove event
 * listeners and drop references to the element.
 */
ODate.prototype.destroy = function() {
	document.body.removeEventListener(updateEventName, this);
	this.el = null;
};

/**
 * @deprecated - Use [ft-date-format]{@link https://github.com/Financial-Times/ft-date-format} instead.
 */
ODate.toDate = ftDateFormat.toDate;

/**
 * @deprecated - Use [ft-date-format]{@link https://github.com/Financial-Times/ft-date-format} instead.
 */
ODate.format = ftDateFormat.format;

/**
 * @deprecated - Use [ft-date-format]{@link https://github.com/Financial-Times/ft-date-format} instead.
 */
ODate.getSecondsBetween = ftDateFormat.getSecondsBetween;

/**
 * @deprecated - Use [ft-date-format]{@link https://github.com/Financial-Times/ft-date-format} instead.
 */
ODate.ftTime = ftDateFormat.ftTime;

/**
 * @deprecated - Use [ft-date-format]{@link https://github.com/Financial-Times/ft-date-format} instead.
 */
ODate.isNearFuture = ftDateFormat.isNearFuture;

/**
 * @deprecated - Use [ft-date-format]{@link https://github.com/Financial-Times/ft-date-format} instead.
 */
ODate.isFarFuture = ftDateFormat.isFarFuture;

/**
 * @deprecated - Use [ft-date-format]{@link https://github.com/Financial-Times/ft-date-format} instead.
 */
ODate.isToday = ftDateFormat.isToday;

/**
 * @deprecated - Use [ft-date-format]{@link https://github.com/Financial-Times/ft-date-format} instead.
 */
ODate.isYesterday = ftDateFormat.isYesterday;

/**
 * @deprecated - Use [ft-date-format]{@link https://github.com/Financial-Times/ft-date-format} instead.
 */
ODate.timeAgo = ftDateFormat.timeAgo;

/**
 * @deprecated - Use [ft-date-format]{@link https://github.com/Financial-Times/ft-date-format} instead.
 */
ODate.asTodayOrYesterdayOrNothing = ftDateFormat.asTodayOrYesterdayOrNothing;

/**
 * @deprecated - Use [ft-date-format]{@link https://github.com/Financial-Times/ft-date-format} instead.
 */
ODate.timeAgoNoSeconds = ftDateFormat.timeAgoNoSeconds;

/**
 * Initialise the o-date component.
 * @param {(HTMLElement|String)} rootElement - The root element or CSS selector to initialise
 * @returns {Array<ODate> | ODate} - An o-date instance or array of o-date instances.
 */
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
