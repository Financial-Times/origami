/* eslint-env mocha, sinon, proclaim */

import proclaim from 'proclaim';
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
		shareEl.querySelector('.o-share__action--link a').dispatchEvent(ev);
	});

	afterEach(function() {
		testShare.destroy();
		fixtures.reset();
	});

	it('share URL tool - opens', function() {
		proclaim.equal(shareEl.querySelector('.o-share__action--link').getAttribute('aria-selected'), 'true');
		proclaim.lengthEquals(shareEl.querySelectorAll('.o-share__action--link input'), 1);
		proclaim.equal(shareEl.querySelector('.o-share__action--link input').value, shareEl.querySelector('.o-share__action--link a').href);
		proclaim.lengthEquals(shareEl.querySelectorAll('.o-share__action--link .o-share-tooltip'), 1);
	});

	it('share URL tool - copied notification', function() {
		shareEl.querySelector('.o-share__action--link input').dispatchEvent(new Event('copy'));
		proclaim.equal(shareEl.querySelector('.o-share__action--link .o-share-tooltip__text').innerText, 'Copied!');
	});

	it('share URL tool - closes on pressing escape', function() {
		const ev = document.createEvent('Event');
		ev.initEvent('keydown', true, true);
		ev.keyCode = 27;
		shareEl.querySelector('.o-share__action--link input').dispatchEvent(ev);

		proclaim.equal(shareEl.querySelector('.o-share__action--link').hasAttribute('aria-selected'), false);
		proclaim.lengthEquals(shareEl.querySelectorAll('.o-share__action--link input'), 0);
		proclaim.lengthEquals(shareEl.querySelectorAll('.o-share__action--link .o-share-tooltip'), 0);
	});

	it('share URL tool - closes on pressing tab', function() {
		const ev = document.createEvent('Event');
		ev.initEvent('keydown', true, true);
		ev.keyCode = 9;
		shareEl.querySelector('.o-share__action--link input').dispatchEvent(ev);
		proclaim.equal(shareEl.querySelector('.o-share__action--link').hasAttribute('aria-selected'), false);
		proclaim.lengthEquals(shareEl.querySelectorAll('.o-share__action--link input'), 0);
		proclaim.lengthEquals(shareEl.querySelectorAll('.o-share__action--link .o-share-tooltip'), 0);
	});

});
