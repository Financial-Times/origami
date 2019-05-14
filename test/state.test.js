/* eslint-env mocha, sinon, proclaim */

import proclaim from 'proclaim';
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
			let field = form.elements['optional'];

			let message = 'State can only be applied to `radio` type inputs.';
			proclaim.throws(() => new State(field), message);
		});
	});

	context('.set()', () => {
		let stateClass;

		before(() => {
			document.body.innerHTML = formFixture;
			form = document.forms[0];
			nodeList = form.elements['radioBox'];
			state = new State(nodeList);
			stateClass = (state) => nodeList[0].closest('.o-forms-input').classList.contains(`o-forms-input--${state}`);
		});

		after(() => {
			document.body.innerHTML = null;
		});

		it('`saving` state', () => {
			state.set('saving');
			proclaim.isTrue(stateClass('saving'));
		});

		it('`saved` state', () => {
			state.set('saved');
			proclaim.isFalse(stateClass('saving'));
			proclaim.isTrue(stateClass('saved'));
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
			let icon = document.querySelector('.o-forms-input__state--icon-only');
			proclaim.isNotNull(icon);
		});
	});
});
