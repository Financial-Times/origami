/* eslint-env mocha */
/* global proclaim, sinon */

import * as sandbox from './helpers/sandbox';
import * as fixtures from './helpers/fixtures';
import BasicTable from './../src/js/Tables/BasicTable';
import BaseTable from './../src/js/Tables/BaseTable';
import TableSorter from './../src/js/Sort/TableSorter';
const sorter = new TableSorter();

describe("BasicTable", () => {
	let oTableEl;

	beforeEach(() => {
		sandbox.init();
		sandbox.setContents(fixtures.shortTableWithContainer);
		oTableEl = document.querySelector('[data-o-component=o-table]');
	});

	it('it fires an "oTable.ready" event when constructed', done => {
		window.addEventListener('oTable.ready', function () {
			done();
		});
		new BasicTable(oTableEl, sorter);
	});

	it('it extends BaseTable', () => {
		const table = new BasicTable(oTableEl, sorter);
		proclaim.isInstanceOf(table, BaseTable);
	});

	it('adds sort buttons', (done) => {
		const addSortSpy = sinon.spy(BasicTable.prototype, "addSortButtons");
		new BasicTable(oTableEl, sorter);
		setTimeout(() => {
			try {
				proclaim.isTrue(addSortSpy.calledOnce);
			} catch (error) {
				done(error);
			}
			addSortSpy.restore();
			done();
		}, 2); // wait for window.requestAnimationFrame
	});

	it('does not add any sort button to column headers when table has "data-o-table-sortable" set to false', done => {
		// Disable sort.
		oTableEl.setAttribute('data-o-table-sortable', false);
		// Try to add sort buttons.
		const table = new BasicTable(oTableEl, sorter);
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
});
