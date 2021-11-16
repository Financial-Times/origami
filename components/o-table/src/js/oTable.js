import FlatTable from './Tables/FlatTable.js';
import ScrollTable from './Tables/ScrollTable.js';
import OverflowTable from './Tables/OverflowTable.js';
import BasicTable from './Tables/BasicTable.js';

import TableSorter from './Sort/TableSorter.js';
const sorter = new TableSorter();

/**
 * Table options.
 *
 * @typedef {object} OTableOptions - Table options.
 * @property {boolean} sortable [true] - Disable the table's sort feature.
 * @property {undefined | boolean} expanded [Undefined] - Allow the "OverflowTable" to hide results behind a "show more" button. The table is expanded by default when "true", contracted when "false", or not expandable if not set.
 * @property {number} minimumRowCount [20] - When the `expanded` option is set, the number of rows to show when the table is not expanded.
 */

class OTable {

	/**
	 * Constructs an o-table component.
	 *
	 * @param {HTMLElement} rootEl - An o-table element.
	 * @param {OTableOptions} opts - A table options object.
	 * @returns {FlatTable | ScrollTable | OverflowTable | BasicTable} - A table instance.
	 */
	constructor(rootEl, opts = {}) {
		const tableType = rootEl.getAttribute('data-o-table-responsive');
		let Table;
		switch (tableType) {
			case 'flat':
				Table = FlatTable;
				break;
			case 'scroll':
				Table = ScrollTable;
				break;
			case 'overflow':
				Table = OverflowTable;
				break;
			default:
				Table = BasicTable;
				break;
		}
		return new Table(rootEl, sorter, opts);
	}

	/**
	 * Constructs all o-table components inside the element passed as the first parameter.
	 *
	 * @access public
	 * @param {(HTMLElement|string)} [el=document.body] - Element where to search for o-table components. You can pass an HTMLElement or a selector string.
	 * @param {OTableOptions} opts - A table options object.
	 * @returns {Array<FlatTable | ScrollTable | OverflowTable | BasicTable> | FlatTable | ScrollTable | OverflowTable | BasicTable} - A table instance or array of table instances.
	 */
	static init(el = document.body, opts = {}) {
		if (!(el instanceof HTMLElement)) {
			el = document.querySelector(el);
		}
		if (/\bo-table\b/.test(el.getAttribute('data-o-component'))) {
			return new OTable(el, opts);
		}
		const tableEls = Array.from(el.querySelectorAll('[data-o-component~="o-table"]'));
		return tableEls.map(el => {
			return new OTable(el, opts);
		});
	}


	/**
	 * The custom formatter accepts a table cell and returns a sort value for that cell.
	 * This could be used to define a custom sort order for an unsupported format, such as emoji's, or a new date format.
	 *
	 * @callback formatFunction
	 * @param {HTMLElement} cell
	 */

	/**
	 * Set a custom sort formatter for a given data type.
	 *
	 * @example <caption>Mapping table cells which contain emojis to a numerical sort value.</caption>
	 *	import OTable from 'o-table';
	 *	// Set a filter for custom data type "emoji-time".
	 *	// The return value may be a string or number.
	 *	OTable.setSortFormatterForType('emoji-time', (cell) => {
	 *		const text = cell.textContent.trim();
	 *		if (text === '🌑') {
	 *			return 1;
	 *		}
	 *		if (text === '🌤️️') {
	 *			return 2;
	 *		}
	 *		return 0;
	 *	});
	 *	OTable.init();
	 * @param {string} type - The data type to apply the filter function to.
	 * @param {formatFunction} formatFunction - The function used to format the cell
	 * @access public
	 */
	static setSortFormatterForType(type, formatFunction) {
		sorter.setCellFormatterForType(type, formatFunction);
	}
}

export default OTable;
