/* eslint-env mocha, sinon, proclaim */
import proclaim from 'proclaim';
import superstore from 'superstore-sync';
import FontFaceObserver from 'fontfaceobserver/fontfaceobserver.standalone.js';
import sinon from 'sinon/pkg/sinon';

const Typography = require('./../main');

const fontLabels = ['serifDisplay', 'sans', 'sansBold', 'serifDisplayBold'];
const stubPrefix = 'loading-font-';
const stubStorageName = 'fonts-loaded';

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
		it("doesn't extract fontLoadedStorageName if none is set", () => {
			const el = document.createElement('html');
			const options = Typography.getOptions(el);

			proclaim.isUndefined(options.fontLoadedStorageName);
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

		it("extracts fontLoadedStorageName if it's set on the el passed in", () => {
			const el = document.querySelector('html');
			el.setAttribute('data-o-typography-font-loaded-storage-name', stubStorageName);

			const options = Typography.getOptions(el);
			proclaim.equal(options.fontLoadedStorageName, stubStorageName);
		});
	});

	describe("checkOptions", () => {

		it("sets opts.fontLoadingPrefix to o-typography--loading- if not specified", ()=>{
			let opts = Typography.checkOptions({});
			proclaim.strictEqual(opts.fontLoadingPrefix, 'o-typography--loading-');
		});

		it("sets opts.fontLoadedStorageName to o-typography-fonts-loaded if not specified", ()=>{
			let opts = Typography.checkOptions({});
			proclaim.strictEqual(opts.fontLoadedStorageName, 'o-typography-fonts-loaded');
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

		beforeEach(() => {
			sinon.stub(superstore.local, 'set');
		});

		afterEach(() => {
			FontFaceObserver.prototype.load.restore();
			superstore.local.set.restore();
		});

		it("calls removeLoadingClasses if a cookie exists", () => {
			const el = document.querySelector('html');
			const typography = new Typography(el, {"fontLoadingPrefix": stubPrefix});

			sinon.stub(superstore.local, "get").returns("1");
			const removeLoadingClassesStub = sinon.stub(typography, 'removeLoadingClasses');
			sinon.stub(FontFaceObserver.prototype, 'load').returns(Promise.resolve());

			return typography.loadFonts().then(() => {
				proclaim.isTrue(removeLoadingClassesStub.calledOnce);
				superstore.local.get.restore();
			});
		});

		it("Removes loading classes when fonts have loaded", () => {
			const el = document.querySelector('html');
			fontLabels.forEach((label) => el.classList.add(`${stubPrefix}${label}`) );
			const typography = new Typography(el, {"fontLoadingPrefix": stubPrefix});

			sinon.stub(superstore.local, "get").returns(null);
			sinon.stub(FontFaceObserver.prototype, 'load').returns(Promise.resolve());

			fontLabels.forEach((label) => {
				proclaim.isTrue(el.classList.contains(`${stubPrefix}${label}`));
			});

			return typography.loadFonts().then(() => {
				fontLabels.forEach((label) => {
					proclaim.isFalse(el.classList.contains(`${stubPrefix}${label}`));
				});
				superstore.local.get.restore();
			});
		});

		it("Adds to local storage when fonts have loaded", () => {
			const el = document.querySelector('html');
			const typography = new Typography(el);

			sinon.stub(FontFaceObserver.prototype, 'load').returns(Promise.resolve());

			return typography.loadFonts().then(() => {
				proclaim.isTrue(superstore.local.set.calledWith(stubStorageName, '1'));
			});
		});

		it("still returns when fontfaceobserver load rejects", () => {
			const el = document.querySelector('html');
			const typography = new Typography(el);

			sinon.stub(FontFaceObserver.prototype, 'load').returns(Promise.reject());

			return typography.loadFonts();
		});
	});

});
