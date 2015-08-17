/*global describe,beforeEach,afterEach,it*/

import expect from 'expect.js';

import * as fixtures from './helpers/fixtures';
import Share from './../main';
let testShare;
let shareEl;

describe('share url behaviour', function() {

	beforeEach(function() {
		fixtures.insertShareLinks();
		shareEl = document.querySelector('[data-o-component=o-share]');
		testShare = new Share(shareEl);
		// new MouseEvent() not working, it's not being caught by the handler
		const ev = document.createEvent('Event');
		ev.initEvent('click', true, true);
		shareEl.querySelector('.o-share__action--url a').dispatchEvent(ev);
	});

	afterEach(function() {
		testShare.destroy();
		fixtures.reset();
	});

	it('share URL tool - opens', function() {
		expect(shareEl.querySelector('.o-share__action--url').getAttribute('aria-selected')).to.be('true');
		expect(shareEl.querySelectorAll('.o-share__action--url input').length).to.be(1);
		expect(shareEl.querySelector('.o-share__action--url input').value).to.be(shareEl.querySelector('.o-share__action--url a').href);
		expect(shareEl.querySelectorAll('.o-share__action--url .o-share-tooltip').length).to.be(1);
	});

	it('share URL tool - copied notification', function() {
		shareEl.querySelector('.o-share__action--url input').dispatchEvent(new Event('copy'));
		expect(shareEl.querySelector('.o-share__action--url .o-share-tooltip__text').innerText).to.be('Copied!');
	});

	it('share URL tool - closes on pressing escape', function() {
		const ev = document.createEvent('Event');
		ev.initEvent('keyup', true, true);
		ev.keyCode = 27;
		shareEl.querySelector('.o-share__action--url input').dispatchEvent(ev);
		expect(shareEl.querySelector('.o-share__action--url').hasAttribute('aria-selected')).to.be(false);
		expect(shareEl.querySelectorAll('.o-share__action--url input').length).to.be(0);
		expect(shareEl.querySelectorAll('.o-share__action--url .o-share-tooltip').length).to.be(0);
	});

	it('share URL tool - closes on pressing tab', function() {
		const ev = document.createEvent('Event');
		ev.initEvent('keyup', true, true);
		ev.keyCode = 9;
		shareEl.querySelector('.o-share__action--url input').dispatchEvent(ev);
		expect(shareEl.querySelector('.o-share__action--url').hasAttribute('aria-selected')).to.be(false);
		expect(shareEl.querySelectorAll('.o-share__action--url input').length).to.be(0);
		expect(shareEl.querySelectorAll('.o-share__action--url .o-share-tooltip').length).to.be(0);
	});

});
