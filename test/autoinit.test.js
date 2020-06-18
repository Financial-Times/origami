/* eslint-env mocha */
/* global proclaim sinon */

describe("o-autoinit", () => {
	let docAddEventListenerStub;

	beforeEach(() => {
		docAddEventListenerStub = sinon.stub(document, 'addEventListener');

		// autoinit is executed upon being required
		require('./../main');
	});

	afterEach(() => {
		docAddEventListenerStub.restore();
	});


	it('sets event listeners', () => {
		proclaim.isTrue(docAddEventListenerStub.calledWith('DOMContentLoaded'));
		proclaim.isTrue(docAddEventListenerStub.calledOnce);
	});
});
