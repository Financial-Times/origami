/* eslint-env mocha */
/* global proclaim */

import formFixture from './helpers/fixtures';
import State from '../src/js/state';

describe('State', () => {
	let form;
	let state;
	let nodeList;

	context('new instance', () => {
		before(() => {
			document.body.innerHTML = formFixture;
			form = document.forms[0];
		});

		after(() => {
			document.body.innerHTML = null;
		});

		it('initialises a state instance successfully', () => {
			nodeList = form.elements['radioBox'];
			state = new State(nodeList);

			proclaim.isInstanceOf(state, State);
		});

		it('throws an error if input type is not `o-forms-input--radio-box`', () => {
			const field = form.elements['optional'];

			const message = 'State can only be applied to `radio` type inputs.';
			proclaim.throws(() => new State(field), message);
		});
	});

	context('.set()', () => {
		let stateClass;
		let getStateText;

		beforeEach(() => {
			document.body.innerHTML = formFixture;
			form = document.forms[0];
			nodeList = form.elements['radioBox'];
			state = new State(nodeList);
			stateClass = (state) => nodeList[0].closest('.o-forms-input').classList.contains(`o-forms-input--${state}`);
			getStateText = () => nodeList[0].closest('.o-forms-input').querySelector('.o-forms-input__state').textContent;
		});

		afterEach(() => {
			document.body.innerHTML = null;
		});

		it('`saving` state', () => {
			state.set('saving');
			proclaim.isTrue(stateClass('saving'));
		});

		it('`saving` state with custom label', () => {
			state.set('saving', 'sending');
			proclaim.isTrue(stateClass('saving'));
			proclaim.equal(getStateText(), 'sending');
		});

		it('`saved` state', () => {
			state.set('saved');
			proclaim.isFalse(stateClass('saving'));
			proclaim.isTrue(stateClass('saved'));
		});

		it('`saved` state with custom label', () => {
			state.set('saved', 'sent');
			proclaim.isTrue(stateClass('saved'));
			proclaim.equal(getStateText(), 'sent');
		});

		it('`none` state', () => {
			state.set('none');
			proclaim.isFalse(stateClass('saving'));
			proclaim.isFalse(stateClass('saved'));
		});
	});

	context('opts', () => {
		before(() => {
			document.body.innerHTML = formFixture;
			form = document.forms[0];
			nodeList = form.elements['radioBox'];
		});

		after(() => {
			document.body.innerHTML = null;
		});

		it('accepts an options object with iconOnly key', () => {
			state = new State(nodeList, { iconOnly: true });
			state.set('saving');
			const icon = document.querySelector('.o-forms-input__state--icon-only');
			proclaim.isNotNull(icon);
		});
	});
});
