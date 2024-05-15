// /* eslint-env mocha */
// import sinon from 'sinon/pkg/sinon-esm.js';
// import {assert} from '@open-wc/testing';
// import * as fixtures from './helpers/fixtures.js';
// import MultiSelect from '../main.js';
// import {fireEvent} from '@testing-library/dom';
// import z from '@testing-library/user-event';

// function sleep(ms) {
// 	return new Promise(resolve => setTimeout(resolve, ms));
// }

// function setupMultiSelect(multiSelectOptions) {
// 	const options = multiSelectOptions || [
// 		{label: 'Apple', selected: false},
// 		{label: 'Banana', selected: false},
// 	];

// 	fixtures.htmlCode(options);
// 	const targetEl = document.querySelector(
// 		'[data-o-component="o-multi-select"]'
// 	);
// 	const multiSelect = new MultiSelect(targetEl, {});
// 	return {multiSelect, options};
// }

// describe('MultiSelect', () => {
// 	it('is defined', () => {
// 		assert.isFunction(MultiSelect);
// 	});

// 	it('has a static init method', () => {
// 		assert.isFunction(MultiSelect.init);
// 	});

// 	it('should autoinitialize', done => {
// 		const initSpy = sinon.spy(MultiSelect, 'init');
// 		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
// 		setTimeout(function () {
// 			assert.isTrue(initSpy.called);
// 			initSpy.restore();
// 			done();
// 		}, 100);
// 	});

// 	it('should not autoinitialize when the event is not dispatched', () => {
// 		const initSpy = sinon.spy(MultiSelect, 'init');
// 		assert.isFalse(initSpy.called);
// 	});

// 	it('should not create a new o-multi-select when no options are passed', () => {
// 		fixtures.htmlCode([]);
// 		assert.throws(
// 			() => MultiSelect.init(),
// 			'The multi select component requires option elements to be defined in the <select> tag.'
// 		);
// 		fixtures.reset();
// 	});

// 	context('constructor', () => {
// 		let options;
// 		let multiSelect;

// 		beforeEach(() => {
// 			({multiSelect, options} = setupMultiSelect());
// 		});
// 		afterEach(() => {
// 			fixtures.reset();
// 		});

// 		it('creates a dropdown options list with correct options and correct attributes', () => {
// 			const elements = document.querySelectorAll("[role='option']");
// 			assert.equal(elements.length, options.length);

// 			Array.from(elements).forEach((element, i) => {
// 				assert.equal(element.id, `${multiSelect._idBase}-${i}`);
// 				assert.equal(element.getAttribute('aria-selected'), 'false');
// 				assert.equal(
// 					[...element.classList].includes('o-multi-select-option'),
// 					true
// 				);
// 				assert.equal(element.innerText, options[i].label);
// 				const childSpan = element.querySelector('span');
// 				assert.equal(
// 					[...childSpan.classList].includes('o-multi-select-option-tick'),
// 					true
// 				);
// 			});
// 		});

// 		it('creates a component with pre-selected options', () => {
// 			const multiSelectOptions = [
// 				{label: 'apple', selected: true},
// 				{label: 'banana', selected: false},
// 				{label: 'orange', selected: true},
// 				{label: 'pineapple', selected: false},
// 			];
// 			multiSelect = setupMultiSelect(multiSelectOptions).multiSelect;

// 			// gets first element in the options
// 			const optionElements = document.querySelectorAll("[role='option']");

// 			// get indexes of selected options multiSelectOptions
// 			const selectedOptionsIndexes = multiSelectOptions
// 				.map((option, i) => (option.selected ? i : null))
// 				.filter(option => option !== null);

// 			optionElements.forEach((optionEl, i) => {
// 				if (selectedOptionsIndexes.includes(i)) {
// 					assert.equal(optionEl.getAttribute('aria-selected'), 'true');
// 				} else {
// 					assert.equal(optionEl.getAttribute('aria-selected'), 'false');
// 				}
// 			});

// 			const selectedOptions = document.querySelectorAll(
// 				'.o-multi-select-option__selected'
// 			);
// 			assert.equal(selectedOptions.length, selectedOptionsIndexes.length);

// 			const selectedOptionsAsButtons = document.querySelector(
// 				'.o-multi-select__selected-options'
// 			).children;
// 			assert.equal(
// 				selectedOptionsAsButtons.length,
// 				selectedOptionsIndexes.length
// 			);
// 		});
// 	});

// 	context('dropdown', () => {
// 		let multiSelect;
// 		let comboEl;
// 		beforeEach(() => {
// 			({multiSelect} = setupMultiSelect());
// 			comboEl = document.querySelector('[role=combobox]');
// 		});

// 		afterEach(() => {
// 			fixtures.reset();
// 		});

// 		it('opens if clicked on combobox element and it was closed', () => {
// 			userEvent.click(comboEl);
// 			assert.equal(multiSelect._open, true);
// 		});
// 		it('closes if clicked on combobox element and it was open ', () => {
// 			userEvent.click(comboEl);
// 			userEvent.click(comboEl);
// 			assert.equal(multiSelect._open, false);
// 		});
// 		it('closes if combobox element lost focus', async () => {
// 			userEvent.click(comboEl);
// 			fireEvent.blur(comboEl);
// 			await sleep(100);
// 			assert.equal(multiSelect._open, false);
// 		});
// 		it('closes if listbox losses focus', async () => {
// 			userEvent.click(comboEl);
// 			userEvent.click(document.querySelector(`#${multiSelect._idBase}-0`));
// 			const listboxEl = document.querySelector('[role=listbox]');
// 			fireEvent.blur(listboxEl);
// 			await sleep(100);
// 			assert.equal(multiSelect._open, false);
// 		});
// 		it('remains open if clicked within the dropdown', () => {
// 			userEvent.click(comboEl);
// 			const optionEl = document.querySelector("[role='option']");
// 			userEvent.click(optionEl);
// 			assert.equal(multiSelect._open, true);
// 		});
// 		describe('option click', () => {
// 			describe('on unselected option', () => {
// 				it('adds options in selected options list and adds tick icon in dropdown menu', () => {
// 					const optionEl = document.querySelector(`#${multiSelect._idBase}-0`);
// 					userEvent.click(optionEl);
// 					const selectedOptionEl = document.querySelector(
// 						`#${optionEl.innerText}-0`
// 					);
// 					assert.equal(selectedOptionEl.innerText, optionEl.innerText);
// 					assert.equal(
// 						[...optionEl.classList].includes('o-multi-select-option__selected'),
// 						true
// 					);
// 				});
// 				it('adds selected attribute on core option element', () => {
// 					const optionEl = document.querySelector(`#${multiSelect._idBase}-0`);
// 					userEvent.click(optionEl);
// 					const coreOptionEl = document.querySelector('option');
// 					assert.equal(coreOptionEl.getAttribute('selected'), '');
// 				});
// 				it('dispatches oMultiSelect.OptionChange custom event with `e.detail.selected: true`', done => {
// 					const optionEl = document.querySelector(`#${multiSelect._idBase}-0`);
// 					const timeout = setTimeout(() => {
// 						done(new Error('Event not dispatched or timed out'));
// 					}, 1000);
// 					document.addEventListener(
// 						'oMultiSelect.OptionChange',
// 						function handleEvent(e) {
// 							assert.equal(e.type, 'oMultiSelect.OptionChange');
// 							assert.equal(e.bubbles, true);
// 							assert.equal(e.detail.selected, true);
// 							assert.equal(e.detail.optionElement, optionEl);
// 							assert.equal(e.detail.value, 'Apple');
// 							assert.equal(e.detail.index, 0);
// 							assert.equal(e.detail.instance, multiSelect);
// 							clearTimeout(timeout);
// 							done();
// 						},
// 						{once: true}
// 					);
// 					userEvent.click(optionEl);
// 				});
// 			});
// 			describe('on selected option', () => {
// 				it('removes options in selected options list removes tick icon in dropdown menu', () => {
// 					const optionEl = document.querySelector(`#${multiSelect._idBase}-0`);
// 					userEvent.click(optionEl);
// 					userEvent.click(optionEl);
// 					const selectedOptionEl = document.querySelector(
// 						`#${optionEl.innerText}-0`
// 					);
// 					assert.equal(selectedOptionEl, null);
// 					assert.equal(
// 						[...optionEl.classList].includes('o-multi-select-option__selected'),
// 						false
// 					);
// 				});
// 				it('removes selected attribute on core option element', () => {
// 					const optionEl = document.querySelector(`#${multiSelect._idBase}-0`);
// 					userEvent.click(optionEl);
// 					userEvent.click(optionEl);
// 					const coreOptionEl = document.querySelector('option');
// 					assert.equal(coreOptionEl.getAttribute('selected'), null);
// 				});
// 				it('dispatches oMultiSelect.OptionChange custom event with `e.detail.selected: false`', done => {
// 					const optionEl = document.querySelector(`#${multiSelect._idBase}-0`);
// 					userEvent.click(optionEl);
// 					const timeout = setTimeout(() => {
// 						done(new Error('Event not dispatched or timed out'));
// 					}, 1000);
// 					document.addEventListener(
// 						'oMultiSelect.OptionChange',
// 						function handleEvent(e) {
// 							assert.equal(e.type, 'oMultiSelect.OptionChange');
// 							assert.equal(e.bubbles, true);
// 							assert.equal(e.detail.selected, false);
// 							assert.equal(e.detail.optionElement, optionEl);
// 							assert.equal(e.detail.value, 'Apple');
// 							assert.equal(e.detail.index, 0);
// 							assert.equal(e.detail.instance, multiSelect);
// 							clearTimeout(timeout);
// 							done();
// 						},
// 						{once: true}
// 					);
// 					userEvent.click(optionEl);
// 				});
// 			});
// 		});
// 	});

// 	context('state', () => {
// 		let multiSelect;
// 		let comboEl;
// 		beforeEach(() => {
// 			({multiSelect} = setupMultiSelect());
// 			comboEl = document.querySelector('[role=combobox]');
// 		});

// 		afterEach(() => {
// 			fixtures.reset();
// 		});
// 		describe('when nothing is selected', () => {
// 			it('and dropdown closed, the combobox inner text is "Click to select options"', () => {
// 				assert.equal(comboEl.innerText, 'Click to select options');
// 			});
// 			it('and dropdown open, the combobox inner text is "Select options below" ', () => {
// 				userEvent.click(comboEl);
// 				assert.equal(comboEl.innerText, 'Select options below');
// 			});
// 		});
// 		describe('when something is selected', () => {
// 			it('combobox inner text is empty', () => {
// 				const optionEl = document.querySelector(`#${multiSelect._idBase}-0`);
// 				userEvent.click(optionEl);
// 				assert.equal(comboEl.innerText, '');
// 			});
// 			it(`and if selected options width is more than 90% of combobox element width, the selected options are hidden and the combobox inner text is "X options selected"`, () => {
// 				const multiSelectOptions = [
// 					{label: 'apple', selected: false},
// 					{label: 'banana', selected: false},
// 					{label: 'orange', selected: false},
// 					{label: 'pineapple', selected: false},
// 					{label: 'mango', selected: false},
// 					{label: 'grapes', selected: false},
// 					{label: 'watermelon', selected: false},
// 					{label: 'papaya', selected: false},
// 					{label: 'guava', selected: false},
// 					{label: 'kiwi', selected: false},
// 				];
// 				multiSelect = setupMultiSelect(multiSelectOptions);
// 				const optionsToSelect = document.querySelectorAll('[role="option"]');
// 				comboEl = document.querySelector('[role=combobox]');
// 				optionsToSelect.forEach(option => userEvent.click(option));
// 				assert.equal(
// 					comboEl.innerText,
// 					`${multiSelectOptions.length} options selected`
// 				);
// 			});
// 		});
// 	});

// 	describe('selected options list', () => {
// 		let multiSelect;
// 		let optionEl;
// 		let selectedOptionEl;
// 		beforeEach(() => {
// 			({multiSelect} = setupMultiSelect());
// 			optionEl = document.querySelector(`#${multiSelect._idBase}-0`);
// 			userEvent.click(optionEl);
// 			selectedOptionEl = document.querySelector(`#${optionEl.innerText}-0`);
// 		});

// 		afterEach(() => {
// 			fixtures.reset();
// 		});
// 		describe('clicking on the selected option or remove icon', () => {
// 			it('removes options in selected options list', () => {
// 				const selectedOptions = document.querySelector(
// 					'.o-multi-select__selected-options'
// 				);
// 				userEvent.click(selectedOptionEl);
// 				assert.equal(selectedOptions.children.length, 0);
// 			});
// 			it('unselects the option from the dropdown', () => {
// 				userEvent.click(selectedOptionEl);
// 				assert.equal(
// 					optionEl.classList.contains('o-multi-select-option__selected'),
// 					false
// 				);
// 			});

// 			it('dispatches oMultiSelect.OptionChange custom event with correct details', done => {
// 				const timeout = setTimeout(() => {
// 					done(new Error('Event not dispatched or timed out'));
// 				}, 1000);
// 				document.addEventListener(
// 					'oMultiSelect.OptionChange',
// 					function handleEvent(e) {
// 						assert.equal(e.type, 'oMultiSelect.OptionChange');
// 						assert.equal(e.bubbles, true);
// 						assert.equal(e.detail.selected, false);
// 						assert.equal(e.detail.optionElement, optionEl);
// 						assert.equal(e.detail.value, 'Apple');
// 						assert.equal(e.detail.index, 0);
// 						assert.equal(e.detail.instance, multiSelect);
// 						clearTimeout(timeout);
// 						done();
// 					},
// 					{once: true}
// 				);
// 				userEvent.click(selectedOptionEl);
// 			});
// 		});
// 	});

// 	context('keyboard navigation', () => {
// 		let multiSelect;
// 		let comboEl;

// 		beforeEach(() => {
// 			({multiSelect} = setupMultiSelect());
// 			comboEl = document.querySelector('[role=combobox]');
// 		});

// 		afterEach(() => {
// 			fixtures.reset();
// 		});
// 		describe('when dropdown is closed, pressing', () => {
// 			function testKeydown(key) {
// 				comboEl.focus();
// 				userEvent.keyboard(`{${key}}`);
// 				assert.equal(multiSelect._open, true);
// 				const currentOption = document.querySelector(
// 					'.o-multi-select-option__current'
// 				);
// 				assert.equal(
// 					currentOption.id,
// 					comboEl.getAttribute('aria-activedescendant')
// 				);
// 				// move to next item and close dropdown
// 				userEvent.keyboard('{ArrowDown}{Escape}');

// 				// reopen dropdown and check if focus is on  the last active option
// 				userEvent.keyboard(`{${key}}`);
// 				const lastActiveOption = document.querySelector(
// 					'.o-multi-select-option__current'
// 				);
// 				assert.equal(
// 					lastActiveOption.id,
// 					comboEl.getAttribute('aria-activedescendant')
// 				);
// 			}
// 			it('Enter opens the dropdown and focus will be on the first option, or the most recently highlighted option.', () => {
// 				testKeydown('Enter');
// 			});
// 			it('Space opens the dropdown and focus will be on the first option, or the most recently highlighted option.', () => {
// 				testKeydown('space');
// 			});
// 			it('Up Arrow opens the dropdown and focus will be on the first option, or the most recently highlighted option.', () => {
// 				testKeydown('ArrowUp');
// 			});
// 			it('Down Arrow opens the dropdown and focus will be on the first option, or the most recently highlighted option.', () => {
// 				testKeydown('ArrowDown');
// 			});
// 		});
// 		describe('when dropdown is open pressing', () => {
// 			function selectFirstOption(key) {
// 				userEvent.click(comboEl);
// 				userEvent.keyboard(`{${key}}`);
// 				const selectedOption = document.querySelector(
// 					`#${multiSelect._idBase}-0`
// 				);
// 				assert.equal(
// 					selectedOption.classList.contains('o-multi-select-option__selected'),
// 					true
// 				);
// 				return selectedOption.innerText;
// 			}
// 			function checkAddedSelectedElement(key) {
// 				const option = selectFirstOption(key);
// 				const selectedOption = document.querySelector(`#${option}-0`);
// 				assert.equal(selectedOption.innerText, option);
// 			}
// 			function checkCurrentElementIsFocused() {
// 				const currentOption = document.querySelector(
// 					'.o-multi-select-option__current'
// 				);
// 				assert.equal(
// 					currentOption.id,
// 					comboEl.getAttribute('aria-activedescendant')
// 				);
// 			}
// 			function createMultiSelectWithLotsOfOptions() {
// 				const multiSelectOptions = [
// 					{label: 'apple', selected: false},
// 					{label: 'banana', selected: false},
// 					{label: 'orange', selected: false},
// 					{label: 'pineapple', selected: false},
// 					{label: 'mango', selected: false},
// 					{label: 'grapes', selected: false},
// 					{label: 'watermelon', selected: false},
// 					{label: 'papaya', selected: false},
// 					{label: 'guava', selected: false},
// 					{label: 'kiwi', selected: false},
// 					{label: 'pear', selected: false},
// 					{label: 'peach', selected: false},
// 					{label: 'plum', selected: false},
// 					{label: 'cherry', selected: false},
// 					{label: 'lemon', selected: false},
// 					{label: 'lime', selected: false},
// 					{label: 'coconut', selected: false},
// 					{label: 'pomegranate', selected: false},
// 					{label: 'blueberry', selected: false},
// 				];
// 				multiSelect = setupMultiSelect(multiSelectOptions);
// 				comboEl = document.querySelector('[role=combobox]');
// 				return {multiSelect, comboEl};
// 			}
// 			describe('enter', () => {
// 				it('selects the focused option', () => {
// 					selectFirstOption('Enter');
// 				});
// 				it('adds selected options in a list', () => {
// 					checkAddedSelectedElement('Enter');
// 				});
// 			});
// 			describe('space', () => {
// 				it('selects the focused option', () => {
// 					selectFirstOption('space');
// 				});
// 				it('adds selected options in a list', () => {
// 					checkAddedSelectedElement('space');
// 				});
// 			});
// 			it('tab closes the dropdown and moves focus to the next focusable element', async () => {
// 				const inputEl = document.createElement('input');
// 				document.body.appendChild(inputEl);
// 				comboEl.focus();
// 				userEvent.keyboard('{Enter}');
// 				userEvent.tab();
// 				await sleep(100);
// 				assert.equal(multiSelect._open, false);
// 				document.body.removeChild(inputEl);
// 			});

// 			it('esc closes the dropdown and returns focus to the multi select combobox element', () => {
// 				comboEl.focus();
// 				userEvent.keyboard('{Enter}{Escape}');
// 				assert.equal(multiSelect._open, false);
// 				assert.equal(document.activeElement, comboEl);
// 			});

// 			describe('down arrow', () => {
// 				it('moves focus to the next option', () => {
// 					comboEl.focus();
// 					userEvent.keyboard('{ArrowDown}');
// 					checkCurrentElementIsFocused();
// 				});
// 				it('stops on the last option', () => {
// 					comboEl.focus();
// 					const options = document.querySelectorAll('.o-multi-select-option');
// 					for (let i = 0; i < options.length; i++) {
// 						userEvent.keyboard('{ArrowDown}');
// 					}
// 					checkCurrentElementIsFocused();
// 				});
// 			});
// 			describe('up arrow', () => {
// 				it('moves focus to the previous option', () => {
// 					comboEl.focus();
// 					userEvent.keyboard('{ArrowDown}{ArrowUp}');
// 					checkCurrentElementIsFocused();
// 				});
// 				it('stops on the first option', () => {
// 					comboEl.focus();
// 					userEvent.keyboard('{ArrowUp}');
// 					checkCurrentElementIsFocused();
// 				});
// 			});

// 			describe('page down', () => {
// 				it('Jumps visual focus down 10 options', () => {
// 					({multiSelect, comboEl} = createMultiSelectWithLotsOfOptions());
// 					comboEl.focus();
// 					userEvent.keyboard('{PageDown}');
// 					checkCurrentElementIsFocused();
// 				});
// 				it('stops on the last option', () => {
// 					({multiSelect, comboEl} = createMultiSelectWithLotsOfOptions());
// 					comboEl.focus();
// 					const options = document.querySelectorAll('.o-multi-select-option');
// 					const numberOfTimesToPressPageDown = Math.ceil(options.length / 10);
// 					for (let i = 0; i < numberOfTimesToPressPageDown; i++) {
// 						userEvent.keyboard('{PageDown}');
// 					}
// 					checkCurrentElementIsFocused();
// 				});
// 			});
// 			describe('page up', () => {
// 				it('Jumps visual focus up 10 options', () => {
// 					({multiSelect, comboEl} = createMultiSelectWithLotsOfOptions());
// 					comboEl.focus();
// 					userEvent.keyboard('{PageDown}{PageDown}{PageUp}');
// 					checkCurrentElementIsFocused();
// 				});
// 				it('stops on the first option', () => {
// 					({multiSelect, comboEl} = createMultiSelectWithLotsOfOptions());
// 					comboEl.focus();
// 					userEvent.keyboard('{PageUp}');
// 					checkCurrentElementIsFocused();
// 				});
// 			});
// 			it('home moves focus to the first element', () => {
// 				comboEl.focus();
// 				userEvent.keyboard('{Home}');
// 				checkCurrentElementIsFocused();
// 			});
// 			it('end moves focus to the last element', () => {
// 				comboEl.focus();
// 				userEvent.keyboard('{End}');
// 				checkCurrentElementIsFocused();
// 			});
// 		});
// 	});
// });
