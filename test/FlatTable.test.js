/* eslint-env mocha */

import proclaim from 'proclaim';
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

	it('clones all headings into each row, so each cell has a row heading for the flat view (mobile version)', (done) => {
		const table = new FlatTable(oTableEl, sorter);
		setTimeout(() => {
			try {
				proclaim.equal(table.tableRows.length, 5, `Expected to find 5 table rows.`);
				table.tableRows.forEach(row => {
					const duplicateHeadingClass = '.o-table__duplicate-heading';
					const duplicateHeadings = row.querySelectorAll(`${duplicateHeadingClass}[scope="row"][role="rowheader"]`);
					proclaim.equal(duplicateHeadings.length, 5, `Expected table rows to contain a clone of all headings,  with class "${duplicateHeadingClass}", scope="row", and role="rowheader".`);
				});
			} catch (error) {
				done(error);
			}
			done();
		}, 100); // wait for window.requestAnimationFrame
	});

	describe("updateRows", () => {
		it('for any new rows, clones all headings into each row, so each cell has a row heading for the flat view (mobile version)', (done) => {
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
						// confirm that all rows, including the new row, have a duplicated heading for the "flat" view
						table.tableRows.forEach(row => {
							const duplicateHeadingClass = '.o-table__duplicate-heading';
							const duplicateHeadings = row.querySelectorAll(`${duplicateHeadingClass}[scope="row"][role="rowheader"]`);
							proclaim.equal(duplicateHeadings.length, 5, `Expected table rows to contain a clone of all headings,  with class "${duplicateHeadingClass}", scope="row", and role="rowheader".`);
						});
					} catch (error) {
						done(error);
					}
					done();
				}, 100); // wait for window.requestAnimationFrame
			}, 100); // wait for window.requestAnimationFrame
		});
	});

});
