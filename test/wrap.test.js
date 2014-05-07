/*global require,describe,beforeEach,afterEach,it,expect*/

var sandbox = require('./helpers/sandbox'),
    oTable = require('./../main');

describe("wrap()", function() {
    "use strict";

    beforeEach(function(){
        sandbox.init();
    });

    afterEach(function() {
        sandbox.reset();
    });

    it("is defined", function() {
        expect(oTable.wrap).toBeDefined();
    });

});

describe("wrap() - default classes", function() {
    "use strict";

    beforeEach(function(){
        sandbox.init();
        sandbox.setContents('<table id="initiallyUnwrappedTable" class="o-table"></table><div class="o-table-wrapper"><table id="initiallyWrappedTable" class="o-table"></table></div>');
    });

    afterEach(function() {
        sandbox.reset();
    });

    it("wraps only unwrapped tables", function() {
        oTable.wrap();
        expect(document.getElementById("initiallyUnwrappedTable").parentNode.classList.contains("o-table-wrapper")).toBe(true);
    });

    it("doesn't wrap already-wrapped tables", function() {
        oTable.wrap();
        expect(document.getElementById("initiallyWrappedTable").parentNode.parentNode.classList.contains("o-table-wrapper")).toBe(false);
    });

    it("doesn't re-wrap tables", function() {
        oTable.wrap();
        oTable.wrap();
        expect(document.getElementById("initiallyUnwrappedTable").parentNode.parentNode.classList.contains("o-table-wrapper")).toBe(false);
    });

});

describe("wrap() - custom classes", function() {
    "use strict";

    beforeEach(function(){
        sandbox.init();
        sandbox.setContents('<table id="tableNotToWrap" class="o-table"></table><div class="test-container" class="o-table"><table id="initiallyUnwrappedTable"></table><div class="test-wrapper"><table id="initiallyWrappedTable" class="o-table"></table></div></div>');
    });

    afterEach(function() {
        sandbox.reset();
    });

    it("wraps only unwrapped tables", function() {
        oTable.wrap(".test-container table", "test-wrapper");
        expect(document.getElementById("initiallyUnwrappedTable").parentNode.classList.contains("test-wrapper")).toBe(true);
    });

    it("doesn't wrap tables that don't match selector", function() {
        oTable.wrap(".test-container table", "test-wrapper");
        expect(document.getElementById("tableNotToWrap").parentNode.classList.contains("test-wrapper")).toBe(false);
    });

    it("doesn't wrap already-wrapped tables", function() {
        oTable.wrap(".test-container table", "test-wrapper");
        expect(document.getElementById("initiallyWrappedTable").parentNode.parentNode.classList.contains("test-wrapper")).toBe(false);
    });

    it("doesn't re-wrap tables", function() {
        oTable.wrap(".test-container table", "test-wrapper");
        oTable.wrap(".test-container table", "test-wrapper");
        expect(document.getElementById("initiallyUnwrappedTable").parentNode.parentNode.classList.contains("test-wrapper")).toBe(false);
    });

});