import BaseTable from './BaseTable.js.js';

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
		// Duplicate row headings before adding sort buttons.
		this._tableHeadersWithoutSort = this.tableHeaders.map(header => header.cloneNode(true));
		// Create scrollable layout for devices with small viewports.
		this._createScrollTableStructure();
		// Defer other tasks.
		window.setTimeout(this.addSortButtons.bind(this), 0);
		window.setTimeout(this._ready.bind(this), 0);
		return this;
	}

	/**
	 * Filter the table.
	 *
	 * @access public
	 * @param {Number} headerIndex - The index of the table column to filter.
	 * @param {String|Function} filter - How to filter the column (either a string to match or a callback function).
	 * @returns {undefined}
	 */
	filter(headerIndex, filter) {
		// Filter rows by columns (desktop view).
		this._filterRowsByColumn(headerIndex, filter);
		// Render filtered table (desktop view).
		this.renderRowUpdates();
		// Recreate scrollable table with filtered rows (mobile view).
		this._createScrollTableStructure();
	}

	/**
	 * Update the o-table instance with rows added dynamically to the table.
	 *
	 * @returns {undefined}
	 */
	updateRows() {
		// Update row visibility, sort, etc.
		super.updateRows();
		// Recreate scrollable table with updated rows.
		this._createScrollTableStructure();
	}

	/**
	 * Get all the table body's current row nodes, without nodes duplicated for
	 * the responsive "scroll" style
	 *
	 * @returns {Array<Node>}
	 * @access private
	 */
	_getLatestRowNodes() {
		return this.tbody ? Array.from(this.tbody.querySelectorAll('tr:not(.o-table__duplicate-row)')) : [];
	}

	/**
	 * Duplicate table headers and rows to create a table which has row headings
	 * rather than column headings. I.e. The table is consumed left to right,
	 * rather than top to bottom.
	 *
	 * @access private
	 * @returns {undefined}
	 */
	_createScrollTableStructure() {
		// Clone headings and data into new rows.
		const clonedRows = this._tableHeadersWithoutSort.map((header, index) => {
			const headerRow = document.createElement('tr');
			headerRow.classList.add('o-table__duplicate-row');
			// Clone column heading and turn into a row heading.
			const clonedHeader = header.cloneNode(true);
			clonedHeader.setAttribute('scope', 'row');
			clonedHeader.setAttribute('role', 'rowheader');
			headerRow.appendChild(clonedHeader);
			// Clone data for the column into the new row.
			this.tableRows.forEach(row => {
				const cell = row.querySelectorAll('td')[index];
				if (cell) {
					const cellClone = cell.cloneNode(true);
					const filteredData = this._filteredTableRows.indexOf(row) !== -1;
					cellClone.setAttribute('data-o-table-filtered', filteredData);
					cellClone.setAttribute('aria-hidden', filteredData);
					headerRow.appendChild(cellClone);
				}
			});
			return headerRow;
		});

		// Add new rows to the table body.
		window.requestAnimationFrame(function () {
			const rowHeadingRows = Array.from(this.tbody.querySelectorAll('.o-table__duplicate-row'));
			rowHeadingRows.forEach(row => this.tbody.removeChild(row));
			if (this.tbody.prepend) {
				this.tbody.prepend(...clonedRows);
			} else {
				clonedRows.reverse().forEach(row => {
					this.tbody.insertBefore(row, this.tbody.firstChild);
				});
			}
			this._updateTableHeight();
		}.bind(this));
	}
}

export default ScrollTable;
