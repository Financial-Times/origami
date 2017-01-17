/* eslint-env mocha, sinon, proclaim */
import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import * as fixtures from './helpers/fixtures';

const Tooltip = require('./../main');

describe("Tooltip", () => {
	describe("constructor", () => {

		let getOptionsStub;
		let getOptionsReturnStub;
		let checkOptionsStub;
		let checkOptsReturnStub;

		beforeEach(() => {
			getOptionsReturnStub = {};
			getOptionsStub = sinon.stub(Tooltip.prototype, 'getOptions').returns(getOptionsReturnStub);
			checkOptsReturnStub = {};
			checkOptionsStub = sinon.stub(Tooltip.prototype, 'checkOptions').returns(checkOptsReturnStub);
		});

		afterEach(() => {
			getOptionsStub.restore();
			checkOptionsStub.restore();
		});

		it("doesn't call getOptions if options are passed in", () => {
			const stubEl = "stubEL";
			const stubOpts = sinon.stub();

			const testTooltip = new Tooltip(stubEl, stubOpts);

			proclaim.isFalse(getOptionsStub.called);
		});

		it("calls getOptions if no options were passed in", () => {
			const stubEl = "stubEL";
			const testTooltip = new Tooltip(stubEl);

			proclaim.isTrue(getOptionsStub.calledWith(stubEl));
		});

		it("calls checkOptions with the options passed in if some options were passed in", () => {
			const stubOpts = sinon.stub();
			const stubEl = "stubEL";

			const testTooltip = new Tooltip(stubEl, stubOpts);

			proclaim.isTrue(checkOptionsStub.calledWith(stubOpts));

		});

		it("calls checkOptions with the return valuse of getOptions if no options were passed in", () => {
			const testTooltip = new Tooltip(stubEl);
			const stubEl = "stubEL";

			proclaim.isTrue(checkOptionsStub.calledWith(getOptionsReturnStub));
		});
	});

	describe("getOptions", () => {
		it("doesn't extract arrowPosition if none is set", () => {
			const el = document.createElement('div');
			const options = Tooltip.prototype.getOptions(el);

			proclaim.isUndefined(options.arrowPosition);
		});

		it("doesn't extract target if none is set", () => {
			const el = document.createElement('div');
			const options = Tooltip.prototype.getOptions(el);

			proclaim.isUndefined(options.target);
		});

		it("extracts target if it's set on the el passed in", () => {
			const el = document.createElement('div');
			let stubTarget = '#someValue';

			el.setAttribute('data-o-tooltip-target', stubTarget);

			const options = Tooltip.prototype.getOptions(el);
			proclaim.equal(options.target, stubTarget);
		});

		it("extracts arrowPosition if it's set on the el passed in", () => {
			const el = document.createElement('div');
			let stubPosition = 'someValue';
			el.setAttribute('data-o-tooltip-arrow-position', stubPosition);

			const options = Tooltip.prototype.getOptions(el);
			proclaim.equal(options.arrowPosition, stubPosition);
		});
	});

	describe("checkOptions", () => {

		let throwStub;

		beforeEach(() => {
			throwStub = sinon.stub(Tooltip, 'throwError');
		});

		afterEach(() => {
			throwStub.restore();
		});

		it("calls throwError if no target is provided", () => {
			Tooltip.prototype.checkOptions({});
			proclaim.isTrue(throwStub.called);
		});

		it("calls throwError if arrowDirection is not one of `top`, `bottom`, `left`, `right` or falsey", () => {
			Tooltip.prototype.checkOptions({"target": "#el", "arrowPosition": "side"});
			proclaim.isTrue(throwStub.called);
		});

		it("sets opts.arrowPosition to up if no arrow position was specified", ()=>{
			Tooltip.prototype.checkOptions({"target": "#el", "arrowPosition": "side"});
			proclaim.isTrue(throwStub.called);
		});

		it("does not error if arrowPosition is `top`, `bottom`, `left`, `right` or falsey", () => {
			["top", "left", "right", "bottom", undefined].forEach((value) => {
				Tooltip.prototype.checkOptions({"target": "#el", "arrowPosition": value});
				proclaim.isFalse(throwStub.called);
			});
		});

		it("sets arrowPosition to 'top' if none is specified", () => {
			let opts = Tooltip.prototype.checkOptions({"target": "#el"});
			proclaim.strictEqual(opts.arrowPosition, "top");
		});

		it("returns the opts object", () => {
			let opts = Tooltip.prototype.checkOptions({"target": "#el"});
			proclaim.isObject(opts);
		});
	});

	describe("render", () => {

		beforeEach(() => {
		});

		afterEach(() => {
			
		});

		it("adds a class for the arrow direction", () => {

		});
		it("defaults to an up-arrow");
		it("creates a div for the tooltip and adds it to the dom");
		it("gives the tooltip the aria-role `tooltip`");
		it("sets the z-index if a z-index was set in the opts");
		it("adds a close button with an aria label and a role");
	});
});
