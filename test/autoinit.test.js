/* eslint-env mocha */

import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';

describe("o-autoinit", () => {
	// autoinit is executed upon being required
	let autoinit; // eslint-disable-line no-unused-vars
	let docAddEventListenerStub;

	beforeEach(() => {
		docAddEventListenerStub = sinon.stub(document, 'addEventListener');

		autoinit = require('./../main');
	});

	afterEach(() => {
		docAddEventListenerStub.restore();
	});


	it('sets event listeners', () => {
		proclaim.isTrue(docAddEventListenerStub.calledWith('DOMContentLoaded'));
		proclaim.isTrue(docAddEventListenerStub.calledOnce);
	});
});
