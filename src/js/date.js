import ftDateFormat from '@financial-times/ft-date-format';

const updateEventName = 'update';
let interval;

function ftDateFormatWarning(methodName) {
	// eslint-disable-next-line no-console
	console.warn(`The o-date method "${methodName}" is deprecated. Use the "ft-date-format" package instead or contact the Origami team for help: https://github.com/Financial-Times/ft-date-format`);
}

/**
 * Initialise the o-date component.
 * @param {HTMLElement|String} rootElement - The root element or CSS selector to initialise
 */
class ODate {

	constructor(rootEl) {

		if (!rootEl) {
			// eslint-disable-next-line no-console
			console.warn('To initialise all o-date elements on the page use ' +
				'the `init` method. Passing no arguments to the constructor ' +
				'is deprecated.');
		}

		if (rootEl && !(rootEl instanceof HTMLElement)) {
			// eslint-disable-next-line no-console
			console.warn('Using the constructor to initialise one or more ' +
				'o-date elements with a query selector is deprecated. ' +
				'Pass a single o-date HTMLElement to initialise or use the ' +
				'`init` method.');
		}

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

		if (this.el) {
			document.body.addEventListener(updateEventName, this);

			this.update();
			this.el.setAttribute('data-o-date-js', '');
		}

		if (this.el && !interval) {
			interval = setInterval(function () {
				document.body.dispatchEvent(new CustomEvent(updateEventName));
			}, 60000);
		}
	}

	// Use object-level event listener method so a new function doesn't need to be bound for each instance
	handleEvent(e) {
		if (e.type === updateEventName) {
			this.update();
		}
	}

	/**
	 * Re-render the formatted date within the `time` element.
	 * @returns {undefined}
	 */
	update() {
		const el = this.el;

		// Find the date to render.
		// Use the current date if the `datetime` attribute is not set and
		// the o-date `time` element has no text content.
		const dateTime = el.getAttribute('datetime');
		let date = dateTime ? ftDateFormat.toDate(dateTime) : null;
		if (!date && this.el.textContent === '') {
			date = new Date();
		}

		if (!date) {
			return;
		}

		// Find elements to render formatted dates to.
		// @deprecated - The class `.o-date__printer` is deprecated.
		// `.o-date__printer` should be removed in the next major.
		// Use `[data-o-date-printer]` instead of `.o-date__printer`.
		let printers = el.querySelectorAll('.o-date__printer,[data-o-date-printer]');
		printers = printers.length ? printers : [el];

		// Render the found date in each printer element.
		for (const printer of printers) {
			this._renderDateFor(printer, date);
		}

		// If no printers result in output, e.g. because the,
		// format chosen does not output the time after x hours,
		// then hide the `time` element.
		if (el.textContent) {
			el.setAttribute('title', ftDateFormat.format(date, 'datetime'));
			el.removeAttribute('aria-hidden');
		} else {
			el.setAttribute('aria-hidden', true);
		}
	}

	/**
	 * Remove o-date from the `time` element i.e. remove event
	 * listeners and drop references to the element.
	 * @returns {undefined}
	 */
	destroy() {
		document.body.removeEventListener(updateEventName, this);
		this.el = null;
	}

	/**
	 * Initialise the o-date component.
	 * @param {HTMLElement|String} el - The root element or CSS selector to initialise
	 * @returns {Array<ODate> | ODate} - An o-date instance or array of o-date instances.
	 */
	static init (el) {
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
		return [].map.call(dateEls, function (el) {
			return new ODate(el);
		});
	}

	/**
	 * Render the date to the "printer" element in the requested format.
	 * @param {HTMLElement} printer - The element to render the date in
	 * @param {Date} date - The date to format
	 * @returns {undefined}
	 */
	_renderDateFor(printer, date) {
		// Use the printer `data-o-date-format` if found or fallback to the
		// root element if not found.
		const format = printer.getAttribute('data-o-date-format') ||
			this.el.getAttribute('data-o-date-format');

		let dateString;
		let labelString;

		if (format === 'today-or-yesterday-or-nothing') {
			dateString = ftDateFormat.asTodayOrYesterdayOrNothing(date);
		} else if (format === 'date-only') {
			dateString = ftDateFormat.format(date, 'date');
		} else if (format === 'time-ago-limit-4-hours') {
			dateString = ftDateFormat.timeAgo(date, { limit: 4 * ftDateFormat.inSeconds.hour });
		} else if (format === 'time-ago-limit-24-hours') {
			dateString = ftDateFormat.timeAgo(date, { limit: 24 * ftDateFormat.inSeconds.hour });
		} else if (format === 'time-ago-abbreviated') {
			dateString = ftDateFormat.timeAgo(date, { abbreviated: true });
			labelString = ftDateFormat.timeAgo(date);
		} else if (format === 'time-ago-abbreviated-limit-4-hours') {
			dateString = ftDateFormat.timeAgo(date, { abbreviated: true, limit: 4 * ftDateFormat.inSeconds.hour });
			labelString = ftDateFormat.timeAgo(date, { limit: 4 * ftDateFormat.inSeconds.hour });
		} else if (format === 'time-ago-no-seconds') {
			dateString = ftDateFormat.timeAgoNoSeconds(date);
		} else if (format !== null) {
			dateString = ftDateFormat.format(date, format);
		} else {
			dateString = ftDateFormat.ftTime(date);
		}

		// To avoid triggering a parent live region unnecessarily
		// <https://github.com/Financial-Times/o-date/pull/43>
		const hasSingleTextNode = printer.childNodes.length === 1 &&
			printer.firstChild &&
			printer.firstChild.nodeType === 3;

		if (hasSingleTextNode) {
			printer.firstChild.nodeValue = dateString;
		} else {
			printer.innerHTML = dateString;
		}

		if (dateString) {
			printer.setAttribute('aria-label', labelString || dateString);
		} else {
			printer.removeAttribute('aria-label');
		}
	}

	/**
	 * @deprecated Use [ft-date-format]{@link https://github.com/Financial-Times/ft-date-format} instead.
	 * @return {String} - A formatted date or empty string.
	 */
	static toDate() {
		ftDateFormatWarning('toDate');
		return ftDateFormat.toDate(...arguments);
	}

	/**
	 * @deprecated Use [ft-date-format]{@link https://github.com/Financial-Times/ft-date-format} instead.
	 * @return {String} - A formatted date or empty string.
	 */
	static format() {
		ftDateFormatWarning('format');
		return ftDateFormat.format(...arguments);
	}

	/**
	 * @deprecated Use [ft-date-format]{@link https://github.com/Financial-Times/ft-date-format} instead.
	 * @return {String} - A formatted date or empty string.
	 */
	static getSecondsBetween() {
		ftDateFormatWarning('getSecondsBetween');
		return ftDateFormat.getSecondsBetween(...arguments);
	}

	/**
	 * @deprecated Use [ft-date-format]{@link https://github.com/Financial-Times/ft-date-format} instead.
	 * @return {String} - A formatted date or empty string.
	 */
	static ftTime() {
		ftDateFormatWarning('ftTime');
		return ftDateFormat.ftTime(...arguments);
	}

	/**
	 * @deprecated Use [ft-date-format]{@link https://github.com/Financial-Times/ft-date-format} instead.
	 * @return {String} - A formatted date or empty string.
	 */
	static isNearFuture() {
		ftDateFormatWarning('isNearFuture');
		return ftDateFormat.isNearFuture(...arguments);
	}

	/**
	 * @deprecated Use [ft-date-format]{@link https://github.com/Financial-Times/ft-date-format} instead.
	 * @return {String} - A formatted date or empty string.
	 */
	static isFarFuture() {
		ftDateFormatWarning('isFarFuture');
		return ftDateFormat.isFarFuture(...arguments);
	}

	/**
	 * @deprecated Use [ft-date-format]{@link https://github.com/Financial-Times/ft-date-format} instead.
	 * @return {String} - A formatted date or empty string.
	 */
	static isToday() {
		ftDateFormatWarning('isToday');
		return ftDateFormat.isToday(...arguments);
	}

	/**
	 * @deprecated Use [ft-date-format]{@link https://github.com/Financial-Times/ft-date-format} instead.
	 * @return {String} - A formatted date or empty string.
	 */
	static isYesterday() {
		ftDateFormatWarning('isYesterday');
		return ftDateFormat.isYesterday(...arguments);
	}

	/**
	 * @deprecated Use [ft-date-format]{@link https://github.com/Financial-Times/ft-date-format} instead.
	 * @return {String} - A formatted date or empty string.
	 */
	static timeAgo() {
		ftDateFormatWarning('timeAgo');
		return ftDateFormat.timeAgo(...arguments);
	}

	/**
	 * @deprecated Use [ft-date-format]{@link https://github.com/Financial-Times/ft-date-format} instead.
	 * @return {String} - A formatted date or empty string.
	 */
	static asTodayOrYesterdayOrNothing() {
		ftDateFormatWarning('asTodayOrYesterdayOrNothing');
		return ftDateFormat.asTodayOrYesterdayOrNothing(...arguments);
	}

	/**
	 * @deprecated Use [ft-date-format]{@link https://github.com/Financial-Times/ft-date-format} instead.
	 * @return {String} - A formatted date or empty string.
	 */
	static timeAgoNoSeconds() {
		ftDateFormatWarning('timeAgoNoSeconds');
		return ftDateFormat.timeAgoNoSeconds(...arguments);
	}

}

export default ODate;
