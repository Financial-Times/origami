import Delegate from 'ftdomdelegate';

/**
 * Append rows to table.
 *
 * @access private
 * @param {Element} tbody - The table body to append the row batch to.
 * @param {Array} rowBatch - An array of rows to append to the table body.
 * @returns {undefined}
 */
function append(tbody, rowBatch) {
	if (tbody.append) {
		tbody.append(...rowBatch);
	} else {
		rowBatch.forEach(row => tbody.appendChild(row));
	}
}

/**
 * Prepend rows to table.
 *
 * @access private
 * @param {Element} tbody - The table body to prepend the row batch to.
 * @param {Array} rowBatch - An array of rows to prepend to the table body.
 * @returns {undefined}
 */
function prepend(tbody, rowBatch) {
	if (tbody.prepend) {
		tbody.prepend(...rowBatch);
	} else {
		rowBatch.reverse().forEach(row => {
			tbody.insertBefore(row, tbody.firstChild);
		});
	}
}

class BaseTable {

	/**
	 * The shared functionality of all `o-table` variants.
	 *
	 * @access public
	 * @param {HTMLElement} rootEl - The `o-table` element.
	 * @param {TableSorter} sorter
	 * @param {Object} opts [{}]
	 * @param {Bool} opts.sortable [true]
	 * @returns {BaseTable}
	 */
	constructor(rootEl, sorter, opts = {}) {
		this._listeners = [];
		this._sorter = sorter;
		this.rootEl = rootEl;
		this._opts = Object.assign({
			sortable: this.rootEl.getAttribute('data-o-table-sortable') !== 'false',
			preferredSortOrder: this.rootEl.getAttribute('data-o-table-preferred-sort-order')
		}, opts);
		this.thead = this.rootEl.querySelector('thead');
		this.tbody = this.rootEl.querySelector('tbody');
		this.tableCaption = this.rootEl.querySelector('caption');
		this.tableHeaders = this.thead ? Array.from(
			this.thead.querySelectorAll('tr:last-of-type > th')
		) : [];
		this.tableRows = this.tbody ? Array.from(this.tbody.getElementsByTagName('tr')) : [];
		this._filteredTableRows = [];
		this.wrapper = this.rootEl.closest('.o-table-scroll-wrapper');
		this.container = this.rootEl.closest('.o-table-container');
		this.overlayWrapper = this.rootEl.closest('.o-table-overlay-wrapper');
		this.filterContainer = this.wrapper || this.container;
		this._updateTableHeightListenerSet = false;

		/**
		 * @property {Object|Null} _currentSort - The current sort applied.
		 * @property {Number} _currentSort.columnIndex - The index of the currently sorted column.
		 * @property {String} _currentSort.sortOrder - The type of sort, "ascending" or "descending"
		 */
		this._currentSort = null;

		/**
		 * @property {Object|Null} _currentFilter - The filter currently applied.
		 * @property {Number} _currentFilter.columnIndex - The index of the column which is filtered.
		 * @property {String|Function} _currentFilter.filter - The filter applied.
		 */
		this._currentFilter = null;

		// Defer filter setup.
		window.setTimeout(this._setupFilters.bind(this), 0);
	}

	/**
	 * Apply and add event listeners to any filter controls for this table.
	 * E.g. form inputs with the data attribute `[data-o-table-filter-id="tableId"]`
	 * @access private
	 */
	_setupFilters() {
		const tableId = this.rootEl.getAttribute('id');
		if (!tableId) {
			return;
		}
		// Do nothing if no filter is found for this table.
		const filter = window.document.querySelector(`[data-o-table-filter-id="${tableId}"]`);
		if (!filter) {
			return;
		}
		// Do not setup filter if markup is missing.
		if (!this.filterContainer) {
			console.warn(`Could not setup the filter for the table "${tableId}" as markup is missing. A filterable table must be within a div with class "o-table-container".`);
			return;
		}
		// Warn if a misconfigured filter was found.
		const filterColumn = parseInt(filter.getAttribute('data-o-table-filter-column'), 10);
		if (isNaN(filterColumn)) {
			console.warn(`Could not setup the filter for the table "${tableId}" as no column index was given to filter on. Add a \`data-o-table-filter-column="{columnIndex}"\` attribute to the filter.`, filter);
			return;
		}
		// Apply the filter .
		if (filter.value) {
			this.filter(filterColumn, filter.value);
		}
		// Add a listener to filter the table.
		let pendingFilterTimeout;
		const debouncedFilterHandler = function(event) {
			if (pendingFilterTimeout) {
				clearTimeout(pendingFilterTimeout);
			}
			pendingFilterTimeout = setTimeout(function () {
				this.filter(filterColumn, event.target.value || '');
				pendingFilterTimeout = null;
			}.bind(this), 33);
		}.bind(this);
		filter.addEventListener('input', debouncedFilterHandler);
		filter.addEventListener('change', debouncedFilterHandler);
		this._listeners.push({ element: filter, debouncedFilterHandler, type: 'input' });
		this._listeners.push({ element: filter, debouncedFilterHandler, type: 'change' });
	}

	/**
	 * Update the o-table instance with rows added or removed dynamically from
	 * the table. Applies any existing sort and filter to new rows.
	 *
	 * @returns {undefined}
	 */
	updateRows() {
		const rows = this._getLatestRowNodes();
		// Set o-table rows.
		this.tableRows = rows;
		// Re-apply sort.
		if (this._currentSort) {
			const { columnIndex, sortOrder } = this._currentSort;
			this.sortRowsByColumn(columnIndex, sortOrder);
		}
		// Re-apply filter.
		if (this._currentFilter) {
			const { columnIndex, filter } = this._currentFilter;
			this._filterRowsByColumn(columnIndex, filter);
		}
		// Render rows.
		this.renderRowUpdates();
	}

	/**
	 * Get all the table body's current row nodes.
	 *
	 * @returns {Array<Node>}
	 * @access private
	 */
	_getLatestRowNodes() {
		return this.tbody ? Array.from(this.tbody.getElementsByTagName('tr')) : [];
	}

	/**
	 * Updates the dom to account for row updates, including when their sort
	 * order changes, or any filter is applied. E.g. changes the dom order,
	 * applies aria-labels to hidden rows, updates the table height to
	 * efficiently hide them.
	 *
	 * Note this does not calculate which rows should be sorted or filtered,
	 * and does not look for new rows added to the dom. See `updateRows`.
	 *
	 * @see updateRows
	 * @returns {undefined}
	 */
	renderRowUpdates() {
		this._updateRowAriaHidden();
		this._hideFilteredRows();
		this._updateTableHeight();
		this._updateRowOrder();
	}

	/**
	 * Hide filtered rows by updating the container height.
	 * Filtered rows are not removed from the table so column width is not
	 * recalculated. Unfortunately "visibility: collaposed" has inconsistent
	 * support.
	 */
	_updateTableHeight() {
		if (!this.filterContainer) {
			console.warn(`The table has missing markup. A responsive or filterable table must be within a div with class "o-table-container".`, this.rootEl);
			return;
		}

		if (this._updateTableHeightScheduled) {
			window.cancelAnimationFrame(this._updateTableHeightScheduled);
		}

		const tableHeight = this._getTableHeight();

		this._updateTableHeightScheduled = window.requestAnimationFrame(function () {
			this.filterContainer.style.height = !isNaN(tableHeight) ? `${tableHeight}px` : '';
		}.bind(this));

		// If the table height has been set, it should be updated on resize,
		// so listen to resize events.
		if (!this._updateTableHeightListenerSet) {
			// debounce the height update on resize
			// breaking: on the next major release use the o-utils
			// debounce function instead
			let pendingTableHeightUpdate;
			const updateTableHeightDebounced = function () {
				if (pendingTableHeightUpdate) {
					clearTimeout(pendingTableHeightUpdate);
				}
				pendingTableHeightUpdate = setTimeout(function () {
					this._updateTableHeight();
				}.bind(this), 33);
			}.bind(this);
			// set the resize listener
			window.addEventListener('resize', updateTableHeightDebounced);
			// add to the listeners array so it can be removed on `.destroy`
			this._listeners.push({ element: window, updateTableHeightDebounced, type: 'resize' });
			// set a flag so the listener isn't set again, without having to
			// loop through `this._listeners`.
			this._updateTableHeightListenerSet = true;
		}
	}

	/**
	 * Get the table height, accounting for "hidden" rows.
	 * @return {Number|Null}
	 */
	_getTableHeight() {
		const tableHeight = this.rootEl.getBoundingClientRect().height;
		const filteredRowsHeight = this._rowsToHide.reduce((accumulatedHeight, row) => {
			return accumulatedHeight + row.getBoundingClientRect().height;
		}, 0);

		return tableHeight - filteredRowsHeight;
	}

	/**
	* Update the "aria-hidden" attribute of all hidden table rows.
	* Rows may be hidden for a number of reasons, including being filtered.
	*/
	_updateRowAriaHidden() {
		if (this._updateRowAriaHiddenScheduled) {
			window.cancelAnimationFrame(this._updateRowAriaHiddenScheduled);
		}

		const rowsToHide = this._rowsToHide || [];
		this._updateRowAriaHiddenScheduled = window.requestAnimationFrame(function () {
			this.tableRows.forEach((row) => {
				row.setAttribute('aria-hidden', rowsToHide.indexOf(row) !== -1);
			});
		}.bind(this));
	}

	/**
	 * Hide filtered rows by updating the "data-o-table-filtered" attribute.
	 * Filtered rows are removed from the table using CSS so column width is
	 * not recalculated.
	 */
	_hideFilteredRows() {
		if (this._hideFilteredRowsScheduled) {
			window.cancelAnimationFrame(this._hideFilteredRowsScheduled);
		}

		const filteredRows = this._filteredTableRows || [];
		this._hideFilteredRowsScheduled = window.requestAnimationFrame(function () {
			this.tableRows.forEach((row) => {
				row.setAttribute('data-o-table-filtered', filteredRows.indexOf(row) !== -1);
			});
		}.bind(this));
	}

	/**
	* Updates the order of table rows in the DOM. This is required upon sort,
	* but also on filter as hidden rows must be at the bottom of the table.
	* Otherwise the stripped pattern of the stripped table is not maintained.
	*/
	_updateRowOrder() {
		if (this._updateRowOrderScheduled) {
			window.cancelAnimationFrame(this._updateRowOrderScheduled);
		}
		if (this._updateRowOrderFilrtedBatchScheduled) {
			window.cancelAnimationFrame(this._updateRowOrderFilrtedBatchScheduled);
		}

		if (!this._currentSort && !this._currentFilter) {
			return;
		}

		const nonFilteredRows = this.tableRows.filter(row => this._filteredTableRows.indexOf(row) === -1);
		this._updateRowOrderScheduled = window.requestAnimationFrame(function () {
			// Move all non-filtered rows to the top, with current sort order.
			prepend(this.tbody, nonFilteredRows);
			this._updateRowOrderFilrtedBatchScheduled = window.requestAnimationFrame(function () {
				// Move all filtered rows to the bottom, with current sort order.
				append(this.tbody, this._filteredTableRows);
			}.bind(this));
		}.bind(this));
	}

	/**
	 * Filter the table and render the result.
	 *
	 * @access public
	 * @param {Number} headerIndex - The index of the table column to filter.
	 * @param {String|Function} filter - How to filter the column (either a string to match or a callback function).
	 * @returns {undefined}
	 */
	filter(headerIndex, filter) {
		this._filterRowsByColumn(headerIndex, filter);
		this.renderRowUpdates();
	}

	/**
	 * Filters the table rows by a given column and filter.
	 * This does not render the result to the DOM.
	 *
	 * @access private
	 * @param {Number} columnIndex - The index of the table column to filter.
	 * @param {String|Function} filter - How to filter the column (either a string to match or a callback function).
	 * @returns {undefined}
	 */
	_filterRowsByColumn(columnIndex, filter) {
		this._currentFilter = {
			columnIndex,
			filter
		};

		if (typeof filter !== 'string' && typeof filter !== 'function') {
			throw new Error(`Could not filter table column "${columnIndex}". Expected the filter to a string or function.`, this);
		}

		// Filter column headings.
		this._filteredTableRows = [];
		this.tableRows.forEach(row => {
			const cell = row.querySelector(`td:nth-of-type(${columnIndex + 1})`);
			if (cell) {
				const hideRow = BaseTable._filterMatch(cell, filter);
				if (hideRow) {
					this._filteredTableRows.push(row);
				}
			}
		});
	}

	/**
	 * Check if a given table cell matches the table filter.
	 *
	 * @access private
	 * @param {Element} cell - The table cell to test the filter function against.
	 * @param {String|Function} filter - The filter, either a string or callback function.
	 * @returns {Boolean}
	 */
	static _filterMatch(cell, filter) {
		// If the filter is a string create a filter function which:
		// - Always matches an emtpy string (no filter).
		// - Matches against only alpha numeric characters and ".".
		// - Case insentivie.
		// - Whitespace insentivie.
		if (typeof filter === 'string') {
			const filterValue = filter.replace(/[^\w\.]+/g, '').toLowerCase();
			filter = (cell) => {
				const cellValue = cell.textContent.replace(/[^\w\.]+/g, '').toLowerCase();
				return filterValue ? cellValue.indexOf(filterValue) > -1 : true;
			};
		}

		// Check if the filter matches the given table cell.
		return filter(cell) !== true;
	}

	/**
	 * Which rows are hidden, e.g. by a filter.
	 * @returns {Array[Node]}
	 */
	get _rowsToHide() {
		return this._filteredTableRows;
	}

	/**
	 * Gets a table header for a given column index.
	 *
	 * @access public
	 * @param {Number} columnIndex - The index of the table column to get the header for.
	 * @throws When no header is not found.
	 * @returns {HTMLElement}
	 */
	getTableHeader(columnIndex) {
		const th = this.tableHeaders[columnIndex];
		if (!th) {
			throw new Error(`Could not find header for column index "${columnIndex}".`);
		}
		return th;
	}

	/**
	 * Sort the table.
	 *
	 * @access public
	 * @param {Number} columnIndex - The index of the table column to sort.
	 * @param {Number} sortOrder - How to sort the column, "ascending" or "descending"
	 * @returns {undefined}
	 */
	sortRowsByColumn(columnIndex, sortOrder) {
		/**
		 * Fires an "oTable.sorting" event. The sorting event can be cancelled to
		 * provide a totally custom method of sorting the table.
		 * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent
		 */
		const defaultSort = this._dispatchEvent('sorting', {
			sort: sortOrder,
			columnIndex
		}, { cancelable: true });

		if (defaultSort) {
			this._sorter.sortRowsByColumn(this, columnIndex, sortOrder);
		}
	}

	/**
	 * Add sort buttons to the DOM within the table header.
	 * @returns {undefined}
	 */
	addSortButtons() {
		if (!this._opts.sortable) {
			return;
		}

		// Create buttons for each table header.
		const tableHeaderButtons = this.tableHeaders.map((th) => {
			// Don't add sort buttons to unsortable columns.
			if (th.hasAttribute('data-o-table-heading-disable-sort')) {
				return null;
			}
			// Don't add sort buttons to columns with no headings.
			if (!th.hasChildNodes()) {
				return null;
			}
			// Move heading text into button.
			const headingNodes = Array.from(th.childNodes);
			const headingHTML = headingNodes.reduce((html, node) => {
				// Maintain child elements of the heading which make sense in a button.
				const maintainedElements = ['ABBR', 'B', 'BDI', 'BDO', 'BR', 'CODE', 'CITE', 'DATA', 'DFN', 'DEL', 'EM', 'I', 'S', 'SMALL', 'SPAN', 'STRONG', 'SUB', 'SUP', 'TIME', 'U', 'VAR', 'WBR'];
				if (node.nodeType === Node.ELEMENT_NODE && maintainedElements.indexOf(node.nodeName) !== -1) {
					return html + node.outerHTML;
				}
				// Otherwise return text content.
				if (node.nodeType === Node.ELEMENT_NODE) {
					console.warn(`o-table has removed the element "${node.nodeName}" from the table heading to add a sort button on the column. Please remove this element from your table heading, disable sort on this column, or contact the Origami team for help.`, th);
				}
				return html + node.textContent;
			}, '');

			const sortButton = document.createElement('button');
			sortButton.innerHTML = headingHTML;
			sortButton.classList.add('o-table__sort');
			// In VoiceOver, button `aria-label` is repeated when moving from one column of tds to the next.
			// Using `title` avoids this, but risks not being announced by other screen readers.
			const nextSort = this._getNextSortOrder(th);
			sortButton.setAttribute('title', `sort table by "${th.textContent}" ${nextSort}`);
			return sortButton;
		});

		// Add sort buttons to table headers.
		window.requestAnimationFrame(function (){
			this.rootEl.classList.add('o-table--sortable');
			this.tableHeaders.forEach((th, index) => {
				if (tableHeaderButtons[index]) {
					th.innerHTML = '';
					th.appendChild(tableHeaderButtons[index]);
				}
			});
		}.bind(this));

		// Add click event to buttons.
		const listener = this._sortButtonHandler.bind(this);
		this._rootElDomDelegate = this._rootElDomDelegate || new Delegate(this.rootEl);
		this._rootElDomDelegate.on('click', '.o-table__sort', listener);
	}

	/**
	 * Indicate that the table has been sorted after intercepting the sorting event.
	 *
	 * @access public
	 * @param {Object} sortDetails - Details of the current sort state.
	 * @param {Number|Null} sortDetails.columnIndex - The index of the currently sorted column.
	 * @param {String|Null} sortDetails.sortOrder - The type of sort, "ascending" or "descending"
	 */
	sorted({ columnIndex, sortOrder }) {
		if (isNaN(columnIndex)) {
			throw new Error(`Expected a numerical column index but received "${columnIndex}".`);
		}
		if (!sortOrder) {
			throw new Error(`Expected a sort order e.g. "ascending" or "descending".`);
		}
		this._currentSort = {
			sortOrder,
			columnIndex
		};

		// Update the button title to reflect the new sort.
		const th = this.getTableHeader(columnIndex);
		const sortButton = th.querySelector('button');
		if (sortButton) {
			let buttonTitle = sortButton.getAttribute('title');
			buttonTitle = sortOrder === 'ascending' ?
				buttonTitle.replace('ascending', 'descending') :
				buttonTitle.replace('descending', 'ascending');
			sortButton.setAttribute('title', buttonTitle);
		}

		this._dispatchEvent('sorted', this._currentSort);
	}

	/**
	 * Gets the instance ready for deletion.
	 * Removes event listeners that were added during instatiation of the component.
	 * @access public
	 * @returns {undefined}
	 */
	destroy() {
		if (this._rootElDomDelegate) {
			this._rootElDomDelegate.destroy();
		}
		this._listeners.forEach(({ type, listener, element }) => {
			element.removeEventListener(type, listener);
		});

		// Remove DOM references.
		delete this.thead;
		delete this.tbody;
		delete this.tableHeaders;
		delete this.tableRows;
		delete this._filteredTableRows;
		delete this.wrapper;
		delete this.container;
		delete this.overlayWrapper;
		delete this.filterContainer;
	}

	/**
	 * Indicate that the table has been constructed successfully.
	 * @returns {undefined}
	 */
	_ready() {
		this._dispatchEvent('ready');
	}

	/**
	 * Column sort orders are toggled. For a given column heading, return
	 * the next sort order which should be applied.
	 * @param {Element} th - The heading for the column to be sorted.
	 * @returns {String} - What the next sort order for the heading should be, 'ascending' or 'descending'.
	 */
	_getNextSortOrder(th) {
		// Get the current table sort. Use the `aria-sort` attribute
		// which may have been applied by a client or server side sort.
		const currentSort = th.getAttribute('aria-sort');
		// If there is no existing sort use a descending sort if that has been
		// configured as a preferred sort order for the given heading.
		const noExistingSort = [null, 'none'].indexOf(currentSort) !== -1;
		if (noExistingSort && this._opts.preferredSortOrder === 'descending') {
			return 'descending';
		}
		// Otherwise the next sort will be ascending by default, or descending
		// if the column is already sorted ascending.
		return currentSort !== 'ascending' ? 'ascending' : 'descending';
	}

	/**
	 * Handles a sort button click event. Toggles column sort.
	 * @param {MouseEvent} event - The click event.
	 * @returns {undefined}
	 */
	_sortButtonHandler(event) {
		const sortButton = event.target;
		const th = sortButton.closest('th');
		const columnIndex = this.tableHeaders.indexOf(th);
		if (th && !isNaN(columnIndex)) {
			const sortOrder = this._getNextSortOrder(th);
			this.sortRowsByColumn(columnIndex, sortOrder);
		}
	}

	/**
	 * Helper function to dispatch namespaced events.
	 *
	 * @param {String} event - The event name within `oTable` e.g. "sorted".
	 * @param {Object} data={} - Event data. `instance` is added automatically.
	 * @param {Object} opts={} - [Event options]{@link https://developer.mozilla.org/en-US/docs/Web/API/Event/Event#Values} (o-table events bubble by default).
	 */
	_dispatchEvent(event, data = {}, opts = {}) {
		Object.assign(data , {
			instance: this
		});
		return this.rootEl.dispatchEvent(new CustomEvent(`oTable.${event}`, Object.assign({
			detail: data,
			bubbles: true
		}, opts)));
	}
}

export default BaseTable;
