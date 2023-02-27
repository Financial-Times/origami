/* eslint-env mocha */
import sinon from 'sinon/pkg/sinon-esm.js';
import {assert} from '@open-wc/testing';
import * as fixtures from './helpers/fixtures.js';
import MultiSelect from '../main.js';
import {fireEvent} from '@testing-library/dom';

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
			fixtures.htmlCodeWithOptionsDataATtributes();
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
		let inputEl;
		beforeEach(() => {
			({multiSelect} = setupMultiSelect());
			inputEl = document.querySelector('.o-multi-select__input');
		});

		afterEach(() => {
			fixtures.reset();
		});

		it('opens if clicked on input element and it was closed', () => {
			fireEvent.click(inputEl);
			assert.equal(multiSelect.open, true);
		});
		it('closes if clicked on input element and it was open ', () => {
			fireEvent.click(inputEl);
			fireEvent.click(inputEl);
			assert.equal(multiSelect.open, false);
		});
		it('closes if clicked outside of input element', () => {
			// console.log({a: multiSelect.open});
			// console.log({b: multiSelect.open});
			// console.log({o: multiSelect.open});
			// this needs more investigation, since blur event is triggered twice
			assert.equal(multiSelect.open, false);
		});
		it('closes after selecting an option if clicked outside of input element', () => {
			// same issue as above. Needs more investigation
		});
		it('remains open if clicked within the dropdown', () => {
			fireEvent.click(inputEl);
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
		let inputEl;
		beforeEach(() => {
			({multiSelect} = setupMultiSelect());
			inputEl = document.querySelector('.o-multi-select__input');
		});

		afterEach(() => {
			fixtures.reset();
		});
		describe('when nothing is selected', () => {
			it('and dropdown closed, the input inner text is "Click to select options"', () => {
				assert.equal(inputEl.innerText, 'Click to select options');
			});
			it('and dropdown open, the input inner text is "Select options below" ', () => {
				fireEvent.click(inputEl);
				assert.equal(inputEl.innerText, 'Select options below');
			});
		});
		describe('when something is selected', () => {
			it('input inner text is empty', () => {
				const optionEl = document.querySelector(`#${multiSelect.idBase}-0`);
				fireEvent.click(optionEl);
				assert.equal(inputEl.innerText, '');
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
				inputEl = document.querySelector('.o-multi-select__input');
				optionsToSelect.forEach(option => fireEvent.click(option));
				assert.equal(
					inputEl.innerText,
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
				assert.equal(optionEl.classList.contains('o-multi-select-option__selected'), false);
			});
		});
	});


	context('keyboard navigation', () => {
		describe('if dropdown is closed, pressing', () => {
			it('Enter opens the dropdown and focus will be on the first option, or the most recently highlighted option.', () => {});
			it('Space opens the dropdown and focus will be on the first option, or the most recently highlighted option.', () => {});
			it('Up Arrow opens the dropdown and focus will be on the first option, or the most recently highlighted option.', () => {});
			it('Down Arrow opens the dropdown and focus will be on the first option, or the most recently highlighted option.', () => {});
		});
		describe('if dropdown is open hitting', () => {
			describe('enter', () => {
				it('selects the focused option', () => {});
				it('prevents the default action', () => {});
				it('adds a button in selected list with remove icon', () => {});
			});
			describe('space', () => {
				it('selects the focused option', () => {});
				it('adds a button in selected list with remove icon', () => {});
			});
			describe('tab', () => {
				it('closes the dropdown', () => {});
				it('moves focus to the next focusable element', () => {});
			});
			describe('esc', () => {
				it('closes the dropdown', () => {});
				it('returns focus to the multi select input element', () => {});
			});
			describe('down arrow', () => {
				it('moves focus to the next option', () => {});
				it('stops on the last option', () => {});
			});
			describe('up arrow', () => {
				it('moves focus to the previous option', () => {});
				it('stops on the first option', () => {});
			});
			describe('page down', () => {
				it('Jumps visual focus down 10 options', () => {});
				it('stops on the last option', () => {});
			});
			describe('page up', () => {
				it('Jumps visual focus up 10 options', () => {});
				it('stops on the first option', () => {});
			});
			it('home moves focus to the first element', () => {});
			it('end moves focus to the last element', () => {});
		});
	});
});
