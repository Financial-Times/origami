/**
 * Extracts the contents of img alt text.
 * @example String argument for example purposes only, to represent a HTMLElement.
 * 	extractAltFromImages('<img alt="text">'); // text
 * @param {HTMLElement} cell The DOM node to operate on, possibly a <td>
 * @access private
 * @returns {HTMLElement} the parameter
 */
function extractAltFromImages(cell){
	const images = Array.from(cell.getElementsByTagName('img'));
	images.forEach(image => {
		const contents = image.getAttribute('alt');
		image.insertAdjacentHTML('beforebegin', contents);
		image.remove();
	});

	return cell;
}

/**
 * Returns the text represantation of an HTML node.
 * If a node contains no `dateTime` attribute, content, `aria-label` or `title` attributes of <a>, <span>, or <i> child nodes are used.
 * @example String argument for example purposes only, to represent a HTMLElement.
 * 	extractText('<i class="o-icons-icon o-icons-icon--mail"><a href="mailto:example@ft.com" title="Email Example at example@ft.com"></a>'); //Email Example at example@ft.com
 * 	extractText('<span class="o-icons-icon o-icons-icon--tick">Correct</span>'); //Correct
 * 	extractText('<span class="o-icons-icon o-icons-icon--tick" title="Correct"></span>'); //Correct
 * 	extractText('<span class="o-icons-icon o-icons-icon--tick" aria-label="Correct"></span>'); //Correct
 * 	extractText('<time class="o-date" data-o-component="o-date" datetime="2020-06-19T07:56:18Z">2 hours ago</time>'); //Correct
 * @param {HTMLElement} cell The DOM node to operate on, possibly a <td>
 * @access private
 * @returns {HTMLElement} text representation of the HTML node
 */
function extractText(cell){
	let text = cell.dateTime || cell.textContent.trim();
	// No text found, check aria labels and titles.
	// Useful for icon-only cells.
	if (text === '') {
		const nodes = cell.querySelectorAll('a, span, i');
		text = Array.from(nodes).reduce((accumulator, node) => {
			const nodeText = node.getAttribute('aria-label') || node.getAttribute('title');
			return nodeText ? `${accumulator} ${nodeText}` : accumulator;
		}, '');
	}
	return text.trim();
}

/**
 * Returns the text with abbreviations expanded.
 * Supports million 'm', billion 'bn' (1,000 million), and trillion 'tn' (1,000 billion).
 * @example
 *  expandAbbreviations('1m') //1000000
 *  expandAbbreviations('1.2bn') //2200000000
 *  expandAbbreviations('1tn') //1000000000000
 *  expandAbbreviations('5m-10m') //5000000-10000000
 * @param {String} text The string to operate on
 * @access private
 * @returns {String} Text with any supported abbreviations expanded
 */
function expandAbbreviations(text) {
	text = text.replace(/([\d,.]+)([a-zA-Z]+)/g, (match, digit, abbreviation) => {
		const zeros = {
			'm': 6,
			'bn': 9,
			'tn': 12
		};
		return `${digit * Math.pow(10, zeros[abbreviation] || 0)}`;
	});
	return text;
}

/**
 * Returns the text with digit group separators removed.
 * @example
 *  removeDigitGroupSeparator('1,000') //1000
 *  removeDigitGroupSeparator('40') //40
 *  removeDigitGroupSeparator('4,000,000') //4000000
 * @param {String} text The string to operate on
 * @access private
 * @returns {String} Text with digit group separators (commas) removed.
 */
function removeDigitGroupSeparators(text) {
	return text.replace(/,/g, '');
}

/**
 * Returns the text with non-number characters removed (e.g. currency symbols).
 * Does not effect range characters e.g. "–" will be maintained.
 * If no digits were found to remove, returns the text unchanged.
 * @example
 *  extractDigitsIfFound('Rmb100') //100
 *  extractDigitsIfFound('CFA Fr830') //830
 *  extractDigitsIfFound('HK$12') //12
 *  extractDigitsIfFound('HK$12-HK$20') //12–20
 *  extractDigitsIfFound('1534956593-1534956620') //1534956593–1534956620
 *  extractDigitsIfFound('Some text') //Some text
 *  extractDigitsIfFound('Some text 123') //123
 * @param {String} text The string to operate on
 * @access private
 * @returns {String} Text with digits characters only.
 */
function extractDigitsIfFound(text) {
	const digitsAndRange = text.replace(/([^\d.,\-\–]+)/g, '');
	if (digitsAndRange === '') {
		return text;
	}
	return digitsAndRange;
}

/**
 * Returns a number from a range
 * @example
 *  removeRange('1534956593–1534956620') //1534956593
 *  removeRange('123–345') //123
 *  removeRange('123') //123
 *  removeRange('No numbers') //No numbers
 * @param {String} text The string to operate on
 * @access private
 * @returns {Number}
 */
function extractNumberFromRange(text) {
	const number = parseFloat(text);
	return isNaN(number) ? text : number;
}

/**
 * Parses FT style date and time and formats as a number for sorting.
 * FT date or date and time returns a UNIX epoch (UTC).
 * FT time returns a positive float for pm, negative for am.
 * @example
 *  ftDateTimeToNumber('August 17') //UNIX epoch, assumes current year
 *  ftDateTimeToNumber('September 12 2012') //UNIX epoch
 *  ftDateTimeToNumber('January 2012') //UNIX epoch, first of month
 *  ftDateTimeToNumber('March 12 2015 1am') //UNIX epoch including time
 *  ftDateTimeToNumber('April 20 2014 1.30pm') //UNIX epoch including time
 *  ftDateTimeToNumber('1am') //1
 *  ftDateTimeToNumber('1.30am') //1.3
 *  ftDateTimeToNumber('1.40pm') //13.4
 *  ftDateTimeToNumber('3pm') //15
 *  ftDateTimeToNumber('Not a known date') //Note a known date
 * @param {String} text The string to operate on
 * @access private
 * @returns {Number} Number representation of date and/or time for sorting.
 */
function ftDateTimeToNumber(text) {
	const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
	// FT style for writing dates: is June 23 2016 (no commas, month date year)
	const date = text.match(/^([A-Za-z]{3,})(?:[\s])(?=[\d])((?:\d{1,2})?(?![\d]))?(?:\s)?(\d{4})?/);
	// FT style for writing time:
	// The 12 hour clock should be used: 1am, 9.30pm
	const time = text.match(/(?:\s|^)(\d{1,2}(?:[.](\d{2}))?)(pm|am)$/);
	// Get date.
	const month = date && date[1] ? date[1] : null;
	// Get full month name from a given month e.g. 'January' for 'Jan'.
	const matchingMonthNames = monthNames.filter((name) => name.indexOf(month) !== -1);
	// Get the index of the matching month name.
	const monthIndex = matchingMonthNames && matchingMonthNames[0] ? monthNames.indexOf(matchingMonthNames[0]) : null;
	const day = date && date[2] ? parseInt(date[2], 10) : null;
	let year = date && date[3] ? parseInt(date[3], 10) : null;
	if (month && !year) {
		// For sorting purposes, assume a month is for this year if not otherwise specified.
		year = new Date().getFullYear();
	}
	// Get time.
	const hour = time && time[1] ? parseInt(time[1], 10) : null;
	const minute = time && time[2] ? parseInt(time[2], 10) : 0;
	const period = time ? time[3] : null;
	const twentyFourHour = hour && period === 'pm' ? hour + 12 : hour;
	// Sort number for FT formated time.
	if (hour && !(year && monthIndex)) {
		return parseFloat(`${twentyFourHour}.${minute}`);
	}
	// Unix epoch to sort FT formated date.
	const dateObj = new Date(Date.UTC(year, monthIndex, day, twentyFourHour, minute));
	return isNaN(dateObj.getTime()) ? text : dateObj.getTime();
}

/**
 * Removes and number of asterisk's which are at the end of the line.
 * @example
 *  removeRefereneAsterisk('Durian*') //Durian
 *  removeRefereneAsterisk('1,439,165.43**') //1,439,165.43
 * @param {String} text The string to operate on
 * @access private
 * @returns {String} Text without source/reference asterisk.
 */
function removeRefereneAsterisk(text) {
	return text.replace(/\*+$/, '');
}

/**
 * Removes indicators of an empty cell.
 * @example
 *  removeEmptyCellIndicators('n/a'); //
 *  removeEmptyCellIndicators('-'); //
 *  removeEmptyCellIndicators('Cell-content'); //Cell-content
 * @param {String} text The string to operate on
 * @access private
 * @returns {String} An empty string or the original text.
 */
function removeEmptyCellIndicators(text) {
	// Remove n/a
	text = text.replace(/^n[./]a[.]?$/i, '');
	// Remove -
	return text === '-' ? '' : text;
}

/**
 * Group of filters to extract text from a cell.
 * @param {HTMLElement} cell The node to extract sortable text from.
 * @access private
 * @returns {String} The node content to sort on.
 */
function extractNodeContent(cell) {
	const steps = [extractAltFromImages, extractText, removeRefereneAsterisk, removeEmptyCellIndicators];
	let text = cell;
	steps.forEach(step => { text = step(text); });
	return typeof text === 'string' ? text : '';
}

/**
 * Group of filters to extract a number for sorting.
 * @param {String} text The string to operate on
 * @access private
 * @returns {Number|String} A number if one could a extracted, string otherwise.
 */
function extractNumber(text) {
	const steps = [removeDigitGroupSeparators, expandAbbreviations, extractDigitsIfFound, extractNumberFromRange];
	steps.forEach(step => { text = step(text); });
	return text;
}

/**
 * Methods to format table cells for sorting.
 * @access public
 */
class CellFormatter {

	constructor () {
		// This object is used to keep the running order of filter methods
		this.filters = {
			text: [extractNodeContent],
			number: [extractNodeContent, extractNumber],
			percent: [extractNodeContent, extractNumber],
			currency: [extractNodeContent, extractNumber],
			numeric: [extractNodeContent, extractNumber],
			date: [extractNodeContent, ftDateTimeToNumber]
		};
	}

	/**
	 * The `formatFunction` take the table cell HTMLElement,
	 * and converts it to a String or Number of sorting.
	 *
	 * @callback formatFunction
	 * @param {HTMLElement} cell
	 * @return {String|Object}
	 */

	/**
	 * @param {String} type The data type of the cell to apply the filter function to.
	 * @param {formatFunction} formatFunction The function to take the cell and return a sortable value (string/number).
	 * @example
	 *  mySortFormatter.setFormatter('emoji-time', (cell) => {
	 *  	const text = cell.textContent.trim();
	 *  	if (text === '🌑') {
	 *  		return 1;
	 *  	}
	 *  	if (text === '🌤️️') {
	 *  		return 2;
	 *  	}
	 *  	return 0;
	 *  });
	 * @access public
	 */
	setFormatter(type, formatFunction) {
		this.filters[type] = [formatFunction];
	}

	/**
	 * @param {HTMLElement} cell
	 * @param {String} type The data type of the cell, e.g. date, number, currency. Custom types are supported.
	 * @see {@link setFormatter} to support add support for a custom type.
	 * @access public
	 * @return {String|Number} A representation of cell which can be used for sorting.
	 */
	formatCell({ cell, type = 'text' }) {
		type = type || 'text';
		let sortValue = cell.getAttribute('data-o-table-sort-value');
		if (sortValue === null) {
			if (this.filters[type]) {
				const cellClone = cell.cloneNode({ deep: true });
				sortValue = cellClone;
				this.filters[type].forEach(fn => { sortValue = fn(sortValue); });
			}
			cell.setAttribute('data-o-table-sort-value', sortValue);
		}
		const sortValueIsNumber = sortValue !== '' && !isNaN(sortValue);
		return sortValueIsNumber ? parseFloat(sortValue) : sortValue;
	}
}

export default CellFormatter;
