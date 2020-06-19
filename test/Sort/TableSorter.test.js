/* eslint-env mocha */
/* global proclaim sinon */

import * as sandbox from './../helpers/sandbox';
import * as fixtures from './../helpers/fixtures';
import BaseTable from './../../src/js/Tables/BaseTable';
import FlatTable from './../../src/js/Tables/FlatTable';
import TableSorter from './../../src/js/Sort/TableSorter';
const sorter = new TableSorter();

describe("BaseTable", () => {
	let oTableEl;
	let table;

	beforeEach(() => {
		sandbox.init();
	});

	function assertSortOrder({sortOrder, columnIndex, expected}) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				try {
					const tbody = oTableEl.querySelector('tbody');
					const thead = oTableEl.querySelector('thead');
					// Assert correct sort order.
					const tableRows = tbody.querySelectorAll('tr');
					if (tableRows.length === 0) {
						throw new Error('Could not find rows to test against.');
					}
					const sortedCells = Array.from(tableRows).map((row) => {
						const cells = row.querySelectorAll('td,th:not(.o-table__duplicate-heading)');
						return cells[columnIndex].innerHTML;
					});
					proclaim.deepStrictEqual(sortedCells, expected);
					// Assert correct aria labels.
					const tableHeaders = thead.querySelectorAll('th');
					if (tableHeaders.length === 0) {
						throw new Error('Could not find column headers to test against.');
					}
					tableHeaders.forEach((tableHeader, index) => {
						if(index === columnIndex) {
							proclaim.equal(tableHeader.getAttribute('aria-sort'), sortOrder, `Expected column header to have aria-sort="${sortOrder}".`);
						} else {
							proclaim.equal(tableHeader.getAttribute('aria-sort'), 'none', `Expected the non-sorted column headers to have aria-sort="none".`);
						}
					});
					resolve();
				} catch (error) {
					reject(error);
				}
			}, 100); // wait for sort and window.requestAnimationFrame to update sort order
		});
	}

	describe('sortRowsByColumn', () => {

		function getTableElementWithData(type, dataArray) {
			const markup = fixtures.getTableMarkupFor(type, dataArray);
			sandbox.setContents(markup);
			return document.querySelector('[data-o-component=o-table]');
		}

		it('sorts strings alphabetically with no type specified ascending', done => {
			oTableEl = getTableElementWithData('', ['Dragonfruit', 'Durian', 'Naseberry', 'Strawberry', 'Apple']);
			table = new BaseTable(oTableEl, sorter);
			const columnIndex = 0;
			const sortOrder = 'ascending';
			const expected = ['Apple', 'Dragonfruit', 'Durian', 'Naseberry', 'Strawberry'];
			sorter.sortRowsByColumn(table, columnIndex, sortOrder);
			assertSortOrder({sortOrder, columnIndex, expected}).catch(done).finally(done);
		});

		it('sorts strings alphabetically with no type specified descending', done => {
			oTableEl = getTableElementWithData('', ['Dragonfruit', 'Durian', 'Naseberry', 'Strawberry', 'Apple']);
			table = new BaseTable(oTableEl, sorter);
			const columnIndex = 0;
			const sortOrder = 'descending';
			const expected = ['Strawberry', 'Naseberry', 'Durian', 'Dragonfruit', 'Apple'];
			sorter.sortRowsByColumn(table, columnIndex, sortOrder);
			assertSortOrder({sortOrder, columnIndex, expected}).catch(done).finally(done);
		});

		it('sorts localised strings alphabetically', done => {
			oTableEl = getTableElementWithData('', ['café', 'apple', 'caffeine', 'Æ']);
			table = new BaseTable(oTableEl, sorter);
			const columnIndex = 0;
			const sortOrder = 'ascending';
			const expected = ['Æ', 'apple', 'café', 'caffeine'];
			sorter.sortRowsByColumn(table, columnIndex, sortOrder);
			assertSortOrder({sortOrder, columnIndex, expected}).catch(done).finally(done);
		});

		it('sorts localised strings alphabetically when the Intl.Collator API is not available', done => {
			oTableEl = getTableElementWithData('', ['café', 'apple', 'caffeine', 'Æ']);
			table = new BaseTable(oTableEl, sorter);
			const columnIndex = 0;
			const sortOrder = 'ascending';
			const expected = ['Æ', 'apple', 'café', 'caffeine'];
			// Remove self.Intl
			const intlBackup = Intl;
			delete self.Intl;
			sorter.sortRowsByColumn(table, columnIndex, sortOrder);
			let error;
			assertSortOrder({ sortOrder, columnIndex, expected })
				.catch(err => {
					error = err;
				})
				.finally(() => {
					self.Intl = intlBackup; // Retore self.Intl
					done(error);
				});
		});

		it('sorts "number" type ascending', done => {
			oTableEl = getTableElementWithData('number', ['1.5', '0.5', '3', '2', '1.75']);
			table = new BaseTable(oTableEl, sorter);
			const columnIndex = 0;
			const sortOrder = 'ascending';
			const expected = ['0.5', '1.5', '1.75', '2', '3'];
			sorter.sortRowsByColumn(table, columnIndex, sortOrder);
			assertSortOrder({sortOrder, columnIndex, expected}).catch(done).finally(done);
		});

		it('sorts "number" type descending', done => {
			oTableEl = getTableElementWithData('number', ['1.5', '0.5', '3', '2', '1.75']);
			table = new BaseTable(oTableEl, sorter);
			const columnIndex = 0;
			const sortOrder = 'descending';
			const expected = ['3','2','1.75','1.5','0.5'];
			sorter.sortRowsByColumn(table, columnIndex, sortOrder);
			assertSortOrder({sortOrder, columnIndex, expected}).catch(done).finally(done);
		});

		it('sorts "numeric" type ascending', done => {
			oTableEl = getTableElementWithData('numeric', ['1.5', '0.5', '3', '2', '1.75']);
			table = new BaseTable(oTableEl, sorter);
			const columnIndex = 0;
			const sortOrder = 'ascending';
			const expected = ['0.5', '1.5', '1.75', '2', '3'];
			sorter.sortRowsByColumn(table, columnIndex, sortOrder);
			assertSortOrder({sortOrder, columnIndex, expected}).catch(done).finally(done);
		});

		it('sorts "numeric" type descending', done => {
			oTableEl = getTableElementWithData('numeric', ['1.5', '0.5', '3', '2', '1.75']);
			table = new BaseTable(oTableEl, sorter);
			const columnIndex = 0;
			const sortOrder = 'descending';
			const expected = ['3','2','1.75','1.5','0.5'];
			sorter.sortRowsByColumn(table, columnIndex, sortOrder);
			assertSortOrder({sortOrder, columnIndex, expected}).catch(done).finally(done);
		});

		it('sorts "percent" type descending', done => {
			oTableEl = getTableElementWithData('percent', ['1.5%', '0.5%', '2%', '50%']);
			table = new BaseTable(oTableEl, sorter);
			const columnIndex = 0;
			const sortOrder = 'descending';
			const expected = ['50%','2%','1.5%','0.5%'];
			sorter.sortRowsByColumn(table, columnIndex, sortOrder);
			assertSortOrder({sortOrder, columnIndex, expected}).catch(done).finally(done);
		});

		it('sorts "date" type with FT style time descending', done => {
			oTableEl = getTableElementWithData('date', ['7pm', '7am', '6.30am', '6.30pm']);
			table = new BaseTable(oTableEl, sorter);
			const columnIndex = 0;
			const sortOrder = 'descending';
			const expected = ['7pm', '6.30pm', '7am', '6.30am'];
			sorter.sortRowsByColumn(table, columnIndex, sortOrder);
			assertSortOrder({sortOrder, columnIndex, expected}).catch(done).finally(done);
		});

		it('sorts "date" type with based on dateTime attribute', done => {
			const sevenMinutesAgo = '<time datetime="2020-06-19T10:19:23+0000">7 minutes ago</time>';
			const eightMinutesAgo = '<time datetime="2020-06-19T10:18:23+0000">8 minutes ago</time>';
			const nineMinutesAgo = '<time datetime="2020-06-19T10:17:23+0000">9 minutes ago</time>';
			const tenMinutesAgo = '<time datetime="2020-06-19T10:16:23+0000">10 minutes ago</time>';
			oTableEl = getTableElementWithData('date', [
				eightMinutesAgo,
				nineMinutesAgo,
				sevenMinutesAgo,
				tenMinutesAgo
			]);
			table = new BaseTable(oTableEl, sorter);
			const columnIndex = 0;
			const sortOrder = 'descending';
			const expected = [
				sevenMinutesAgo,
				eightMinutesAgo,
				nineMinutesAgo,
				tenMinutesAgo
			];
			sorter.sortRowsByColumn(table, columnIndex, sortOrder);
			assertSortOrder({sortOrder, columnIndex, expected}).catch(done).finally(done);
		});

		it('sorts "date" type with FT style dates and time ascending', done => {
			// assumes current year where not specified
			oTableEl = getTableElementWithData('date', ['August 17', 'September 12 2012', 'January 2012', 'March 12 2015 1am', 'April 20 2014 3.30am', 'April 20 2014 2.30pm']);
			table = new BaseTable(oTableEl, sorter);
			const columnIndex = 0;
			const sortOrder = 'ascending';
			const expected = ['January 2012', 'September 12 2012', 'April 20 2014 3.30am', 'April 20 2014 2.30pm', 'March 12 2015 1am', 'August 17'];
			sorter.sortRowsByColumn(table, columnIndex, sortOrder);
			assertSortOrder({sortOrder, columnIndex, expected}).catch(done).finally(done);
		});

		it('sorts abbreviated type "currency" ascending', done => {
			// assumes current year where not specified
			oTableEl = getTableElementWithData('currency', ['E£5', '€5.46', 'CFA Fr830', 'DKr10', '£4', 'HK$12', '$140', '￥155', 'Rmb100bn', '13 colons', 'Rp3,400']);
			table = new BaseTable(oTableEl, sorter);
			const columnIndex = 0;
			const sortOrder = 'ascending';
			const expected = ['£4', 'E£5', '€5.46', 'DKr10', 'HK$12', '13 colons', '$140', '￥155', 'CFA Fr830', 'Rp3,400', 'Rmb100bn'];
			sorter.sortRowsByColumn(table, columnIndex, sortOrder);
			assertSortOrder({sortOrder, columnIndex, expected}).catch(done).finally(done);
		});

		it('sorts from "<span>", "<a>", "<i>" tags and "<img>" tag "alt" attributes', done => {
			oTableEl = getTableElementWithData('', [
				'<a href="#">y</a>',
				'<span><a href="#">v</a></span>',
				'<i class="o-icons-icon">x</i>',
				'<img src="#" alt="w">',
				'<span>z</span>'
			]);
			table = new BaseTable(oTableEl, sorter);
			const columnIndex = 0;
			const sortOrder = 'ascending';
			const expected = [
				'<span><a href="#">v</a></span>',
				'<img src="#" alt="w">',
				'<i class="o-icons-icon">x</i>',
				'<a href="#">y</a>',
				'<span>z</span>'
			];
			sorter.sortRowsByColumn(table, columnIndex, sortOrder);
			assertSortOrder({sortOrder, columnIndex, expected}).catch(done).finally(done);
		});

		it('sorts from "aria-label" or "title" of "<span>", "<a>", or "<i>" tags if they have no content', done => {
			oTableEl = getTableElementWithData('', [
				'<i class="o-icons-icon o-icons-icon--mail"><a href="#" title="d"></a></i>',
				'<span class="o-icons-icon o-icons-icon--tick">e</span>',
				'<span class="o-icons-icon o-icons-icon--tick" title="a"></span>',
				'<span class="o-icons-icon o-icons-icon--tick" aria-label="c"></span>',
				'<i class="o-icons-icon o-icons-icon--tick" title="z" aria-label="b"></i>'
			]);
			table = new BaseTable(oTableEl, sorter);
			const columnIndex = 0;
			const sortOrder = 'ascending';
			const expected = [
				'<span class="o-icons-icon o-icons-icon--tick" title="a"></span>',
				'<i class="o-icons-icon o-icons-icon--tick" title="z" aria-label="b"></i>',
				'<span class="o-icons-icon o-icons-icon--tick" aria-label="c"></span>',
				'<i class="o-icons-icon o-icons-icon--mail"><a href="#" title="d"></a></i>',
				'<span class="o-icons-icon o-icons-icon--tick">e</span>'
			];
			sorter.sortRowsByColumn(table, columnIndex, sortOrder);
			assertSortOrder({sortOrder, columnIndex, expected}).catch(done).finally(done);
		});

		it('sorts "n/a" and "-" as if empty cells (first in ascending order)', done => {
			oTableEl = getTableElementWithData('', ['café', 'apple', 'N/A', 'n.a.', '-', '', 'caffeine', 'Æ']);
			table = new BaseTable(oTableEl, sorter);
			const columnIndex = 0;
			const sortOrder = 'ascending';
			const expected = ['N/A', 'n.a.', '-', '', 'Æ', 'apple', 'café', 'caffeine'];
			sorter.sortRowsByColumn(table, columnIndex, sortOrder);
			assertSortOrder({sortOrder, columnIndex, expected}).catch(done).finally(done);
		});

		it('sorts non-numeric fields in a "numeric" column first when ascending', done => {
			oTableEl = getTableElementWithData('numeric', ['9', '' ,'0.5', 'Some Non-Numeric Text', 'N/A', '300', '-']);
			table = new BaseTable(oTableEl, sorter);
			const columnIndex = 0;
			const sortOrder = 'ascending';
			const expected = ['', 'N/A', '-', 'Some Non-Numeric Text', '0.5', '9', '300'];
			sorter.sortRowsByColumn(table, columnIndex, sortOrder);
			assertSortOrder({sortOrder, columnIndex, expected}).catch(done).finally(done);
		});

		it('sorts ranges, using the value before a dash or en-dash', done => {
			oTableEl = getTableElementWithData('numeric', ['1-3', '10-21', '0.5-200']);
			table = new BaseTable(oTableEl, sorter);
			const columnIndex = 0;
			const sortOrder = 'ascending';
			const expected = ['0.5-200', '1-3', '10-21'];
			sorter.sortRowsByColumn(table, columnIndex, sortOrder);
			assertSortOrder({sortOrder, columnIndex, expected}).catch(done).finally(done);
		});

		it('sorts ignoring any duplicate headings of the FlatTable', done => {
			// Issue: https://github.com/Financial-Times/o-table/pull/106
			oTableEl = getTableElementWithData('numeric', ['3', '1', '999', '2']);
			table = new FlatTable(oTableEl, sorter); // Flat table duplicates headings within rows.
			const columnIndex = 0;
			const sortOrder = 'ascending';
			const expected = ['1', '2', '3', '999'];
			sorter.sortRowsByColumn(table, columnIndex, sortOrder);
			assertSortOrder({sortOrder, columnIndex, expected}).catch(done).finally(done);
		});

		it('sorts by attribute "data-o-table-sort-value" value if set', done => {
			sandbox.setContents(`
				<div class="o-table-container">
					<div class="o-table-scroll-wrapper">
						<table class="o-table" data-o-component="o-table">
							<thead>
								<tr>
									<th>Things</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td data-o-table-sort-value="c">snowman</td>
								</tr>
								<tr>
									<td data-o-table-sort-value="a">42</td>
								</tr>
								<tr>
									<td data-o-table-sort-value="b">pangea</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			`);
			oTableEl = document.querySelector('[data-o-component=o-table]');
			table = new BaseTable(oTableEl, sorter);
			const columnIndex = 0;
			const sortOrder = 'ascending';
			const expected = ['42', 'pangea', 'snowman'];
			sorter.sortRowsByColumn(table, columnIndex, sortOrder);
			assertSortOrder({ sortOrder, columnIndex, expected }).catch(done).finally(done);
		});

		it('sorts row headers', done => {
			sandbox.setContents(`
				<div class="o-table-container">
					<div class="o-table-scroll-wrapper">
						<table class="o-table" data-o-component="o-table">
							<thead>
								<tr>
									<th>Things</th>
									<th>Data</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<th scope="row" role="rowheader">c</th>
									<td>lorem</td>
								</tr>
								<tr>
									<th scope="row" role="rowheader">a</th>
									<td>lorem</td>
								</tr>
								<tr>
									<th scope="row" role="rowheader">b</th>
									<td>lorem</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			`);
			oTableEl = document.querySelector('[data-o-component=o-table]');
			table = new BaseTable(oTableEl, sorter);
			const columnIndex = 0;
			const sortOrder = 'ascending';
			const expected = ['a', 'b', 'c'];
			sorter.sortRowsByColumn(table, columnIndex, sortOrder);
			assertSortOrder({ sortOrder, columnIndex, expected }).catch(done).finally(done);
		});

		it('sorts custom data types according to a given formatter', done => {
			oTableEl = getTableElementWithData('emoji-time', ['🌑', '🌤', '🌑', '🌤']);
			table = new BaseTable(oTableEl, sorter);
			const columnIndex = 0;
			const sortOrder = 'ascending';
			const expected = ['🌑', '🌑', '🌤', '🌤'];
			sorter.setCellFormatterForType('emoji-time', cell => {
				const text = cell.textContent.trim();
				if (text === '🌑') {
					return 1;
				}
				if (text === '🌤') {
					return 2;
				}
				return 0;
			});
			sorter.sortRowsByColumn(table, columnIndex, sortOrder);
			assertSortOrder({ sortOrder, columnIndex, expected }).catch(done).finally(done);
		});

		it('calls the table\'s "sorted" method', (done) => {
			oTableEl = getTableElementWithData('numeric', ['1','3','2']);
			table = new BaseTable(oTableEl, sorter);
			const sortedSpy = sinon.spy(table, 'sorted');
			sorter.sortRowsByColumn(table, 0, 'ascending');
			setTimeout(() => {
				let error;
				try {
					proclaim.isTrue(sortedSpy.calledWith({
						columnIndex: 0,
						sortOrder: 'ascending'
					}));
					sortedSpy.restore();
				} catch (err) {
					error = err;
				} finally {
					done(error);
				}
			}, 100);
		});
	});
});
