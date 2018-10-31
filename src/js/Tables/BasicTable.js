import BaseTable from './BaseTable';

class BasicTable extends BaseTable {

	/**
	 * Initialises an `o-table` component without responsive behaviour.
	 *
	 * @access public
	 * @param {HTMLElement} rootEl - The `o-table` element.
	 * @param {TableSorter} sorter
	 * @param {Object} opts [{}]
	 * @param {Bool} opts.sortable [true]
	 * @returns {BasicTable}
	 */
	constructor(rootEl, sorter, opts = {}) {
		super(rootEl, sorter, opts);
		window.requestAnimationFrame(this.addSortButtons.bind(this));
		this._ready();
		return this;
	}
}

export default BasicTable;
