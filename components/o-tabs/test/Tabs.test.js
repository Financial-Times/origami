/* eslint-env mocha */

import * as fixtures from './helpers/fixtures.js';
import userEvent, {dom} from '@financial-times/o-testing-library';
import {assert} from '@open-wc/testing';
import sinon from 'sinon/pkg/sinon-esm.js';
import Tabs from '../main.js';

const screen = dom.screen;

/**
 * @type {Tabs}
 */
let oTabs;
let tabsEl;
let tabs;
let tabPanels;

describe('tabs', () => {

	beforeEach(() => {
		fixtures.insertSimple();
		tabsEl = screen.getByRole('tablist');
		tabs = screen.getAllByRole('tab');
		tabPanels = screen.getAllByRole('tabpanel');
		oTabs = new Tabs(tabsEl);
	});

	afterEach(() => {
		fixtures.reset();
	});

	it('destroy()', () => {
		let spy;
		try {
			oTabs.destroy();

			assert.isFalse(tabsEl.classList.contains('o-tabs--js'));
			spy = sinon.spy(oTabs, 'selectTab');

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
			oTabs.destroy();
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
			assert.strictEqual(tabPanels[0].getAttribute('tabindex'), '0');
			assert.isFalse(tabPanels[1].hasAttribute('tabindex'));
			assert.isFalse(tabPanels[2].hasAttribute('tabindex'));
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
			assert.isTrue(oTabs.config['update-url']);
		});

		it('selectTab(1)', () => {
			oTabs.selectTab(1);
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
				spy = sinon.spy(oTabs, 'selectTab');

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
				spy = sinon.spy(oTabs, 'selectTab');

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
				oTabs.destroy();
				oTabs = new Tabs(tabsEl);
			};

			beforeEach(() => {
				location.hash = '';
			});

			afterEach(() => {
				tabsEl.removeAttribute('data-o-tabs-update-url');
			});

			it('Should update the hash part of the url to the id of the active tab', () => {
				rebuildTabs(true);
				oTabs.selectTab(0);
				const expectedHash = document.querySelector('.o-tabs a:first-child').hash;
				assert.strictEqual(location.hash, expectedHash);
			});

			it('Should not update the hash part of the url on tab initialisation', () => {
				rebuildTabs(true);
				assert.strictEqual(location.hash, '');
			});

			it('Should not update the url if the data attribute is not present', () => {
				rebuildTabs(false);
				oTabs.selectTab(0);
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
				oTabs.selectTab(0);
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

	describe('pointer accessibility', () => {
		/**
		 * @type {HTMLElement}
		 */
		 let tabList;
		 /**
		  * @type {HTMLElement}
		  */
		 let firstTab;
		 /**
		  * @type {HTMLElement}
		  */
		 let secondTab;
		 /**
		  * @type {HTMLElement}
		  */
		 let lastTab;
		 beforeEach(() => {
			 tabList = screen.queryByRole('tablist');
			 const tabs = tabList.querySelectorAll('[role=tab]');
			 firstTab = tabs[0];
			 secondTab = tabs[1];
			 lastTab = tabs[2];
		 });

		 afterEach(() => {
			 oTabs.destroy();
		 });
		context('clicking onto an unactive tab in the tab-list', () => {
			beforeEach(() => {
				secondTab.click();
			});
			it('will remove the other tabs from the tabbing order', () => {
				assert.equal(firstTab.getAttribute('tabindex'), '-1');
				assert.equal(lastTab.getAttribute('tabindex'), '-1');
			});
			it('deselects the other tabs', () => {
				assert.equal(firstTab.getAttribute('aria-selected'), 'false');
				assert.equal(lastTab.getAttribute('aria-selected'), 'false');
			});
			it('selects the clicked tab', () => {
				assert.equal(secondTab.getAttribute('aria-selected'), 'true');
			});
			it('will add the clicked tab to the tabbing order', () => {
				assert.isFalse(secondTab.hasAttribute('tabindex'));
			});
			it('activates the tabpanel which is associated with the newly selected tab', () => {
				const panelAssociatedWithSecondTab = document.getElementById(secondTab.getAttribute('aria-controls'));
				assert.equal(panelAssociatedWithSecondTab.getAttribute('aria-expanded'), 'true');
				assert.equal(panelAssociatedWithSecondTab.getAttribute('aria-hidden'), 'false');
			});
			it('adds the tabpanel which is associated with the newly selected tab to the tabbing order', () => {
				const panelAssociatedWithSecondTab = document.getElementById(secondTab.getAttribute('aria-controls'));
				assert.equal(panelAssociatedWithSecondTab.getAttribute('tabindex'), '0');
			});
			it('deactivates any tabpanels in the tab component which are not associated with the newly selected tab', () => {
				const panelAssociatedWithFirstTab = document.getElementById(firstTab.getAttribute('aria-controls'));
				assert.equal(panelAssociatedWithFirstTab.getAttribute('aria-expanded'), 'false');
				assert.equal(panelAssociatedWithFirstTab.getAttribute('aria-hidden'), 'true');
				assert.isFalse(panelAssociatedWithFirstTab.hasAttribute('tabindex'));

				const panelAssociatedWithLastTab = document.getElementById(lastTab.getAttribute('aria-controls'));
				assert.equal(panelAssociatedWithLastTab.getAttribute('aria-expanded'), 'false');
				assert.equal(panelAssociatedWithLastTab.getAttribute('aria-hidden'), 'true');
				assert.isFalse(panelAssociatedWithLastTab.hasAttribute('tabindex'));
			});
		});

	});

	describe('keyboard accessibility', () => {
		/**
		 * @type {HTMLElement}
		 */
		let tabList;
		/**
		 * @type {HTMLElement}
		 */
		let firstTab;
		/**
		 * @type {HTMLElement}
		 */
		let secondTab;
		/**
		 * @type {HTMLElement}
		 */
		let lastTab;
		beforeEach(() => {
			tabList = screen.queryByRole('tablist');
			const tabs = tabList.querySelectorAll('[role=tab]');
			firstTab = tabs[0];
			secondTab = tabs[1];
			lastTab = tabs[2];
		});

		afterEach(() => {
			oTabs.destroy();
		});

		context('when tabbing into the tab-list', () => {
			it('the active tab is the one which is focused onto', () => {
				// Bring the focus onto the body element
				document.body.focus();
				// Tab to the next focusable item which will be the o-tabs component
				userEvent.tab();
				const elementInFocus = document.activeElement;
				const activeTab = screen.getByRole('tab', { selected: true });
				assert.strictEqual(elementInFocus, activeTab);
			});
		});

		context('when on the first tab in the tab-list', () => {
			beforeEach(() => {
				oTabs.selectTab(0);
				firstTab.focus();
			});

			context('pressing the left arrow key', () => {
				beforeEach(() => {
					firstTab.dispatchEvent(new KeyboardEvent('keyup', {
						keyCode: 37,
						bubbles:true
					}));
				});
				it('will remove the first tab from the tabbing order', () => {
					assert.equal(firstTab.getAttribute('tabindex'), '-1');
				});
				it('deselects the first tab', () => {
					assert.equal(firstTab.getAttribute('aria-selected'), 'false');
				});
				it('selects the last tab', () => {
					assert.equal(lastTab.getAttribute('aria-selected'), 'true');
				});
				it('will add the last tab to the tabbing order', () => {
					assert.isFalse(lastTab.hasAttribute('tabindex'));
				});
				it('activates the tabpanel which is associated with the newly focused tab', () => {
					const panelAssociatedWithLastTab = document.getElementById(lastTab.getAttribute('aria-controls'));
					assert.equal(panelAssociatedWithLastTab.getAttribute('aria-expanded'), 'true');
					assert.equal(panelAssociatedWithLastTab.getAttribute('aria-hidden'), 'false');
				});
				it('adds the tabpanel which is associated with the newly focused tab to the tabbing order', () => {
					const panelAssociatedWithLastTab = document.getElementById(lastTab.getAttribute('aria-controls'));
					assert.equal(panelAssociatedWithLastTab.getAttribute('tabindex'), '0');
				});
				it('deactivates any tabpanels in the tab component which are not associated with the newly focused tab', () => {
					const panelAssociatedWithFirstTab = document.getElementById(firstTab.getAttribute('aria-controls'));
					assert.equal(panelAssociatedWithFirstTab.getAttribute('aria-expanded'), 'false');
					assert.equal(panelAssociatedWithFirstTab.getAttribute('aria-hidden'), 'true');
					assert.isFalse(panelAssociatedWithFirstTab.hasAttribute('tabindex'));

					const panelAssociatedWithSecondTab = document.getElementById(secondTab.getAttribute('aria-controls'));
					assert.equal(panelAssociatedWithSecondTab.getAttribute('aria-expanded'), 'false');
					assert.equal(panelAssociatedWithSecondTab.getAttribute('aria-hidden'), 'true');
					assert.isFalse(panelAssociatedWithSecondTab.hasAttribute('tabindex'));
				});
			});
			context('pressing the right arrow key', () => {
				beforeEach(() => {
					firstTab.dispatchEvent(new KeyboardEvent('keyup', {
						keyCode: 39,
						bubbles:true
					}));
				});
				it('will remove the first tab from the tabbing order', () => {
					assert.equal(firstTab.getAttribute('tabindex'), '-1');
				});
				it('deselects the first tab', () => {
					assert.equal(firstTab.getAttribute('aria-selected'), 'false');
				});
				it('selects the second tab', () => {
					assert.equal(secondTab.getAttribute('aria-selected'), 'true');
				});
				it('will add the second tab to the tabbing order', () => {
					assert.isFalse(secondTab.hasAttribute('tabindex'));
				});
				it('activates the tabpanel which is associated with the newly focused tab', () => {
					const panelAssociatedWithSecondTab = document.getElementById(secondTab.getAttribute('aria-controls'));
					assert.equal(panelAssociatedWithSecondTab.getAttribute('aria-expanded'), 'true');
					assert.equal(panelAssociatedWithSecondTab.getAttribute('aria-hidden'), 'false');
				});
				it('adds the tabpanel which is associated with the newly focused tab to the tabbing order', () => {
					const panelAssociatedWithSecondTab = document.getElementById(secondTab.getAttribute('aria-controls'));
					assert.equal(panelAssociatedWithSecondTab.getAttribute('tabindex'), '0');
				});
				it('deactivates any tabpanels in the tab component which are not associated with the newly focused tab', () => {
					const panelAssociatedWithFirstTab = document.getElementById(firstTab.getAttribute('aria-controls'));
					assert.equal(panelAssociatedWithFirstTab.getAttribute('aria-expanded'), 'false');
					assert.equal(panelAssociatedWithFirstTab.getAttribute('aria-hidden'), 'true');
					assert.isFalse(panelAssociatedWithFirstTab.hasAttribute('tabindex'));

					const panelAssociatedWithLastTab = document.getElementById(lastTab.getAttribute('aria-controls'));
					assert.equal(panelAssociatedWithLastTab.getAttribute('aria-expanded'), 'false');
					assert.equal(panelAssociatedWithLastTab.getAttribute('aria-hidden'), 'true');
					assert.isFalse(panelAssociatedWithLastTab.hasAttribute('tabindex'));
				});
			});
			it('pressing the tab key will change the focus to the open tab-panel', () => {
				const panelAssociatedWithFirstTab = document.getElementById(firstTab.getAttribute('aria-controls'));
				userEvent.tab();
				assert.strictEqual(document.activeElement, panelAssociatedWithFirstTab);
			});
			it('pressing the space key activates the tabpanel which is associated with the focused tab', () => {
				const panelAssociatedWithFirstTab = document.getElementById(firstTab.getAttribute('aria-controls'));
				userEvent.keyboard('{space}');
				assert.strictEqual(document.activeElement, panelAssociatedWithFirstTab);
			});
			it('pressing the enter key activates the tabpanel which is associated with the focused tab', () => {
				const panelAssociatedWithFirstTab = document.getElementById(firstTab.getAttribute('aria-controls'));
				userEvent.keyboard('{enter}');
				assert.strictEqual(document.activeElement, panelAssociatedWithFirstTab);
			});
		});

		context('when on the second tab in the tab-list', () => {
			beforeEach(() => {
				oTabs.selectTab(1);
				secondTab.focus();
			});
			context('pressing the left arrow key', () => {
				beforeEach(() => {
					secondTab.dispatchEvent(new KeyboardEvent('keyup', {
						keyCode: 37,
						bubbles:true
					}));
				});
				it('will remove the second tab from the tabbing order', () => {
					assert.equal(secondTab.getAttribute('tabindex'), '-1');
				});
				it('deselects the second tab', () => {
					assert.equal(secondTab.getAttribute('aria-selected'), 'false');
				});
				it('selects the first tab', () => {
					assert.equal(firstTab.getAttribute('aria-selected'), 'true');
				});
				it('will add the first tab to the tabbing order', () => {
					assert.isFalse(firstTab.hasAttribute('tabindex'));
				});
				it('activates the tabpanel which is associated with the newly focused tab', () => {
					const panelAssociatedWithFirstTab = document.getElementById(firstTab.getAttribute('aria-controls'));
					assert.equal(panelAssociatedWithFirstTab.getAttribute('aria-expanded'), 'true');
					assert.equal(panelAssociatedWithFirstTab.getAttribute('aria-hidden'), 'false');
				});
				it('adds the tabpanel which is associated with the newly focused tab to the tabbing order', () => {
					const panelAssociatedWithFirstTab = document.getElementById(firstTab.getAttribute('aria-controls'));
					assert.equal(panelAssociatedWithFirstTab.getAttribute('tabindex'), '0');
				});
				it('deactivates any tabpanels in the tab component which are not associated with the newly focused tab', () => {
					const panelAssociatedWithSecondTab = document.getElementById(secondTab.getAttribute('aria-controls'));
					assert.equal(panelAssociatedWithSecondTab.getAttribute('aria-expanded'), 'false');
					assert.equal(panelAssociatedWithSecondTab.getAttribute('aria-hidden'), 'true');
					assert.isFalse(panelAssociatedWithSecondTab.hasAttribute('tabindex'));

					const panelAssociatedWithLastTab = document.getElementById(lastTab.getAttribute('aria-controls'));
					assert.equal(panelAssociatedWithLastTab.getAttribute('aria-expanded'), 'false');
					assert.equal(panelAssociatedWithLastTab.getAttribute('aria-hidden'), 'true');
					assert.isFalse(panelAssociatedWithLastTab.hasAttribute('tabindex'));
				});
			});
			context('pressing the right arrow key', () => {
				beforeEach(() => {
					secondTab.dispatchEvent(new KeyboardEvent('keyup', {
						keyCode: 39,
						bubbles:true
					}));
				});
				it('will remove the second tab from the tabbing order', () => {
					assert.equal(secondTab.getAttribute('tabindex'), '-1');
				});
				it('deselects the second tab', () => {
					assert.equal(secondTab.getAttribute('aria-selected'), 'false');
				});
				it('selects the last tab', () => {
					assert.equal(lastTab.getAttribute('aria-selected'), 'true');
				});
				it('will add the last tab to the tabbing order', () => {
					assert.isFalse(lastTab.hasAttribute('tabindex'));
				});
				it('activates the tabpanel which is associated with the newly focused tab', () => {
					const panelAssociatedWithLastTab = document.getElementById(lastTab.getAttribute('aria-controls'));
					assert.equal(panelAssociatedWithLastTab.getAttribute('aria-expanded'), 'true');
					assert.equal(panelAssociatedWithLastTab.getAttribute('aria-hidden'), 'false');
				});
				it('adds the tabpanel which is associated with the newly focused tab to the tabbing order', () => {
					const panelAssociatedWithLastTab = document.getElementById(lastTab.getAttribute('aria-controls'));
					assert.equal(panelAssociatedWithLastTab.getAttribute('tabindex'), '0');
				});
				it('deactivates any tabpanels in the tab component which are not associated with the newly focused tab', () => {
					const panelAssociatedWithFirstTab = document.getElementById(firstTab.getAttribute('aria-controls'));
					assert.equal(panelAssociatedWithFirstTab.getAttribute('aria-expanded'), 'false');
					assert.equal(panelAssociatedWithFirstTab.getAttribute('aria-hidden'), 'true');
					assert.isFalse(panelAssociatedWithFirstTab.hasAttribute('tabindex'));

					const panelAssociatedWithSecondTab = document.getElementById(secondTab.getAttribute('aria-controls'));
					assert.equal(panelAssociatedWithSecondTab.getAttribute('aria-expanded'), 'false');
					assert.equal(panelAssociatedWithSecondTab.getAttribute('aria-hidden'), 'true');
					assert.isFalse(panelAssociatedWithSecondTab.hasAttribute('tabindex'));
				});
			});
			it('pressing the tab key will change the focus to the open tab-panel', () => {
				const panelAssociatedWithSecondTab = document.getElementById(secondTab.getAttribute('aria-controls'));
				userEvent.tab();
				assert.strictEqual(document.activeElement, panelAssociatedWithSecondTab);
			});
			it('pressing the space key activates the tabpanel which is associated with the focused tab', () => {
				const panelAssociatedWithSecondTab = document.getElementById(secondTab.getAttribute('aria-controls'));
				userEvent.keyboard('{space}');
				assert.strictEqual(document.activeElement, panelAssociatedWithSecondTab);
			});
			it('pressing the enter key activates the tabpanel which is associated with the focused tab', () => {
				const panelAssociatedWithSecondTab = document.getElementById(secondTab.getAttribute('aria-controls'));
				userEvent.keyboard('{enter}');
				assert.strictEqual(document.activeElement, panelAssociatedWithSecondTab);
			});
		});

		context('when on the last tab in the tab-list', () => {
			beforeEach(() => {
				oTabs.selectTab(2);
				lastTab.focus();
			});
			context('pressing the left arrow key', () => {
				beforeEach(() => {
					lastTab.dispatchEvent(new KeyboardEvent('keyup', {
						keyCode: 37,
						bubbles:true
					}));
				});
				it('will remove the last tab from the tabbing order', () => {
					assert.equal(lastTab.getAttribute('tabindex'), '-1');
				});
				it('deselects the last tab', () => {
					assert.equal(lastTab.getAttribute('aria-selected'), 'false');
				});
				it('selects the second tab', () => {
					assert.equal(secondTab.getAttribute('aria-selected'), 'true');
				});
				it('will add the second tab to the tabbing order', () => {
					assert.isFalse(secondTab.hasAttribute('tabindex'));
				});
				it('activates the tabpanel which is associated with the newly focused tab', () => {
					const panelAssociatedWithSecondTab = document.getElementById(secondTab.getAttribute('aria-controls'));
					assert.equal(panelAssociatedWithSecondTab.getAttribute('aria-expanded'), 'true');
					assert.equal(panelAssociatedWithSecondTab.getAttribute('aria-hidden'), 'false');
				});
				it('adds the tabpanel which is associated with the newly focused tab to the tabbing order', () => {
					const panelAssociatedWithSecondTab = document.getElementById(secondTab.getAttribute('aria-controls'));
					assert.equal(panelAssociatedWithSecondTab.getAttribute('tabindex'), '0');
				});
				it('deactivates any tabpanels in the tab component which are not associated with the newly focused tab', () => {
					const panelAssociatedWithFirstTab = document.getElementById(firstTab.getAttribute('aria-controls'));
					assert.equal(panelAssociatedWithFirstTab.getAttribute('aria-expanded'), 'false');
					assert.equal(panelAssociatedWithFirstTab.getAttribute('aria-hidden'), 'true');
					assert.isFalse(panelAssociatedWithFirstTab.hasAttribute('tabindex'));

					const panelAssociatedWithLastTab = document.getElementById(lastTab.getAttribute('aria-controls'));
					assert.equal(panelAssociatedWithLastTab.getAttribute('aria-expanded'), 'false');
					assert.equal(panelAssociatedWithLastTab.getAttribute('aria-hidden'), 'true');
					assert.isFalse(panelAssociatedWithLastTab.hasAttribute('tabindex'));
				});
			});
			context('pressing the right arrow key', () => {
				beforeEach(() => {
					lastTab.dispatchEvent(new KeyboardEvent('keyup', {
						keyCode: 39,
						bubbles:true
					}));
				});
				it('will remove the last tab from the tabbing order', () => {
					assert.equal(lastTab.getAttribute('tabindex'), '-1');
				});
				it('deselects the last tab', () => {
					assert.equal(lastTab.getAttribute('aria-selected'), 'false');
				});
				it('selects the first tab', () => {
					assert.equal(firstTab.getAttribute('aria-selected'), 'true');
				});
				it('will add the first tab to the tabbing order', () => {
					assert.isFalse(firstTab.hasAttribute('tabindex'));
				});
				it('activates the tabpanel which is associated with the newly focused tab', () => {
					const panelAssociatedWithFirstTab = document.getElementById(firstTab.getAttribute('aria-controls'));
					assert.equal(panelAssociatedWithFirstTab.getAttribute('aria-expanded'), 'true');
					assert.equal(panelAssociatedWithFirstTab.getAttribute('aria-hidden'), 'false');
				});
				it('adds the tabpanel which is associated with the newly focused tab to the tabbing order', () => {
					const panelAssociatedWithFirstTab = document.getElementById(firstTab.getAttribute('aria-controls'));
					assert.equal(panelAssociatedWithFirstTab.getAttribute('tabindex'), '0');
				});
				it('deactivates any tabpanels in the tab component which are not associated with the newly focused tab', () => {
					const panelAssociatedWithSecondTab = document.getElementById(secondTab.getAttribute('aria-controls'));
					assert.equal(panelAssociatedWithSecondTab.getAttribute('aria-expanded'), 'false');
					assert.equal(panelAssociatedWithSecondTab.getAttribute('aria-hidden'), 'true');
					assert.isFalse(panelAssociatedWithSecondTab.hasAttribute('tabindex'));

					const panelAssociatedWithLastTab = document.getElementById(lastTab.getAttribute('aria-controls'));
					assert.equal(panelAssociatedWithLastTab.getAttribute('aria-expanded'), 'false');
					assert.equal(panelAssociatedWithLastTab.getAttribute('aria-hidden'), 'true');
					assert.isFalse(panelAssociatedWithLastTab.hasAttribute('tabindex'));
				});
			});
			it('pressing the tab key will change the focus to the open tab-panel', () => {
				const panelAssociatedWithLastTab = document.getElementById(lastTab.getAttribute('aria-controls'));
				userEvent.tab();
				assert.strictEqual(document.activeElement, panelAssociatedWithLastTab);
			});
			it('pressing the space key activates the tabpanel which is associated with the focused tab', () => {
				const panelAssociatedWithLastTab = document.getElementById(lastTab.getAttribute('aria-controls'));
				userEvent.keyboard('{space}');
				assert.strictEqual(document.activeElement, panelAssociatedWithLastTab);
			});
			it('pressing the enter key activates the tabpanel which is associated with the focused tab', () => {
				const panelAssociatedWithLastTab = document.getElementById(lastTab.getAttribute('aria-controls'));
				userEvent.keyboard('{enter}');
				assert.strictEqual(document.activeElement, panelAssociatedWithLastTab);
			});
		});
	});
});
