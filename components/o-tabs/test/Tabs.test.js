/* eslint-env mocha */
/* global proclaim sinon */

import fixtures from './helpers/fixtures.js';

sinon.assert.expose(proclaim, {
	includeFail: false,
	prefix: ''
});

import Tabs from '../main.js';

let testTabs;
let tabsEl;
let tabContentEl1;
let tabContentEl2;
let tabContentEl3;

describe('tabs', () => {

	beforeEach(() => {
		fixtures.insertSimple();
		tabsEl = document.querySelector('[data-o-component=o-tabs]');
		tabContentEl1 = document.getElementById('tabContent1');
		tabContentEl2 = document.getElementById('tabContent2');
		tabContentEl3 = document.getElementById('tabContent3');
		testTabs = new Tabs(tabsEl);
	});

	afterEach(() => {
		testTabs = null;
		tabsEl = null;
		tabContentEl1 = null;
		tabContentEl2 = null;
		tabContentEl3 = null;
		fixtures.reset();
	});

	it('destroy()', () => {
		testTabs.destroy();

		proclaim.isFalse(tabsEl.classList.contains('o-tabs--js'));

		sinon.spy(testTabs, 'selectTab');
		const clickEvent = document.createEvent('Event');
		clickEvent.initEvent('click', true, true);

		tabsEl.querySelectorAll('li a')[2].dispatchEvent(clickEvent);
		proclaim.notCalled(testTabs.selectTab);

		proclaim.equal(tabContentEl1.getAttribute('aria-expanded'), 'true');
		proclaim.equal(tabContentEl1.getAttribute('aria-hidden'), 'false');
		proclaim.equal(tabContentEl2.getAttribute('aria-expanded'), 'true');
		proclaim.equal(tabContentEl2.getAttribute('aria-hidden'), 'false');
		proclaim.equal(tabContentEl3.getAttribute('aria-expanded'), 'true');
		proclaim.equal(tabContentEl3.getAttribute('aria-hidden'), 'false');

	});

	describe('tabs behaviour', () => {

		afterEach(() => {
			testTabs.destroy();
		});

		it('is defined', () => {
			proclaim.isDefined(Tabs);
			proclaim.isDefined(Tabs.init);
		});

		it('is has correct initial dom changes', () => {
			proclaim.isTrue(tabsEl.hasAttribute('data-o-tabs--js'));
			proclaim.strictEqual(tabsEl.querySelectorAll('li')[0].getAttribute('aria-controls'), 'tabContent1');
			proclaim.strictEqual(tabsEl.querySelectorAll('li')[1].getAttribute('aria-controls'), 'tabContent2');
			proclaim.strictEqual(tabsEl.querySelectorAll('li')[2].getAttribute('aria-controls'), 'tabContent3');

			// Aria labelledby is set correctly:
			proclaim.strictEqual(tabsEl.querySelectorAll('li')[2].querySelector('a').id, 'tabContent3-label');
			proclaim.strictEqual(tabContentEl3.getAttribute('aria-labelledby'), 'tabContent3-label');

			// Focusable elements
			[].forEach.call(document.querySelectorAll('.should-be-focusable'), function (element) {
				proclaim.equal(element.getAttribute('tabindex'), '0');
			});
			[].forEach.call(document.querySelectorAll('.should-not-be-focusable'), function (element) {
				proclaim.equal(element.getAttribute('tabindex'), '-1');
			});
		});

		it('has correct initial state', () => {
			proclaim.equal(tabsEl.querySelectorAll('li')[0].getAttribute('aria-selected'), 'true');
			proclaim.equal(tabsEl.querySelectorAll('li')[1].getAttribute('aria-selected'), 'false');
			proclaim.equal(tabsEl.querySelectorAll('li')[2].getAttribute('aria-selected'), 'false');
			proclaim.equal(tabContentEl1.getAttribute('aria-expanded'), 'true');
			proclaim.equal(tabContentEl1.getAttribute('aria-hidden'), 'false');
			proclaim.equal(tabContentEl2.getAttribute('aria-expanded'), 'false');
			proclaim.equal(tabContentEl2.getAttribute('aria-hidden'), 'true');
			proclaim.equal(tabContentEl3.getAttribute('aria-expanded'), 'false');
			proclaim.equal(tabContentEl3.getAttribute('aria-hidden'), 'true');
		});

		it('can set the config declaratively', () => {
			proclaim.isTrue(testTabs.config.disablefocus);
		});

		it('selectTab(1)', () => {
			testTabs.selectTab(1);
			proclaim.equal(tabsEl.querySelectorAll('li')[0].getAttribute('aria-selected'), 'false');
			proclaim.equal(tabsEl.querySelectorAll('li')[1].getAttribute('aria-selected'), 'true');
			proclaim.equal(tabsEl.querySelectorAll('li')[2].getAttribute('aria-selected'), 'false');
			proclaim.equal(tabContentEl1.getAttribute('aria-expanded'), 'false');
			proclaim.equal(tabContentEl1.getAttribute('aria-hidden'), 'true');
			proclaim.equal(tabContentEl2.getAttribute('aria-expanded'), 'true');
			proclaim.equal(tabContentEl2.getAttribute('aria-hidden'), 'false');
			proclaim.equal(tabContentEl3.getAttribute('aria-expanded'), 'false');
			proclaim.equal(tabContentEl3.getAttribute('aria-hidden'), 'true');
		});

		it('click tab', () => {
			sinon.spy(testTabs, 'selectTab');
			const clickEvent = document.createEvent('Event');
			clickEvent.initEvent('click', true, true);

			tabsEl.querySelectorAll('li a')[2].dispatchEvent(clickEvent);
			proclaim.calledWith(testTabs.selectTab, 2);

			tabsEl.querySelectorAll('li a')[1].dispatchEvent(clickEvent);
			proclaim.calledWith(testTabs.selectTab, 1);

			tabsEl.querySelectorAll('li a')[0].dispatchEvent(clickEvent);
			proclaim.calledWith(testTabs.selectTab, 0);

		});

		it('enter key press tab', () => {
			sinon.spy(testTabs, 'selectTab');
			const keyPressEvent = document.createEvent('Event');
			keyPressEvent.keyCode = 13;
			keyPressEvent.initEvent('keypress', true, true);

			tabsEl.querySelectorAll('li a')[2].dispatchEvent(keyPressEvent);
			proclaim.calledWith(testTabs.selectTab, 2);

			tabsEl.querySelectorAll('li a')[1].dispatchEvent(keyPressEvent);
			proclaim.calledWith(testTabs.selectTab, 1);

			tabsEl.querySelectorAll('li a')[0].dispatchEvent(keyPressEvent);
			proclaim.calledWith(testTabs.selectTab, 0);
		});

		it('does not auto initialise when "data-o-tabs-autoconstruct=false" is set', () => {
			fixtures.reset();

			fixtures.insertSimple();
			tabsEl = document.querySelector('[data-o-component=o-tabs]');
			tabsEl.setAttribute('data-o-tabs-autoconstruct', 'false');
			Tabs.init();
			proclaim.isFalse(tabsEl.hasAttribute('data-o-tabs--js'));
		});

		describe('hash updating', () => {

			const rebuildTabs = (withUpdateUrl = true) => {
				fixtures.reset();
				fixtures.insertSimple();
				if (withUpdateUrl) {
					tabsEl.setAttribute('data-o-tabs-update-url', '');
				}
				tabsEl.setAttribute('data-o-tabs-disablefocus', 'false');
				testTabs.destroy();
				testTabs = new Tabs(tabsEl);
			};

			beforeEach(() => {
				location.hash = '';
			});

			afterEach(() => {
				tabsEl.removeAttribute('data-o-tabs-update-url');
			});

			it('Should update the hash part of the url to the id of the active tab', () => {
				rebuildTabs();
				testTabs.selectTab(0);
				const expectedHash = document.querySelector('.o-tabs li:first-child a').hash;
				proclaim.strictEqual(location.hash, expectedHash);
			});

			it('Should not update the hash part of the url on tab initialisation', () => {
				rebuildTabs();
				proclaim.strictEqual(location.hash, '');
			});

			it('Should not update the url if the data attribute is not present', () => {
				rebuildTabs(false);
				testTabs.selectTab(0);
				proclaim.strictEqual(location.hash, '');
			});

			it('Should open the correct tab onload if the hash is present', (done) => {
				location.hash = '#tabContent3';
				tabsEl.addEventListener('oTabs.tabSelect', (ev) => {
					proclaim.strictEqual(ev.detail.selected, 2);
					done();
				});
				rebuildTabs();
			});

			it('Should respond to the hashchange event', (done) => {
				rebuildTabs();
				testTabs.selectTab(0);
				location.hash = '#tabContent3';
				tabsEl.addEventListener('oTabs.tabSelect', (ev) => {
					proclaim.strictEqual(ev.detail.selected, 2);
					done();
				});
			});
		});
	});
});
