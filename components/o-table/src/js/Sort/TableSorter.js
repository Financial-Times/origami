import CellFormatter from "./CellFormatter.js";

/**
 * Construct Intl.Collator if supported.
 *
 * @access private
 * @returns {Intl.Collator | undefined} The Intl.Collator object enables language-sensitive string comparison.
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
 * @param {string | number} a column a
 * @param {string | number} b column b
 * @param {Intl.Collator} intlCollator The Intl.Collator object enables language-sensitive string comparison.
 * @returns {number} comp
 */
function ascendingSort(a, b, intlCollator) {
	if ((typeof a === 'string' || a instanceof String) && (typeof b === 'string' || b instanceof String)) {
		return intlCollator ? intlCollator.compare(a, b) : a.localeCompare(b);
	} else if (!isNaN(b) && isNaN(a) || a < b) {
		return -1;
	} else if (!isNaN(a) && isNaN(b) || b < a) {
		return 1;
	} else {
		return 0;
	}
}

/**
 * A descending [compare function]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Parameters}.
 *
 * @access private
 * @param {string | number} a column a
 * @param {string | number} b column b
 * @param {Intl.Collator} intlCollator The Intl.Collator object enables language-sensitive string comparison.
 * @returns {number} comp
 */
function descendingSort(a, b, intlCollator) {
	return 0 - ascendingSort.apply(this, [a, b, intlCollator]);
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
	 * @param {import("../Tables/BaseTable")} table - The table instance to sort.
	 * @param {number} columnIndex - The index of the table column to sort.
	 * @param {string} sortOrder - How to sort the column, "ascending" or "descending"
	 * @param {number} batch [100] - Deprecated. No longer used. How many rows to render at once when sorting.
	 * @returns {void}
	 */
	sortRowsByColumn(table, columnIndex, sortOrder, batch) {
		const tableHeaderElement = table.getTableHeader(columnIndex);

		if (batch) {
			// eslint-disable-next-line no-console
			console.warn('o-table: The "batch" argument is deprecated and no longer used.');
		}

		if (['ascending', 'descending'].indexOf(sortOrder) === -1) {
			throw new Error(`Sort order "${sortOrder}" is not supported. Must be "ascending" or "descending".`);
		}

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

		// Table sorted.
		table.sorted({
			columnIndex,
			sortOrder
		});

		// Render sorted table rows.
		table.renderRowUpdates();

		// Update table headings.
		window.requestAnimationFrame(() => {
			table.tableHeaders.forEach((header) => {
				const headerSort = header === tableHeaderElement ? sortOrder : 'none';
				header.setAttribute('aria-sort', headerSort);
			});
		});
	}

	/**
	 * Set a custom cell formatter for a given data type.
	 *
	 * @param {string} type - The data type to apply the filter function to.
	 * @param {formatFunction} formatFunction - Callback to format a table cell to a sort value.
	 * @see {@link CellFormatter~setFormatter} for `formatFunction` details.
	 * @access public
	 */
	setCellFormatterForType(type, formatFunction) {
		this._cellFormatter.setFormatter(type, formatFunction);
	}
}

export default TableSorter;
