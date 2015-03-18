/*global describe,beforeEach,afterEach,it,expect*/
"use strict";

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
