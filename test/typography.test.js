/* eslint-env mocha, sinon, proclaim */
import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';

const Typography = require('./../main');

const fontLabels = ['serifDisplay', 'sans', 'sansBold', 'serifDisplayBold'];
const stubPrefix = 'loading-font-';
const stubCookieName = 'fonts-loaded';

describe("Typography", () => {
	describe("constructor", () => {

		let getOptionsStub;
		let getOptionsReturnStub;
		let checkOptionsStub;
		let loadFontsStub;

		beforeEach(() => {
			getOptionsReturnStub = {};
			getOptionsStub = sinon.stub(Typography, 'getOptions').returns(getOptionsReturnStub);
			checkOptionsStub = sinon.stub(Typography, 'checkOptions').returnsArg(0);
			loadFontsStub = sinon.stub(Typography.prototype, 'loadFonts');
		});

		afterEach(() => {
			getOptionsStub.restore();
			checkOptionsStub.restore();
			loadFontsStub.restore();
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

		it("calls loadFonts", () => {
			const stubEl = "stubEL";
			new Typography(stubEl);

			proclaim.isTrue(loadFontsStub.called);
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
			el.setAttribute('data-o-typography-font-loading-prefix', stubPrefix);

			const options = Typography.getOptions(el);
			proclaim.equal(options.fontLoadingPrefix, stubPrefix);
		});

		it("extracts fontLoadedCookieName if it's set on the el passed in", () => {
			const el = document.querySelector('html');
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

	describe("removeLoadingClasses", () => {
		it("removes all loading classes from typography element", () => {
			const el = document.querySelector('html');

			fontLabels.forEach((label) => el.classList.add(`${stubPrefix}${label}`) );

			const typography = new Typography(el, {"fontLoadingPrefix": stubPrefix});
			typography.removeLoadingClasses();

			fontLabels.forEach((label) => {
				proclaim.isFalse(el.classList.contains(`${stubPrefix}${label}`));
			});

		});
	});

	describe("loadFonts", () => {

		it("calls removeLoadingClasses if a cookie exists", () => {
			const el = document.querySelector('html');
			const typography = new Typography(el, {"fontLoadingPrefix": stubPrefix});

			document.cookie = `${typography.opts.fontLoadedCookieName}=1;path=/;max-age=60`;
			const removeLoadingClassesStub = sinon.stub(typography, 'removeLoadingClasses');

			return typography.loadFonts().then(() => {
				proclaim.isTrue(removeLoadingClassesStub.calledOnce);
				document.cookie = `${typography.opts.fontLoadedCookieName}=1;path=/;expires=${new Date(0)};`;
			});
		});

		xit("Removes loading classes when fonts have loaded", () => {
			const el = document.querySelector('html');
			fontLabels.forEach((label) => el.classList.add(`${stubPrefix}${label}`) );
			const typography = new Typography(el, {"fontLoadingPrefix": stubPrefix});

			return typography.loadFonts().then(() => {
				document.cookie = `${typography.opts.fontLoadedCookieName}=1;path=/;expires=${new Date(0)};`;
				fontLabels.forEach((label) => {
					proclaim.isFalse(el.classList.contains(`${stubPrefix}${label}`));
				});
			});
		});
	});

});
