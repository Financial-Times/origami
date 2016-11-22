/*global describe,beforeEach,afterEach,it*/

import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';

const sandbox =  require('./helpers/sandbox');
const OTable = require('./../main');

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

	it('sorts by ascending order first if not told otherwise', done => {
		testOTable = new OTable(oTableEl);
		// TODO - Add a click polyfill to polyfill-service
		const click = document.createEvent("MouseEvent");
		click.initMouseEvent("click", true, true, window,
			0, 0, 0, 0, 0, false, false, false, false, 0, null);
		oTableEl.querySelector('thead th').dispatchEvent(click);
		oTableEl.addEventListener('oTable.sorted', () => {
			const rows = oTableEl.querySelectorAll('tbody tr td');
			proclaim.equal(rows[0].textContent, 'cheddar');
			proclaim.equal(rows[1].textContent, 'red leicester');
			proclaim.equal(rows[2].textContent, 'stilton');
			done();
		});
	});

	it('adds a sort order data attribute to the root element of the component', done => {
		testOTable = new OTable(oTableEl);
		// TODO - Add a click polyfill to polyfill-service
		const click = document.createEvent("MouseEvent");
		click.initMouseEvent("click", true, true, window,
			0, 0, 0, 0, 0, false, false, false, false, 0, null);
		oTableEl.querySelector('thead th').dispatchEvent(click);
		oTableEl.addEventListener('oTable.sorted', () => {
			proclaim.equal(oTableEl.getAttribute('data-o-table-order'), 'ASC');
			done();
		});
	});

	it('alternates sorting between ascending and descending', done => {
		testOTable = new OTable(oTableEl);
		// TODO - Add a click polyfill to polyfill-service
		const click = document.createEvent("MouseEvent");
		click.initMouseEvent("click", true, true, window,
			0, 0, 0, 0, 0, false, false, false, false, 0, null);
		oTableEl.querySelector('thead th').dispatchEvent(click);
		oTableEl.querySelector('thead th').dispatchEvent(click);
		oTableEl.addEventListener('oTable.sorted', () => {
			proclaim.equal(oTableEl.getAttribute('data-o-table-order'), 'DES');
			const rows = oTableEl.querySelectorAll('tbody tr td');
			proclaim.equal(rows[0].textContent, 'stilton');
			proclaim.equal(rows[1].textContent, 'red leicester');
			proclaim.equal(rows[2].textContent, 'cheddar');
			done();
		});
	});

	it('sorts strings alphabetically', done => {
		testOTable = new OTable(oTableEl);
		// TODO - Add a click polyfill to polyfill-service
		const click = document.createEvent("MouseEvent");
		click.initMouseEvent("click", true, true, window,
			0, 0, 0, 0, 0, false, false, false, false, 0, null);
		oTableEl.querySelector('thead th').dispatchEvent(click);
		oTableEl.addEventListener('oTable.sorted', () => {
			const rows = oTableEl.querySelectorAll('tbody tr td');
			proclaim.equal(rows[0].textContent, 'cheddar');
			proclaim.equal(rows[1].textContent, 'red leicester');
			proclaim.equal(rows[2].textContent, 'stilton');
			proclaim.equal(oTableEl.getAttribute('data-o-table-order'), 'ASC');
			done();
		});
	});

	it('sorts columns marked as numeric, numerically', done => {
		sandbox.reset();
		sandbox.init();
		sandbox.setContents(`
			<table class="o-table" data-o-component="o-table">
				<thead>
					<th data-o-table-data-type="numeric">Price</th>
				</thead>
				<tbody>
					<tr>
						<td data-o-table-data-type="numeric">12.03</td>
					</tr>
					<tr>
						<td data-o-table-data-type="numeric">1.2</td>
					</tr>
					<tr>
						<td data-o-table-data-type="numeric">3</td>
					</tr>
				</tbody>
			</table>
		`);
		oTableEl = document.querySelector('[data-o-component=o-table]');
		testOTable = new OTable(oTableEl);
		// TODO - Add a click polyfill to polyfill-service
		const click = document.createEvent("MouseEvent");
		click.initMouseEvent("click", true, true, window,
			0, 0, 0, 0, 0, false, false, false, false, 0, null);
		oTableEl.querySelector('thead th').dispatchEvent(click);
		oTableEl.addEventListener('oTable.sorted', () => {
			const rows = oTableEl.querySelectorAll('tbody tr td'); 
			proclaim.equal(rows[0].textContent, '1.2');
			proclaim.equal(rows[1].textContent, '3');
			proclaim.equal(rows[2].textContent, '12.03');
			proclaim.equal(oTableEl.getAttribute('data-o-table-order'), 'ASC');
			done();
		});
	});

	it('sorts via data-o-table-order if it is set', done => {
		sandbox.reset();
		sandbox.init();
		sandbox.setContents(`
			<table class="o-table" data-o-component="o-table">
				<thead>
					<th>Things</th>
				</thead>
				<tbody>
					<tr>
						<td data-o-table-order=2>snowman</td>
					</tr>
					<tr>
						<td data-o-table-order=3>42</td>
					</tr>
					<tr>
						<td data-o-table-order=1>pangea</td>
					</tr>
				</tbody>
			</table>
		`);
		oTableEl = document.querySelector('[data-o-component=o-table]');
		testOTable = new OTable(oTableEl);
		// TODO - Add a click polyfill to polyfill-service
		const click = document.createEvent("MouseEvent");
		click.initMouseEvent("click", true, true, window,
			0, 0, 0, 0, 0, false, false, false, false, 0, null);
		oTableEl.querySelector('thead th').dispatchEvent(click);
		oTableEl.addEventListener('oTable.sorted', () => {
			const rows = oTableEl.querySelectorAll('tbody tr td');
			proclaim.equal(rows[0].textContent, 'pangea');
			proclaim.equal(rows[1].textContent, 'snowman');
			proclaim.equal(rows[2].textContent, '42');
			proclaim.equal(oTableEl.getAttribute('data-o-table-order'), 'ASC');
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
		proclaim.isTrue(addEventListenerSpy.calledOnce);
		
		const columnHeadEventAndHandler = addEventListenerSpy.args[0];
		
		const realRemoveEventListener = Element.prototype.removeEventListener;
		const removeEventListenerSpy = sinon.spy();
		Element.prototype.removeEventListener = removeEventListenerSpy;
		
		testOTable.destroy();
		
		proclaim.isTrue(removeEventListenerSpy.calledOn(columnHead));
		proclaim.isTrue(removeEventListenerSpy.calledOnce);
		
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