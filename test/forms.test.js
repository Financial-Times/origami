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

		it('sets default applyValidState to false', () => {
			fixtures.htmlCode();

			const formEl = document.querySelector('[data-o-component="o-forms"]');
			testForms = new Forms(formEl);

			proclaim.equal(testForms.opts.applyValidState, false);
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

		it('sets applyValidState to correct options when constructed from data attr', () => {
			const html = `<form data-o-component="o-forms" data-o-forms-apply-valid-state="true"><input type="text" /></form>`;
			fixtures.insert(html);

			const formEl = document.querySelector('[data-o-component="o-forms"]');
			testForms = new Forms(formEl);

			proclaim.equal(testForms.opts.applyValidState, true);
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
					<div class="o-forms__toggle">
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
			input.value = 'test';

			formEl.addEventListener('submit', (event) => {
				event.preventDefault();
				proclaim.isTrue(oFormsEl.classList.contains('o-forms--error'));
				done();
			}, false);

			input.addEventListener('invalid', (event) => {
				event.preventDefault();
				proclaim.isTrue(oFormsEl.classList.contains('o-forms--error'));
				done();
			}, false);

			submitButton.click();
		});

		it('does not submit the form when an input is invalid on submit', (done) => {
			const submitButton = document.querySelector('input[type="submit"]');
			testForms = new Forms(formEl, { testEvent: 'submit' });

			proclaim.isFalse(oFormsEl.classList.contains('o-forms--error'));
			input.value = 'test';

			formEl.addEventListener('submit', (event) => {
				event.preventDefault();
				throw new Error('Expected form to not be submitted');
			}, false);

			setTimeout(() => {
				done();
			}, 10);

			submitButton.click();
		});

		describe("handles valid inputs", () => {
			beforeEach(() => {
				testForms = new Forms(formEl);
			});

			it('submits form when inputs are valid', (done) => {
				const submitButton = document.querySelector('input[type="submit"]');

				input.value = 'valid';

				formEl.addEventListener('submit', (event) => {
					event.preventDefault();
					done();
				}, false);

				submitButton.click();
			});

			it('removes error class when input is valid', () => {
				oFormsEl.classList.add('o-forms--error');

				input.focus();
				input.value = 'valid';
				input.blur();

				proclaim.isFalse(oFormsEl.classList.contains('o-forms--error'));
			});

			it('adds the valid class to the form when applyValidState is true and input is valid on blur', () => {
				testForms = new Forms(formEl, { applyValidState: true });

				proclaim.isFalse(oFormsEl.classList.contains('o-forms--valid'));

				input.focus();
				input.value = 'valid';
				input.blur();

				proclaim.isTrue(oFormsEl.classList.contains('o-forms--valid'));
			});

			it('doesnt add the valid class to the form when applyValidState is false', () => {
				testForms = new Forms(formEl, { applyValidState: false });

				proclaim.isFalse(oFormsEl.classList.contains('o-forms--valid'));

				input.focus();
				input.value = 'valid';
				input.blur();

				proclaim.isFalse(oFormsEl.classList.contains('o-forms--valid'));
			});
		});

		describe("handles validity changes", () => {
			it('removes the valid class when input becomes invalid on blur', () => {
				testForms = new Forms(formEl, { applyValidState: true });

				proclaim.isFalse(oFormsEl.classList.contains('o-forms--valid'));
				proclaim.isFalse(oFormsEl.classList.contains('o-forms--error'));

				input.focus();
				input.value = 'valid';
				input.blur();

				proclaim.isTrue(oFormsEl.classList.contains('o-forms--valid'));
				proclaim.isFalse(oFormsEl.classList.contains('o-forms--error'));

				input.focus();
				input.value = 'nope';
				input.blur();

				proclaim.isFalse(oFormsEl.classList.contains('o-forms--valid'));
				proclaim.isTrue(oFormsEl.classList.contains('o-forms--error'));
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

	describe("update status method", () => {
		it('adds a new status when a status element exists', () => {
			fixtures.formFieldHtmlCode({
				includeStatusElement: true
			});
			// Get elements to test.
			const formFieldElement = document.querySelector('.o-forms');
			const formStatusElement = document.querySelector('.o-forms__status');
			// Add status.
			const status = 'saving';
			const input = formFieldElement.querySelector('input');
			Forms.updateInputStatus(input, status);
			// Confirm expected status classes and aria attributes.
			proclaim.isTrue(formFieldElement.classList.contains(`o-forms--${status}`));
			proclaim.equal(formStatusElement.getAttribute(`aria-live`), 'assertive');
			proclaim.equal(formStatusElement.getAttribute(`aria-hidden`), 'false');
		});
		it('creates a status element if one does not exist', () => {
			fixtures.formFieldHtmlCode({
				includeStatusElement: false
			});
			// Get elements to test.
			const formFieldElement = document.querySelector('.o-forms');
			const initialFormStatusElement = document.querySelector('.o-forms__status');
			// Confirm no status exists.
			proclaim.isNull(initialFormStatusElement, 'Expecting no form status element to exist yet.');
			// Add status.
			const status = 'saving';
			const input = formFieldElement.querySelector('input');
			Forms.updateInputStatus(input, status);
			// Confirm form status element is created with the requested status.
			const finalFormStatusElement = document.querySelector('.o-forms__status');
			proclaim.ok(finalFormStatusElement, 'Expecting a form status element to have been created.');
			proclaim.isTrue(formFieldElement.classList.contains(`o-forms--${status}`));
		});
		it('does not add a status if the form input has an active error', () => {
			fixtures.formFieldHtmlCode({
				includeStatusElement: true,
				hasError: true
			});
			// Get elements to test.
			const formFieldElement = document.querySelector('.o-forms');
			const formStatusElement = document.querySelector('.o-forms__status');
			// Attempt to add status.
			const status = 'saving';
			const input = formFieldElement.querySelector('input');
			Forms.updateInputStatus(input, status);
			// Status is not added.
			proclaim.isFalse(formFieldElement.classList.contains(`o-forms--${status}`), 'If a form field has an error it should not also have a status.');
			proclaim.equal(formStatusElement.getAttribute(`aria-hidden`), 'true', 'If a form field has an error its status should be hidden.');
		});
		it('does not add an invalid status', () => {
			fixtures.formFieldHtmlCode({
				includeStatusElement: true,
				hasError: true
			});
			// Get elements to test.
			const formFieldElement = document.querySelector('.o-forms');
			// Attempt to add nonsense status.
			const status = 'not-a-real-status';
			const input = formFieldElement.querySelector('input');
			// Status is not added.
			proclaim.throws(() => {
				Forms.updateInputStatus(input, status);
			});
		});
		it('updates an existing status', () => {
			const existingStatus = 'saving';
			fixtures.formFieldHtmlCode({
				includeStatusElement: true,
				status: existingStatus
			});
			// Get elements to test.
			const formFieldElement = document.querySelector('.o-forms');
			// Confirm their is an existing status to update.
			proclaim.isTrue(formFieldElement.classList.contains(`o-forms--${existingStatus}`), 'Expecting an existing form field status to test.');
			// Attempt to update status.
			const newStatus = 'saved';
			const input = formFieldElement.querySelector('input');
			Forms.updateInputStatus(input, newStatus);
			// Status is updated.
			proclaim.isTrue(formFieldElement.classList.contains(`o-forms--${newStatus}`));
		});
		it('removes an existing status if no status is given', () => {
			const existingStatus = 'saving';
			fixtures.formFieldHtmlCode({
				includeStatusElement: true,
				status: existingStatus
			});
			// Get elements to test.
			const formFieldElement = document.querySelector('.o-forms');
			// Confirm their is an existing status to update.
			proclaim.isTrue(formFieldElement.classList.contains(`o-forms--${existingStatus}`), 'Expecting an existing form field status to test.');
			// Attempt to remove status.
			const status = null;
			const input = formFieldElement.querySelector('input');
			Forms.updateInputStatus(input, status);
			// Status is removed.
			proclaim.isFalse(formFieldElement.classList.contains(`o-forms--${existingStatus}`));
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

			inputs.forEach((input) => {
				spys.push(sinon.spy(input, 'removeEventListener'));
			});

			testForms.destroy();

			spys.forEach((spy) => {
				proclaim.isTrue(spy.calledTwice);
			});

			done();
		});

	});
});
