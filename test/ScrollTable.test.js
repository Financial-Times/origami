/* eslint-env mocha */

import proclaim from 'proclaim';
import * as sandbox from './helpers/sandbox';
import * as fixtures from './helpers/fixtures';
import ScrollTable from './../src/js/Tables/ScrollTable';
import BaseTable from './../src/js/Tables/BaseTable';
import TableSorter from './../src/js/Sort/TableSorter';
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

	it('clones column data into a new row with row header', (done) => {
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

});
