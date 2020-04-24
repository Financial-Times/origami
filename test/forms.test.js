/* eslint-env mocha */
/* global proclaim sinon */

import formFixture from './helpers/fixtures';
import Forms from './../main';

describe('Forms', () => {
	let formEl;
	let parentClass;
	let requiredTextField;
	let dateFields;

	before(() => {
		parentClass = (element, modifier) => element.closest('.o-forms-input').classList.contains(`o-forms-input--${modifier}`);
	});

	context('on `submit`', () => {
		let submit;
		let summary;
		let formSpy;

		beforeEach(() => {
			document.body.innerHTML = formFixture;
			formEl = document.forms[0];
			formSpy = sinon.spy(formEl, 'addEventListener');

			dateFields = formEl.elements['date'];
			requiredTextField = formEl.elements['required'];
			submit = formEl.elements[formEl.elements.length - 1];
		});

		afterEach(() => {
			document.body.innerHTML = null;
		});

		it('`opts.useBrowserValidation = true` relays form validation to browser on all invalid form inputs', () => {
			new Forms(formEl, { useBrowserValidation: true });
			submit.click();

			proclaim.isTrue(formSpy.withArgs('submit').notCalled);
			proclaim.isTrue(parentClass(dateFields[0], 'invalid'));
			proclaim.isTrue(parentClass(requiredTextField, 'invalid'));
		});

		it('`opts.useBrowserValidation = false` manually validates form inputs', () => {
			new Forms(formEl);
			submit.click();

			proclaim.isTrue(formSpy.withArgs('submit').calledOnce);
			proclaim.isTrue(parentClass(dateFields[0], 'invalid'));
			proclaim.isTrue(parentClass(requiredTextField, 'invalid'));
		});

		context('`opts.errorSummary = true`', () => {
			let listItems;
			let textInput;

			beforeEach(() => {
				new Forms(formEl);
			});

			it('creates new summary when inputs are invalid', () => {
				submit.click();
				summary = formEl.querySelector('.o-forms__error-summary');
				proclaim.isNotNull(summary);
			});

			it('the summary reflects the number of invalid inputs as list items with links', () => {
				submit.click();
				summary = formEl.querySelector('.o-forms__error-summary');
				listItems = summary.querySelectorAll('li > a');
				proclaim.equal(listItems.length, 2);
			});

			it('the summary gets updated on second submit if a form field has been amended', () => {
				submit.click();
				summary = formEl.querySelector('.o-forms__error-summary');
				listItems = summary.querySelectorAll('li > a');
				proclaim.equal(listItems.length, 2);

				textInput = formEl.elements['text'];
				textInput.value = 'something';

				submit.click();
				summary = formEl.querySelector('.o-forms__error-summary');
				listItems = summary.querySelectorAll('li > a');
				proclaim.equal(listItems.length, 1);
			});

			it('does not error if there is no field title for an input', () => {
				// Add a form with a single checkbox, which has no field title.
				const singleCheckboxFormString = `
				<form action="" id="single-checkbox-form">
					<div class="o-forms-field">
						<span class="o-forms-input o-forms-input--checkbox">
							<label>
								<input id="my-single-checkbox" type="checkbox" name="my-single-checkbox" required/>
								<span class="o-forms-input__label">I accept these terms.</span>
							</label>
						</span>
					</div>
					<input class="o-buttons o-buttons--secondary" type="submit">
				</form>
			`;
				const range = document.createRange();
				const formDocumentFragment = range.createContextualFragment(singleCheckboxFormString);
				document.body.appendChild(formDocumentFragment);
				const singleCheckboxFormEl = document.getElementById('single-checkbox-form');
				const singleCheckboxFormSubmitEl = singleCheckboxFormEl.querySelector('[type="submit"]');
				// initialise and submit the form, with no error
				new Forms(singleCheckboxFormEl);
				singleCheckboxFormSubmitEl.click();
			});
		});

		context('`opts.errorSummary = false`', () => {
			it('does not create a new summary when inputs are invalid ', () => {
				new Forms(formEl, { errorSummary: false });
				submit.click();
				summary = formEl.querySelector('.o-forms__error-summary');
				proclaim.isNull(summary);
			});
		});

		it('does not attempt to validate other o-forms on submit', () => {
			// Add a second form.
			const secondFormString = `
				<form action="#" id="second-initialised-form">
					<label class="o-forms-field">
						<span class="o-forms-title">
							<span class="o-forms-title__main">Required text input</span>
						</span>

						<span class="o-forms-input o-forms-input--text">
							<input id="text" type="text" name="form-two-required" value="" required>
						</span>
					</label>
					<input class="o-buttons o-buttons--secondary" type="submit">
				</form>
			`;
			const range = document.createRange();
			const secondFormDocumentFragment = range.createContextualFragment(secondFormString);
			document.body.appendChild(secondFormDocumentFragment);
			const secondFormEl = document.getElementById('second-initialised-form');
			// initialise the first form
			const form = new Forms(formEl);
			const formSpy = sinon.spy(form, 'validateFormInputs');
			// initialise the second form
			const secondForm = new Forms(secondFormEl);
			const secondFormSpy = sinon.spy(secondForm, 'validateFormInputs');
			// submit the first form
			submit.click();
			// the first form is validated, the second is not
			proclaim.isTrue(formSpy.called, 'The first form was submitted but not validated.');
			proclaim.isTrue(secondFormSpy.notCalled, 'The second form was not submitted but was validated.');
		});

		it('does not attempt to validate other uninitialised forms on submit', () => {
			// Add a second form.
			const secondFormString = `
				<form action="" id="second-form">
					<label class="o-forms-field">
						<span class="o-forms-title">
							<span class="o-forms-title__main">Required text input</span>
						</span>

						<span class="o-forms-input o-forms-input--text">
							<input id="text" type="text" name="form-two-required" value="" required>
						</span>
					</label>
					<input class="o-buttons o-buttons--secondary" type="submit">
				</form>
			`;
			const range = document.createRange();
			const secondFormDocumentFragment = range.createContextualFragment(secondFormString);
			document.body.appendChild(secondFormDocumentFragment);
			const secondFormEl = document.getElementById('second-form');
			const secondFormSubmitEl = secondFormEl.querySelector('[type="submit"]');
			// initialise the first form only
			const form = new Forms(formEl);
			const formSpy = sinon.spy(form, 'validateFormInputs');
			// submit the second form
			secondFormSubmitEl.click();
			// the first form is not validated
			proclaim.isTrue(formSpy.notCalled, 'The first form was validated even though it was not submitted.');
		});
	});

	context('.setState()', () => {
		let form;
		let name;
		let radioInputs;

		before(() => {
			document.body.innerHTML = formFixture;
			formEl = document.forms[0];
			name = 'radioBox';
			radioInputs = formEl.elements[name];

			form = new Forms(formEl);
		});

		after(() => {
			document.body.innerHTML = null;
		});

		it('`saving` to named input', () => {
			form.setState('saving', name);
			proclaim.isTrue(parentClass(radioInputs[0], 'saving'));
		});

		it('`saved` to named input', () => {
			form.setState('saved', name);
			proclaim.isFalse(parentClass(radioInputs[0], 'saving'));
			proclaim.isTrue(parentClass(radioInputs[0], 'saved'));
		});

		it('`none` to named input', () => {
			form.setState('none', name);
			proclaim.isFalse(parentClass(radioInputs[0], 'saving'));
			proclaim.isFalse(parentClass(radioInputs[0], 'saved'));
		});
	});

	context('.destroy()', () => {
		let form;
		let formSpy;
		beforeEach(() => {
			document.body.innerHTML = formFixture;
			formEl = document.forms[0];
			form = new Forms(formEl);
		});

		afterEach(() => {
			document.body.innerHTML = null;
		});

		it('removes all references to Forms, Inputs and State', () => {
			proclaim.isInstanceOf(form, Forms);

			form.destroy();
			proclaim.isNull(form.form);
			proclaim.isNull(form.opts);
			proclaim.isNull(form.formInputs);
			proclaim.isNull(form.stateElements);
		});

		it('removes all event listeners', () => {
			formSpy = sinon.spy(formEl, 'removeEventListener');

			form.destroy();

			proclaim.isTrue(formSpy.calledOnce);
		});
	});
});
