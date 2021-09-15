/* eslint-env mocha */
/* global proclaim */

import * as sandbox from './helpers/sandbox.js';
import * as fixtures from './helpers/fixtures.js';
import ScrollTable from './../src/js/Tables/ScrollTable.js';
import BaseTable from './../src/js/Tables/BaseTable.js';
import TableSorter from './../src/js/Sort/TableSorter.js';
const sorter = new TableSorter();

describe("ScrollTable", () => {
	let oTableEl;

	beforeEach(() => {
		sandbox.init();
		sandbox.setContents(fixtures.shortTableWithContainer);
		oTableEl = document.querySelector('[data-o-component=o-table]');
		oTableEl.classList.add('o-table--responsive-scroll');
	});

	it('it fires an "oTable.ready" event when constructed', done => {
		window.addEventListener('oTable.ready', function () {
			done();
		});
		new ScrollTable(oTableEl, sorter);
	});

	it('it extends BaseTable', () => {
		const table = new ScrollTable(oTableEl, sorter);
		proclaim.isInstanceOf(table, BaseTable);
	});

	it('does not add any sort button to column headers when table has "data-o-table-sortable" set to false', done => {
		// Disable sort.
		oTableEl.setAttribute('data-o-table-sortable', false);
		// Try to add sort buttons.
		const table = new ScrollTable(oTableEl, sorter);
		table.addSortButtons();
		setTimeout(() => {
			try {
				const thead = oTableEl.querySelector('thead');
				const sortButtons = thead.querySelectorAll('button');
				proclaim.equal(sortButtons.length, 0, 'Expected to find no sort buttons when table has been set to non-sortable.');
			} catch (error) {
				done(error);
			} finally {
				done();
			}
		}, 100);
	});

	it('clones column data into a new row with row header for the "scroll" version of the table (mobile version)', (done) => {
		new ScrollTable(oTableEl, sorter);
		setTimeout(() => {
			try {
				const duplicateRowClass = '.o-table__duplicate-row';
				const duplicateRows = document.querySelectorAll(duplicateRowClass);
				proclaim.equal(duplicateRows.length, 5, `Expected to find 5 rows with duplicate data and class "${duplicateRowClass}".`);
				duplicateRows.forEach(row => {
					const duplicateHeadings = row.querySelectorAll('th[scope="row"][role="rowheader"]');
					proclaim.equal(duplicateHeadings.length, 1, `Expected to find a row heading within the rows of duplicate data, with scope="row" and role="rowheader".`);
				});
				done();
			} catch (error) {
				done(error);
			}
		}, 100); // wait for window.requestAnimationFrame
	});

	it('filters cloned column data for the "scroll" version of the table (mobile version)', (done) => {
		const table = new ScrollTable(oTableEl, sorter);
		table.filter(0, 'Durian');
		setTimeout(() => {
			try {
				const duplicateRowClass = '.o-table__duplicate-row';
				const duplicateRows = document.querySelectorAll(duplicateRowClass);
				duplicateRows.forEach((row) => {
					const visibleData = row.querySelectorAll('td[data-o-table-filtered="false"]');
					proclaim.equal(visibleData.length, 1, `Expected one non-filtered data point per row but found "${visibleData.length}".`);
				});
				done();
			} catch (error) {
				done(error);
			}
		}, 100); // wait for window.requestAnimationFrame
	});

	describe("updateRows", () => {
		it('for any new rows, clones column data into the rows created for the scroll view (mobile version)', (done) => {
			const trClone = oTableEl.querySelector('tbody > tr').cloneNode({ deep: true });
			const table = new ScrollTable(oTableEl, sorter);
			setTimeout(() => {
				// table initialised and rendered
				// add a new row
				table.tbody.appendChild(trClone);
				// tell o-table the rows have updated
				table.updateRows();
				// confirm new row data is reflected in the responsive "scroll" view
				setTimeout(() => {
					try {
						// find rows duplicated for the "scroll" view
						const duplicateRowClass = '.o-table__duplicate-row';
						const duplicateRows = document.querySelectorAll(duplicateRowClass);
						const originalDataNode = trClone.getElementsByTagName('td');
						// each duplicated row should have a `td` for the new
						// row which was added after the table was initialised
						duplicateRows.forEach((row, index) => {
							const data = row.getElementsByTagName('td');
							const lastDuplicateDataNode = data[data.length - 1];
							proclaim.equal(
								lastDuplicateDataNode.textContent,
								originalDataNode[index].textContent,
								'Expected each "td" of the new "tr" to be cloned and appened into rows for the scroll view.'
							);
						});
						done();
					} catch (error) {
						done(error);
					}
				}, 100); // wait for window.requestAnimationFrame
			}, 100); // wait for window.requestAnimationFrame
		});
	});

});
