/*global describe,beforeEach,afterEach,it*/

const sandbox = require('./helpers/sandbox');
const OTable = require('./../main');

const chai = require('chai');
chai.use(require('chai-dom'));
const expect = chai.expect;
const sinon = require('sinon/pkg/sinon');

describe("wrap()", () => {

	beforeEach(() => {
		sandbox.init();
	});

	afterEach(() => {
		sandbox.reset();
	});

	it("is defined", () => {
		expect(OTable.wrap).not.to.be.undefined;
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
		expect(document.getElementById("initiallyUnwrappedTable").parentNode.classList.contains("o-table-wrapper")).to.be.true;
	});

	it("preserves position in DOM", () => {
		expect(document.querySelector(".sandbox").childNodes[1].classList.contains("o-table-wrapper")).to.be.true;
		expect(document.querySelector(".sandbox").childNodes[1].querySelector('.o-table')).to.equal(document.getElementById("initiallyUnwrappedTable"));
	});

	it("doesn't wrap already-wrapped tables", () => {
		expect(document.getElementById("initiallyWrappedTable").parentNode.parentNode.classList.contains("o-table-wrapper")).to.be.false;
	});

	it("doesn't re-wrap tables", () => {
		OTable.wrap();
		expect(document.getElementById("initiallyUnwrappedTable").parentNode.parentNode.classList.contains("o-table-wrapper")).to.be.false;
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
		expect(document.getElementById("initiallyUnwrappedTable").parentNode.classList.contains("test-wrapper")).to.be.true;
	});

	it("doesn't wrap tables that don't match selector", () => {
		expect(document.getElementById("tableNotToWrap").parentNode.classList.contains("test-wrapper")).to.be.false;
	});

	it("doesn't wrap already-wrapped tables", () => {
		expect(document.getElementById("initiallyWrappedTable").parentNode.parentNode.classList.contains("test-wrapper")).to.be.false;
	});

	it("doesn't re-wrap tables", () => {
		OTable.wrap(".test-container table", "test-wrapper");
		expect(document.getElementById("initiallyUnwrappedTable").parentNode.parentNode.classList.contains("test-wrapper")).to.be.false;
	});

});

describe("oTable API", () => {

	it("is defined", () => {
		expect(OTable).to.be.a('function');
	});

	it('has a static init method', () => {
		expect(OTable.init).to.be.a('function');
	});

	it('has a destroy instance method', () => {
		expect(OTable.prototype.destroy).to.be.a('function');
	});

	it('has a removeEventListeners instance method', () => {
		expect(OTable.prototype.removeEventListeners).to.be.a('function');
	});

	it('has a sortRowsByColumn instance method', () => {
		expect(OTable.prototype.sortRowsByColumn).to.be.a('function');
	});

	it('has a dispatch instance method', () => {
		expect(OTable.prototype.dispatch).to.be.a('function');
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
		expect(testOTable).to.be.a('object');
	});

	it('has the correct prototype', () => {
		testOTable = new OTable(oTableEl);
		expect(Object.getPrototypeOf(testOTable)).to.equal(OTable.prototype);
	});

	it('sets a data attribute on the root element of the component to indicate the JS has executed', () => {
		testOTable = new OTable(oTableEl);
		expect(oTableEl.hasAttribute('data-o-table--js')).to.be.true;
	});
	
	it('has an `isResponsive` property set to `false`', () => {
		testOTable = new OTable(oTableEl);
		expect(testOTable.isResponsive).to.be.false;
	});
	
	describe('when the table has data-o-table-responsive="flat"', () => {
		
		beforeEach(() => {
			oTableEl.setAttribute('data-o-table-responsive','flat');
		});
		
		it('has an `isResponsive` property set to `true`', () => {
			testOTable = new OTable(oTableEl);
			expect(testOTable.isResponsive).to.be.true;
		});
		
		it('should clone any `<th>` elements into all of the rows in the `<tbody>`', () => {
			testOTable = new OTable(oTableEl);

			const allBodyTableHeads = oTableEl.querySelectorAll('tbody th');
			expect(allBodyTableHeads).to.have.lengthOf(3);
			
			const firstRow = oTableEl.querySelectorAll('tbody tr')[0];
			const firstRowTableHeads = firstRow.querySelectorAll('th');
			expect(firstRowTableHeads).to.have.lengthOf(1);

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
			expect(rows[0]).to.have.text('cheddar');
			expect(rows[1]).to.have.text('red leicester');
			expect(rows[2]).to.have.text('stilton');
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
			expect(oTableEl).to.have.attribute('data-o-table-order', 'ASC');
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
			expect(oTableEl).to.have.attribute('data-o-table-order', 'DES');
			const rows = oTableEl.querySelectorAll('tbody tr td');
			expect(rows[0]).to.have.text('stilton');
			expect(rows[1]).to.have.text('red leicester');
			expect(rows[2]).to.have.text('cheddar');
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
			expect(rows[0]).to.have.text('cheddar');
			expect(rows[1]).to.have.text('red leicester');
			expect(rows[2]).to.have.text('stilton');
			expect(oTableEl).to.have.attribute('data-o-table-order', 'ASC');
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
			expect(rows[0]).to.have.text('1.2');
			expect(rows[1]).to.have.text('3');
			expect(rows[2]).to.have.text('12.03');
			expect(oTableEl).to.have.attribute('data-o-table-order', 'ASC');
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
			expect(rows[0]).to.have.text('pangea');
			expect(rows[1]).to.have.text('snowman');
			expect(rows[2]).to.have.text('42');
			expect(oTableEl).to.have.attribute('data-o-table-order', 'ASC');
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
			expect(table.hasAttribute('data-o-table--js')).to.be.true;
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
		expect(addEventListenerSpy.calledOn(columnHead)).to.be.true;
		expect(addEventListenerSpy.calledOnce).to.be.true;
		
		const columnHeadEventAndHandler = addEventListenerSpy.args[0];
		
		const realRemoveEventListener = Element.prototype.removeEventListener;
		const removeEventListenerSpy = sinon.spy();
		Element.prototype.removeEventListener = removeEventListenerSpy;
		
		testOTable.destroy();
		
		expect(removeEventListenerSpy.calledOn(columnHead)).to.be.true;
		expect(removeEventListenerSpy.calledOnce).to.be.true;
		
		expect(removeEventListenerSpy.calledWith(...columnHeadEventAndHandler)).to.be.true;
		
		Element.prototype.addEventListener = realAddEventListener;
		Element.prototype.removeEventListener = realRemoveEventListener;
	});

	it('when destroyed, removes the rootEl property from the object', () => {
		testOTable = new OTable(oTableEl);
		testOTable.destroy();
		expect(testOTable.rootEl).to.be.undefined;
	});

	it('when destroyed, removes the data attribute which was added during JS initialisation', () => {
		testOTable = new OTable(oTableEl);
		testOTable.destroy();
		expect(oTableEl.hasAttribute('data-o-table--js')).to.be.false;
	});
});
