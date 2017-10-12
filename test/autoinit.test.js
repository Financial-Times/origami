/* eslint-env mocha */

import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';

describe("o-autoinit", () => {
	let addEventListenerStub;
	// autoinit is executed upon being required
	let autoinit; // eslint-disable-line no-unused-vars
	let docAddEventListenerStub;

	beforeEach(() => {
		addEventListenerStub = sinon.stub(window, 'addEventListener');
		docAddEventListenerStub = sinon.stub(document, 'addEventListener');

		autoinit = require('./../main');
	});

	afterEach(() => {
		addEventListenerStub.restore();
		docAddEventListenerStub.restore();
	});


	it('sets event listeners', () => {
		proclaim.isTrue(addEventListenerStub.calledTwice);
		proclaim.isTrue(addEventListenerStub.calledWith('load'));
		proclaim.isTrue(docAddEventListenerStub.calledOnce);
	});
});
