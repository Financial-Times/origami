/*global require,describe,beforeEach,afterEach,it,expect,spyOn*/

require('./helpers/polyfills');

var fixtures = require('./helpers/fixtures'),
    Tabs = require('./../main'),
    testTabs,
    tabsEl,
    tabContentEl1,
    tabContentEl2,
    tabContentEl3;

describe("tabs behaviour", function() {
    "use strict";

    beforeEach(function(){
        fixtures.insertSimple();
        tabsEl = document.querySelector('[data-o-component=o-tabs]');
        tabContentEl1 = document.getElementById('tabContent1');
        tabContentEl2 = document.getElementById('tabContent2');
        tabContentEl3 = document.getElementById('tabContent3');
        testTabs = new Tabs(tabsEl);
    });

    afterEach(function() {
        testTabs.destroy();
        testTabs = null;
        tabsEl = null;
        tabContentEl1 = null;
        tabContentEl2 = null;
        tabContentEl3 = null;
        fixtures.reset();
    });

    it("is defined", function() {
        expect(Tabs).toBeDefined();
        expect(Tabs.prototype.createAllIn).toBeDefined();
    });

    it("is has correct initial dom changes", function() {
        expect(tabsEl.hasAttribute('data-o-tabs--js')).toBe(true);
        expect(tabsEl.querySelectorAll('li')[0].getAttribute('aria-controls')).toBe('tabContent1');
        expect(tabsEl.querySelectorAll('li')[1].getAttribute('aria-controls')).toBe('tabContent2');
        expect(tabsEl.querySelectorAll('li')[2].getAttribute('aria-controls')).toBe('tabContent3');
    });

    it("has correct initial state", function() {
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

    it("selectTab(1)", function() {
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

    it("click tab", function() {
        spyOn(testTabs, 'selectTab');
        var clickEvent = document.createEvent('Event');
        clickEvent.initEvent('click', true, true);

        tabsEl.querySelectorAll('li a')[2].dispatchEvent(clickEvent);
        expect(testTabs.selectTab).toHaveBeenCalledWith(2);

        tabsEl.querySelectorAll('li a')[1].dispatchEvent(clickEvent);
        expect(testTabs.selectTab).toHaveBeenCalledWith(1);

        tabsEl.querySelectorAll('li a')[0].dispatchEvent(clickEvent);
        expect(testTabs.selectTab).toHaveBeenCalledWith(0);

    });

    it("destroy()", function() {
        testTabs.destroy();

        expect(tabsEl.classList.contains('o-tabs--js')).toBe(false);

        spyOn(testTabs, 'selectTab');
        var clickEvent = document.createEvent('Event');
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