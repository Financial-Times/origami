/* eslint-env mocha */
/* global proclaim sinon */

import formFixture from './helpers/fixtures.js';
import Input from '../src/js/input.js';

describe('Input', () => {
	let form;
	let dispatch;
	let parentClass;

	beforeEach(() => {
		dispatch = (event, element) => element.dispatchEvent(new Event(event));
		parentClass = (element, validity) => element.closest('.o-forms-input').classList.contains(`o-forms-input--${validity}`);
	});

	it('validation ignores an input that is not required or invalid', () => {
		document.body.innerHTML = formFixture;
		form = document.forms[0];
		const optionalField = form.elements['optional'];
		new Input(optionalField);

		proclaim.isFalse(parentClass(optionalField, 'invalid'));
		proclaim.isFalse(parentClass(optionalField, 'valid'));
	});

	context('validates required fields', () => {
		let requiredField;

		beforeEach(() => {
			document.body.innerHTML = formFixture;
			form = document.forms[0];
			requiredField = form.elements['required'];
			new Input(requiredField);
		});

		after(() => {
			document.body.innerHTML = null;
		});

		it('`blur` event sets the field to invalid if required input is left empty', () => {
			dispatch('blur', requiredField);
			proclaim.isTrue(parentClass(requiredField, 'invalid'));
		});

		it('`input` event updates validity when input is given (if previously invalid)', () => {
			dispatch('blur', requiredField);
			proclaim.isTrue(parentClass(requiredField, 'invalid'));

			requiredField.value = "some text";
			dispatch('input', requiredField);

			proclaim.isFalse(parentClass(requiredField, 'invalid'));
			proclaim.isTrue(parentClass(requiredField, 'valid'));
		});
	});

	context('validates pattern-matching fields', () => {
		let dateField;
		before(() => {
			document.body.innerHTML = formFixture;
			form = document.forms[0];
			dateField = form.elements['date'][0];
			new Input(dateField);
		});

		after(() => {
			document.body.innerHTML = null;
		});

		it('`blur` event sets the field to invalid if input does not match pattern', () => {
			dateField.value = "tenth";
			dispatch('blur', dateField);

			proclaim.isTrue(parentClass(dateField, 'invalid'));
		});

		it('`input` event updates validity when format is corrected (if previously invalid)', () => {
			dateField.value = 'tenth';
			dispatch('blur', dateField);
			proclaim.isTrue(parentClass(dateField, 'invalid'));

			dateField.value = 10;
			dispatch('input', dateField);

			proclaim.isFalse(parentClass(dateField, 'invalid'));
			proclaim.isTrue(parentClass(dateField, 'valid'));
		});
	});

	context('.destroy()', () => {
		let fieldSpy;
		let input;
		let requiredField;

		before(() => {
			document.body.innerHTML = formFixture;
			form = document.forms[0];
			requiredField = form.elements['required'];
		});

		after(() => {
			document.body.innerHTML = null;
		});

		it('removes all event listeners', () => {
			input = new Input(requiredField);
			fieldSpy = sinon.spy(requiredField, 'removeEventListener');
			input.destroy();

			proclaim.isTrue(fieldSpy.calledTwice);
		});
	});
});
