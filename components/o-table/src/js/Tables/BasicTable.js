import BaseTable from './BaseTable.js';

class BasicTable extends BaseTable {

	/**
	 * Initialises an `o-table` component without responsive behaviour.
	 *
	 * @access public
	 * @param {HTMLElement} rootEl - The `o-table` element.
	 * @param {import("../Sort/TableSorter")} sorter A TableSorter instance
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
