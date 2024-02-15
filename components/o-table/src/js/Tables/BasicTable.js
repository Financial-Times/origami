import BaseTable from './BaseTable.js';

class BasicTable extends BaseTable {
	/**
	 * Sort the given table.
	 *
	 * @typedef TableSorter
	 * @access public
	 * @param {BaseTable} table - The table instance to sort.
	 * @param {number} columnIndex - The index of the table column to sort.
	 * @param {string} sortOrder - How to sort the column, "ascending" or "descending"
	 * @param {number} batch [100] - Deprecated. No longer used. How many rows to render at once when sorting.
	 * @returns {void}
	 */

	/**
	 * Initialises an `o-table` component without responsive behaviour.
	 *
	 * @access public
	 * @param {HTMLElement} rootEl - The `o-table` element.
	 * @param {TableSorter} sorter A TableSorter instance
	 * @param {object} opts [{}]
	 * @param {boolean} opts.sortable [true]
	 * @returns {BasicTable} A new table
	 */
	constructor(rootEl, sorter, opts = {}) {
		super(rootEl, sorter, opts);
		window.setTimeout(this.addSortButtons.bind(this), 0);
		this._ready();
		return this;
	}
}

export default BasicTable;
