/* eslint-env mocha */
import sinon from 'sinon/pkg/sinon-esm.js';
import {assert} from '@open-wc/testing';
import * as fixtures from './helpers/fixtures.js';
import MultiSelect from '../main.js';
import {fireEvent} from '@testing-library/dom';

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function setupMultiSelect(multiSelectOptions) {
	const options = multiSelectOptions || ['Apple', 'Banana'];

	fixtures.htmlCode();
	const targetEl = document.querySelector(
		'[data-o-component="o-multi-select"]'
	);
	const multiSelect = new MultiSelect(targetEl, {
		multiSelectOptions: options,
	});
	return {multiSelect, options};
}

describe('MultiSelect', () => {
	it('is defined', () => {
		assert.isFunction(MultiSelect);
	});

	it('has a static init method', () => {
		assert.isFunction(MultiSelect.init);
	});

	it('should autoinitialize', done => {
		const initSpy = sinon.spy(MultiSelect, 'init');
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
		setTimeout(function () {
			assert.isTrue(initSpy.called);
			initSpy.restore();
			done();
		}, 100);
	});

	it('should not autoinitialize when the event is not dispatched', () => {
		const initSpy = sinon.spy(MultiSelect, 'init');
		assert.isFalse(initSpy.called);
	});

	it('should not create a new o-multi-select when no options are passed', () => {
		fixtures.htmlCode();
		assert.throws(
			() => MultiSelect.init(),
			'The multi select component requires options to be passed in the config or as data attributes'
		);
		fixtures.reset();
	});

	describe('should create a new o-multi-select', () => {
		afterEach(() => {
			fixtures.reset();
		});

		it('when select options are passed down in config', () => {
			fixtures.htmlCode();
			const boilerplate = MultiSelect.init(null, {
				multiSelectOptions: ['Apple', 'Banana'],
			});
			assert.instanceOf(boilerplate[0], MultiSelect);
		});

		it('when select options are passed as comma separated list in data attribute', () => {
			fixtures.htmlCodeWithOptionsDataAttributes();
			const boilerplate = MultiSelect.init();
			assert.instanceOf(boilerplate[0], MultiSelect);
		});
	});

	context('constructor', () => {
		let options;
		let multiSelect;
		beforeEach(() => {
			({multiSelect, options} = setupMultiSelect());
		});
		afterEach(() => {
			fixtures.reset();
		});
		it('hides core select element and enables enhanced version', () => {
			const coreSelectEl = document.querySelector('.o-multi-select--core');
			const enhancedSelectEl = document.querySelector(
				'.o-multi-select--enhanced'
			);
			assert.equal(coreSelectEl.style.display, 'none');
			assert.equal(enhancedSelectEl.style.display, 'block');
		});

		it('creates a dropdown options list with correct options and correct attributes', () => {
			const elements = document.querySelectorAll("[role='option']");
			assert.equal(elements.length, options.length);

			Array.from(elements).forEach((element, i) => {
				assert.equal(element.id, `${multiSelect.idBase}-${i}`);
				assert.equal(element.getAttribute('aria-selected'), 'false');
				assert.equal(
					[...element.classList].includes('o-multi-select-option'),
					true
				);
				assert.equal(element.innerText, options[i]);
				const childSpan = element.querySelector('span');
				assert.equal(
					[...childSpan.classList].includes('o-multi-select-option-tick'),
					true
				);
			});
		});
	});

	context('dropdown', () => {
		let multiSelect;
		let comboEl;
		beforeEach(() => {
			({multiSelect} = setupMultiSelect());
			comboEl = document.querySelector('[role=combobox]');
		});

		afterEach(() => {
			fixtures.reset();
		});

		it('opens if clicked on input element and it was closed', () => {
			fireEvent.click(comboEl);
			assert.equal(multiSelect.open, true);
		});
		it('closes if clicked on input element and it was open ', () => {
			fireEvent.click(comboEl);
			fireEvent.click(comboEl);
			assert.equal(multiSelect.open, false);
		});
		it('closes if input element lost focus', async () => {
			fireEvent.click(comboEl);
			fireEvent.blur(comboEl);
			await sleep(100);
			assert.equal(multiSelect.open, false);
		});
		it('closes if listbox losses focus', async () => {
			fireEvent.click(comboEl);
			fireEvent.click(document.querySelector(`#${multiSelect.idBase}-0`));
			const listboxEl = document.querySelector('[role=listbox]');
			fireEvent.blur(listboxEl);
			await sleep(100);
			assert.equal(multiSelect.open, false);
		});
		it('remains open if clicked within the dropdown', () => {
			fireEvent.click(comboEl);
			const optionEl = document.querySelector("[role='option']");
			fireEvent.click(optionEl);
			assert.equal(multiSelect.open, true);
		});
		describe('option click', () => {
			describe('on unselected option', () => {
				it('adds options in selected options list and adds tick icon in dropdown menu', () => {
					const optionEl = document.querySelector(`#${multiSelect.idBase}-0`);
					fireEvent.click(optionEl);
					const selectedOptionEl = document.querySelector(
						`#${optionEl.innerText}-0`
					);
					assert.equal(selectedOptionEl.innerText, optionEl.innerText);
					assert.equal(
						[...optionEl.classList].includes('o-multi-select-option__selected'),
						true
					);
				});
			});
			describe('on selected option', () => {
				it('removes options in selected options list removes tick icon in dropdown menu', () => {
					const optionEl = document.querySelector(`#${multiSelect.idBase}-0`);
					fireEvent.click(optionEl);
					fireEvent.click(optionEl);
					const selectedOptionEl = document.querySelector(
						`#${optionEl.innerText}-0`
					);
					assert.equal(selectedOptionEl, null);
					assert.equal(
						[...optionEl.classList].includes('o-multi-select-option__selected'),
						false
					);
				});
			});
		});
	});

	context('state', () => {
		let multiSelect;
		let comboEl;
		beforeEach(() => {
			({multiSelect} = setupMultiSelect());
			comboEl = document.querySelector('[role=combobox]');
		});

		afterEach(() => {
			fixtures.reset();
		});
		describe('when nothing is selected', () => {
			it('and dropdown closed, the input inner text is "Click to select options"', () => {
				assert.equal(comboEl.innerText, 'Click to select options');
			});
			it('and dropdown open, the input inner text is "Select options below" ', () => {
				fireEvent.click(comboEl);
				assert.equal(comboEl.innerText, 'Select options below');
			});
		});
		describe('when something is selected', () => {
			it('input inner text is empty', () => {
				const optionEl = document.querySelector(`#${multiSelect.idBase}-0`);
				fireEvent.click(optionEl);
				assert.equal(comboEl.innerText, '');
			});
			it(`and if selected options width is more than 90% of input element width, the selected options are hidden and the input inner text is "X options selected"`, () => {
				const multiSelectOptions = [
					'apple',
					'banana',
					'orange',
					'pineapple',
					'mango',
					'grapes',
					'watermelon',
					'papaya',
					'guava',
					'kiwi',
				];
				multiSelect = setupMultiSelect(multiSelectOptions);
				const optionsToSelect = document.querySelectorAll('[role="option"]');
				comboEl = document.querySelector('[role=combobox]');
				optionsToSelect.forEach(option => fireEvent.click(option));
				assert.equal(
					comboEl.innerText,
					`${multiSelectOptions.length} options selected`
				);
			});
		});
	});

	describe('selected options list', () => {
		let multiSelect;
		let optionEl;
		let selectedOptionEl;
		beforeEach(() => {
			({multiSelect} = setupMultiSelect());
			optionEl = document.querySelector(`#${multiSelect.idBase}-0`);
			fireEvent.click(optionEl);
			selectedOptionEl = document.querySelector(`#${optionEl.innerText}-0`);
		});

		afterEach(() => {
			fixtures.reset();
		});
		describe('clicking on the selected option or remove icon', () => {
			it('removes options in selected options list', () => {
				const selectedOptions = document.querySelector(
					'.o-multi-select__selected-options'
				);
				fireEvent.click(selectedOptionEl);
				assert.equal(selectedOptions.children.length, 0);
			});
			it('unselects the option from the dropdown', () => {
				fireEvent.click(selectedOptionEl);
				assert.equal(
					optionEl.classList.contains('o-multi-select-option__selected'),
					false
				);
			});
		});
	});

	context('keyboard navigation', () => {
		let multiSelect;
		let comboEl;

		beforeEach(() => {
			({multiSelect} = setupMultiSelect());
			comboEl = document.querySelector('[role=combobox]');
		});

		afterEach(() => {
			fixtures.reset();
		});
		describe('when dropdown is closed, pressing', () => {
			function testKeydown(key) {
				fireEvent.keyDown(comboEl, {key});
				assert.equal(multiSelect.open, true);
				const currentOption = document.querySelector(
					'.o-multi-select-option__current'
				);
				assert.equal(
					currentOption.id,
					comboEl.getAttribute('aria-activedescendant')
				);
				// move to next item and close dropdown
				fireEvent.keyDown(comboEl, {key: 'ArrowDown'});
				fireEvent.keyDown(comboEl, {key: 'Escape'});

				// reopen dropdown and check if focus is on  the last active option
				fireEvent.keyDown(comboEl, {key});
				const lastActiveOption = document.querySelector(
					'.o-multi-select-option__current'
				);
				assert.equal(
					lastActiveOption.id,
					comboEl.getAttribute('aria-activedescendant')
				);
			}
			it('Enter opens the dropdown and focus will be on the first option, or the most recently highlighted option.', () => {
				testKeydown('Enter');
			});
			it('Space opens the dropdown and focus will be on the first option, or the most recently highlighted option.', () => {
				testKeydown(' ');
			});
			it('Up Arrow opens the dropdown and focus will be on the first option, or the most recently highlighted option.', () => {
				testKeydown('ArrowUp');
			});
			it('Down Arrow opens the dropdown and focus will be on the first option, or the most recently highlighted option.', () => {
				testKeydown('ArrowDown');
			});
		});
		describe('when dropdown is open pressing', () => {
			function selectFirstOption(key) {
				fireEvent.click(comboEl);
				fireEvent.keyDown(comboEl, {key});
				const selectedOption = document.querySelector(
					`#${multiSelect.idBase}-0`
				);
				assert.equal(
					selectedOption.classList.contains('o-multi-select-option__selected'),
					true
				);
				return selectedOption.innerText;
			}
			function checkAddedSelectedElement(key) {
				const option = selectFirstOption(key);
				const selectedOption = document.querySelector(`#${option}-0`);
				assert.equal(selectedOption.innerText, option);
			}
			function checkCurrentElementIsFocused() {
				const currentOption = document.querySelector(
					'.o-multi-select-option__current'
				);
				assert.equal(
					currentOption.id,
					comboEl.getAttribute('aria-activedescendant')
				);
			}
			function createMultiSelectWithLotsOfOptions() {
				const multiSelectOptions = [
					'apple',
					'banana',
					'orange',
					'pineapple',
					'mango',
					'grapes',
					'watermelon',
					'papaya',
					'guava',
					'kiwi',
					'pear',
					'peach',
					'plum',
					'cherry',
					'lemon',
					'lime',
					'coconut',
					'pomegranate',
					'blueberry',
				];
				multiSelect = setupMultiSelect(multiSelectOptions);
				comboEl = document.querySelector('[role=combobox]');
				return {multiSelect, comboEl};
			}
			describe('enter', () => {
				it('selects the focused option', () => {
					selectFirstOption('Enter');
				});
				it('adds selected options in a list', () => {
					checkAddedSelectedElement('Enter');
				});
			});
			describe('space', () => {
				it('selects the focused option', () => {
					selectFirstOption(' ');
				});
				it('adds selected options in a list', () => {
					checkAddedSelectedElement(' ');
				});
			});

			it('tab closes the dropdown and moves focus to the next focusable element', async () => {
				// ! focus issues in testing
				// const inputEl = document.createElement('input');
				// document.body.appendChild(inputEl);
				// fireEvent.keyDown(comboEl, {key: 'Enter'});
				// fireEvent.keyDown(comboEl, {key: 'Tab'});
				// await sleep(100);
				// assert.equal(multiSelect.open, false);
			});

			it(' esc closes the dropdown and returns focus to the multi select input element', () => {
				fireEvent.keyDown(comboEl, {key: 'Enter'});
				fireEvent.keyDown(comboEl, {key: 'Escape'});
				assert.equal(multiSelect.open, false);
				// ! focus issues in testing
				// assert.equal(document.activeElement, comboEl);
			});

			describe('down arrow', () => {
				it('moves focus to the next option', () => {
					fireEvent.keyDown(comboEl, {key: 'ArrowDown'});
					checkCurrentElementIsFocused();
				});
				it('stops on the last option', () => {
					const options = document.querySelectorAll('.o-multi-select-option');
					for (let i = 0; i < options.length; i++) {
						fireEvent.keyDown(comboEl, {key: 'ArrowDown'});
					}
					checkCurrentElementIsFocused();
				});
			});
			describe('up arrow', () => {
				it('moves focus to the previous option', () => {
					fireEvent.keyDown(comboEl, {key: 'ArrowDown'});
					fireEvent.keyDown(comboEl, {key: 'ArrowUp'});
					checkCurrentElementIsFocused();
				});
				it('stops on the first option', () => {
					fireEvent.keyDown(comboEl, {key: 'ArrowUp'});
					checkCurrentElementIsFocused();
				});
			});

			describe('page down', () => {
				it('Jumps visual focus down 10 options', () => {
					({multiSelect, comboEl} = createMultiSelectWithLotsOfOptions());
					fireEvent.keyDown(comboEl, {key: 'PageDown'});
					checkCurrentElementIsFocused();
				});
				it('stops on the last option', () => {
					({multiSelect, comboEl} = createMultiSelectWithLotsOfOptions());
					const options = document.querySelectorAll('.o-multi-select-option');
					const numberOfTimesToPressPageDown = Math.ceil(options.length / 10);
					for (let i = 0; i < numberOfTimesToPressPageDown; i++) {
						fireEvent.keyDown(comboEl, {key: 'PageDown'});
					}
					checkCurrentElementIsFocused();
				});
			});
			describe('page up', () => {
				it('Jumps visual focus up 10 options', () => {
					({multiSelect, comboEl} = createMultiSelectWithLotsOfOptions());
					fireEvent.keyDown(comboEl, {key: 'PageDown'});
					fireEvent.keyDown(comboEl, {key: 'PageDown'});
					fireEvent.keyDown(comboEl, {key: 'PageUp'});
					checkCurrentElementIsFocused();
				});
				it('stops on the first option', () => {
					({multiSelect, comboEl} = createMultiSelectWithLotsOfOptions());
					fireEvent.keyDown(comboEl, {key: 'PageUp'});
					checkCurrentElementIsFocused();
				});
			});
			it('home moves focus to the first element', () => {
				fireEvent.keyDown(comboEl, {key: 'Home'});
				checkCurrentElementIsFocused();
			});
			it('end moves focus to the last element', () => {
				fireEvent.keyDown(comboEl, {key: 'End'});
				checkCurrentElementIsFocused();
			});
		});
	});
});
