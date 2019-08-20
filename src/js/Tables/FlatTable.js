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
		// Duplicate row headings before adding sort buttons.
		this._tableHeadersWithoutSort = this.tableHeaders.map(header => header.cloneNode(true));
		// Flat table can only work given headers.
		if (this.tableHeaders.length <= 0) {
			console.warn('Could not create a "flat" table as no headers were found. Ensure table headers are placed within "<thead>". Removing class "o-table--responsive-flat".', rootEl);
			rootEl.classList.remove('o-table--responsive-flat');
		} else {
			this._createFlatTableStructure();
		}
		// Defer other tasks.
		window.setTimeout(this.addSortButtons.bind(this), 0);
		window.setTimeout(this._ready.bind(this), 0);
		return this;
	}

	/**
	 * Update the o-table instance with rows added dynamically to the table.
	 *
	 * @returns {undefined}
	 */
	updateRows() {
		// Update new rows to support the flat structure.
		const latestRows = this._getLatestRowNodes();
		this._createFlatTableStructure(latestRows);
		// Update row visibility, sort, etc.
		super.updateRows();
	}

	/**
	 * Get all the table body's current row nodes, without nodes duplicated for
	 * the responsive "flat" style
	 *
	 * @returns {Array<Node>}
	 * @access private
	 */
	_getLatestRowNodes() {
		return this.tbody ? Array.from(this.tbody.querySelectorAll('tr:not(.o-table__duplicate-row)')) : [];
	}

	/**
	 * Duplicate table headers for each data item.
	 * I.e. Each row is shown as a single item with its own headings.
	 *
	 * @access private
	 */
	_createFlatTableStructure(rows = this.tableRows) {
		rows
			.filter(row => !row.hasAttribute('data-o-table-flat-headings')) // only process rows once
			.forEach((row) => {
				const data = Array.from(row.getElementsByTagName('td'));
				row.setAttribute('data-o-table-flat-headings', true);
				window.requestAnimationFrame(() => {
					this._tableHeadersWithoutSort.forEach((header, index) => {
						const td = data[index];
						const clonedHeader = header.cloneNode(true);
						clonedHeader.setAttribute('scope', 'row');
						clonedHeader.setAttribute('role', 'rowheader');
						clonedHeader.classList.add('o-table__duplicate-heading');
						td.parentNode.insertBefore(clonedHeader, td);
					});
				});
			});
	}
}

export default FlatTable;
