/* eslint-env mocha, sinon */

import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import * as sandbox from './helpers/sandbox';
import * as fixtures from './helpers/fixtures';
import BaseTable from './../src/js/Tables/BaseTable';
import TableSorter from './../src/js/Sort/TableSorter';
const sorter = new TableSorter();

describe("BaseTable", () => {
	let oTableEl;
	let table;

	function getTableElementWithData(type, dataArray, tableId) {
		const markup = fixtures.getTableMarkupFor(type, dataArray, tableId);
		sandbox.setContents(markup);
		return document.querySelector('[data-o-component=o-table]');
	}

	function assertFilter(data, expectedData) {
		const tbody = oTableEl.querySelector('tbody');
		const filterdRows = tbody.querySelectorAll('tr[aria-hidden="true"]');
		const visibleRows = tbody.querySelectorAll('tr[aria-hidden="false"]');
		const expectedFiltered = data.length - expectedData.length;
		const expectedVisible = expectedData.length;
		proclaim.equal(filterdRows.length, expectedFiltered, `Expected ${expectedFiltered} filtered rows but found ${filterdRows.length}.`);
		proclaim.equal(visibleRows.length, expectedVisible, `Expected ${expectedVisible} visible rows but found ${visibleRows.length}.`);
		proclaim.isTrue(table.wrapper.style.height !== '', `Expect the table to have a set height on its parent container to hide rows visually.`);
	}

	const click = element => {
		const click = document.createEvent('MouseEvent');
		click.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		oTableEl.querySelector(element).dispatchEvent(click);
	};

	beforeEach(() => {
		sandbox.init();
	});

	describe('constructor', () => {
		it('applies declaritive table filters', (done) => {
			// Setup markup: Table + filter input.
			const data = ['Dragonfruit', 'Durian', 'Naseberry', 'Strawberry', 'Apple'];
			const tableId = 'constructor-test-table';
			oTableEl = getTableElementWithData('', data, tableId);
			sandbox.addContents(`
				<select
					id="filter-input"
					data-o-table-filter-id="${tableId}"
					data-o-table-filter-column="0"
				>
					<option value="">All</option>
					<!-- "selected" indicates the default filter -->
					<option value="Naseberry" selected>Naseberry</option>
				</select>
			`);
			// Init table.
			table = new BaseTable(oTableEl, sorter);
			// Confirm default filter (set declaritively).
			setTimeout(() => {
				try {
					assertFilter(data, ['Naseberry']);
					done();
				} catch(error) {
					done(error);
				}
			}, 100); // wait for window.requestAnimationFrame
		});
	});

	describe('filter', () => {
		describe('given a string filter', () => {
			it('is case insensitive', done => {
				const data = ['Dragonfruit', 'Durian', 'Naseberry', 'Strawberry', 'Apple'];
				oTableEl = getTableElementWithData('', data);
				table = new BaseTable(oTableEl, sorter);
				table.filter(0, 'dragonfruit');
				setTimeout(() => {
					try {
						assertFilter(data, ['Dragonfruit']);
						done();
					} catch(error) {
						done(error);
					}
				}, 100); // wait for window.requestAnimationFrame
			});
			it('is whitespace insensitive', done => {
				const data = ['       Dragon fruit       ', 'Durian', 'Naseberry', 'Strawberry', 'Apple'];
				oTableEl = getTableElementWithData('', data);
				table = new BaseTable(oTableEl, sorter);
				table.filter(0, 'Dragonfruit');
				setTimeout(() => {
					try {
						assertFilter(data, ['Dragonfruit']);
						done();
					} catch(error) {
						done(error);
					}
				}, 100); // wait for window.requestAnimationFrame
			});
			it('ignores special characters', done => {
				const data = ['Dragonfruit', 'Durian*', 'Naseberry', 'Strawberry', 'Apple'];
				oTableEl = getTableElementWithData('', data);
				table = new BaseTable(oTableEl, sorter);
				table.filter(0, 'Durian');
				setTimeout(() => {
					try {
						assertFilter(data, ['Durian']);
						done();
					} catch(error) {
						done(error);
					}
				}, 100); // wait for window.requestAnimationFrame
			});
			it('ignores non-breaking space characters', done => {
				const data = ['Dragonfruit', 'Dur ian', 'Naseberry', 'Strawberry', 'Apple'];
				oTableEl = getTableElementWithData('', data);
				table = new BaseTable(oTableEl, sorter);
				table.filter(0, 'Durian');
				setTimeout(() => {
					try {
						assertFilter(data, ['Durian']);
						done();
					} catch(error) {
						done(error);
					}
				}, 100); // wait for window.requestAnimationFrame
			});
			it('filters on a partial match', done => {
				const data = ['Dragonfruit', 'Durian', 'Naseberry', 'Strawberry', 'Apple'];
				oTableEl = getTableElementWithData('', data);
				table = new BaseTable(oTableEl, sorter);
				table.filter(0, 'berry');
				setTimeout(() => {
					try {
						assertFilter(data, ['Naseberry', 'Strawberry']);
						done();
					} catch(error) {
						done(error);
					}
				}, 100); // wait for window.requestAnimationFrame
			});
		});

		describe('given a function', () => {
			it('keeps rows where the return value is true', done => {
				const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
				oTableEl = getTableElementWithData('', data);
				table = new BaseTable(oTableEl, sorter);
				table.filter(0, (cell) => {
					return parseInt(cell.textContent, 10) > 3;
				});
				setTimeout(() => {
					try {
						assertFilter(data, [4, 5, 6, 7, 8, 9, 10]);
						done();
					} catch(error) {
						done(error);
					}
				}, 100); // wait for window.requestAnimationFrame
			});

			it('filters rows where the return value is false', done => {
				const data = ['a', 'b', 'aa', 'bb'];
				oTableEl = getTableElementWithData('', data);
				table = new BaseTable(oTableEl, sorter);
				table.filter(0, (cell) => {
					return cell.textContent === 'a';
				});
				setTimeout(() => {
					try {
						assertFilter(data, ['a']);
						done();
					} catch(error) {
						done(error);
					}
				}, 100); // wait for window.requestAnimationFrame
			});
		});
	});

	describe('addSortButtons', () => {
		beforeEach(() => {
			sandbox.init();
			sandbox.setContents(fixtures.shortTableWithContainer);
			oTableEl = document.querySelector('[data-o-component=o-table]');
			table = new BaseTable(oTableEl, sorter);
		});

		it('adds buttons in the table column headers', done => {
			table.addSortButtons();
			setTimeout(() => {
				try {
					const thead = oTableEl.querySelector('thead');
					const sortButtons = thead.querySelectorAll('button');
					proclaim.equal(sortButtons.length, 5, 'Expected 5 buttons, 1 within each of the 5 column headers.');
					sortButtons.forEach(button => {
						proclaim.include(button.getAttribute('title'), 'sort', 'Expected each header sort button to have a "title" which indicates sort. "title" is currently used over "aria-label" as "aria-label" is read in VoiceOver when moving across columns of the body.');
						proclaim.notEqual(button.textContent, '', 'Expected each header sort button to have content.');
					});
				} catch (error) {
					done(error);
				} finally {
					done();
				}
			}, 100);
		});

		it('maintains heading phrasing content within generated sort buttons', done => {
			// https://html.spec.whatwg.org/#the-button-element
			sandbox.init();
			sandbox.setContents(fixtures.tableWithContainerAndComplexHeadings);
			oTableEl = document.querySelector('[data-o-component=o-table]');
			table = new BaseTable(oTableEl, sorter);
			table.addSortButtons();

			setTimeout(() => {
				try {
					const thead = oTableEl.querySelector('thead');
					const sortButtons = thead.querySelectorAll('button');
					// `abbr` has been maintained
					proclaim.equal(sortButtons[0].innerHTML, '<abbr title="Fruit">F</abbr>');
					// `b` has been maintained
					proclaim.equal(sortButtons[1].innerHTML, '<b>Genus</b>');
					// `div` has been removed
					proclaim.equal(sortButtons[2].innerHTML, 'Characteristic');
				} catch (error) {
					done(error);
				} finally {
					done();
				}
			}, 100);
		});

		it('does not add sort button to column header with attribute "data-o-table-heading-disable-sort"', done => {
			const thead = oTableEl.querySelector('thead');
			// Disable sort on first column.
			const firstColumnHeading = thead.querySelector('th');
			firstColumnHeading.setAttribute('data-o-table-heading-disable-sort', true);
			// Add buttons.
			table.addSortButtons();
			setTimeout(() => {
				try {
					const sortButtons = thead.querySelectorAll('button');
					proclaim.isNull(firstColumnHeading.querySelector('button'),'Found a sort button within a column heading with sort disabled.');
					proclaim.equal(sortButtons.length, 4, 'Expected 4 buttons, 1 within each of the 5 column headers except for the first column which has sort disabled.');
				} catch (error) {
					done(error);
				} finally {
					done();
				}
			}, 100);
		});

		it('does not add any sort button to column headers when table has "data-o-table-sortable" set to false', done => {
			// Disable sort.
			oTableEl.setAttribute('data-o-table-sortable', false);
			// Try to add sort buttons.
			table = new BaseTable(oTableEl, sorter); // re-init table now data att is set
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

		it('buttons toggle column sort with header button click (ascending first)', done => {
			const sorterSpy = sinon.spy(sorter, "sortRowsByColumn");
			table.addSortButtons();
			setTimeout(() => {
				try {
					click('thead th button');
					proclaim.isTrue(sorterSpy.calledWith(table, 0, 'ascending'), 'Expected the table to be sorted "ascending" on first click of the header button.');
				} catch (error) {
					sorterSpy.restore();
					done(error);
				}
				setTimeout(() => {
					try {
						click('thead th button');
						proclaim.isTrue(sorterSpy.calledWith(table, 0, 'descending'), 'Expected the table to be sorted "descending" on second click of the header button.');
					} catch (error) {
						sorterSpy.restore();
						done(error);
					} finally {
						sorterSpy.restore();
						done();
					}
				}, 100);
			}, 100);
		});
	});

	describe('sortRowsByColumn', () => {
		beforeEach(() => {
			sandbox.init();
			sandbox.setContents(fixtures.shortTableWithContainer);
			oTableEl = document.querySelector('[data-o-component=o-table]');
			table = new BaseTable(oTableEl, sorter);
		});

		it('sorts a given column in descending order', () => {
			const columnIndex = 1;
			const sortOrder = 'descending';
			const sorterSpy = sinon.spy(sorter, "sortRowsByColumn");
			table.sortRowsByColumn(columnIndex, sortOrder);
			proclaim.isTrue(sorterSpy.calledWith(table, columnIndex, sortOrder));
			sorterSpy.restore();
		});

		it('sorts a given column in ascending order', () => {
			const columnIndex = 1;
			const sortOrder = 'ascending';
			const sorterSpy = sinon.spy(sorter, "sortRowsByColumn");
			table.sortRowsByColumn(columnIndex, sortOrder);
			proclaim.isTrue(sorterSpy.calledWith(table, columnIndex, sortOrder));
			sorterSpy.restore();
		});

		it('can be intercepted using the `oTable.sorting` event for a custom sort implementation', () => {
			// Prevent sorting for custom implementation.
			oTableEl.addEventListener('oTable.sorting', (event) => {
				event.preventDefault();
			});
			// Check sort is intercepted performed.
			const sorterSpy = sinon.spy(sorter, "sortRowsByColumn");
			table.sortRowsByColumn(0, 'ascending');
			proclaim.isTrue(sorterSpy.notCalled, 'Default table sorter was called.');
			sorterSpy.restore();
		});

		it('errors if no column index is provided', () => {
			proclaim.throws(() => {
				table.sortRowsByColumn(undefined, 'descending');
			}, /Could not find header for column index/);
		});

		it('errors if an invalid column index is provided', () => {
			proclaim.throws(() => {
				table.sortRowsByColumn('not a column index', 'descending');
			}, /Could not find header for column index/);
		});

		it('errors if no sort order is provided', () => {
			proclaim.throws(() => {
				table.sortRowsByColumn(1, undefined);
			}, /Sort order/);
		});

		it('errors if an invalid sort order is provided', () => {
			proclaim.throws(() => {
				table.sortRowsByColumn(1, 'not a sort order');
			}, /Sort order/);
		});
	});

	describe('getTableHeader', () => {
		beforeEach(() => {
			sandbox.init();
			sandbox.setContents(fixtures.shortTableWithContainer);
			oTableEl = document.querySelector('[data-o-component=o-table]');
			table = new BaseTable(oTableEl, sorter);
		});

		it('gets a th element for a given column index', () => {
			const thead = oTableEl.querySelector('thead');
			const tableHeaders = thead.querySelectorAll('th');
			tableHeaders.forEach((expectedHeader, index) => {
				const actualHeader = table.getTableHeader(index);
				proclaim.equal(actualHeader, expectedHeader, `Did not get the expected th element for column index "${index}".`);
			});
		});
		it('errors when getting a th element for a non-existent column', () => {
			proclaim.throws(() => {
				table.getTableHeader(1001);
			}, /Could not find header for column index/);
		});
	});

	describe('sorted', () => {

		beforeEach(() => {
			sandbox.init();
			sandbox.setContents(fixtures.shortTableWithContainer);
			oTableEl = document.querySelector('[data-o-component=o-table]');
			table = new BaseTable(oTableEl, sorter);
		});

		it('fires the oTable.sorted event with column index and sort order', done => {
			const columnIndex = 1;
			const sortOrder = 'ascending';
			// Expecting a sorted event.
			document.addEventListener('oTable.sorted', (event) => {
				try {
					proclaim.equal(event.detail.instance, table, 'Expected event detail to include the o-table instance which fired the event.');
					proclaim.equal(event.detail.sortOrder, sortOrder, `Expected event detail to include the sort order.`);
					proclaim.equal(event.detail.columnIndex, columnIndex, `Expected event detail to include the column index.`);
				} catch (error) {
					done(error);
				}
				done();
			});
			try {
				table.sorted({ columnIndex, sortOrder });
			} catch (error) {
				done(error);
			}
		});

		it('errors if no column index is provided', () => {
			const columnIndex = undefined;
			const sortOrder = 'ascending';
			proclaim.throws(() => {
				table.sorted({ columnIndex, sortOrder });
			}, /column index/);
		});

		it('errors if no sort order is provided', () => {
			const columnIndex = 1;
			const sortOrder = undefined;
			proclaim.throws(() => {
				table.sorted({ columnIndex, sortOrder });
			}, /sort order/);
		});
	});

	describe('updateRows', () => {
		const headerIndex = 0;
		const sortOrder = 'descending';
		const data = ['Apple', 'Durian', 'Naseberry', 'Strawberry', 'Dragonfruit'];
		const cloneData = data[0];
		beforeEach((done) => {
			sandbox.init();
			// Create table.
			oTableEl = getTableElementWithData('', data);
			// Clone the first "Apple" row.
			const trClone = oTableEl.querySelector('tbody > tr:first-of-type').cloneNode({ deep: true });
			table = new BaseTable(oTableEl, sorter);
			// Sort.
			table.sortRowsByColumn(headerIndex, sortOrder);
			// Filter.
			table.filter(headerIndex, cloneData);
			setTimeout(() => {
				// Table initialised and rendered.
				// Add a new "Apple" row.
				table.tbody.appendChild(trClone);
				data.push(cloneData);
				done();
			}, 100); // wait for window.requestAnimationFrame
		});

		it('applies an existing filter to any row inserted after it was initialised', (done) => {
			// Tell o-table the rows have updated.
			table.updateRows();
			setTimeout(() => {
				// The filter includes the original Apple row and the clone
				// added after the table was initialised.
				done(assertFilter(data, [cloneData, cloneData]));
			}, 100); // wait for window.requestAnimationFrame
		});

		it('applies an existing sort to any row inserted after it was initialised', (done) => {
			const sorterSpy = sinon.spy(sorter, "sortRowsByColumn");
			// Tell o-table the rows have updated.
			table.updateRows();
			setTimeout(() => {
				done(proclaim.isTrue(sorterSpy.calledWith(table, headerIndex, sortOrder)));
			}, 100); // wait for window.requestAnimationFrame
		});
	});

	describe('destroy', () => {

		beforeEach(() => {
			sandbox.init();
			sandbox.setContents(fixtures.shortTableWithContainer);
			oTableEl = document.querySelector('[data-o-component=o-table]');
			table = new BaseTable(oTableEl, sorter);
		});

		it('removes sort button event listeners', () => {
			// Mock removeEventListener
			const realRemoveEventListener = Element.prototype.removeEventListener;
			const removeEventListenerSpy = sinon.spy();
			Element.prototype.removeEventListener = removeEventListenerSpy;
			// Call destroy
			table.destroy();
			// Test sort button event listeners removed.
			try {
				const thead = document.querySelector('thead');
				const buttons = thead.querySelectorAll('button');
				buttons.forEach(button => {
					proclaim.isTrue(removeEventListenerSpy.calledOn(button), 'Remove event listener was not called on all heading sort buttons.');
				});
			} finally {
				// Restore mocks before calling done.
				Element.prototype.removeEventListener = realRemoveEventListener;
			}
		});

		it('removes properties with DOM references', () => {
			const expectedToBeRemoved = [
				'thead',
				'tbody',
				'tableHeaders',
				'tableRows',
				'_filteredTableRows',
				'wrapper',
				'container',
				'overlayWrapper',
				'filterContainer'
			];
			table.destroy();
			expectedToBeRemoved.forEach(property => {
				proclaim.isUndefined(table[property], `Expected the table property ${property} to be removed when the "destroy" method is called.`);
			});
		});
	});
});
