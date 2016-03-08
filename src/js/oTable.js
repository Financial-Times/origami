'use strict';

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
		// Adding a class to the component to indicate that the JS has been loaded
		this.rootEl.setAttribute('data-o-table--js', '');

		const tableHeaders = Array.from(this.rootEl.querySelectorAll('thead th'));

		tableHeaders.forEach((th, columnIndex) => {
			const listener = this._sortByColumn(columnIndex);
			this.listeners.push(listener);
			th.addEventListener('click', listener);
		});

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
		if (this.rootEl.getAttribute('data-o-table-order') === null || this.rootEl.getAttribute('data-o-table-order') === "DES") {
			this.rootEl.setAttribute('data-o-table-order', 'ASC');
		} else {
			this.rootEl.setAttribute('data-o-table-order', 'DES');
		}
		this.sortRowsByColumn(columnIndex, this.rootEl.getAttribute('data-o-table-order') === "ASC", event.currentTarget.getAttribute('data-o-table-data-type') === 'numeric');
	}.bind(this);
};

let immediateID;

/**
 * Helper function to dispatch namespaced events, namespace defaults to oTable
 * @param  {String} event
 * @param  {Object} data={}
 * @param  {String} namespace='oTable'
 */
OTable.prototype.dispatch = function (event, data = {}, namespace = 'oTable') {
	immediateID = setImmediate(() => {
		this.rootEl.dispatchEvent(new CustomEvent(namespace + '.' + event, {
			detail: data,
			bubbles: true
		}));
	});
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

function ascendingSort (a, b) {
	if (a < b) {
		return -1;
	} else if (b < a) {
		return 1;
	} else {
		return 0;
	}
}

function descendingSort (a, b) {
	if (a < b) {
		return 1;
	} else if (b < a) {
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
	const rows = Array.from(this.rootEl.querySelectorAll('tbody tr'));
	const tbody = this.rootEl.querySelector('tbody');
	rows.sort(function (a, b) {
		let aCol = a.children[index];
		let bCol = b.children[index];
		if (!isNaN(parseInt(aCol.getAttribute('data-o-table-order')))) {
			aCol = parseInt(aCol.getAttribute('data-o-table-order'));
			bCol = parseInt(bCol.getAttribute('data-o-table-order'));
		} else {
			aCol = aCol.textContent;
			bCol = bCol.textContent;
		}

		if (isNumericValue) {
			aCol = parseFloat(aCol);
			bCol = parseFloat(bCol);
		}

		if (sortAscending) {
			return ascendingSort(aCol, bCol);
		} else {
			return descendingSort(aCol, bCol);
		}

	});

	tbody.innerHTML = '';

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
	if (immediateID !== undefined) {
		clearImmediate(immediateID);
		immediateID = undefined;
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
