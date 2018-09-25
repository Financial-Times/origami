/* eslint-env mocha, proclaim */
import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';

import * as sandbox from './helpers/sandbox';
import OTable from './../main';

describe('oTable sorting', () => {
	let oTableEl;
	let testOTable;

	const click = element => {
		// TODO - Add a click polyfill to polyfill-service
		const click = document.createEvent('MouseEvent');
		click.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		oTableEl.querySelector(element).dispatchEvent(click);
	};

	beforeEach(() => {
		sandbox.init();
		sandbox.setContents(`
			<table class="o-table" data-o-component="o-table">
				<thead>
					<tr>
						<th>Cheese</th>
					</tr>
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

	it('sorts by ascending order first if not told otherwise', done => {
		testOTable = new OTable(oTableEl);
		click('thead th');
		oTableEl.addEventListener('oTable.sorted', () => {
			const rows = oTableEl.querySelectorAll('tbody tr td');
			proclaim.equal(rows[0].textContent, 'cheddar');
			proclaim.equal(rows[1].textContent, 'red leicester');
			proclaim.equal(rows[2].textContent, 'stilton');
			done();
		});
	});

	it('ignores duplicated row headers in the body when sorting, which are added for the flat responsive table', done => {
		sandbox.setContents(`
			<table class="o-table o-table--responsive-flat" data-o-component="o-table" data-o-table-responsive="flat" data-o-table--js="">
				<thead>
					<tr>
						<th data-o-table-data-type="numeric" class="o-table__cell--numeric" tabindex="0">Cost (GBP)</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th data-o-table-data-type="numeric" class="o-table__cell--numeric o-table__duplicate-heading" tabindex="0">Cost (GBP)</th>
						<td data-o-table-data-type="numeric" class="o-table__cell--numeric">3</td>
					</tr>
					<tr>
						<th data-o-table-data-type="numeric" class="o-table__cell--numeric o-table__duplicate-heading" tabindex="0">Cost (GBP)</th>
						<td data-o-table-data-type="numeric" class="o-table__cell--numeric">1.75</td>
					</tr>
					<tr>
						<th data-o-table-data-type="numeric" class="o-table__cell--numeric o-table__duplicate-heading" tabindex="0">Cost (GBP)</th>
						<td data-o-table-data-type="numeric" class="o-table__cell--numeric">2</td>
					</tr>
				</tbody>
			</table>
		`);
		oTableEl = document.querySelector('[data-o-component=o-table]');
		testOTable = new OTable(oTableEl);
		click('thead th');
		oTableEl.addEventListener('oTable.sorted', () => {
			const rows = oTableEl.querySelectorAll('tbody tr td');
			proclaim.equal(rows[0].textContent, '1.75');
			proclaim.equal(rows[1].textContent, '2');
			proclaim.equal(rows[2].textContent, '3');
			done();
		});
	});

	it('does not sort if the heading has an attribute specifying not to', done => {
		sandbox.reset();
		sandbox.init();
		sandbox.setContents(`
			<table class="o-table" data-o-component="o-table">
				<thead>
					<tr>
						<th data-o-table-heading-disable-sort>Things</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>a</td>
					</tr>
					<tr>
						<td>c</td>
					</tr>
					<tr>
						<td>b</td>
					</tr>
				</tbody>
			</table>
		`);
		oTableEl = document.querySelector('[data-o-component=o-table]');
		testOTable = new OTable(oTableEl);
		const click = document.createEvent("MouseEvent");
		click.initMouseEvent("click", true, true, window,
			0, 0, 0, 0, 0, false, false, false, false, 0, null);
		oTableEl.querySelector('thead th[data-o-table-heading-disable-sort]').dispatchEvent(click);
		setTimeout(() => {
			const rows = oTableEl.querySelectorAll('tbody tr td');
			proclaim.equal(rows[1].textContent, 'c', 'The table column sorted with a click when sort was disabled for its header.');
			done();
		}, 100);
	});

	it('adds a sort order data attribute to the root element of the component', done => {
		testOTable = new OTable(oTableEl);
		click('thead th');
		oTableEl.addEventListener('oTable.sorted', () => {
			proclaim.equal(oTableEl.getAttribute('data-o-table-order'), 'ASC');
			done();
		});
	});

	it('alternates sorting between ascending and descending', done => {
		testOTable = new OTable(oTableEl);
		// First click ASC
		click('thead th');
		setTimeout(() => {
			oTableEl.addEventListener('oTable.sorted', () => {
				proclaim.equal(oTableEl.getAttribute('data-o-table-order'), 'DES');
				const rows = oTableEl.querySelectorAll('tbody tr td');
				proclaim.equal(rows[0].textContent, 'stilton');
				proclaim.equal(rows[1].textContent, 'red leicester');
				proclaim.equal(rows[2].textContent, 'cheddar');
				done();
			});
			// Second click DES
			click('thead th');
		}, 0);
	});

	it('sorts strings alphabetically', done => {
		testOTable = new OTable(oTableEl);
		click('thead th');
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
					<tr>
						<th data-o-table-data-type="numeric">Price</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td data-o-table-data-type="numeric">12.03</td>
					</tr>
					<tr>
						<td data-o-table-data-type="numeric">480,000</td>
					</tr>
					<tr>
						<td data-o-table-data-type="numeric">1.2</td>
					</tr>
					<tr>
						<td data-o-table-data-type="numeric">3</td>
					</tr>
					<tr>
						<td data-o-table-data-type="numeric">1,216,000</td>
					</tr>
					<tr>
						<td data-o-table-data-type="numeric"></td>
					</tr>
				</tbody>
			</table>
		`);
		oTableEl = document.querySelector('[data-o-component=o-table]');
		testOTable = new OTable(oTableEl);
		click('thead th');
		oTableEl.addEventListener('oTable.sorted', () => {
			const rows = oTableEl.querySelectorAll('tbody tr td');
			proclaim.equal(rows[0].textContent, '');
			proclaim.equal(rows[1].textContent, '1.2');
			proclaim.equal(rows[2].textContent, '3');
			proclaim.equal(rows[3].textContent, '12.03');
			proclaim.equal(rows[4].textContent, '480,000');
			proclaim.equal(rows[5].textContent, '1,216,000');
			proclaim.equal(oTableEl.getAttribute('data-o-table-order'), 'ASC');
			done();
		});
	});

	it('sorts via data-o-table-order alphabetically it is set', done => {
		sandbox.reset();
		sandbox.init();
		sandbox.setContents(`
			<table class="o-table" data-o-component="o-table">
				<thead>
					<tr>
						<th>Things</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td data-o-table-order="c">snowman</td>
					</tr>
					<tr>
						<td data-o-table-order="a">42</td>
					</tr>
					<tr>
						<td data-o-table-order="b">pangea</td>
					</tr>
				</tbody>
			</table>
		`);
		oTableEl = document.querySelector('[data-o-component=o-table]');
		testOTable = new OTable(oTableEl);
		click('thead th');
		oTableEl.addEventListener('oTable.sorted', () => {
			const rows = oTableEl.querySelectorAll('tbody tr td');
			proclaim.equal(rows[0].textContent, '42');
			proclaim.equal(rows[1].textContent, 'pangea');
			proclaim.equal(rows[2].textContent, 'snowman');
			proclaim.equal(oTableEl.getAttribute('data-o-table-order'), 'ASC');
			done();
		});
	});

	it('sorts localised strings alphabetically', done => {
		const items = ['café', 'apple', 'caffeine', 'Æ'];
		const expectedSortedRows = ['Æ', 'apple', 'café', 'caffeine'];

		sandbox.reset();
		sandbox.init();
		sandbox.setContents(`
			<table class="o-table" data-o-component="o-table">
				<thead>
					<tr>
						<th>Localised Things</th>
					</tr>
				</thead>
				<tbody>
					${items.reduce((output, item) => output + `<tr><td>${item}</td></tr>`, '')}
				</tbody>
			</table>
		`);
		oTableEl = document.querySelector('[data-o-component=o-table]');
		testOTable = new OTable(oTableEl);
		click('thead th');

		oTableEl.addEventListener('oTable.sorted', () => {
			const rows = Array.from(oTableEl.querySelectorAll('tbody tr td')).map(
				({ textContent }) => textContent
			);
			proclaim.deepEqual(rows, expectedSortedRows);
			proclaim.equal(oTableEl.getAttribute('data-o-table-order'), 'ASC');
			done();
		});
	});

	it('sorts localised strings alphabetically when the Intl.Collator API is not available', done => {
		const items = ['café', 'apple', 'caffeine', 'Æ'];
		const expectedSortedRows = ['Æ', 'apple', 'café', 'caffeine'];

		sandbox.reset();
		sandbox.init();
		sandbox.setContents(`
			<table class="o-table" data-o-component="o-table">
				<thead>
					<tr>
						<th>Localised Things</th>
					</tr>
				</thead>
				<tbody>
					${items.reduce((output, item) => output + `<tr><td>${item}</td></tr>`, '')}
				</tbody>
			</table>
		`);
		oTableEl = document.querySelector('[data-o-component=o-table]');

		const intlBackup = Intl;
		delete global.Intl;
		testOTable = new OTable(oTableEl);
		click('thead th');

		oTableEl.addEventListener('oTable.sorted', () => {
			global.Intl = intlBackup;
			const rows = Array.from(oTableEl.querySelectorAll('tbody tr td')).map(
				({ textContent }) => textContent
			);
			proclaim.deepEqual(rows, expectedSortedRows);
			proclaim.equal(oTableEl.getAttribute('data-o-table-order'), 'ASC');
			done();
		});
	});

	it('sorts via data-o-table-order numerically if it is set and numeric', done => {
		sandbox.reset();
		sandbox.init();
		sandbox.setContents(`
			<table class="o-table" data-o-component="o-table">
				<thead>
					<tr>
						<th>Things</th>
					</tr>
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
		click('thead th');
		oTableEl.addEventListener('oTable.sorted', () => {
			const rows = oTableEl.querySelectorAll('tbody tr td');
			proclaim.equal(rows[0].textContent, 'pangea');
			proclaim.equal(rows[1].textContent, 'snowman');
			proclaim.equal(rows[2].textContent, '42');
			proclaim.equal(oTableEl.getAttribute('data-o-table-order'), 'ASC');
			done();
		});
	});

	it('sorts via data-o-table-order alphabetically it is set, regardless of whether cell is <th> or <td>', done => {
		sandbox.reset();
		sandbox.init();
		sandbox.setContents(`
			<table class="o-table" data-o-component="o-table">
				<thead>
					<tr>
						<th>Things</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th data-o-table-order="c">snowman</th>
					</tr>
					<tr>
						<th data-o-table-order="a">42</th>
					</tr>
					<tr>
						<th data-o-table-order="b">pangea</th>
					</tr>
				</tbody>
			</table>
		`);
		oTableEl = document.querySelector('[data-o-component=o-table]');
		testOTable = new OTable(oTableEl);
		click('thead th');
		oTableEl.addEventListener('oTable.sorted', () => {
			const rows = oTableEl.querySelectorAll('tbody tr th');
			proclaim.equal(rows[0].textContent, '42');
			proclaim.equal(rows[1].textContent, 'pangea');
			proclaim.equal(rows[2].textContent, 'snowman');
			proclaim.equal(oTableEl.getAttribute('data-o-table-order'), 'ASC');
			done();
		});
	});

	it('can be intercepted for a custom sort implementation', done => {
		sandbox.reset();
		sandbox.init();
		sandbox.setContents(`
			<table class="o-table" data-o-component="o-table">
				<thead>
					<tr>
						<th>Things</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th data-o-table-order="c">snowman</th>
					</tr>
					<tr>
						<th data-o-table-order="a">42</th>
					</tr>
					<tr>
						<th data-o-table-order="b">pangea</th>
					</tr>
				</tbody>
			</table>
		`);
		oTableEl = document.querySelector('[data-o-component=o-table]');
		testOTable = new OTable(oTableEl);
		sinon.spy(testOTable, "sortRowsByColumn");
		oTableEl.addEventListener('oTable.sorting', (event) => {
			event.preventDefault();
			// Column index, sort order, and table instance provided by the event.
			proclaim.equal(event.detail.columnIndex, 0);
			proclaim.equal(event.detail.sort, 'ASC');
			proclaim.equal(event.detail.oTable, testOTable);
			// Sorted event can be fired.
			event.detail.oTable.sorted(event.detail.columnIndex, event.detail.sort);
		});

		oTableEl.addEventListener('oTable.sorted', (event) => {
			// Standard sort has been intercepted but aria labels are handled for us.
			setTimeout(() => {
				const sortedHeading = event.detail.oTable.getTableHeader(event.detail.columnIndex);
				proclaim.equal(sortedHeading.getAttribute('aria-sort'), 'ascending');
				proclaim.isTrue(testOTable.sortRowsByColumn.notCalled);
				testOTable.sortRowsByColumn.restore();
				done();
			}, 0);
		});
		click('thead th');
	});

	describe('updates sort attributes when sorted', () => {
		let oTableElHeaders;

		beforeEach(() => {
			sandbox.reset();
			sandbox.init();
			sandbox.setContents(`
				<table class="o-table" data-o-component="o-table">
					<thead>
						<tr>
							<th>Things</th>
							<th>Other Things</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th data-o-table-order="c">snowman</th>
							<th data-o-table-order="c">snowman</th>
						</tr>
						<tr>
							<th data-o-table-order="a">42</th>
							<th data-o-table-order="a">42</th>
						</tr>
						<tr>
							<th data-o-table-order="b">pangea</th>
							<th data-o-table-order="b">pangea</th>
						</tr>
					</tbody>
				</table>
			`);
			oTableEl = document.querySelector('[data-o-component=o-table]');
			testOTable = new OTable(oTableEl);
			oTableElHeaders = Array.from(oTableEl.querySelectorAll('thead th'));
		});

		afterEach(() => {
			oTableElHeaders = undefined;
		});

		const checkExpectations = function (sortedHeaderIndex, otherHeaderIndex, expectedAriaValue, done) {
			sortedHeaderIndex = sortedHeaderIndex || 0;
			proclaim.equal(oTableElHeaders[sortedHeaderIndex].getAttribute('aria-sort'), expectedAriaValue);
			proclaim.equal(oTableElHeaders[otherHeaderIndex].getAttribute('aria-sort'), 'none');
			done();
		};

		it('by the first column, ASC', (done) => {
			const sortedHeaderIndex = 0;
			const otherHeaderIndex = 1;
			const sort = 'ASC';
			const expectedAriaValue = 'ascending';
			oTableEl.addEventListener('oTable.sorted', () => {
				checkExpectations(sortedHeaderIndex, otherHeaderIndex, expectedAriaValue, done);
			});
			testOTable.sorted(sortedHeaderIndex, sort);
		});

		it('by the second column, DES', (done) => {
			const sortedHeaderIndex = 1;
			const otherHeaderIndex = 0;
			const sort = 'DES';
			const expectedAriaValue = 'descending';
			oTableEl.addEventListener('oTable.sorted', () => {
				checkExpectations(sortedHeaderIndex, otherHeaderIndex, expectedAriaValue, done);
			});
			testOTable.sorted(sortedHeaderIndex, sort);
		});

		it('by the first column but with no sort specified', (done) => {
			const sortedHeaderIndex = 0;
			const otherHeaderIndex = 1;
			const sort = null;
			const expectedAriaValue = 'none';
			oTableEl.addEventListener('oTable.sorted', () => {
				checkExpectations(sortedHeaderIndex, otherHeaderIndex, expectedAriaValue, done);
			});
			testOTable.sorted(sortedHeaderIndex, sort);
		});

		it('by no column with no sort specified', (done) => {
			const sortedHeaderIndex = null;
			const otherHeaderIndex = 1;
			const sort = null;
			const expectedAriaValue = 'none';
			oTableEl.addEventListener('oTable.sorted', () => {
				checkExpectations(sortedHeaderIndex, otherHeaderIndex, expectedAriaValue, done);
			});
			testOTable.sorted(sortedHeaderIndex, sort);
		});
	});

});
