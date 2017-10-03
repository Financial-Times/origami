/* eslint-env mocha, sinon, proclaim */

import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import * as fixtures from './helpers/fixtures';

const Forms = require('./../main');

describe("Forms", () => {
	describe("configuration", () => {
		let testForms;

		afterEach(() => {
			fixtures.reset();
			testForms.destroy();
		});

		it('sets default testEvent to blur', () => {
			fixtures.htmlCode();

			const formEl = document.querySelector('[data-o-component="o-forms"]');
			testForms = new Forms(formEl);

			proclaim.equal(testForms.opts.testEvent, 'blur');
		});

		it('adds correct event listeners to form and inputs for blur config', () => {
			const html = `<form data-o-component="o-forms"><input type="text" /></form>`;
			fixtures.insert(html);

			const formEl = document.querySelector('[data-o-component="o-forms"]');
			const input = formEl.querySelector('input');
			const inputSpy = sinon.spy(input, 'addEventListener');

			testForms = new Forms(formEl);

			proclaim.isTrue(inputSpy.calledOnce);
		});

		it('sets testEvent to correct options when constructed manually', () => {
			fixtures.htmlCode();

			const formEl = document.querySelector('[data-o-component="o-forms"]');
			const opts = { testEvent: 'submit' };
			testForms = new Forms(formEl, opts);

			proclaim.equal(testForms.opts.testEvent, 'submit');
		});

		it('sets testEvent to correct options when constructed from data attr', () => {
			const html = `<form data-o-component="o-forms" data-o-forms-test-event="submit"><input type="text" /></form>`;
			fixtures.insert(html);

			const formEl = document.querySelector('[data-o-component="o-forms"]');
			testForms = new Forms(formEl);

			proclaim.equal(testForms.opts.testEvent, 'submit');
		});

		it('adds correct event listeners to form and inputs for submit config', () => {
			const html = `<form data-o-component="o-forms" data-o-forms-test-event="submit"><input type="text" /></form>`;
			fixtures.insert(html);

			const formEl = document.querySelector('[data-o-component="o-forms"]');
			const formSpy = sinon.spy(formEl, 'addEventListener');
			const input = formEl.querySelector('input');
			const inputSpy = sinon.spy(input, 'addEventListener');

			testForms = new Forms(formEl);

			proclaim.isTrue(inputSpy.calledOnce);
			proclaim.isTrue(formSpy.withArgs('click').calledOnce);
			proclaim.isTrue(formSpy.withArgs('submit').calledOnce);
		});

		it('fires an event for toggle checkboxes on click', (done) => {
			const html = `
				<form data-o-component="o-forms">
					<div class="o-forms__checkbox-toggle">
						<input data-o-form-toggle type="checkbox">
					</div>
				</form>
			`;
			fixtures.insert(html);

			// Setup form
			const formEl = document.querySelector('[data-o-component="o-forms"]');
			const checkboxToggle = document.querySelector('[data-o-form-toggle]');
			testForms = new Forms(formEl);

			// We expect an oForms toggled event.
			formEl.addEventListener('oForms.toggled', (event) => {
				event.preventDefault();
				proclaim.isTrue(event.target.checked, 'The toggle checkbox should be checked on click.');
				done();
			}, false);

			// Click the checkbox.
			checkboxToggle.click();
		});
	});

	describe("handles inputs", () => {
		let formEl;
		let input;
		let oFormsEl;
		let testForms;

		beforeEach(() => {
			fixtures.htmlCode();
			formEl = document.querySelector('[data-o-component="o-forms"]');

			input = document.querySelector('#required-input');
			oFormsEl = input.closest('.o-forms');
		});

		afterEach(() => {
			formEl = undefined;

			oFormsEl = undefined;
			input = undefined;
			testForms.destroy();

			fixtures.reset();
		});

		it('adds the error class to the form when an input is invalid on blur', () => {
			testForms = new Forms(formEl);

			proclaim.isFalse(oFormsEl.classList.contains('o-forms--error'));

			input.focus();
			input.value = '';
			input.blur();

			proclaim.isTrue(oFormsEl.classList.contains('o-forms--error'));
		});

		it('adds the error class to the form when an input is invalid on submit', (done) => {
			const submitButton = document.querySelector('input[type="submit"]');
			testForms = new Forms(formEl, { testEvent: 'submit' });

			proclaim.isFalse(oFormsEl.classList.contains('o-forms--error'));

			formEl.addEventListener('submit', (event) => {
				event.preventDefault();

				proclaim.isTrue(oFormsEl.classList.contains('o-forms--error'));
				done();
			}, false);

			submitButton.click();
		});

		describe("handles valid inputs", () => {
			beforeEach(() => {
				testForms = new Forms(formEl);
			});

			it('submits form when inputs are valid', (done) => {
				const submitButton = document.querySelector('input[type="submit"]');

				oFormsEl.value = 'some input';

				formEl.addEventListener('submit', (event) => {
					event.preventDefault();

					done();
				}, false);

				submitButton.click();
			});

			it('removes error class when input is valid', () => {
				oFormsEl.classList.add('o-forms--error');

				input.focus();
				input.value = 'some input';
				input.blur();

				proclaim.isFalse(oFormsEl.classList.contains('o-forms--error'));
			});
		});
	});

	describe("methods", () => {
		it('selects all form control elements in a form', () => {
			fixtures.allInputsHtmlCode();

			const formEl = document.querySelector('[data-o-component="o-forms"]');
			const testForms = new Forms(formEl);

			const inputEls = testForms.findInputs();

			proclaim.lengthEquals(inputEls, 7);
		});

		it('validate forms method', () => {
			const html = `<div data-o-component="o-forms" class="o-forms o-forms--error"><input type="text" /></div>`;
			fixtures.insert(html);

			const formEl = document.querySelector('[data-o-component="o-forms"]');
			const testForms = new Forms(formEl);

			const input = document.querySelector('input');

			const validateResult = testForms.validateInput(input);

			proclaim.isTrue(validateResult);

			proclaim.isFalse(formEl.classList.contains('o-forms--error'));
		});

		it('adds a class to the ancestor o-forms element', () => {
			const html = `<div class="o-forms"><input type="text" /></div>`;
			fixtures.insert(html);

			const formEl = document.createElement('div');
			formEl.setAttribute('data-o-component', 'o-forms');

			const testForms = new Forms(formEl);
			const input = document.querySelector('input');
			const oFormsEl = input.closest('.o-forms');

			proclaim.isFalse(oFormsEl.classList.contains('o-forms--error'));

			testForms.invalidInput(input);
			proclaim.isTrue(oFormsEl.classList.contains('o-forms--error'));
		});
	});

	describe("destroy method", () => {
		it('destroys itself when not initialised on a <form> element', () => {
			const html = `<form><input type="text" data-o-component="o-forms" /></form>`;
			fixtures.insert(html);

			const formEl = document.querySelector('[data-o-component="o-forms"]');
			const testForms = new Forms(formEl);

			proclaim.isUndefined(testForms.FormEl);
			proclaim.isUndefined(testForms.opts);
			proclaim.isUndefined(testForms.validFormEls);
		});

		it("removes the event listeners from the FormEl on submit", () => {
			fixtures.htmlCode();

			const formEl = document.querySelector('[data-o-component="o-forms"]');
			const testForms = new Forms(formEl);

			let elSpy = sinon.spy(formEl, 'removeEventListener');
			testForms.destroy();

			proclaim.isTrue(elSpy.calledOnce);
		});

		it("removes the event listeners from the FormEl inputs", (done) => {
			fixtures.htmlCode();

			const formEl = document.querySelector('[data-o-component="o-forms"]');
			const testForms = new Forms(formEl);

			const spys = [];
			const inputs = Array.from(formEl.querySelectorAll('input, select, textarea, button'));

			inputs.map((input) => {
				spys.push(sinon.spy(input, 'removeEventListener'));
			});

			testForms.destroy();

			spys.map((spy) => {
				proclaim.isTrue(spy.calledTwice);
			});

			done();
		});

	});
});
