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

	const click = element => {
		const click = document.createEvent('MouseEvent');
		click.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		oTableEl.querySelector(element).dispatchEvent(click);
	};

	beforeEach(() => {
		sandbox.init();
		sandbox.setContents(fixtures.shortTableWithContainer);
		oTableEl = document.querySelector('[data-o-component=o-table]');
		table = new BaseTable(oTableEl, sorter);
	});

	describe('addSortButtons', () => {
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

	describe('destroy', () => {
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
	});
});
