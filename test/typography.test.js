/* eslint-env mocha, sinon, proclaim */
import proclaim from 'proclaim';
import FontFaceObserver from 'fontfaceobserver/fontfaceobserver.standalone.js';
import sinon from 'sinon/pkg/sinon';

import Typography from './../main';

const fontLabels = ['display', 'sans', 'sans-bold', 'display-bold'];
const prefix = 'o-typography--loading-';
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

		it("optionally doesn't call loadFonts", () => {
			const stubEl = "stubEL";
			new Typography(stubEl, { loadOnInit: false });

			proclaim.isFalse(loadFontsStub.called);
		});
	});

	describe("getOptions", () => {
		it("doesn't extract fontLoadedCookieName if none is set", () => {
			const el = document.createElement('html');
			const options = Typography.getOptions(el);

			proclaim.isUndefined(options.fontLoadedCookieName);
		});

		it("extracts fontLoadedCookieName if it's set on the el passed in", () => {
			const el = document.querySelector('html');
			el.setAttribute('data-o-typography-font-loaded-cookie-name', stubCookieName);

			const options = Typography.getOptions(el);
			proclaim.equal(options.fontLoadedCookieName, stubCookieName);
		});

		it("extracts fontLoadedCookieName if it's set on the el passed in as font-loaded-storage-name", () => {
			const el = document.querySelector('html');
			el.setAttribute('data-o-typography-font-loaded-storage-name', stubCookieName);

			const options = Typography.getOptions(el);
			proclaim.equal(options.fontLoadedCookieName, stubCookieName);
		});
	});

	describe("checkOptions", () => {

		it("sets opts.fontLoadedCookieName to o-typography-fonts-loaded if not specified", ()=>{
			const opts = Typography.checkOptions({});
			proclaim.strictEqual(opts.fontLoadedCookieName, 'o-typography-fonts-loaded');
		});

		it("returns the opts object", () => {
			const opts = Typography.checkOptions({});
			proclaim.isObject(opts);
		});
	});

	describe("removeLoadingClasses", () => {
		it("removes all loading classes from typography element", () => {
			const el = document.querySelector('html');

			fontLabels.forEach((label) => el.classList.add(`${prefix}${label}`) );

			const typography = new Typography(el);
			typography.removeLoadingClasses();

			fontLabels.forEach((label) => {
				proclaim.isFalse(el.classList.contains(`${prefix}${label}`));
			});

		});
	});

	describe("loadFonts", () => {

		afterEach(() => {
			FontFaceObserver.prototype.load.restore();
			document.cookie = `${stubCookieName}=;path=/;domain=${location.hostname};expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
		});

		it("calls removeLoadingClasses if a cookie exists", () => {
			const el = document.querySelector('html');
			const typography = new Typography(el, {
				"loadOnInit": false,
				"fontLoadedCookieName": stubCookieName
			});

			document.cookie = `${stubCookieName}=1;path=/;domain=${location.hostname};`;
			const removeLoadingClassesStub = sinon.stub(typography, 'removeLoadingClasses');
			sinon.stub(FontFaceObserver.prototype, 'load').returns(Promise.resolve());

			return typography.loadFonts().then(() => {
				proclaim.isTrue(removeLoadingClassesStub.calledOnce);
			});
		});

		it("calls removeLoadingClasses if a cookie exists", () => {
			const el = document.querySelector('html');
			const typography = new Typography(el, {
				"loadOnInit": false,
				"fontLoadedCookieName": stubCookieName
			});

			document.cookie = `${stubCookieName}=1;path=/;domain=${location.hostname};`;
			const removeLoadingClassesStub = sinon.stub(typography, 'removeLoadingClasses');
			sinon.stub(FontFaceObserver.prototype, 'load').returns(Promise.resolve());

			return typography.loadFonts().then(() => {
				proclaim.isTrue(removeLoadingClassesStub.calledOnce);
			});
		});

		it("Removes loading classes when fonts have loaded", () => {
			const el = document.querySelector('html');
			fontLabels.forEach((label) => el.classList.add(`${prefix}${label}`) );
			const typography = new Typography(el, {
				"loadOnInit": false,
				"fontLoadedCookieName": stubCookieName
			});

			sinon.stub(FontFaceObserver.prototype, 'load').returns(Promise.resolve());

			fontLabels.forEach((label) => {
				proclaim.isTrue(el.classList.contains(`${prefix}${label}`));
			});

			return typography.loadFonts().then(() => {
				fontLabels.forEach((label) => {
					proclaim.isFalse(el.classList.contains(`${prefix}${label}`));
				});
			});
		});

		it("Adds cookie when fonts have loaded", () => {
			const el = document.querySelector('html');
			const typography = new Typography(el, {
				"loadOnInit": false,
				"fontLoadedCookieName": stubCookieName
			});

			sinon.stub(FontFaceObserver.prototype, 'load').returns(Promise.resolve());

			return typography.loadFonts().then(() => {
				proclaim.isTrue(document.cookie.indexOf(`${stubCookieName}=1`) > -1);
			});
		});

		it("still returns when fontfaceobserver load rejects", () => {
			const el = document.querySelector('html');
			const typography = new Typography(el, {"loadOnInit": false});

			sinon.stub(FontFaceObserver.prototype, 'load').returns(Promise.reject(new Error('Loading font failed')));

			return typography.loadFonts();
		});

		it("is inert if has already run successfully", () => {
			const el = document.querySelector('html');
			const typography = new Typography(el, {"loadOnInit": false});

			sinon.stub(FontFaceObserver.prototype, 'load').returns(Promise.resolve());

			return typography.loadFonts()
				.then(() => {
					sinon.stub(typography, "removeLoadingClasses");
					sinon.stub(typography, "setCookie");
					return typography.loadFonts()
						.then(() => {
							proclaim.isFalse(typography.removeLoadingClasses.called);
							proclaim.isFalse(typography.setCookie.called);
							typography.setCookie.restore();
							typography.removeLoadingClasses.restore();
						});
				});
		});


	});

});
