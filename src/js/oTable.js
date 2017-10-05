/**
 * Initialises an o-table components inside the element passed as the first parameter
 *
 * @param {(HTMLElement|string)} [el=document.body] - Element where to search for the o-table component. You can pass an HTMLElement or a selector string
 * @returns {OTable} - A single OTable instance
 */
function OTable(rootEl) {
	if (!rootEl) {
		rootEl = document.body;
	} else if (!(rootEl instanceof HTMLElement)) {
		rootEl = document.querySelector(rootEl);
	}
	if (rootEl.getAttribute('data-o-component') === "o-table") {
		this.rootEl = rootEl;
	} else {
		this.rootEl = rootEl.querySelector('[data-o-component~="o-table"]');
	}

	if (this.rootEl !== undefined) {
		this.listeners = [];
		this.isResponsive = false;
		this.rootEl.setAttribute('data-o-table--js', '');

		this.tableHeaders = Array.from(this.rootEl.querySelectorAll('thead th'));
		const tableRows = Array.from(this.rootEl.getElementsByTagName('tr'));

		this.tableHeaders.forEach((th, columnIndex) => {
			const listener = this._sortByColumn(columnIndex);
			this.listeners.push(listener);
			th.addEventListener('click', listener);
		});

		// "o-table--responsive-flat" configuration only works when there is a
		// `<thead>` block containing the table headers. If there are no headers
		// available, the `responsive-flat` class needs to be removed to prevent
		// headings being hidden.
		if (this.rootEl.getAttribute('data-o-table-responsive') === 'flat' && this.tableHeaders.length > 0) {
			this.isResponsive = true;
		} else {
			this.rootEl.classList.remove('o-table--responsive-flat');
		}

		if (this.isResponsive) {
			this._duplicateHeaders(tableRows, this.tableHeaders);
		}

		this.dispatch('ready', {
			oTable: this
		});
	}
}

/**
 *
 * @private
 * @param  {Number} columnIndex
 */
OTable.prototype._sortByColumn = function _sortByColumn (columnIndex) {
	return function (event) {
		let currentSort = event.currentTarget.getAttribute('aria-sort');
		this.tableHeaders.forEach((header) => {
			header.setAttribute('aria-sort', 'none');
		});
		if (this.rootEl.getAttribute('data-o-table-order') === null || currentSort === "none" || currentSort === "descending") {
			this.rootEl.setAttribute('data-o-table-order', 'ASC');
			event.currentTarget.setAttribute('aria-sort', 'ascending');
		} else {
			this.rootEl.setAttribute('data-o-table-order', 'DES');
			event.currentTarget.setAttribute('aria-sort', 'descending');
		}
		this.sortRowsByColumn(columnIndex, this.rootEl.getAttribute('data-o-table-order') === "ASC", event.currentTarget.getAttribute('data-o-table-data-type') === 'numeric');
	}.bind(this);
};

/**
 * Duplicate the table headers into each row
 * For use with responsive tables
 *
 * @private
 * @param  {array} rows Table rows
 */
OTable.prototype._duplicateHeaders = function _duplicateHeaders (rows, headers) {
	rows.forEach((row) => {
		const data = Array.from(row.getElementsByTagName('td'));
		data.forEach((td, dataIndex) => {
			td.parentNode.insertBefore(headers[dataIndex].cloneNode(true), td);
		});
	});
};

/**
 * Helper function to dispatch namespaced events, namespace defaults to oTable
 * @param  {String} event
 * @param  {Object} data={}
 * @param  {String} namespace='oTable'
 */
OTable.prototype.dispatch = function (event, data = {}, namespace = 'oTable') {
	this._timeoutID = setTimeout(() => {
		this.rootEl.dispatchEvent(new CustomEvent(namespace + '.' + event, {
			detail: data,
			bubbles: true
		}));
	}, 0);
};

/**
 * Helper function to remove all event handlers which were added during instantiation of the component
 * @returns {undefined}
 */
OTable.prototype.removeEventListeners = function () {
	const tableHeaders = Array.from(this.rootEl.querySelectorAll('thead th'));

	tableHeaders.forEach((th, columnIndex) => {
		th.removeEventListener('click', this.listeners[columnIndex]);
	});
};

function ascendingSort (a, b, isNumericValue) {
	if (isNumericValue && isNaN(a) || a < b) {
		return -1;
	} else if (isNumericValue && isNaN(b) || b < a) {
		return 1;
	} else {
		return 0;
	}
}

function descendingSort (a, b, isNumericValue) {
	if (isNumericValue && isNaN(a) || a < b) {
		return 1;
	} else if (isNumericValue && isNaN(b) || b < a) {
		return -1;
	} else {
		return 0;
	}
}

/**
 * Sorts the table by a specific column
 * @param  {number} The index of the column to sort the table by
 * @param  {bool} Which direction to sort in, ascending or descending
 * @param  {bool} Whether the values in this column are numeric, if they are numeric we convert the contents into numbers
 * @returns undefined
 */
OTable.prototype.sortRowsByColumn = function (index, sortAscending, isNumericValue) {
	const tbody = this.rootEl.querySelector('tbody');
	const rows = Array.from(tbody.querySelectorAll('tr'));

	rows.sort(function (a, b) {
		let aCol = a.querySelectorAll('td')[index];
		let bCol = b.querySelectorAll('td')[index];

		if (aCol.getAttribute('data-o-table-order') !== null) {
			aCol = aCol.getAttribute('data-o-table-order');
			bCol = bCol.getAttribute('data-o-table-order');
			if (!isNaN(parseInt(aCol, 10))) {
				aCol = parseInt(aCol, 10);
				bCol = parseInt(bCol, 10);
			}
		} else {
			aCol = aCol.textContent;
			bCol = bCol.textContent;
		}

		if (isNumericValue) {
			aCol = parseFloat(aCol.replace(/,/g,''));
			bCol = parseFloat(bCol.replace(/,/g,''));
		}

		if (sortAscending) {
			return ascendingSort(aCol, bCol, isNumericValue);
		} else {
			return descendingSort(aCol, bCol, isNumericValue);
		}

	});

	rows.forEach(function(row) {
		tbody.appendChild(row);
	});

	this.dispatch('sorted');
};

/**
 * Destroys the instance, removing any event listeners that were added during instatiation of the component
 * @returns undefined
 */
OTable.prototype.destroy = function() {
	if (this._timeoutID !== undefined) {
		clearTimeout(this._timeoutID);
		this._timeoutID = undefined;
	}
	this.rootEl.removeAttribute('data-o-table--js');
	this.removeEventListeners();
	delete this.rootEl;
};

/**
 * Initialises all o-table components inside the element passed as the first parameter
 *
 * @param {(HTMLElement|string)} [el=document.body] - Element where to search for o-table components. You can pass an HTMLElement or a selector string
 * @returns {Array|OTable} - An array of OTable instances or a single OTable instance
 */
OTable.init = function(el = document.body) {
	if (!(el instanceof HTMLElement)) {
		el = document.querySelector(el);
	}
	if (/\bo-table\b/.test(el.getAttribute('data-o-component'))) {
		return new OTable(el);
	}
	const tableEls = Array.from(el.querySelectorAll('[data-o-component~="o-table"]'));
	return tableEls.map(el => {
		return new OTable(el);
	});
};

OTable.wrap = function wrap(tableSelector, wrapClass) {
	tableSelector = typeof tableSelector === "string" ? tableSelector : ".o-table";
	wrapClass = typeof wrapClass === "string" ? wrapClass : "o-table-wrapper";

	const matchingEls = document.querySelectorAll(tableSelector);
	let wrapEl;

	if (matchingEls.length > 0) {
		wrapEl = document.createElement('div');
		wrapEl.setAttribute("class", wrapClass);

		for (let c = 0, l = matchingEls.length; c < l; c++) {
			const tableEl = matchingEls[c];

			if (!tableEl.parentNode.matches("." + wrapClass)) {
				wrapElement(tableEl, wrapEl.cloneNode(false));
			}
		}
	}
};

function wrapElement(targetEl, wrapEl) {
	const parentEl = targetEl.parentNode;
	parentEl.insertBefore(wrapEl, targetEl);
	wrapEl.appendChild(targetEl);
}

module.exports = OTable;
