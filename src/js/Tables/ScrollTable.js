import BaseTable from './BaseTable';

class ScrollTable extends BaseTable {
	/**
	 * Initialises an `o-table` component with "scroll" responsive behaviour.
	 *
	 * @access public
	 * @param {HTMLElement} rootEl - The `o-table` element.
	 * @param {TableSorter} sorter
	 * @param {Object} opts [{}]
	 * @param {Bool} opts.sortable [true]
	 * @returns {ScrollTable}
	 */
	constructor(rootEl, sorter, opts = {}) {
		super(rootEl, sorter, opts);
		this._duplicateRowsWithAddedHeader();
		window.requestAnimationFrame(this.addSortButtons.bind(this));
		this._ready();
		return this;
	}

	/**
	 * Duplicate the table headers into a one tbody row.
	 * @returns {undefined}
	 */
	_duplicateRowsWithAddedHeader() {
		this.tableHeaders.forEach((header, index) => {
			const headerRow = document.createElement('tr');
			headerRow.classList.add('o-table__duplicate-row');
			// Clone column heading and turn into a row heading.
			const clonedHeader = header.cloneNode(true);
			clonedHeader.setAttribute('scope', 'row');
			clonedHeader.setAttribute('role', 'rowheader');
			headerRow.appendChild(clonedHeader);
			// Clone data for the column into the new row.
			this.tableRows.forEach(row => {
				const data = row.querySelectorAll('td')[index];
				headerRow.appendChild(data.cloneNode(true));
			});
			this.tbody.appendChild(headerRow);
		});
	}
}

export default ScrollTable;
