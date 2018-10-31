import CellFormatter from "./CellFormatter";

/**
 * Construct Intl.Collator if supported.
 *
 * @access private
 * @returns {Intl.Collator | Undefined}
 */
function getIntlCollator() {
	if (typeof Intl !== 'undefined' && {}.hasOwnProperty.call(Intl, 'Collator')) {
		return new Intl.Collator();
	}
}

/**
 * An ascending [compare function]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Parameters}.
 *
 * @access private
 * @param {String|Number} a
 * @param {String|Number} b
 * @param {Intl.Collator} intlCollator
 * @returns {Number}
 */
function ascendingSort(a, b, intlCollator) {
	if ((typeof a === 'string' || a instanceof String) && (typeof b === 'string' || b instanceof String)) {
		return intlCollator ? intlCollator.compare(a, b) : a.localeCompare(b);
	} else if ((!isNaN(b) && isNaN(a)) || a < b) {
		return -1;
	} else if ((!isNaN(a) && isNaN(b)) || b < a) {
		return 1;
	} else {
		return 0;
	}
}

/**
 * A descending [compare function]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Parameters}.
 *
 * @access private
 * @param {String|Number} a
 * @param {String|Number} b
 * @param {Intl.Collator} intlCollator
 * @returns {Number}
 */
function descendingSort(...args) {
	return 0 - ascendingSort.apply(this, args);
}

/**
 * Provides methods to sort table instances.
 */
class TableSorter {

	constructor() {
		this._cellFormatter = new CellFormatter();
	}

	/**
	 * Sort the given table.
	 *
	 * @access public
	 * @param {BaseTable} table - The table instance to sort.
	 * @param {Number} columnIndex - The index of the table column to sort.
	 * @param {Number} sortOrder - How to sort the column, "ascending" or "descending"
	 * @returns {undefined}
	 */
	sortRowsByColumn(table, columnIndex, sortOrder) {
		const tableHeaderElement = table.getTableHeader(columnIndex);

		if (['ascending', 'descending'].indexOf(sortOrder) === -1) {
			throw new Error(`Sort order "${sortOrder}" is not supported. Must be "ascending" or "descending".`);
		}

		// Add class for immediate visual feedback (only update aria when table has sorted successfully).
		window.requestAnimationFrame(() => {
			tableHeaderElement.classList.add(`o-table-sorting-${sortOrder}`);
		});

		const intlCollator = getIntlCollator();
		const cellFormatter = this._cellFormatter;
		const type = tableHeaderElement.getAttribute('data-o-table-data-type') || undefined;
		table.tableRows.sort((a, b) => {
			let aCol = a.querySelectorAll('td,th:not(.o-table__duplicate-heading)')[columnIndex];
			let bCol = b.querySelectorAll('td,th:not(.o-table__duplicate-heading)')[columnIndex];
			aCol = cellFormatter.formatCell({ cell: aCol, type });
			bCol = cellFormatter.formatCell({ cell: bCol, type });
			if (sortOrder === 'ascending') {
				return ascendingSort(aCol, bCol, intlCollator);
			} else {
				return descendingSort(aCol, bCol, intlCollator);
			}
		});

		window.requestAnimationFrame(() => {
			table.tableRows.forEach((row) => {
				table.tbody.appendChild(row);
			});
			table.tableHeaders.forEach((header) => {
				const headerSort = (header === tableHeaderElement ? sortOrder : 'none');
				header.setAttribute('aria-sort', headerSort);
				header.classList.remove(`o-table-sorting-ascending`);
				header.classList.remove(`o-table-sorting-descending`);
			});
			table.sorted({
				columnIndex,
				sortOrder
			});
		});
	}

	/**
	 * Set a custom cell formatter for a given data type.
	 *
	 * @param {String} type - The data type to apply the filter function to.
	 * @param {formatFunction} formatFunction - Callback to format a table cell to a sort value.
	 * @see {@link CellFormatter~setFormatter} for `formatFunction` details.
	 * @access public
	 */
	setCellFormatterForType(type, formatFunction) {
		this._cellFormatter.setFormatter(type, formatFunction);
	}
}

export default TableSorter;
