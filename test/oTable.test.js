/* eslint-env mocha */
/* global proclaim */

import * as sandbox from './helpers/sandbox';
import * as fixtures from './helpers/fixtures';
import OTable from './../main';
import BaseTable from './../src/js/Tables/BaseTable';
import OverflowTable from './../src/js/Tables/OverflowTable';
import FlatTable from './../src/js/Tables/FlatTable';
import ScrollTable from './../src/js/Tables/ScrollTable';
import BasicTable from './../src/js/Tables/BasicTable';

describe('OTable constructs', () => {
	let oTableEl;
	let testOTable;

	beforeEach(() => {
		sandbox.init();
		sandbox.setContents(fixtures.shortTableWithContainer);
		oTableEl = document.querySelector('[data-o-component=o-table]');
	});

	afterEach(() => {
		testOTable = undefined;
		sandbox.reset();
		oTableEl = undefined;
	});

	it('a ScrollTable when the table has attribute data-o-table-responsive="scroll"', () => {
		oTableEl.setAttribute('data-o-table-responsive', 'scroll');
		testOTable = new OTable(oTableEl);
		proclaim.isInstanceOf(testOTable, ScrollTable);
	});

	it('an OverflowTable when the table has attribute data-o-table-responsive="overflow"', () => {
		oTableEl.setAttribute('data-o-table-responsive', 'overflow');
		testOTable = new OTable(oTableEl);
		proclaim.isInstanceOf(testOTable, OverflowTable);
	});


	it('a FlatTable when the table has attribute data-o-table-responsive="flat"', () => {
		oTableEl.setAttribute('data-o-table-responsive', 'flat');
		testOTable = new OTable(oTableEl);
		proclaim.isInstanceOf(testOTable, FlatTable);
	});

	it('a BasicTable when the table has attribute data-o-table-responsive=""', () => {
		oTableEl.setAttribute('data-o-table-responsive', '');
		testOTable = new OTable(oTableEl);
		proclaim.isInstanceOf(testOTable, BasicTable);
	});

	it('a BasicTable when the table does not have the data-o-table-responsive attribute', () => {
		oTableEl.removeAttribute('data-o-table-responsive');
		testOTable = new OTable(oTableEl);
		proclaim.isInstanceOf(testOTable, BasicTable);
	});
});

describe('Init', () => {

	beforeEach(() => {
		sandbox.init();
		sandbox.setContents(`
			${fixtures.shortTableWithContainer}
			${fixtures.shortTableWithContainer}
			${fixtures.shortTableWithContainer}
		`);
	});

	afterEach(() => {
		sandbox.reset();
	});

	it('instantiates every o-table in the document', () => {
		const tables = OTable.init();
		proclaim.equal(tables instanceof Array, true, 'init did not return an array of tables.');
		proclaim.equal(tables.length, 3, 'init did not return the expected number of tables.');
		proclaim.equal(tables[0] instanceof BaseTable, true, 'a table returned did not extend BaseTable.');
	});

	it('instantiates a single o-table for a given selector which returns one table', () => {
		const firstTable = document.querySelector('.o-table');
		firstTable.setAttribute('id', 'test-table');
		const otable = OTable.init('#test-table');
		proclaim.equal(otable instanceof BaseTable, true, 'Did not return an instance of BaseTable.');
	});
});
