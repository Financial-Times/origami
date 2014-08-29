/*global require,describe,beforeEach,afterEach,it,expect*/
"use strict";

var sandbox = require('./helpers/sandbox'),
    oTable = require('./../main');

describe("wrap()", function() {

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

    beforeEach(function(){
        sandbox.init();
        sandbox.setContents('<p>Content before</p><table id="initiallyUnwrappedTable" class="o-table"></table><p>Content middle</p><div class="o-table-wrapper"><table id="initiallyWrappedTable" class="o-table"></table></div><p>Content after</p>');
        oTable.wrap();
    });

    afterEach(function() {
        sandbox.reset();
    });

    it("wraps table matching selector", function() {
        expect(document.getElementById("initiallyUnwrappedTable").parentNode.classList.contains("o-table-wrapper")).toBe(true);
    });

    it("preserves position in DOM", function() {
        expect(document.querySelector(".sandbox").childNodes[1].classList.contains("o-table-wrapper")).toBe(true);
        expect(document.querySelector(".sandbox").childNodes[1].querySelector('.o-table')).toEqual(document.getElementById("initiallyUnwrappedTable"));
    });

    it("doesn't wrap already-wrapped tables", function() {
        expect(document.getElementById("initiallyWrappedTable").parentNode.parentNode.classList.contains("o-table-wrapper")).toBe(false);
    });

    it("doesn't re-wrap tables", function() {
        oTable.wrap();
        expect(document.getElementById("initiallyUnwrappedTable").parentNode.parentNode.classList.contains("o-table-wrapper")).toBe(false);
    });

});

describe("wrap() - custom classes", function() {

    beforeEach(function(){
        sandbox.init();
        sandbox.setContents('<p>Content before</p><table id="tableNotToWrap" class="o-table"></table><p>Content middle</p><div class="test-container"><table id="initiallyUnwrappedTable" class="o-table"></table><div class="test-wrapper"><table id="initiallyWrappedTable" class="o-table"></table></div><p>Content after</p></div>');
        oTable.wrap(".test-container table", "test-wrapper");
    });

    afterEach(function() {
        sandbox.reset();
    });

    it("wraps table matching selector", function() {
        expect(document.getElementById("initiallyUnwrappedTable").parentNode.classList.contains("test-wrapper")).toBe(true);
    });

    it("doesn't wrap tables that don't match selector", function() {
        expect(document.getElementById("tableNotToWrap").parentNode.classList.contains("test-wrapper")).toBe(false);
    });

    it("doesn't wrap already-wrapped tables", function() {
        expect(document.getElementById("initiallyWrappedTable").parentNode.parentNode.classList.contains("test-wrapper")).toBe(false);
    });

    it("doesn't re-wrap tables", function() {
        oTable.wrap(".test-container table", "test-wrapper");
        expect(document.getElementById("initiallyUnwrappedTable").parentNode.parentNode.classList.contains("test-wrapper")).toBe(false);
    });

});