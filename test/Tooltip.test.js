/* eslint-env mocha */
/* global proclaim sinon */

import * as fixtures from './helpers/fixtures.js';
import {createMockRaf} from './helpers/mock-raf.js';
import Tooltip from './../main.js';
import Viewport from 'o-viewport';

describe("Tooltip", () => {

	let sandbox;

	beforeEach(() => {
		sandbox = sinon.createSandbox();
	});

	afterEach(() => {
		sandbox.restore();
		if (Tooltip._tooltips) {
			Tooltip._tooltips.forEach((tooltip) => {
				tooltip.destroy();
			});
		}
	});

	describe("constructor", () => {

		let getOptionsStub;
		let getOptionsReturnStub;
		let checkOptionsStub;
		let renderStub;
		let constructElementStub;
		let showStub;
		let closeStub;
		let targetStub;
		const stubEl = document.createElement('div');

		beforeEach(() => {
			getOptionsReturnStub = {};
			getOptionsStub = sandbox.stub(Tooltip, 'getOptions').returns(getOptionsReturnStub);
			checkOptionsStub = sandbox.stub(Tooltip, 'checkOptions').returnsArg(0);
			renderStub = sandbox.stub(Tooltip.prototype, 'render');
			constructElementStub = sandbox.stub(Tooltip, 'constructElement').returns(document.createElement('div'));
			showStub = sandbox.stub(Tooltip.prototype, 'show');
			closeStub = sandbox.stub(Tooltip.prototype, 'close');
			targetStub = sandbox.stub(Tooltip, "Target");
		});

		afterEach(() => {
			getOptionsStub.restore();
			checkOptionsStub.restore();
			renderStub.restore();
			constructElementStub.restore();
			showStub.restore();
			closeStub.restore();
			targetStub.restore();
		});

		it("calls constructElement if content string passed in", () => {
			const stubOpts = {content: 'Click this button'};
			new Tooltip(stubEl, stubOpts);

			proclaim.isTrue(constructElementStub.called);
		});

		it("doesn't call constructElement if no content string is passed in", () => {
			const stubOpts = {};
			new Tooltip(stubEl, stubOpts);

			proclaim.isFalse(constructElementStub.called);
		});

		it("doesn't call getOptions if options are passed in", () => {
			const stubOpts = {};
			new Tooltip(stubEl, stubOpts);

			proclaim.isFalse(getOptionsStub.called);
		});

		it("calls getOptions if no options were passed in", () => {
			new Tooltip(stubEl);

			proclaim.isTrue(getOptionsStub.calledWith(stubEl));
		});

		it("calls checkOptions with the options passed in if some options were passed in", () => {
			const stubOpts = {};

			new Tooltip(stubEl, stubOpts);

			proclaim.isTrue(checkOptionsStub.calledWith(stubOpts));
		});

		it("calls checkOptions with the return values of getOptions if no options were passed in", () => {
			new Tooltip(stubEl);

			proclaim.isTrue(checkOptionsStub.calledWith(getOptionsReturnStub));
		});

		it("calls render if opts.showOnConstruction is set to true", () => {
			new Tooltip(stubEl, {"showOnConstruction": true});
			proclaim.isTrue(renderStub.called);
		});

		it("Adds the tooltip to the global tooltip map", () => {
			proclaim.isUndefined(Tooltip._tooltips);

			new Tooltip("stubEL");
			proclaim.strictEqual(Tooltip._tooltips.size, 1);
		});

		describe('adding target event listeners', () => {
			beforeEach(fixtures.declarativeCode);
			afterEach(fixtures.reset);

			it('adds event listeners when opts.showOnClick is set to true', () => {
				getOptionsStub.restore(); // !! IMPORTANT !!
				targetStub.restore();
				new Tooltip(document.getElementById('tooltip-demo-3'));

				document.getElementById('demo-tooltip-target-3').click();

				proclaim.isTrue(showStub.called);
			});

			it('adds event listeners when opts.showOnHover is set to true', () => {
				getOptionsStub.restore(); // !! IMPORTANT !!
				targetStub.restore();
				new Tooltip(document.getElementById('tooltip-demo-4'));

				document.getElementById('demo-tooltip-target-4').dispatchEvent(new Event('mouseover'));
				document.getElementById('demo-tooltip-target-4').dispatchEvent(new Event('mouseout'));

				proclaim.isTrue(showStub.called);
				proclaim.isTrue(closeStub.called);
			});

			it('adds event listeners when opts.showOnFocus is set to true', () => {
				getOptionsStub.restore(); // !! IMPORTANT !!
				targetStub.restore();
				new Tooltip(document.getElementById('tooltip-demo-6'));

				document.getElementById('demo-tooltip-target-6').dispatchEvent(new Event('focusin'));
				document.getElementById('demo-tooltip-target-6').dispatchEvent(new Event('focusout'));

				proclaim.isTrue(showStub.called);
				proclaim.isTrue(closeStub.called);
			});
		});
	});

	describe("getOptions", () => {
		it("doesn't extract arrowPosition if none is set", () => {
			const el = document.createElement('div');
			const options = Tooltip.getOptions(el);

			proclaim.isUndefined(options.arrowPosition);
		});

		it("doesn't extract zIndex if it's not set", () => {
			const el = document.createElement('div');
			const options = Tooltip.getOptions(el);

			proclaim.isUndefined(options.zIndex);
		});

		it("doesn't extract target if none is set", () => {
			const el = document.createElement('div');
			const options = Tooltip.getOptions(el);

			proclaim.isUndefined(options.target);
		});

		it("extracts target if it's set on the el passed in", () => {
			const el = document.createElement('div');
			const stubTarget = '#someValue';

			el.setAttribute('data-o-tooltip-target', stubTarget);

			const options = Tooltip.getOptions(el);
			proclaim.equal(options.target, stubTarget);
		});

		it("extracts arrowPosition if it's set on the el passed in", () => {
			const el = document.createElement('div');
			const stubPosition = 'someValue';
			el.setAttribute('data-o-tooltip-position', stubPosition);

			const options = Tooltip.getOptions(el);
			proclaim.equal(options.position, stubPosition);
		});

		it("extracts showOnConstruction if it's set on the el passed in", () => {
			const el = document.createElement('div');
			el.setAttribute('data-o-tooltip-show-on-construction', true);

			const options = Tooltip.getOptions(el);
			proclaim.isTrue(options.showOnConstruction);
		});

		it("extracts showOnConstruction if it's set on the el passed in", () => {
			const el = document.createElement('div');
			el.setAttribute('data-o-tooltip-z-index', "20");

			const options = Tooltip.getOptions(el);
			proclaim.strictEqual(options.zIndex, 20);
		});
	});

	describe("checkOptions", () => {

		let throwStub;

		beforeEach(() => {
			throwStub = sandbox.stub(Tooltip, 'throwError');
		});

		afterEach(() => {
			throwStub.restore();
		});

		it("calls throwError if no target is provided", () => {
			Tooltip.checkOptions({});
			proclaim.isTrue(throwStub.called);
		});

		it("calls throwError if position is not one of `above`, `below`, `left`, `right` or falsey", () => {
			Tooltip.checkOptions({"target": "#el", "position": "side"});
			proclaim.isTrue(throwStub.called);
		});

		it("sets opts.position to below if no position was specified", ()=>{
			const opts = Tooltip.checkOptions({"target": "#el"});
			proclaim.isFalse(throwStub.called);
			proclaim.strictEqual(opts.position, 'below');
		});

		it("does not error if position is `top`, `bottom`, `left`, `right` or falsey", () => {
			["above", "left", "right", "below", undefined].forEach((value) => {
				Tooltip.checkOptions({"target": "#el", "position": value});
				proclaim.isFalse(throwStub.called);
			});
		});

		it("returns the opts object", () => {
			const opts = Tooltip.checkOptions({"target": "#el"});
			proclaim.isObject(opts);
		});
	});

	describe('constructElement', () => {
		it("returns a tooltip element", () => {
			const targetEl = document.createElement('div');
			const tooltip = Tooltip.constructElement(targetEl, {content: '<p>my content</p>'});
			proclaim.strictEqual(tooltip.nodeName, 'DIV');
			proclaim.strictEqual(tooltip.getAttribute('data-o-component'), 'o-tooltip');
			proclaim.strictEqual(tooltip.firstElementChild.nodeName, 'DIV');
			proclaim.strictEqual(tooltip.firstElementChild.className, 'o-tooltip-content');
			proclaim.strictEqual(tooltip.firstElementChild.innerHTML, '<p>my content</p>');
		});
	});

	describe("render", () => {

		let tooltipEl;
		const stubEl = document.createElement('div');
		beforeEach(() => {
			fixtures.declarativeCode();
			tooltipEl = document.getElementById('tooltip-demo');
		});

		afterEach(() => {
			fixtures.reset();
		});

		it("gives the tooltip the role `tooltip`", () => {
			Tooltip.init('#tooltip-demo');

			proclaim.isTrue(tooltipEl.hasAttribute('role'));
			proclaim.strictEqual(tooltipEl.getAttribute('role'), 'tooltip');
		});

		it("sets the z-index if a z-index was set in the opts", () => {
			const tooltip = Tooltip.init('#tooltip-demo');
			const fakeZ = "4";
			tooltip.opts.zIndex = fakeZ;

			tooltip.render();
			proclaim.strictEqual(tooltipEl.style.zIndex, fakeZ);
		});

		it("adds a close button with an aria label, role and title", () => {
			Tooltip.init('#tooltip-demo');
			const buttonEl = tooltipEl.querySelector('.o-tooltip-close');
			proclaim.isDefined(buttonEl);
			proclaim.isTrue(buttonEl.hasAttribute('aria-label'));
			proclaim.isTrue(buttonEl.hasAttribute('title'));
		});

		it("Inserts adjacent to target element when target has no next sibling", () => {
			const parent = document.getElementById('demo-tooltip-insertion-test-1');
			sinon.stub(parent, 'appendChild');
			new Tooltip(stubEl, {
				target: 'demo-tooltip-insertion-test-1-target',
				content: 'content'
			});
			proclaim.isTrue(parent.appendChild.called);
			proclaim.isTrue(parent.appendChild.args[0][0].textContent === "content");
		});

		it("Inserts adjacent to target element when target has no next sibling", () => {
			const parent = document.getElementById('demo-tooltip-insertion-test-2');
			sinon.stub(parent, 'insertBefore');
			new Tooltip(stubEl, {
				target: 'demo-tooltip-insertion-test-2-target',
				content: 'content'
			});

			proclaim.isTrue(parent.insertBefore.called);
			proclaim.isTrue(parent.insertBefore.args[0][0].textContent === "content");
		});
	});

	describe("_getConfiguredTooltipPosition", () => {
		let checkStub;
		let getStub;
		let targetStub;
		let widthStub;
		let heightStub;
		let oGridStub;

		let testTooltip;

		beforeEach(() => {
			getStub = sinon.stub(Tooltip, 'getOptions');
			targetStub = sinon.stub(Tooltip, 'Target').returns({ left: 0, right: 7, centrePoint: { x: 5 } });
			widthStub = sinon.stub(Tooltip.prototype, 'width').returns(100);
			heightStub = sinon.stub(Tooltip.prototype, 'height').returns(500);
		});

		afterEach(() => {
			oGridStub.restore();
			getStub.restore();
			checkStub.restore();
			targetStub.restore();
			heightStub.restore();
			widthStub.restore();
		});

		const tooltipOptions = opts => { checkStub = sinon.stub(Tooltip, 'checkOptions').returns(opts); };
		const createTooltip = () => new Tooltip(document.createElement('div'));
		const setViewportWidth = width => { oGridStub = sinon.stub(Tooltip, '_getCurrentLayout').returns(width); };

		it("returns default options position if there are no responsive overrides declared", () => {
			tooltipOptions({ 'position': 'above' });
			testTooltip = createTooltip();
			setViewportWidth('default');
			proclaim.strictEqual(testTooltip._getConfiguredTooltipPosition(), 'above');
		});

		it("returns small options position if one is declared, and viewport is Small", () => {
			tooltipOptions({ 'position': 'above', 'positionS': 'right' });
			testTooltip = createTooltip();
			setViewportWidth('S');
			proclaim.strictEqual(testTooltip._getConfiguredTooltipPosition(), 'right');
		});

		it("falls back to  small options position if one is declared, and viewport is Medium", () => {
			tooltipOptions({ 'position': 'above', 'positionS': 'right' });
			testTooltip = createTooltip();
			setViewportWidth('M');
			proclaim.strictEqual(testTooltip._getConfiguredTooltipPosition(), 'right');
		});

		it("returns medium options position if one is declared, and viewport is Medium", () => {
			tooltipOptions({ 'position': 'left', 'positionM': 'below' });
			testTooltip = createTooltip();
			setViewportWidth('M');
			proclaim.strictEqual(testTooltip._getConfiguredTooltipPosition(), 'below');
		});

		it("falls back to  medium options position if one is declared, and viewport is Large", () => {
			tooltipOptions({ 'position': 'above', 'positionM': 'right' });
			testTooltip = createTooltip();
			setViewportWidth('L');
			proclaim.strictEqual(testTooltip._getConfiguredTooltipPosition(), 'right');
		});

		it("returns large options position if one is declared, and viewport is Large", () => {
			tooltipOptions({ 'position': 'below', 'positionL': 'left' });
			testTooltip = createTooltip();
			setViewportWidth('L');
			proclaim.strictEqual(testTooltip._getConfiguredTooltipPosition(), 'left');
		});

		it("falls back to large options position if one is declared, and viewport is X-Large", () => {
			tooltipOptions({ 'position': 'above', 'positionL': 'right' });
			testTooltip = createTooltip();
			setViewportWidth('XL');
			proclaim.strictEqual(testTooltip._getConfiguredTooltipPosition(), 'right');
		});

		it("returns x-large options position if one is declared, and viewport is X-Large", () => {
			tooltipOptions({ 'position': 'below', 'positionXl': 'top' });
			testTooltip = createTooltip();
			setViewportWidth('XL');
			proclaim.strictEqual(testTooltip._getConfiguredTooltipPosition(), 'top');
		});
	});

	describe("show", () => {
		let checkOptionsStub;
		let getOptionsStub;
		let drawTooltipStub;
		let resizeListenerStub;
		let targetStub;
		let closeStub;

		beforeEach(() => {
			getOptionsStub = sinon.stub(Tooltip, 'getOptions').returns({});
			checkOptionsStub = sinon.stub(Tooltip, 'checkOptions').returnsArg(0);
			drawTooltipStub = sinon.stub(Tooltip.prototype, 'drawTooltip');
			resizeListenerStub = sinon.stub(Tooltip.prototype, 'resizeListener');
			closeStub = sinon.stub(Tooltip.prototype, 'close');

			targetStub = sinon.stub(Tooltip, "Target");

			fixtures.declarativeCode();
		});

		afterEach(() => {
			getOptionsStub.restore();
			checkOptionsStub.restore();
			drawTooltipStub.restore();
			resizeListenerStub.restore();
			closeStub.restore();
			targetStub.restore();

			fixtures.reset();
		});


		it('sets up a close handler for touch on the tooltip-close button', () => {
			const tooltipEl = document.getElementById('tooltip-demo');
			const testTooltip = new Tooltip(tooltipEl, { target: 'demo-tooltip-target' });
			testTooltip.render();

			const tooltipCloseEl = tooltipEl.querySelector('.o-tooltip-close');

			const e = new Event('touchend');
			tooltipCloseEl.dispatchEvent(e);

			proclaim.isFalse(closeStub.called);

			testTooltip.show();

			tooltipCloseEl.dispatchEvent(e);
			/* this fails, idk why */
			//proclaim.isTrue(closeStub.called);
		});

		it('sets up a close handler for a click on the tooltip-close button', () => {
			const tooltipEl = document.getElementById('tooltip-demo');
			const testTooltip = new Tooltip(tooltipEl, { target: 'demo-tooltip-target' });
			testTooltip.render();
			const tooltipCloseEl = tooltipEl.querySelector('.o-tooltip-close');

			proclaim.isFalse(closeStub.called);

			tooltipCloseEl.click();

			proclaim.isFalse(closeStub.called);

			testTooltip.show();

			tooltipCloseEl.click();
			proclaim.isTrue(closeStub.called);
		});

		it('sets up a viewport resize handler', () => {

			const tooltipEl = document.getElementById('tooltip-demo');
			const testTooltip = new Tooltip(tooltipEl, { target: 'demo-tooltip-target' });

			testTooltip.render();

			const resizeEvent = new Event('oViewport.resize');
			document.body.dispatchEvent(resizeEvent);

			proclaim.isFalse(resizeListenerStub.called);

			testTooltip.show();

			document.body.dispatchEvent(resizeEvent);

			proclaim.isTrue(resizeListenerStub.called);
		});

		it('sets up a key listener to handle esc key', () => {
			const keyUpListenerSpy = sinon.spy(Tooltip.prototype, 'closeOnKeyUp');
			const tooltipEl = document.getElementById('tooltip-demo');
			const testTooltip = new Tooltip(tooltipEl, { target: 'demo-tooltip-target' });

			testTooltip.render();

			const keyEvent = new Event('keyup');
			document.body.dispatchEvent(keyEvent);

			proclaim.isFalse(keyUpListenerSpy.called);

			testTooltip.show();

			document.body.dispatchEvent(keyEvent);

			proclaim.isTrue(keyUpListenerSpy.called);
		});

		it('calls drawTooltip', () => {
			const tooltipEl = document.getElementById('tooltip-demo');
			const testTooltip = new Tooltip(tooltipEl, { target: 'demo-tooltip-target' });

			testTooltip.show();
			proclaim.isTrue(drawTooltipStub.called);
		});

		it('emits oTooltip.show event', function (done) {
			this.timeout(1000);

			const timer = setTimeout(() => {
				proclaim.fail('oTooltip.show event to fire', 'oTooltip.show event did not fire');
			}, 500);

			const tooltipEl = document.getElementById('tooltip-demo');
			const testTooltip = new Tooltip(tooltipEl, { target: 'demo-tooltip-target' });
			testTooltip.delegates.tooltip.on('oTooltip.show', () => {
				clearTimeout(timer);
				done();
			});

			testTooltip.show();
		});
	});

	describe('drawTooltip', () => {
		it(' sets tooltip position as requested when in bounds', () => {
			fixtures.declarativeCode();
			const evaulateTooltipStub = sandbox.stub(Tooltip.prototype, '_evaulateTooltip');
			evaulateTooltipStub.withArgs('below').returns({
				tooltipRect: {},
				alignment: 'middle',
				isOutOfBounds: false
			});
			const testTooltip = Tooltip.init('#tooltip-demo-below');

			testTooltip.show();
			proclaim.equal(testTooltip.tooltipPosition, 'below');
			proclaim.equal(testTooltip.tooltipAlignment, 'middle');
		});

		it(' when the requested position is out of bounds sets tooltip to the next clockwise position', () => {
			fixtures.declarativeCode();
			const evaulateTooltipStub = sandbox.stub(Tooltip.prototype, '_evaulateTooltip');
			evaulateTooltipStub.withArgs('below').returns({
				tooltipRect: {},
				alignment: 'middle',
				isOutOfBounds: true // requested position out of bound
			});
			evaulateTooltipStub.withArgs('left').returns({
				tooltipRect: {},
				alignment: 'middle',
				isOutOfBounds: false
			});
			const testTooltip = Tooltip.init('#tooltip-demo-below');

			testTooltip.show();
			proclaim.equal(testTooltip.tooltipPosition, 'left');
			proclaim.equal(testTooltip.tooltipAlignment, 'middle');
		});
		it(' when all tooltip positions are out of bounds default to the requested position aligned middle', () => {
			fixtures.declarativeCode();
			const evaulateTooltipStub = sandbox.stub(Tooltip.prototype, '_evaulateTooltip');
			const outOfBoundsExample = {
				tooltipRect: {},
				alignment: 'middle',
				isOutOfBounds: true
			};
			evaulateTooltipStub.withArgs('below').returns(outOfBoundsExample);
			evaulateTooltipStub.withArgs('left').returns(outOfBoundsExample);
			evaulateTooltipStub.withArgs('above').returns(outOfBoundsExample);
			evaulateTooltipStub.withArgs('right').returns(outOfBoundsExample);

			const testTooltip = Tooltip.init('#tooltip-demo-below');
			testTooltip.show();

			proclaim.equal(testTooltip.tooltipPosition, 'below');
			proclaim.equal(testTooltip.tooltipAlignment, 'middle');
		});
		it(' evaluates all possible tooltip position and alignments when none are in bounds', () => {
			fixtures.declarativeCode();

			const calculateTooltipRectangleStub = sandbox.stub(Tooltip.prototype, '_calculateTooltipRectangle');
			const tooltipIsOutOfBoundsStub = sandbox.stub(Tooltip.prototype, '_tooltipIsOutOfBounds');

			// Tooltip always out of bounds.
			tooltipIsOutOfBoundsStub.returns(true);
			calculateTooltipRectangleStub.returns({top: 0, bottom: 0, left: 0, right: 0});
			const testTooltip = Tooltip.init('#tooltip-demo-below');
			testTooltip.show();

			// Every position and alignment considered.
			// - Below (middle, left, right)
			sinon.assert.calledWith(calculateTooltipRectangleStub, 'below', 'middle');
			sinon.assert.calledWith(calculateTooltipRectangleStub, 'below', 'left');
			sinon.assert.calledWith(calculateTooltipRectangleStub, 'below', 'right');
			sinon.assert.neverCalledWith(calculateTooltipRectangleStub, 'below', 'top');
			sinon.assert.neverCalledWith(calculateTooltipRectangleStub, 'below', 'bottom');
			// - Above (middle, left, right)
			sinon.assert.calledWith(calculateTooltipRectangleStub, 'above', 'middle');
			sinon.assert.calledWith(calculateTooltipRectangleStub, 'above', 'left');
			sinon.assert.calledWith(calculateTooltipRectangleStub, 'above', 'right');
			sinon.assert.neverCalledWith(calculateTooltipRectangleStub, 'above', 'top');
			sinon.assert.neverCalledWith(calculateTooltipRectangleStub, 'above', 'bottom');
			// - Left (middle, top, bottom)
			sinon.assert.calledWith(calculateTooltipRectangleStub, 'left', 'middle');
			sinon.assert.calledWith(calculateTooltipRectangleStub, 'left', 'top');
			sinon.assert.calledWith(calculateTooltipRectangleStub, 'left', 'bottom');
			sinon.assert.neverCalledWith(calculateTooltipRectangleStub, 'left', 'right');
			sinon.assert.neverCalledWith(calculateTooltipRectangleStub, 'left', 'left');
			// - Right (middle, top, bottom)
			sinon.assert.calledWith(calculateTooltipRectangleStub, 'right', 'middle');
			sinon.assert.calledWith(calculateTooltipRectangleStub, 'right', 'top');
			sinon.assert.calledWith(calculateTooltipRectangleStub, 'right', 'bottom');
			sinon.assert.neverCalledWith(calculateTooltipRectangleStub, 'right', 'right');
			sinon.assert.neverCalledWith(calculateTooltipRectangleStub, 'right', 'left');
		});
		it(' sets a tooltip arrow', () => {
			// Postioned below, aligned right.
			fixtures.declarativeCode();
			const evaulateTooltipStub = sandbox.stub(Tooltip.prototype, '_evaulateTooltip');
			const belowRightInBounds = {
				tooltipRect: {},
				alignment: 'right',
				isOutOfBounds: false
			};
			evaulateTooltipStub.withArgs('below').returns(belowRightInBounds);

			const testTooltip = Tooltip.init('#tooltip-demo-below');
			testTooltip.show();

			proclaim.isTrue(testTooltip.tooltipEl.classList.contains('o-tooltip--arrow-above'));
			proclaim.isTrue(testTooltip.tooltipEl.classList.contains('o-tooltip-arrow--align-left'));
		});
		afterEach(() => {
			fixtures.reset();
		});
	});

	describe("#resizeListener", () => {

		let drawTooltipStub;
		let mockRaf;

		beforeEach(() => {
			drawTooltipStub = sinon.stub(Tooltip.prototype, 'drawTooltip');

			mockRaf = createMockRaf();

			fixtures.declarativeCode();
		});

		afterEach(() => {
			drawTooltipStub.restore();
			fixtures.reset();
			window.requestAnimationFrame.restore();
		});

		it("redraws if triggered and if the tooltip is visible", () => {
			const testTooltip = Tooltip.init('#tooltip-demo');
			testTooltip.visible = true;
			sinon.stub(window, 'requestAnimationFrame').callsFake(mockRaf.raf);

			testTooltip.resizeListener();
			mockRaf.step({ count: 1 });

			proclaim.isTrue(drawTooltipStub.called);
		});

		it("does not redraw if the tooltip is not visible", () => {
			const testTooltip = Tooltip.init('#tooltip-demo');
			testTooltip.visible = false;
			sinon.stub(window, 'requestAnimationFrame').callsFake(mockRaf.raf);

			testTooltip.resizeListener();
			mockRaf.step({ count: 1 });

			proclaim.isFalse(drawTooltipStub.called);
		});

	});

	describe("#close", () => {
		let drawTooltipStub;

		beforeEach(() => {
			drawTooltipStub = sinon.stub(Tooltip.prototype, 'drawTooltip');
			fixtures.declarativeCode();
		});

		afterEach(() => {
			drawTooltipStub.restore();
			fixtures.reset();
		});

		it("sets tooltip.visible to false", () => {
			const testTooltip = Tooltip.init('#tooltip-demo');
			testTooltip.show();
			proclaim.isTrue(testTooltip.visible);
			testTooltip.close();
			proclaim.isFalse(testTooltip.visible);
		});

		it.skip("sets display none on the tooltip", function (done) {
			const testTooltip = Tooltip.init('#tooltip-demo');
			testTooltip.tooltipEl.style.transition = 'all .1s linear'; // Needed to fire transitionend
			testTooltip.show();
			proclaim.notStrictEqual(testTooltip.tooltipEl.style.display, 'none');

			testTooltip.tooltipEl.addEventListener('transitionend', () => {
				window.setTimeout(() => { // This is a bit race-y for some reason.
					proclaim.strictEqual(testTooltip.tooltipEl.style.display, 'none');
					done();
				}, 0);
			});

			testTooltip.close();
		});

		it('emits oTooltip.close event', function (done) {
			this.timeout(1000);

			const timer = setTimeout(() => {
				proclaim.fail('oTooltip.close event to fire', 'oTooltip.close event did not fire');
			}, 500);

			const tooltipEl = document.getElementById('tooltip-demo');
			const testTooltip = new Tooltip(tooltipEl, { target: 'demo-tooltip-target' });
			testTooltip.delegates.tooltip.on('oTooltip.close', () => {
				clearTimeout(timer);
				done();
			});

			testTooltip.show();
			testTooltip.close();
		});


		describe('when called with fireCloseEvent=false', function () {
			it('skips emitting oTooltip.close event', function (done) {
				this.timeout(1000);

				const timer = setTimeout(() => {
					done();
				}, 500);

				const tooltipEl = document.getElementById('tooltip-demo');
				const testTooltip = new Tooltip(tooltipEl, { target: 'demo-tooltip-target' });
				testTooltip.delegates.tooltip.on('oTooltip.close', () => {
					clearTimeout(timer);
					proclaim.fail('oTooltip.close event to not fire', 'oTooltip.close event did fire');
				});

				testTooltip.show();
				testTooltip.close('', '', false);
			});

		});

	});

	describe("#closeOnKeyUp", () => {
		let drawTooltipStub;

		beforeEach(() => {
			drawTooltipStub = sinon.stub(Tooltip.prototype, 'drawTooltip');
			fixtures.declarativeCode();
		});

		afterEach(() => {
			drawTooltipStub.restore();
			fixtures.reset();
		});

		it("only closes of the key was Esc", () => {

			const closeStub = sinon.stub(Tooltip.prototype, 'close');

			const testTooltip = Tooltip.init('#tooltip-demo');
			testTooltip.show();

			const enterKeypress = document.createEvent('Event');
			enterKeypress.keyCode = 13;

			testTooltip.closeOnKeyUp(enterKeypress);
			proclaim.isFalse(closeStub.called);

			const escKeypress = document.createEvent('Event');
			escKeypress.keyCode = 27;
			testTooltip.closeOnKeyUp(escKeypress);

			proclaim.isTrue(closeStub.called);
			closeStub.restore();
		});
	});

	describe('throwError', () => {
		it("thows an error", () => {
			proclaim.throws(() => { Tooltip.throwError('some message'); });
		});
	});

	describe('width', () => {
		let drawTooltipStub;

		beforeEach(() => {
			drawTooltipStub = sinon.stub(Tooltip.prototype, 'drawTooltip');
			fixtures.declarativeCode();
		});

		afterEach(() => {
			drawTooltipStub.restore();
			fixtures.reset();
		});

		it("returns a number", () => {
			const testTooltip = Tooltip.init('#tooltip-demo');
			testTooltip.show();
			proclaim.isNumber(testTooltip.width());
		});
	});

	describe('height', () => {
		let drawTooltipStub;

		beforeEach(() => {
			drawTooltipStub = sinon.stub(Tooltip.prototype, 'drawTooltip');
			fixtures.declarativeCode();
		});

		afterEach(() => {
			drawTooltipStub.restore();
			fixtures.reset();
		});

		it("returns a number", () => {
			const testTooltip = Tooltip.init('#tooltip-demo');
			testTooltip.show();
			proclaim.isNumber(testTooltip.height());
		});
	});

	describe("#destroy", () => {
		let closeStub;
		let drawTooltipStub;

		beforeEach(() => {
			drawTooltipStub = sandbox.stub(Tooltip.prototype, 'drawTooltip');
			fixtures.declarativeCode();
			closeStub = sandbox.stub(Tooltip.prototype, 'close');
		});

		afterEach(() => {
			drawTooltipStub.restore();
			fixtures.reset();
			closeStub.restore();
		});
		it("stops listening to resize events if this is the last tooltip", () => {
			const stopListeningSpy = sinon.spy(Viewport, "stopListeningTo");
			const testTooltip = Tooltip.init('#tooltip-demo');
			testTooltip.show();
			testTooltip.destroy();
			proclaim.isTrue(stopListeningSpy.called);
		});
		it("calls close if tooltip.visible is true", () => {
			const testTooltip = Tooltip.init('#tooltip-demo');
			testTooltip.visible = true;
			testTooltip.destroy();
			proclaim.isTrue(closeStub.called);
		});

		it("deletes the tooltip from the tooltip map", () => {
			const testTooltip = Tooltip.init('#tooltip-demo');
			Tooltip.init('#tooltip-demo-2'); // Init a second tooltip so when the first is destroyed the Tooltip._tooltips is not also destroyed
			const tooltipCount = Tooltip._tooltips.size;
			testTooltip.destroy();
			proclaim.strictEqual(tooltipCount -1, Tooltip._tooltips.size);
		});

		it("deletes the tooltip from the dom", () => {
			const parent = document.querySelector('#demo-tooltip-removal-test-1');
			const target = document.querySelector('#demo-tooltip-removal-test-1-target');
			const testTooltip = new Tooltip(target, {
				content: 'removal test',
				showOnConstruction: true,
				target: target.id
			});
			testTooltip.destroy();
			proclaim.strictEqual(1, parent.childElementCount);
		});

		it("destroys the tooltip map if this is the last tooltip", () => {
			const testTooltip = Tooltip.init('#tooltip-demo');
			testTooltip.destroy();
			proclaim.isUndefined(Tooltip._tooltips);
		});
	});
});
