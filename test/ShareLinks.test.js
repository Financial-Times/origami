/*global require,describe,beforeEach,afterEach,it,expect,spyOn*/
"use strict";

require('./helpers/polyfill');

var fixtures = require('./helpers/fixtures');
var triggerEvent = require('./helpers/triggerEvent');
var ShareLinks = require('./../main');
var testShareLinks;
var shareLinksEl;

describe("general behaviour", function() {

	beforeEach(function(){
		fixtures.insertShareLinks();
		shareLinksEl = document.querySelector('[data-o-component=o-share]');
		testShareLinks = new ShareLinks(shareLinksEl);
	});

	afterEach(function() {
		testShareLinks.destroy();
		fixtures.reset();
	});

	it("is defined", function() {
		expect(testShareLinks).toBeDefined();
	});

	it("initialisation", function() {
		expect(shareLinksEl.hasAttribute('data-o-share--js')).toBe(true);
	});

});

describe("general behaviour", function() {

	var twitterLinkEl;

	beforeEach(function(){
		fixtures.insertShareLinks();
		shareLinksEl = document.querySelector('[data-o-component=o-share]');
		testShareLinks = new ShareLinks(shareLinksEl);
		spyOn(window, 'open').andCallThrough();
		twitterLinkEl = document.querySelector('.o-share__action--twitter a');
		triggerEvent(twitterLinkEl, 'click');
	});

	afterEach(function() {
		testShareLinks.destroy();
		fixtures.reset();
	});

	it("clicking link opens new window", function() {
		expect(window.open).toHaveBeenCalledWith(twitterLinkEl.getAttribute('href'), twitterLinkEl.getAttribute('href'), 'width=646,height=436');
	});

	it("clicking link opens new window only once", function() {
		expect(window.open.calls.length).toEqual(1);
		expect(window.open).toHaveBeenCalledWith(twitterLinkEl.getAttribute('href'), twitterLinkEl.getAttribute('href'), 'width=646,height=436');
		triggerEvent(twitterLinkEl, 'click');
		expect(window.open.calls.length).toEqual(1);
	});

});
