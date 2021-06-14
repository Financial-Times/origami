/* eslint-env mocha */
/* global sinon */
import './helpers/hack.js';
import * as fixtures from './helpers/fixtures.js';
import Autocomplete from '../../main.js';
import { screen, getByRole } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
// import expect from 'expect';
import chai from 'chai';
const assert = chai.assert;

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

describe("Autocomplete", () => {
	it('is defined', () => {
		assert.isFunction(Autocomplete);
	});
	it("should autoinitialize", (done) => {
		const initSpy = sinon.spy(Autocomplete, 'init');
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
		setTimeout(function(){
			assert.isTrue(initSpy.called);
			initSpy.restore();
			done();
		}, 100);
	});

	it("should not autoinitialize when the event is not dispached", () => {
		const initSpy = sinon.spy(Autocomplete, 'init');
		assert.isFalse(initSpy.called);
	});

	context("static init method", () => {
		it('has a static init method', () => {
			assert.isFunction(Autocomplete.init);
		});


		describe("should create a new o-autocomplete", () => {

			beforeEach(() => {
				fixtures.htmlCode();
			});

			afterEach(() => {
				fixtures.reset();
			});

			it("component array when initialized", () => {
				const boilerplate = Autocomplete.init();
				assert.isArray(boilerplate);
				assert.instanceOf(boilerplate[0], Autocomplete);
			});

			it("single component when initialized with a root my-autocomplete", () => {
				const boilerplate = Autocomplete.init('#my-autocomplete');
				assert.instanceOf(boilerplate, Autocomplete);
			});
		});
	});

	context('constructor', () => {
		beforeEach(() => {
			fixtures.htmlCode();
		});

		afterEach(() => {
			fixtures.reset();
		});
		describe('when provided with no options', () => {
			it("constructs an instance with the default options", () => {
				const autocomplete = new Autocomplete(document.getElementById('my-autocomplete'));
				assert.instanceOf(autocomplete, Autocomplete);
				assert.deepEqual(autocomplete.autocompleteEl, document.getElementById('my-autocomplete'));
				assert.equal(autocomplete.options.placeholder, '');
				assert.equal(autocomplete.options.cssNamespace, 'o-autocomplete');
				assert.equal(autocomplete.options.displayMenu, 'overlay');
				assert.isFalse(autocomplete.options.showNoOptionsFound);
			});
		});
	});

	describe('enhanced select element', () => {
		context('input matches a single suggestion', () => {
			beforeEach(() => {
				fixtures.htmlCode();
			});

			afterEach(() => {
				// fixtures.reset();
			});
			it("shows a clear button when text has been input by the user", () => {
				const autocomplete = new Autocomplete(document.getElementById('my-autocomplete'));
				assert.instanceOf(autocomplete, Autocomplete);
				const input = screen.getByRole('combobox', {
					name: /select your country/i
				});
				userEvent.type(input, 'Af');
				const clearButton = screen.getByRole('button', {
					name: /clear input/i
				});
				assert.exists(clearButton);
			});

			it("shows the suggestion box with the filtered results", async () => {
				const autocomplete = new Autocomplete(document.getElementById('my-autocomplete'));
				assert.instanceOf(autocomplete, Autocomplete);
				const input = screen.getByRole('combobox', {
					name: /select your country/i
				});
				userEvent.type(input, 'Af');
				// The sleep is required because accessible-autocomplete renders the listbox asynchronously
				await sleep(100);
				const list = screen.getByRole('listbox');
				assert.equal(list.childElementCount, 1);
				const option = getByRole(list, 'option');
				assert.equal(option.textContent, 'Afghanistan');
			});

			context('clicking a suggestion', () => {
				it("updates the input with the selected suggestion", async () => {
					const autocomplete = new Autocomplete(document.getElementById('my-autocomplete'));
					assert.instanceOf(autocomplete, Autocomplete);
					const input = screen.getByRole('combobox', {
						name: /select your country/i
					});
					userEvent.type(input, 'Af');
					// The sleep is required because accessible-autocomplete renders the listbox asynchronously
					await sleep(100);
					const list = screen.getByRole('listbox');
					assert.equal(list.childElementCount, 1);
					const option = getByRole(list, 'option');
					userEvent.click(option);
					assert.equal(input.value, 'Afghanistan');
				});
			});
		});
	});
});
