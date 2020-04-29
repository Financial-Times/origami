/* eslint-env mocha */
/* global proclaim */

import * as sandbox from './helpers/sandbox';
import * as fixtures from './helpers/fixtures';
import FlatTable from './../src/js/Tables/FlatTable';
import BaseTable from './../src/js/Tables/BaseTable';
import TableSorter from './../src/js/Sort/TableSorter';
const sorter = new TableSorter();

describe("FlatTable", () => {
	let oTableEl;

	beforeEach(() => {
		sandbox.init();
		sandbox.setContents(fixtures.shortTableWithContainer);
		oTableEl = document.querySelector('[data-o-component=o-table]');
		oTableEl.classList.add('o-table--responsive-flat');
	});

	it('it fires an "oTable.ready" event when constructed', done => {
		window.addEventListener('oTable.ready', function () {
			done();
		});
		new FlatTable(oTableEl, sorter);
	});

	it('it extends BaseTable', () => {
		const table = new FlatTable(oTableEl, sorter);
		proclaim.isInstanceOf(table, BaseTable);
	});

	it('creates a row for each data cell with heading for the flat view (mobile version)', (done) => {
		const generatedRowsClass = '.o-table__duplicate-row';
		const generatedHeadingClass = '.o-table__duplicate-heading';
		const expectedRowCount = 25;
		const table = new FlatTable(oTableEl, sorter);
		setTimeout(() => {
			try {
				const generatedRows = table.rootEl.querySelectorAll(generatedRowsClass);
				proclaim.equal(
					generatedRows.length,
					expectedRowCount,
					`Expected to find ${expectedRowCount} generated table rows ` +
					`with class "${generatedHeadingClass}, "found ${generatedRows.length}.`
				);
				generatedRows.forEach(row => {
					const generatedHeadings = row.querySelectorAll(`${generatedHeadingClass}[scope="row"][role="rowheader"]`);
					const dataCells = row.querySelectorAll(`td`);
					proclaim.equal(
						generatedHeadings.length,
						1,
						`Expected generated rows to contain one heading with class` +
						`"${generatedHeadingClass}", scope="row", and role="rowheader".` +
						`Found ${generatedHeadings.length}.`);
					proclaim.equal(
						dataCells.length,
						1,
						`Expected generated rows to contain one data cell.` +
						`Found ${dataCells.length}.`);
				});
			} catch (error) {
				done(error);
			}
			done();
		}, 100); // wait for window.requestAnimationFrame
	});

	it('only includes original rows in the `tableRows` property, not those generated for the flat view (mobile version)', (done) => {
		const table = new FlatTable(oTableEl, sorter);
		setTimeout(() => {
			try {
				proclaim.equal(table.tableRows.length, 5, `Expected to find 5 table rows.`);
			} catch (error) {
				done(error);
			}
			done();
		}, 100); // wait for window.requestAnimationFrame
	});

	it('does not add any sort button to column headers when table has "data-o-table-sortable" set to false', done => {
		// Disable sort.
		oTableEl.setAttribute('data-o-table-sortable', false);
		// Try to add sort buttons.
		const table = new FlatTable(oTableEl, sorter);
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

	describe("updateRows", () => {
		it('for any new rows, creates a row for each data cell for the flat view (mobile version)', (done) => {
			const trClone = oTableEl.querySelector('tbody > tr').cloneNode({ deep: true });
			const table = new FlatTable(oTableEl, sorter);
			const originalTableRowLength = table.tableRows.length;
			setTimeout(() => {
				// table initialised and rendered
				// add a new row
				table.tbody.appendChild(trClone);
				// tell o-table the rows have updated
				table.updateRows();
				setTimeout(() => {
					try {
						// confirm o-table found the new row
						proclaim.equal(table.tableRows.length - originalTableRowLength, 1, `Expected to find 1 new table row.`);
						// confirm that all rows, including the new row, have been split into multiple rows for the "flat" view
						const generatedRowsClass = '.o-table__duplicate-row';
						const generatedHeadingClass = '.o-table__duplicate-heading';
						const expectedRowCount = 30;
						const generatedRows = table.rootEl.querySelectorAll(generatedRowsClass);
						proclaim.equal(
							generatedRows.length,
							expectedRowCount,
							`Expected to find ${expectedRowCount} generated table rows ` +
							`with class "${generatedHeadingClass}, "found ${generatedRows.length}.`
						);
					} catch (error) {
						done(error);
					}
					done();
				}, 100); // wait for window.requestAnimationFrame
			}, 100); // wait for window.requestAnimationFrame
		});
	});

});
