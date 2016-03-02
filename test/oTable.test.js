/*global describe,beforeEach,afterEach,it,expect*/

import * as sandbox from './helpers/sandbox';
import oTable from './../main';

describe("wrap()", () => {

	beforeEach(() => {
		sandbox.init();
	});

	afterEach(() => {
		sandbox.reset();
	});

	it("is defined", () => {
		expect(oTable.wrap).toBeDefined();
	});

});

describe("wrap() - default classes", () => {

    beforeEach(() => {
        sandbox.init();
        sandbox.setContents('<p>Content before</p><table id="initiallyUnwrappedTable" class="o-table"></table><p>Content middle</p><div class="o-table-wrapper"><table id="initiallyWrappedTable" class="o-table"></table></div><p>Content after</p>');
        oTable.wrap();
    });

    afterEach(() => {
        sandbox.reset();
    });

    it("wraps table matching selector", () => {
        expect(document.getElementById("initiallyUnwrappedTable").parentNode.classList.contains("o-table-wrapper")).toBe(true);
    });

    it("preserves position in DOM", () => {
        expect(document.querySelector(".sandbox").childNodes[1].classList.contains("o-table-wrapper")).toBe(true);
        expect(document.querySelector(".sandbox").childNodes[1].querySelector('.o-table')).toEqual(document.getElementById("initiallyUnwrappedTable"));
    });

    it("doesn't wrap already-wrapped tables", () => {
        expect(document.getElementById("initiallyWrappedTable").parentNode.parentNode.classList.contains("o-table-wrapper")).toBe(false);
    });

    it("doesn't re-wrap tables", () => {
        oTable.wrap();
        expect(document.getElementById("initiallyUnwrappedTable").parentNode.parentNode.classList.contains("o-table-wrapper")).toBe(false);
    });

});

describe("wrap() - custom classes", () => {

	beforeEach(() => {
		sandbox.init();
		sandbox.setContents('<p>Content before</p><table id="tableNotToWrap" class="o-table"></table><p>Content middle</p><div class="test-container"><table id="initiallyUnwrappedTable" class="o-table"></table><div class="test-wrapper"><table id="initiallyWrappedTable" class="o-table"></table></div><p>Content after</p></div>');
		oTable.wrap(".test-container table", "test-wrapper");
	});

	afterEach(() => {
		sandbox.reset();
	});

	it("wraps table matching selector", () => {
		expect(document.getElementById("initiallyUnwrappedTable").parentNode.classList.contains("test-wrapper")).toBe(true);
	});

	it("doesn't wrap tables that don't match selector", () => {
		expect(document.getElementById("tableNotToWrap").parentNode.classList.contains("test-wrapper")).toBe(false);
	});

	it("doesn't wrap already-wrapped tables", () => {
		expect(document.getElementById("initiallyWrappedTable").parentNode.parentNode.classList.contains("test-wrapper")).toBe(false);
	});

	it("doesn't re-wrap tables", () => {
		oTable.wrap(".test-container table", "test-wrapper");
		expect(document.getElementById("initiallyUnwrappedTable").parentNode.parentNode.classList.contains("test-wrapper")).toBe(false);
	});

});

describe("oTable API", () => {

	it("is defined", () => {
		expect(typeof oTable).toBe('function');
	});
    
    it('has a static init method', () => {
		expect(typeof oTable.init).toBe('function');
	});
    
    it('has a destroy instance method', () => {
		expect(typeof oTable.prototype.destroy).toBe('function');
	});
    
    it('has a removeEventListeners instance method', () => {
		expect(typeof oTable.prototype.removeEventListeners).toBe('function');
	});
    
    it('has a sortRowsByColumn instance method', () => {
		expect(typeof oTable.prototype.sortRowsByColumn).toBe('function');
	});
    
    it('has a dispatch instance method', () => {
		expect(typeof oTable.prototype.dispatch).toBe('function');
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
		testOTable.destroy();
		sandbox.reset();
	});

	it('is defined', () => {
        testOTable = new oTable(oTableEl);
		expect(typeof testOTable).toBeDefined();
	});
    
    it('has the correct prototype', () => {
        testOTable = new oTable(oTableEl);
       expect(Object.getPrototypeOf(testOTable)).toBe(oTable.prototype); 
    });

    it('sets a data attribute on the root element of the component to indicate the JS has executed', () => {
        testOTable = new oTable(oTableEl);
        expect(oTableEl.hasAttribute('data-o-table--js')).toBe(true);
    });
    
    xit('fires an "oTable.ready" event when the JS for the component has executed', done => {
        oTableEl.addEventListener('oTable.ready', function() {
            done();
        });
        testOTable = new oTable(oTableEl);
    });
    
    describe('sorting', () => {
        xit('sorts by ascending order first if not told otherwise', done => {
            testOTable = new oTable(oTableEl);
            // TODO - Add a click polyfill to polyfill-service
            const click = document.createEvent("MouseEvent");
            click.initMouseEvent("click", true, true, window,
                0, 0, 0, 0, 0, false, false, false, false, 0, null);
            oTableEl.querySelector('thead th').dispatchEvent(click);
            setTimeout(() => {
                expect(oTableEl.querySelectorAll('tbody tr')[0].textContent).toBe('cheddar');
                expect(oTableEl.querySelectorAll('tbody tr')[1].textContent).toBe('red leicester');
                expect(oTableEl.querySelectorAll('tbody tr')[2].textContent).toBe('stilton');
                done();
            }, 500);
        });
        
        xit('adds a sort order data attribute to the root element of the component', done => {
            testOTable = new oTable(oTableEl);
            // TODO - Add a click polyfill to polyfill-service
            const click = document.createEvent("MouseEvent");
            click.initMouseEvent("click", true, true, window,
                0, 0, 0, 0, 0, false, false, false, false, 0, null);
            oTableEl.querySelector('thead th').dispatchEvent(click);
            setTimeout(() => {
                expect(oTableEl.getAttribute('data-o-table-order')).toBe('ASC');
                done();
            }, 500);
        });
        
        xit('alternates sorting between ascending and descending', done => {
            testOTable = new oTable(oTableEl);
            // TODO - Add a click polyfill to polyfill-service
            const click = document.createEvent("MouseEvent");
            click.initMouseEvent("click", true, true, window,
                0, 0, 0, 0, 0, false, false, false, false, 0, null);
            oTableEl.querySelector('thead th').dispatchEvent(click);
            setTimeout(() => {
                expect(oTableEl.querySelectorAll('tbody tr')[0].textContent).toBe('cheddar');
                expect(oTableEl.querySelectorAll('tbody tr')[1].textContent).toBe('red leicester');
                expect(oTableEl.querySelectorAll('tbody tr')[2].textContent).toBe('stilton');
                expect(oTableEl.getAttribute('data-o-table-order')).toBe('ASC');
            }, 500);
            oTableEl.querySelector('thead th').dispatchEvent(click);
            setTimeout(() => {
                expect(oTableEl.getAttribute('data-o-table-order')).toBe('DES');
                expect(oTableEl.querySelectorAll('tbody tr')[2].textContent).toBe('stilton');
                expect(oTableEl.querySelectorAll('tbody tr')[1].textContent).toBe('red leicester');
                expect(oTableEl.querySelectorAll('tbody tr')[0].textContent).toBe('cheddar');
            }, 500);
        });
        
        xit('sorts strings alphabetically')
        xit('sorts columns marked as numeric, numerically')
        xit('sorts via data-o-table-order if it is set')
    });
    
    describe('destroying', () => {
        xit('removes all event listeners which were added by the component')
        xit('removes the rootEl property from the object')
        xit('removes the data attribute which was added during JS initialisation')
    })
    
    describe('init', () =>{
      xit('instantiates every o-table piece of markup within the element given')  
    })
});
