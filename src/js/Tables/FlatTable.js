import BaseTable from './BaseTable';

class FlatTable extends BaseTable {

	/**
	 * Initialises an `o-table` component with "flat" responsive behaviour.
	 *
	 * @access public
	 * @param {HTMLElement} rootEl - The `o-table` element.
	 * @param {TableSorter} sorter
	 * @param {Object} opts [{}]
	 * @param {Bool} opts.sortable [true]
	 * @returns {FlatTable}
	 */
	constructor(rootEl, sorter, opts = {}) {
		super(rootEl, sorter, opts);
		// Flat table can only work given headers.
		if (this.tableHeaders.length > 0) {
			this._duplicateHeaders(rootEl);
		} else {
			console.warn('Could not create a "flat" table as no headers were found. Ensure table headers are placed within "<thead>". Removing class "o-table--responsive-flat".', rootEl);
			rootEl.classList.remove('o-table--responsive-flat');
		}
		window.requestAnimationFrame(this.addSortButtons.bind(this));
		this._ready();
		return this;
	}

	/**
	 * Duplicate table headers for each tabel row.
	 */
	_duplicateHeaders() {
		this.tableRows.forEach((row) => {
			const data = Array.from(row.getElementsByTagName('td'));
			data.forEach((td, dataIndex) => {
				const clonedHeader = this.tableHeaders[dataIndex].cloneNode(true);
				clonedHeader.setAttribute('scope', 'row');
				clonedHeader.setAttribute('role', 'rowheader');
				clonedHeader.classList.add('o-table__duplicate-heading');
				td.parentNode.insertBefore(clonedHeader, td);
			});
		});
	}
}

export default FlatTable;
