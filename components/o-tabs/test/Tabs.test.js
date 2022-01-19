/* eslint-env mocha */

import * as fixtures from './helpers/fixtures.js';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import {assert} from '@open-wc/testing';
import sinon from 'sinon/pkg/sinon-esm.js';
import Tabs from '../main.js';

let testTabs;
let tabsEl;
let tabs;
let tabPanels;

describe('tabs', () => {

	beforeEach(() => {
		fixtures.insertSimple();
		tabsEl = screen.getByRole('tablist');
		tabs = screen.getAllByRole('tab');
		tabPanels = screen.getAllByRole('tabpanel');
		testTabs = new Tabs(tabsEl);
	});

	afterEach(() => {
		fixtures.reset();
	});

	it('destroy()', () => {
		let spy;
		try {
			testTabs.destroy();

			assert.isFalse(tabsEl.classList.contains('o-tabs--js'));
			spy = sinon.spy(testTabs, 'selectTab');

			assert.isTrue(spy.notCalled);

			assert.strictEqual(tabPanels[0].getAttribute('aria-expanded'), 'true');
			assert.strictEqual(tabPanels[0].getAttribute('aria-hidden'), 'false');
			assert.strictEqual(tabPanels[1].getAttribute('aria-expanded'), 'true');
			assert.strictEqual(tabPanels[1].getAttribute('aria-hidden'), 'false');
			assert.strictEqual(tabPanels[2].getAttribute('aria-expanded'), 'true');
			assert.strictEqual(tabPanels[2].getAttribute('aria-hidden'), 'false');
		} finally {
			spy.restore();
		}
	});

	describe('tabs behaviour', () => {

		afterEach(() => {
			testTabs.destroy();
		});

		it('is defined', () => {
			assert.isDefined(Tabs);
			assert.isDefined(Tabs.init);
		});

		it('is has correct initial dom changes', () => {
			assert.isTrue(tabsEl.hasAttribute('data-o-tabs--js'));
			assert.strictEqual(tabs[0].getAttribute('aria-controls'), 'tabContent1');
			assert.strictEqual(tabs[1].getAttribute('aria-controls'), 'tabContent2');
			assert.strictEqual(tabs[2].getAttribute('aria-controls'), 'tabContent3');

			// Aria labelledby is set correctly:
			assert.strictEqual(tabs[2].id, 'tabContent3-label');
			assert.strictEqual(tabPanels[2].getAttribute('aria-labelledby'), 'tabContent3-label');

			// Focusable elements
			// Only one tab is focusable
			assert.isFalse(tabs[0].hasAttribute('tabindex'));
			assert.strictEqual(tabs[1].getAttribute('tabindex'), '-1');
			assert.strictEqual(tabs[2].getAttribute('tabindex'), '-1');

			// all tab panels are focusable but only one is ever shown on the screen at a time
			for (const tab of tabPanels) {
				assert.strictEqual(tab.getAttribute('tabindex'), '0');
			}
		});

		it('has correct initial state', () => {
			assert.strictEqual(tabs[0].getAttribute('aria-selected'), 'true');
			assert.strictEqual(tabs[1].getAttribute('aria-selected'), 'false');
			assert.strictEqual(tabs[2].getAttribute('aria-selected'), 'false');
			assert.strictEqual(tabPanels[0].getAttribute('aria-expanded'), 'true');
			assert.strictEqual(tabPanels[0].getAttribute('aria-hidden'), 'false');
			assert.strictEqual(tabPanels[1].getAttribute('aria-expanded'), 'false');
			assert.strictEqual(tabPanels[1].getAttribute('aria-hidden'), 'true');
			assert.strictEqual(tabPanels[2].getAttribute('aria-expanded'), 'false');
			assert.strictEqual(tabPanels[2].getAttribute('aria-hidden'), 'true');
		});

		it('can set the config declaratively', () => {
			assert.isTrue(testTabs.config['update-url']);
		});

		it('selectTab(1)', () => {
			testTabs.selectTab(1);
			assert.strictEqual(tabs[0].getAttribute('aria-selected'), 'false');
			assert.strictEqual(tabs[1].getAttribute('aria-selected'), 'true');
			assert.strictEqual(tabs[2].getAttribute('aria-selected'), 'false');
			assert.strictEqual(tabPanels[0].getAttribute('aria-expanded'), 'false');
			assert.strictEqual(tabPanels[0].getAttribute('aria-hidden'), 'true');
			assert.strictEqual(tabPanels[1].getAttribute('aria-expanded'), 'true');
			assert.strictEqual(tabPanels[1].getAttribute('aria-hidden'), 'false');
			assert.strictEqual(tabPanels[2].getAttribute('aria-expanded'), 'false');
			assert.strictEqual(tabPanels[2].getAttribute('aria-hidden'), 'true');
		});

		it('click tab', () => {
			let spy;
			try {
				spy = sinon.spy(testTabs, 'selectTab');

				userEvent.click(tabs[2]);
				assert.isTrue(spy.calledWith(2));

				userEvent.click(tabs[1]);
				assert.isTrue(spy.calledWith(1));

				userEvent.click(tabs[0]);
				assert.isTrue(spy.calledWith(0));
			} finally {
				spy.restore();
			}

		});

		it('enter key press tab', () => {
			let spy;
			try {
				spy = sinon.spy(testTabs, 'selectTab');

				tabs[2].focus();
				userEvent.keyboard('{enter}');
				assert.isTrue(spy.calledWith(2));

				tabs[1].focus();
				userEvent.keyboard('{enter}');
				assert.isTrue(spy.calledWith(1));

				tabs[0].focus();
				userEvent.keyboard('{enter}');
				assert.isTrue(spy.calledWith(0));
			} finally {
				spy.restore();
			}
		});

		it('does not auto initialise when "data-o-tabs-autoconstruct=false" is set', () => {
			fixtures.reset();

			fixtures.insertSimple();
			tabsEl = screen.getByRole('tablist');
			tabsEl.setAttribute('data-o-tabs-autoconstruct', 'false');
			Tabs.init();
			assert.isFalse(tabsEl.hasAttribute('data-o-tabs--js'));
		});

		describe('hash updating', () => {

			const rebuildTabs = (withUpdateUrl = true) => {
				fixtures.reset();
				fixtures.insertSimple();
				if (withUpdateUrl) {
					tabsEl.setAttribute('data-o-tabs-update-url', '');
				} else {
					tabsEl.removeAttribute('data-o-tabs-update-url');
				}
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
				rebuildTabs(true);
				testTabs.selectTab(0);
				const expectedHash = document.querySelector('.o-tabs a:first-child').hash;
				assert.strictEqual(location.hash, expectedHash);
			});

			it('Should not update the hash part of the url on tab initialisation', () => {
				rebuildTabs(true);
				assert.strictEqual(location.hash, '');
			});

			it('Should not update the url if the data attribute is not present', () => {
				rebuildTabs(false);
				testTabs.selectTab(0);
				assert.strictEqual(location.hash, '');
			});

			it('Should open the correct tab onload if the hash is present', (done) => {
				location.hash = '#tabContent3';
				tabsEl.addEventListener('oTabs.tabSelect', (ev) => {
					try {
						assert.strictEqual(ev.detail.selected, 2);
						done();
					} catch (error) {
						done(error);
					}
				});
				rebuildTabs(true);
			});

			it('Should respond to the hashchange event', (done) => {
				rebuildTabs(true);
				testTabs.selectTab(0);
				location.hash = '#tabContent3';
				tabsEl.addEventListener('oTabs.tabSelect', (ev) => {
					try {
						assert.strictEqual(ev.detail.selected, 2);
						done();
					} catch (error) {
						done(error);
					}
				});
			});
		});
	});
});
