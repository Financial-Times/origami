/* eslint-env mocha */

import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon-esm.js';

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
		});
	});

	context('validates pattern-matching date fields', () => {
		let dayField;
		let monthField;
		let yearField;
		before(() => {
			document.body.innerHTML = formFixture;
			form = document.forms[0];
			dayField = form.elements['date'][0];
			new Input(dayField);
			monthField = form.elements['date1'];
			new Input(monthField);
			yearField = form.elements['date2'];
			new Input(yearField);
		});

		after(() => {
			document.body.innerHTML = null;
		});

		it('`blur` event sets the field to invalid if input does not match pattern', () => {
			dayField.value = "tenth";
			dispatch('blur', dayField);

			proclaim.isTrue(parentClass(dayField, 'invalid'));
		});

		it('`input` event updates validity when format is corrected (if previously invalid)', () => {
			dayField.value = 'tenth';
			dispatch('blur', dayField);
			proclaim.isTrue(parentClass(dayField, 'invalid'));

			dayField.focus();
			dayField.value = '10';
			monthField.focus();
			monthField.value = '10';
			yearField.focus();
			yearField.value = '2022';
			dispatch('input', yearField);

			proclaim.isFalse(parentClass(dayField, 'invalid'), 'invalid class is not removed');
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
