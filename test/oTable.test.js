/* eslint-env mocha, sinon, proclaim */

import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';

import * as sandbox from './helpers/sandbox';
import OTable from './../main';

describe("wrap()", () => {

	beforeEach(() => {
		sandbox.init();
	});

	afterEach(() => {
		sandbox.reset();
	});

	it("is defined", () => {
		proclaim.isDefined(OTable.wrap);
	});

});

describe("wrap() - default classes", () => {

	beforeEach(() => {
		sandbox.init();
		sandbox.setContents('<p>Content before</p><table id="initiallyUnwrappedTable" class="o-table"></table><p>Content middle</p><div class="o-table-wrapper"><table id="initiallyWrappedTable" class="o-table"></table></div><p>Content after</p>');
		OTable.wrap();
	});

	afterEach(() => {
		sandbox.reset();
	});

	it("wraps table matching selector", () => {
		proclaim.isTrue(document.getElementById("initiallyUnwrappedTable").parentNode.classList.contains("o-table-wrapper"));
	});

	it("preserves position in DOM", () => {
		proclaim.isTrue(document.querySelector(".sandbox").childNodes[1].classList.contains("o-table-wrapper"));
		proclaim.equal(document.querySelector(".sandbox").childNodes[1].querySelector('.o-table'), document.getElementById("initiallyUnwrappedTable"));
	});

	it("doesn't wrap already-wrapped tables", () => {
		proclaim.isFalse(document.getElementById("initiallyWrappedTable").parentNode.parentNode.classList.contains("o-table-wrapper"));
	});

	it("doesn't re-wrap tables", () => {
		OTable.wrap();
		proclaim.isFalse(document.getElementById("initiallyUnwrappedTable").parentNode.parentNode.classList.contains("o-table-wrapper"));
	});

});

describe("wrap() - custom classes", () => {

	beforeEach(() => {
		sandbox.init();
		sandbox.setContents('<p>Content before</p><table id="tableNotToWrap" class="o-table"></table><p>Content middle</p><div class="test-container"><table id="initiallyUnwrappedTable" class="o-table"></table><div class="test-wrapper"><table id="initiallyWrappedTable" class="o-table"></table></div><p>Content after</p></div>');
		OTable.wrap(".test-container table", "test-wrapper");
	});

	afterEach(() => {
		sandbox.reset();
	});

	it("wraps table matching selector", () => {
		proclaim.isTrue(document.getElementById("initiallyUnwrappedTable").parentNode.classList.contains("test-wrapper"));
	});

	it("doesn't wrap tables that don't match selector", () => {
		proclaim.isFalse(document.getElementById("tableNotToWrap").parentNode.classList.contains("test-wrapper"));
	});

	it("doesn't wrap already-wrapped tables", () => {
		proclaim.isFalse(document.getElementById("initiallyWrappedTable").parentNode.parentNode.classList.contains("test-wrapper"));
	});

	it("doesn't re-wrap tables", () => {
		OTable.wrap(".test-container table", "test-wrapper");
		proclaim.isFalse(document.getElementById("initiallyUnwrappedTable").parentNode.parentNode.classList.contains("test-wrapper"));
	});

});

describe("oTable API", () => {

	it("is defined", () => {
		proclaim.isFunction(OTable);
	});

	it('has a static init method', () => {
		proclaim.isFunction(OTable.init);
	});

	it('has a destroy instance method', () => {
		proclaim.isFunction(OTable.prototype.destroy);
	});

	it('has a removeEventListeners instance method', () => {
		proclaim.isFunction(OTable.prototype.removeEventListeners);
	});

	it('has a sortRowsByColumn instance method', () => {
		proclaim.isFunction(OTable.prototype.sortRowsByColumn);
	});

	it('has a dispatch instance method', () => {
		proclaim.isFunction(OTable.prototype.dispatch);
	});

});

describe('An oTable instance', () => {
	let oTableEl;
	let testOTable;

	beforeEach(() => {
		sandbox.init();
		sandbox.setContents(`
			<table class="o-table" data-o-component="o-table">
				<thead>
					<th>Cheese</th>
				</thead>
				<tbody>
					<tr>
						<td>cheddar</td>
					</tr>
					<tr>
						<td>stilton</td>
					</tr>
					<tr>
						<td>red leicester</td>
					</tr>
				</tbody>
			</table>
		`);
		oTableEl = document.querySelector('[data-o-component=o-table]');
	});

	afterEach(() => {
		testOTable = undefined;
		sandbox.reset();
		oTableEl = undefined;
	});

	it('is defined', () => {
		testOTable = new OTable(oTableEl);
		proclaim.isObject(testOTable);
	});

	it('has the correct prototype', () => {
		testOTable = new OTable(oTableEl);
		proclaim.isInstanceOf(testOTable, OTable);
	});

	it('sets a data attribute on the root element of the component to indicate the JS has executed', () => {
		testOTable = new OTable(oTableEl);
		proclaim.isTrue(oTableEl.hasAttribute('data-o-table--js'));
	});

	it('has an `isResponsive` property set to `false`', () => {
		testOTable = new OTable(oTableEl);
		proclaim.isFalse(testOTable.isResponsive);
	});

	describe('when the table has data-o-table-responsive="flat"', () => {

		beforeEach(() => {
			oTableEl.setAttribute('data-o-table-responsive','flat');
		});

		it('has an `isResponsive` property set to `true`', () => {
			testOTable = new OTable(oTableEl);
			proclaim.isTrue(testOTable.isResponsive);
		});

		it('should clone any `<th>` elements into all of the rows in the `<tbody>`', () => {
			testOTable = new OTable(oTableEl);

			const allBodyTableHeads = oTableEl.querySelectorAll('tbody th');
			proclaim.lengthEquals(allBodyTableHeads, 3);

			const firstRow = oTableEl.querySelectorAll('tbody tr')[0];
			const firstRowTableHeads = firstRow.querySelectorAll('th');
			proclaim.lengthEquals(firstRowTableHeads, 1);

		});

	});

	it('fires an "oTable.ready" event when the JS for the component has executed', done => {
		testOTable = new OTable(oTableEl);
		oTableEl.addEventListener('oTable.ready', function() {
			done();
		});
	});

});

describe('Init', () => {

	beforeEach(() => {
		sandbox.init();
		sandbox.setContents(`
			<table class="o-table" data-o-component="o-table">
				<thead>
					<th>Cheese</th>
				</thead>
				<tbody>
					<tr>
						<td>cheddar</td>
					</tr>
					<tr>
						<td>stilton</td>
					</tr>
					<tr>
						<td>red leicester</td>
					</tr>
				</tbody>
			</table>

			<table class="o-table" data-o-component="o-table">
				<thead>
					<th>Cheese</th>
				</thead>
				<tbody>
					<tr>
						<td>cheddar</td>
					</tr>
					<tr>
						<td>stilton</td>
					</tr>
					<tr>
						<td>red leicester</td>
					</tr>
				</tbody>
			</table>

			<table class="o-table" data-o-component="o-table">
				<thead>
					<th>Cheese</th>
				</thead>
				<tbody>
					<tr>
						<td>cheddar</td>
					</tr>
					<tr>
						<td>stilton</td>
					</tr>
					<tr>
						<td>red leicester</td>
					</tr>
				</tbody>
			</table>
		`);
	});

	afterEach(() => {
		sandbox.reset();
	});

	it('instantiates every o-table piece of markup within the element given', () => {
		const oTables = OTable.init();
		const tables = oTables.map(oTable => oTable.rootEl);
		tables.forEach(table => {
			proclaim.isTrue(table.hasAttribute('data-o-table--js'));
		});
	});
});

describe('Destroying an oTable instance', () => {
	let oTableEl;
	let testOTable;

	beforeEach(() => {
		sandbox.init();
		sandbox.setContents(`
			<table class="o-table" data-o-component="o-table">
				<thead>
					<th>Cheese</th>
				</thead>
				<tbody>
					<tr>
						<td>cheddar</td>
					</tr>
					<tr>
						<td>stilton</td>
					</tr>
					<tr>
						<td>red leicester</td>
					</tr>
				</tbody>
			</table>
		`);
		oTableEl = document.querySelector('[data-o-component=o-table]');
	});

	afterEach(() => {
		testOTable = undefined;
		sandbox.reset();
		oTableEl = undefined;
	});

	it('when destroyed, removes all event listeners which were added by the component', () => {
		const realAddEventListener = Element.prototype.addEventListener;
		const addEventListenerSpy = sinon.spy();
		Element.prototype.addEventListener = addEventListenerSpy;

		testOTable = new OTable(oTableEl);

		const columnHead = document.querySelector('th');
		proclaim.isTrue(addEventListenerSpy.calledOn(columnHead));
		proclaim.isTrue(addEventListenerSpy.calledTwice);

		const columnHeadEventAndHandler = addEventListenerSpy.args[0];

		const realRemoveEventListener = Element.prototype.removeEventListener;
		const removeEventListenerSpy = sinon.spy();
		Element.prototype.removeEventListener = removeEventListenerSpy;

		testOTable.destroy();

		proclaim.isTrue(removeEventListenerSpy.calledOn(columnHead));
		proclaim.isTrue(removeEventListenerSpy.calledTwice);

		proclaim.isTrue(removeEventListenerSpy.calledWith(...columnHeadEventAndHandler));

		Element.prototype.addEventListener = realAddEventListener;
		Element.prototype.removeEventListener = realRemoveEventListener;
	});

	it('when destroyed, removes the rootEl property from the object', () => {
		testOTable = new OTable(oTableEl);
		testOTable.destroy();
		proclaim.isUndefined(testOTable.rootEl);
	});

	it('when destroyed, removes the data attribute which was added during JS initialisation', () => {
		testOTable = new OTable(oTableEl);
		testOTable.destroy();
		proclaim.isFalse(oTableEl.hasAttribute('data-o-table--js'));
	});
});

describe("getTableHeader()", () => {
	let oTableEl;
	let testOTable;

	beforeEach(() => {
		sandbox.init();
		sandbox.setContents(`
			<table class="o-table" data-o-component="o-table">
				<thead>
					<th id="firstHeader">Cheese</th>
					<th id="secondHeader">Letter</th>
				</thead>
				<tbody>
					<tr>
						<td>cheddar</td>
						<td>a</td>
					</tr>
					<tr>
						<td>stilton</td>
						<td>b</td>
					</tr>
					<tr>
						<td>red leicester</td>
						<td>c</td>
					</tr>
				</tbody>
			</table>
		`);
		oTableEl = document.querySelector('[data-o-component=o-table]');
		testOTable = new OTable(oTableEl);
	});

	afterEach(() => {
		sandbox.reset();
	});

	it('gets the first header for a column index of "0"', () => {
		const columnIndex = 0;
		const actual = testOTable.getTableHeader(columnIndex);
		const expected = document.getElementById('firstHeader');
		proclaim.equal(actual, expected);
	});

	it('gets the first header for a column index of "1"', () => {
		const columnIndex = 1;
		const actual = testOTable.getTableHeader(columnIndex);
		const expected = document.getElementById('secondHeader');
		proclaim.equal(actual, expected);
	});
});
