/*global describe,beforeEach,afterEach,it,expect,spyOn*/

import * as fixtures from './helpers/fixtures';
import Tabs from '../main';

let testTabs;
let tabsEl;
let tabContentEl1;
let tabContentEl2;
let tabContentEl3;

describe("tabs behaviour", () => {

	beforeEach(() => {
		fixtures.insertSimple();
		tabsEl = document.querySelector('[data-o-component=o-tabs]');
		tabContentEl1 = document.getElementById('tabContent1');
		tabContentEl2 = document.getElementById('tabContent2');
		tabContentEl3 = document.getElementById('tabContent3');
		testTabs = new Tabs(tabsEl);
	});

	afterEach(() => {
		testTabs.destroy();
		testTabs = null;
		tabsEl = null;
		tabContentEl1 = null;
		tabContentEl2 = null;
		tabContentEl3 = null;
		fixtures.reset();
	});

	it("is defined", () => {
		expect(Tabs).toBeDefined();
		expect(Tabs.init).toBeDefined();
	});

	it("is has correct initial dom changes", () => {
		expect(tabsEl.hasAttribute('data-o-tabs--js')).toBe(true);
		expect(tabsEl.querySelectorAll('li')[0].getAttribute('aria-controls')).toBe('tabContent1');
		expect(tabsEl.querySelectorAll('li')[1].getAttribute('aria-controls')).toBe('tabContent2');
		expect(tabsEl.querySelectorAll('li')[2].getAttribute('aria-controls')).toBe('tabContent3');

		// Aria labelledby is set correctly:
		expect(tabsEl.querySelectorAll('li')[2].querySelector('a').id).toBe('tabContent3-label');
		expect(tabContentEl3.getAttribute('aria-labelledby')).toBe('tabContent3-label');

		// Focusable elements
		[].forEach.call(document.querySelectorAll('.should-be-focusable'), function(element) {
			expect(element.getAttribute('tabindex')).toBe('0');
		});
		[].forEach.call(document.querySelectorAll('.should-not-be-focusable'), function(element) {
			expect(element.getAttribute('tabindex')).toBe('-1');
		});
	});

	it("has correct initial state", () => {
		expect(tabsEl.querySelectorAll('li')[0].getAttribute('aria-selected')).toBe('true');
		expect(tabsEl.querySelectorAll('li')[1].getAttribute('aria-selected')).toBe('false');
		expect(tabsEl.querySelectorAll('li')[2].getAttribute('aria-selected')).toBe('false');
		expect(tabContentEl1.getAttribute('aria-expanded')).toBe('true');
		expect(tabContentEl1.getAttribute('aria-hidden')).toBe('false');
		expect(tabContentEl2.getAttribute('aria-expanded')).toBe('false');
		expect(tabContentEl2.getAttribute('aria-hidden')).toBe('true');
		expect(tabContentEl3.getAttribute('aria-expanded')).toBe('false');
		expect(tabContentEl3.getAttribute('aria-hidden')).toBe('true');
	});

	it("selectTab(1)", () => {
		testTabs.selectTab(1);
		expect(tabsEl.querySelectorAll('li')[0].getAttribute('aria-selected')).toBe('false');
		expect(tabsEl.querySelectorAll('li')[1].getAttribute('aria-selected')).toBe('true');
		expect(tabsEl.querySelectorAll('li')[2].getAttribute('aria-selected')).toBe('false');
		expect(tabContentEl1.getAttribute('aria-expanded')).toBe('false');
		expect(tabContentEl1.getAttribute('aria-hidden')).toBe('true');
		expect(tabContentEl2.getAttribute('aria-expanded')).toBe('true');
		expect(tabContentEl2.getAttribute('aria-hidden')).toBe('false');
		expect(tabContentEl3.getAttribute('aria-expanded')).toBe('false');
		expect(tabContentEl3.getAttribute('aria-hidden')).toBe('true');
	});

	it("click tab", () => {
		spyOn(testTabs, 'selectTab');
		const clickEvent = document.createEvent('Event');
		clickEvent.initEvent('click', true, true);

		tabsEl.querySelectorAll('li a')[2].dispatchEvent(clickEvent);
		expect(testTabs.selectTab).toHaveBeenCalledWith(2);

		tabsEl.querySelectorAll('li a')[1].dispatchEvent(clickEvent);
		expect(testTabs.selectTab).toHaveBeenCalledWith(1);

		tabsEl.querySelectorAll('li a')[0].dispatchEvent(clickEvent);
		expect(testTabs.selectTab).toHaveBeenCalledWith(0);

	});

	it("destroy()", () => {
		testTabs.destroy();

		expect(tabsEl.classList.contains('o-tabs--js')).toBe(false);

		spyOn(testTabs, 'selectTab');
		const clickEvent = document.createEvent('Event');
		clickEvent.initEvent('click', true, true);

		tabsEl.querySelectorAll('li a')[2].dispatchEvent(clickEvent);
		expect(testTabs.selectTab).not.toHaveBeenCalled();

		expect(tabContentEl1.getAttribute('aria-expanded')).toBe('true');
		expect(tabContentEl1.getAttribute('aria-hidden')).toBe('false');
		expect(tabContentEl2.getAttribute('aria-expanded')).toBe('true');
		expect(tabContentEl2.getAttribute('aria-hidden')).toBe('false');
		expect(tabContentEl3.getAttribute('aria-expanded')).toBe('true');
		expect(tabContentEl3.getAttribute('aria-hidden')).toBe('false');

	});

});
