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
		let renderStub;
		let showStub;

		beforeEach(() => {
			getOptionsReturnStub = {};
			getOptionsStub = sinon.stub(Tooltip.prototype, 'getOptions').returns(getOptionsReturnStub);
			checkOptsReturnStub = {};
			checkOptionsStub = sinon.stub(Tooltip.prototype, 'checkOptions').returns(checkOptsReturnStub);
			renderStub = sinon.stub(Tooltip.prototype, 'render');
			showStub = sinon.stub(Tooltip.prototype, 'show');

		});

		afterEach(() => {
			getOptionsStub.restore();
			checkOptionsStub.restore();
			renderStub.restore();
			showStub.restore();

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

		let tooltipEl;
		let renderSpy;

		beforeEach(() => {
			fixtures.declarativeCode();
			renderSpy = sinon.spy(Tooltip.prototype, 'render');
			tooltipEl = document.getElementById('tooltip-demo');
		});

		afterEach(() => {
			fixtures.reset();
			renderSpy.restore();
		});

		it("adds a class for the arrow direction", () => {
			const tooltip = Tooltip.init('#tooltip-demo');
			tooltip.render();

			proclaim.isTrue(renderSpy.called);
			proclaim.isTrue(tooltipEl.classList.contains('o-tooltip--arrow-top'));
		});

		it("sets the arrowPosition based on the value in opts.arrowPosition", () => {
			["top", "left", "right", "bottom"].forEach((value)=>{
				const tooltip = Tooltip.init('#tooltip-demo', {"target": "#el", "arrowPosition": value});
				tooltip.render();
				proclaim.isTrue(tooltipEl.classList.contains('o-tooltip--arrow-'+value));
				tooltipEl.classList.remove('o-tooltip--arrow-'+value); // tidy up since we're in a loop
			});
		});

		it("gives the tooltip the role `tooltip`", () => {
			const tooltip = Tooltip.init('#tooltip-demo');
			proclaim.isFalse(tooltipEl.hasAttribute('role'));

			tooltip.render();

			proclaim.isTrue(tooltipEl.hasAttribute('role'));
			proclaim.strictEqual(tooltipEl.getAttribute('role'), 'tooltip');
		});

		it("sets the z-index if a z-index was set in the opts", () => {
			const tooltip = Tooltip.init('#tooltip-demo');
			const fakeZ = "4";
			tooltip.opts.zindex = fakeZ

			tooltip.render();
			proclaim.strictEqual(tooltipEl.style.zIndex, fakeZ);
		});

		it("adds a close button with an aria label, role and title", () => {
			const tooltip = Tooltip.init('#tooltip-demo');
			tooltip.render();
			const buttonEl = tooltipEl.querySelector('.o-tooltip__close');
			proclaim.isDefined(buttonEl);
			proclaim.isTrue(buttonEl.hasAttribute('aria-label'));
			proclaim.isTrue(buttonEl.hasAttribute('title'));
			proclaim.isTrue(buttonEl.hasAttribute('role'));
		});
	});
});
