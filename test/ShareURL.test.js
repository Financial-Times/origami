/*global require,describe,beforeEach,afterEach,it,expect*/
"use strict";

require('./helpers/polyfill');

var fixtures = require('./helpers/fixtures');
var triggerEvent = require('./helpers/triggerEvent');
var ShareLinks = require('./../main');
var testShareLinks;
var shareLinksEl;

describe("share url behaviour", function() {

	beforeEach(function(){
		fixtures.insertShareLinks();
		shareLinksEl = document.querySelector('[data-o-component=o-share]');
		testShareLinks = new ShareLinks(shareLinksEl);
		triggerEvent(shareLinksEl.querySelector('.o-share__action--url a'), 'click');
	});

	afterEach(function() {
		testShareLinks.destroy();
		fixtures.reset();
	});

	it("share URL tool - opens", function() {
		expect(shareLinksEl.querySelector('.o-share__action--url').getAttribute('aria-selected')).toBe('true');
		expect(shareLinksEl.querySelectorAll('.o-share__action--url input').length).toBe(1);
		expect(shareLinksEl.querySelector('.o-share__action--url input').value).toBe(shareLinksEl.querySelector('.o-share__action--url a').href);
		expect(shareLinksEl.querySelectorAll('.o-share__action--url .o-share-tooltip').length).toBe(1);
	});

	it("share URL tool - 'copied' notification", function() {
		triggerEvent(shareLinksEl.querySelector('.o-share__action--url input'), 'copy');
		expect(shareLinksEl.querySelector('.o-share__action--url .o-share-tooltip__text').innerText).toBe('Copied!');
	});

	it("share URL tool - closes on pressing escape", function() {
		triggerEvent(shareLinksEl.querySelector('.o-share__action--url input'), 'keyup', { keyCode: 27 });
		expect(shareLinksEl.querySelector('.o-share__action--url').hasAttribute('aria-selected')).toBe(false);
		expect(shareLinksEl.querySelectorAll('.o-share__action--url input').length).toBe(0);
		expect(shareLinksEl.querySelectorAll('.o-share__action--url .o-share-tooltip').length).toBe(0);
	});

	it("share URL tool - closes on pressing tav", function() {
		triggerEvent(shareLinksEl.querySelector('.o-share__action--url input'), 'keyup', { keyCode: 9 });
		expect(shareLinksEl.querySelector('.o-share__action--url').hasAttribute('aria-selected')).toBe(false);
		expect(shareLinksEl.querySelectorAll('.o-share__action--url input').length).toBe(0);
		expect(shareLinksEl.querySelectorAll('.o-share__action--url .o-share-tooltip').length).toBe(0);
	});

});
