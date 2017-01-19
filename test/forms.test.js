/* eslint-env mocha, sinon, proclaim */

import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import * as fixtures from './helpers/fixtures';

const Forms = require('./../main');

describe("Forms", () => {
	// beforeEach(() => {
	// });

	// afterEach(() => {
	// });

	it('sets default testEvent to blur', () => {
		fixtures.htmlCode();

		const formEl = document.querySelector('[data-o-component="o-forms"]');
		const testForms = new Forms(formEl);

		proclaim.equal(testForms.opts.testEvent, 'blur');
	});

	it('sets testEvent to correct options when constructed manually', () => {
		fixtures.htmlCode();

		const formEl = document.querySelector('[data-o-component="o-forms"]');
		const opts = { testEvent: 'submit' };
		const testForms = new Forms(formEl, opts);

		proclaim.equal(testForms.opts.testEvent, 'submit');
	});

	it('sets testEvent to correct options when constructed from data attr', () => {
		const html = `<form data-o-component="o-forms" data-o-forms-test-event="submit"><input type="text" /></form>`;
		fixtures.insert(html);

		const formEl = document.querySelector('[data-o-component="o-forms"]');
		const testForms = new Forms(formEl);

		proclaim.equal(testForms.opts.testEvent, 'submit');
	});

	describe("handles invalid element", () => {
		it('adds the error class to the form when an input is invalid on blur', () => {
			fixtures.htmlCode();

			const formEl = document.querySelector('[data-o-component="o-forms"]');
			const testForms = new Forms(formEl);

			const input = document.querySelector('#required-input');
			const oFormsEl = input.closest('.o-forms');

			proclaim.isFalse(oFormsEl.classList.contains('o-forms--error'));

			input.focus();
			input.value = '';
			input.blur();

			proclaim.isTrue(oFormsEl.classList.contains('o-forms--error'));
		});

		it('adds the error class to the form when an input is invalid on submit', (done) => {
			fixtures.htmlCode();

			const formEl = document.querySelector('[data-o-component="o-forms"]');
			const testForms = new Forms(formEl, {testEvent: 'submit'});

			const input = document.querySelector('#required-input');
			const oFormsEl = input.closest('.o-forms');

			const submitButton = document.querySelector('input[type="submit"]');

			proclaim.isFalse(oFormsEl.classList.contains('o-forms--error'));

			formEl.addEventListener('submit', (event) => {
				event.preventDefault();

				proclaim.isTrue(oFormsEl.classList.contains('o-forms--error'));
				done();
			}, false);

			submitButton.click();
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

	});
});
