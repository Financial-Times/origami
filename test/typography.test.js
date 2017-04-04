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

	describe("getOptions", () => {
		it("doesn't extract fontLoadedCookieName if none is set", () => {
			const el = document.createElement('html');
			const options = Typography.getOptions(el);

			proclaim.isUndefined(options.fontLoadedCookieName);
		});

		it("doesn't extract fontLoadingPrefix if it's not set", () => {
			const el = document.querySelector('html');
			const options = Typography.getOptions(el);

			proclaim.isUndefined(options.fontLoadingPrefix);
		});

		it("extracts fontLoadingPrefix if it's set on the el passed in", () => {
			const el = document.querySelector('html');
			let stubPrefix = 'loading-font-';
			el.setAttribute('data-o-typography-font-loading-prefix', stubPrefix);

			const options = Typography.getOptions(el);
			proclaim.equal(options.fontLoadingPrefix, stubPrefix);
		});

		it("extracts fontLoadedCookieName if it's set on the el passed in", () => {
			const el = document.querySelector('html');
			let stubCookieName = 'fonts-loaded';
			el.setAttribute('data-o-typography-font-loaded-cookie-name', stubCookieName);

			const options = Typography.getOptions(el);
			proclaim.equal(options.fontLoadedCookieName, stubCookieName);
		});
	});

	describe("checkOptions", () => {

		it("sets opts.fontLoadingPrefix to o-typography--loading- if not specified", ()=>{
			let opts = Typography.checkOptions({});
			proclaim.strictEqual(opts.fontLoadingPrefix, 'o-typography--loading-');
		});

		it("sets opts.fontLoadedCookieName to o-typography-fonts-loaded if not specified", ()=>{
			let opts = Typography.checkOptions({});
			proclaim.strictEqual(opts.fontLoadedCookieName, 'o-typography-fonts-loaded');
		});

		it("returns the opts object", () => {
			let opts = Typography.checkOptions({"fontLoadingPrefix": "o-typography-fonts-loaded"});
			proclaim.isObject(opts);
		});
	});
});
