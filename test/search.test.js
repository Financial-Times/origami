/*global describe, it, beforeEach, afterEach*/

const expect = require('expect.js');
const sinon = require('sinon/pkg/sinon');

const Search = require('./../src/js/search');

describe('Search API', () => {

	it("is defined", () => {
		expect(Search).to.be.a('function');
	});

	it('has a destroy instance method', () => {
		expect(Search.prototype.destroy).to.be.a('function');
	});

	it('has a searchToggleClickHandler instance method', () => {
		expect(Search.prototype.searchToggleClickHandler).to.be.a('function');
	});
});

describe('Search instance', () => {
	let toggleEl;
	let formEl;
	let containerEl;

	beforeEach(() => {
		containerEl = document.createElement('div');
		document.body.appendChild(containerEl);
		containerEl.innerHTML = `
			<button class="o-header__search-toggle" data-o-header-togglable data-o-header-togglable-search aria-hidden="true">Search</button>
			<form action="#" id="o-header__search-form" class="o-header__search-form" data-o-header-search role="search" style="visibility: hidden;">
				<input id="o-header__search-term" type="search" name="q" class="o-header__search-input"  autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="Type to search the Financial Times" />
				<button class="o-header__search-button" for="o-header__search-form"><span>Search</span></button>
			</form>
		`;
		toggleEl = containerEl.querySelector('[data-o-header-togglable-search]');
		formEl = containerEl.querySelector('[data-o-header-search]');
	});

	afterEach(() => {
		containerEl.removeChild(formEl);
		containerEl.removeChild(toggleEl);
		formEl = null;
		toggleEl = null;
		containerEl = null;
	});

	it('constructor', () => {
		const search = new Search(containerEl);
		expect(search).to.be.a('object');
		expect(Object.getPrototypeOf(search)).to.equal(Search.prototype);
		expect(search.headerEl).to.be(containerEl);
		expect(search.formEl).to.be(formEl);
		expect(search.toggleEl).to.be(toggleEl);
		expect(search.inputEl).to.be(formEl.querySelector('input'));
		expect(search.toggleHandler).to.be.a('function');
	});

	it('#destroy', () => {
		const search = new Search(containerEl);
		expect(search.headerEl).to.be(containerEl);
		search.destroy();
		expect(search.headerEl).to.be(undefined);
		expect(search.formEl).to.be(undefined);
		expect(search.toggleEl).to.be(undefined);
		expect(search.inputEl).to.be(undefined);
		expect(search.toggleHandler).to.be(undefined);
	});

	it('#searchToggleClickHandler', (done) => {
		const search = new Search(containerEl);
		const realFocus = search.inputEl.focus;
		const focusSpy = sinon.spy();
		search.inputEl.focus = focusSpy;

		let eventsCaught = 0;
		containerEl.addEventListener('oHeader.searchToggle', (ev) => {
			eventsCaught++;
			if (eventsCaught === 1) {
				expect(ev.detail.isOpen).to.be(false);
				expect(focusSpy.callCount).to.be(0);

				// Make form visible and run the handler again to test isOpen
				search.formEl.style.visibility = 'visible';
				search.searchToggleClickHandler();
			}

			if (eventsCaught === 2) {
				expect(ev.detail.isOpen).to.be(true);
				expect(focusSpy.callCount).to.be(1);

				// Cleanup spy
				search.inputEl.focus = realFocus;
				done();
			}
		});

		search.searchToggleClickHandler();
	});

	it('adds and removes event listeners to toggle', () => {
		// Adding
		const realAddEventListener = Element.prototype.addEventListener;
		const addEventListenerSpy = sinon.spy();
		Element.prototype.addEventListener = addEventListenerSpy;

		const search = new Search(containerEl);

		expect(addEventListenerSpy.calledOn(search.toggleEl)).to.be(true);

		expect(addEventListenerSpy.callCount).to.be(2);
		const toucheEventAndHandler = addEventListenerSpy.args[0];
		expect(toucheEventAndHandler[0]).to.be('touchend');
		expect(toucheEventAndHandler[1]).to.be(search.toggleHandler);
		const clickEventAndHandler = addEventListenerSpy.args[1];
		expect(clickEventAndHandler[0]).to.be('click');
		expect(clickEventAndHandler[1]).to.be(search.toggleHandler);

		// Removing
		const realRemoveEventListener = Element.prototype.removeEventListener;
		const removeEventListenerSpy = sinon.spy();
		Element.prototype.removeEventListener = removeEventListenerSpy;

		search.destroy();

		expect(removeEventListenerSpy.calledOn(addEventListenerSpy.thisValues[0])).to.be(true);
		expect(removeEventListenerSpy.callCount).to.be(2);
		expect(removeEventListenerSpy.calledWith(...toucheEventAndHandler)).to.be(true);
		expect(removeEventListenerSpy.calledWith(...clickEventAndHandler)).to.be(true);

		// Cleanup
		Element.prototype.addEventListener = realAddEventListener;
		Element.prototype.removeEventListener = realRemoveEventListener;
	});


});
