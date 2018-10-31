/* eslint-env mocha */

import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';
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
});
