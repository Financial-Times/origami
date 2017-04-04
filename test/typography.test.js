/* eslint-env mocha, sinon, proclaim */
import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import * as fixtures from './helpers/fixtures';

const Typography = require('./../main');

describe("Typography", () => {
	// beforeEach(() => {
	// 	fixtures.htmlCode();
	// });

	afterEach(() => {

	});

	describe("constructor", () => {

		let getOptionsStub;
		let getOptionsReturnStub;
		let checkOptionsStub;

		beforeEach(() => {
			getOptionsReturnStub = {};
			getOptionsStub = sinon.stub(Typography, 'getOptions').returns(getOptionsReturnStub);
			checkOptionsStub = sinon.stub(Typography, 'checkOptions').returnsArg(0);
		});

		afterEach(() => {
			getOptionsStub.restore();
			checkOptionsStub.restore();
		});

		it("doesn't call getOptions if options are passed in", () => {
			const stubEl = "stubEL";
			const stubOpts = {};

			new Typography(stubEl, stubOpts);

			proclaim.isFalse(getOptionsStub.called);
		});

		it("calls getOptions if no options were passed in", () => {
			const stubEl = "stubEL";
			new Typography(stubEl);

			proclaim.isTrue(getOptionsStub.calledWith(stubEl));
		});

		it("calls checkOptions with the options passed in if some options were passed in", () => {
			const stubOpts = {};
			const stubEl = "stubEL";

			new Typography(stubEl, stubOpts);

			proclaim.isTrue(checkOptionsStub.calledWith(stubOpts));
		});

		it("calls checkOptions with the return values of getOptions if no options were passed in", () => {
			const stubEl = "stubEL";
			new Typography(stubEl);

			proclaim.isTrue(checkOptionsStub.calledWith(getOptionsReturnStub));
		});
	});
});
