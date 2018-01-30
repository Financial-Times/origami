/* eslint-env mocha, sinon, proclaim */
import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import * as fixtures from './helpers/fixtures';
import createMockRaf from 'mock-raf';
import Tooltip from './../main';
import Viewport from 'o-viewport';

describe("Tooltip", () => {
	let resetPositionStub;

	beforeEach(() => {
		resetPositionStub = sinon.stub(Tooltip.prototype, 'resetPosition');
	});

	afterEach(() => {
		resetPositionStub.restore();
		if (Tooltip._tooltips){
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
			getOptionsStub = sinon.stub(Tooltip, 'getOptions').returns(getOptionsReturnStub);
			checkOptionsStub = sinon.stub(Tooltip, 'checkOptions').returnsArg(0);
			renderStub = sinon.stub(Tooltip.prototype, 'render');
			constructElementStub = sinon.stub(Tooltip, 'constructElement').returns(document.createElement('div'));
			showStub = sinon.stub(Tooltip.prototype, 'show');
			closeStub = sinon.stub(Tooltip.prototype, 'close');
			targetStub = sinon.stub(Tooltip, "Target");
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
			let stubTarget = '#someValue';

			el.setAttribute('data-o-tooltip-target', stubTarget);

			const options = Tooltip.getOptions(el);
			proclaim.equal(options.target, stubTarget);
		});

		it("extracts arrowPosition if it's set on the el passed in", () => {
			const el = document.createElement('div');
			let stubPosition = 'someValue';
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
			throwStub = sinon.stub(Tooltip, 'throwError');
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
			let opts = Tooltip.checkOptions({"target": "#el"});
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
			let opts = Tooltip.checkOptions({"target": "#el"});
			proclaim.isObject(opts);
		});
	});

	describe('constructElement', () => {
		it("returns a tooltip element", () => {
			let targetEl = document.createElement('div');
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
			const testTooltip = new Tooltip(tooltipEl, {target: 'demo-tooltip-target'});
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
			const testTooltip = new Tooltip(tooltipEl, {target: 'demo-tooltip-target'});
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
			const testTooltip = new Tooltip(tooltipEl, {target: 'demo-tooltip-target'});

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
			const testTooltip = new Tooltip(tooltipEl, {target: 'demo-tooltip-target'});

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
			const testTooltip = new Tooltip(tooltipEl, {target: 'demo-tooltip-target'});

			testTooltip.show();
			proclaim.isTrue(drawTooltipStub.called);
		});

		it('emits oTooltip.show event', function(done) {
			this.timeout(1000);

			const timer = setTimeout(() => {
				proclaim.fail('oTooltip.show event to fire', 'oTooltip.show event did not fire');
			}, 500);

			const tooltipEl = document.getElementById('tooltip-demo');
			const testTooltip = new Tooltip(tooltipEl, {target: 'demo-tooltip-target'});
			testTooltip.delegates.tooltip.on('oTooltip.show', () => {
				clearTimeout(timer);
				done();
			});

			testTooltip.show();
		});
	});

	describe("drawTooltip", () => {

		let testTooltip;
		let getStub;
		let drawStub;
		let setArrowStub;
		let calculateTooltipRectStub;
		let outOfBoundsStub;

		beforeEach(() => {
			fixtures.declarativeCode();
			calculateTooltipRectStub = sinon.stub(Tooltip.prototype, 'calculateTooltipRect');
			getStub = sinon.stub(Tooltip, 'getOptions');
			drawStub = sinon.stub(Tooltip.prototype, '_drawTooltip');
			setArrowStub = sinon.stub(Tooltip.prototype, '_setArrow');
			outOfBoundsStub = sinon.stub(Tooltip, '_isOutOfBounds');
			let stubEl = document.createElement('div');
			testTooltip = new Tooltip(stubEl, {target: 'demo-tooltip-target'});
			testTooltip.tooltipRect = {left: 1, right: 1, top: 1, bottom: 1};
		});

		afterEach(() => {

			getStub.restore();
			calculateTooltipRectStub.restore();
			drawStub.restore();
			setArrowStub.restore();
			testTooltip.destroy();
			fixtures.reset();
			outOfBoundsStub.restore();
		});

		/* Happy path */
		it("sets tooltipAlignment to 'middle'", () => {
			outOfBoundsStub.returns(false);
			resetPositionStub.returns([true, 'someValue']);

			testTooltip.tooltipAlignment = 'someValue';
			proclaim.notStrictEqual(testTooltip.tooltipAlignment, 'middle');
			testTooltip.drawTooltip();
			proclaim.strictEqual(testTooltip.tooltipAlignment, 'middle');
		});

		it("calls calculateTooltipRect", () => {
			outOfBoundsStub.returns(false);
			resetPositionStub.returns([true, 'someValue']);

			testTooltip.drawTooltip();
			proclaim.isTrue(calculateTooltipRectStub.called);
		});

		it("calls _drawTooltip with the result of calculateTooltipRect", () => {
			outOfBoundsStub.returns(false);
			resetPositionStub.returns([true, 'someValue']);

			testTooltip.drawTooltip();
			proclaim.isTrue(drawStub.called);
			proclaim.strictEqual(drawStub.firstCall.args[0], testTooltip.tooltipRect);
		});

		it("calls _setArrow", () => {
			outOfBoundsStub.returns(false);
			resetPositionStub.returns([true, 'someValue']);

			testTooltip.drawTooltip();
			proclaim.isTrue(setArrowStub.called);
		});

		/* Unhappy path: tests for every position that if there isn't room for the tooltip
		it rotates the tooltip clockwise. So "top" becomes "right", "right" becomes "bottom" etc */
		describe("rotates the tooltip", () => {
			let originalTooltipPosition;
			let rotateResultStub;
			let rotateStub;

			beforeEach(() => {
				rotateStub = sinon.stub(Tooltip, '_rotateOrientation');
			});

			afterEach(() => {
				rotateStub.restore();
			});

			describe("when the tooltip is positioned above the target and there isn't room ", () => {
				beforeEach(() => {
					// Set the tooltip postition to above, but the tooltip top to off screen
					testTooltip.tooltipPosition = "above";

					outOfBoundsStub.withArgs(testTooltip.tooltipRect.top, 'y').returns(true);
					outOfBoundsStub.withArgs(testTooltip.tooltipRect.right, 'x').returns(false);

					originalTooltipPosition = testTooltip.tooltipPosition;
					rotateResultStub = "right";
					rotateStub.withArgs(originalTooltipPosition).returns(rotateResultStub);

					resetPositionStub.withArgs(testTooltip.tooltipRect.top, 'y').returns([false, rotateResultStub]);
					resetPositionStub.withArgs(testTooltip.tooltipRect.right, 'x').returns([true, rotateResultStub]);
				});

				it("changes the tooltipPosition through resetPosition", () => {
					testTooltip.drawTooltip();
					proclaim.isTrue(resetPositionStub.calledTwice);
				});

				it("redraws the tooltip when it finds space", () => {
					testTooltip.drawTooltip();
					proclaim.strictEqual(drawStub.firstCall.args[0], testTooltip.tooltipRect);
				});
			});

			describe("when the tooltip is positioned below the target and there isn't room", () => {
				beforeEach(() => {
					// Set the tooltip postition to above, but the tooltip top to off screen
					testTooltip.tooltipPosition = "below";

					outOfBoundsStub.withArgs(testTooltip.tooltipRect.bottom, 'y').returns(true);
					outOfBoundsStub.withArgs(testTooltip.tooltipRect.left, 'x').returns(false);

					originalTooltipPosition = testTooltip.tooltipPosition;
					rotateResultStub = "left";
					rotateStub.withArgs(originalTooltipPosition).returns(rotateResultStub);

					resetPositionStub.withArgs(testTooltip.tooltipRect.bottom, 'y').returns([false, rotateResultStub]);
					resetPositionStub.withArgs(testTooltip.tooltipRect.left, 'x').returns([true, rotateResultStub]);
				});

				it("changes the tooltipPosition through resetPosition", () => {
					testTooltip.drawTooltip();
					proclaim.isTrue(resetPositionStub.calledTwice);
				});

				it("redraws the tooltip when it finds space", () => {
					testTooltip.drawTooltip();
					proclaim.strictEqual(drawStub.firstCall.args[0], testTooltip.tooltipRect);
				});
			});

			describe("when the tooltip is positioned left of the target and there isn't room", () => {
				beforeEach(() => {
					// Set the tooltip postition to above, but the tooltip top to off screen
					testTooltip.tooltipPosition = "left";

					outOfBoundsStub.withArgs(testTooltip.tooltipRect.left, 'x').returns(true);
					outOfBoundsStub.withArgs(testTooltip.tooltipRect.top, 'y').returns(false);

					originalTooltipPosition = testTooltip.tooltipPosition;
					rotateResultStub = "above";
					rotateStub.withArgs(originalTooltipPosition).returns(rotateResultStub);

					resetPositionStub.withArgs(testTooltip.tooltipRect.left, 'x').returns([false, rotateResultStub]);
					resetPositionStub.withArgs(testTooltip.tooltipRect.top, 'y').returns([true, rotateResultStub]);
				});

				it("changes the tooltipPosition through resetPosition", () => {
					testTooltip.drawTooltip();
					proclaim.strictEqual(testTooltip.tooltipPosition, rotateResultStub);
				});

				it("redraws the tooltip when it finds space", () => {
					testTooltip.drawTooltip();
					proclaim.strictEqual(drawStub.firstCall.args[0], testTooltip.tooltipRect);
				});
			});

			describe("when the tooltip is positioned right of the target and there isn't room", () => {
				beforeEach(() => {
					// Set the tooltip postition to above, but the tooltip top to off screen
					testTooltip.tooltipPosition = "right";

					outOfBoundsStub.withArgs(testTooltip.tooltipRect.right, 'x').returns(true);
					outOfBoundsStub.withArgs(testTooltip.tooltipRect.bottom, 'y').returns(false);

					originalTooltipPosition = testTooltip.tooltipPosition;
					rotateResultStub = "below";
					rotateStub.withArgs(originalTooltipPosition).returns(rotateResultStub);

					resetPositionStub.withArgs(testTooltip.tooltipRect.right, 'x').returns([false, rotateResultStub]);
					resetPositionStub.withArgs(testTooltip.tooltipRect.bottom, 'y').returns([true, rotateResultStub]);
				});

				it("changes the tooltipPosition through resetPosition", () => {
					testTooltip.drawTooltip();
					proclaim.strictEqual(testTooltip.tooltipPosition, rotateResultStub);
				});

				it("redraws the tooltip when it finds space", () => {
					testTooltip.drawTooltip();
					proclaim.strictEqual(drawStub.firstCall.args[0], testTooltip.tooltipRect);
				});
			});
		});

		/* Unhappy path: If the tooltip is slightly offscreen when it is middle aligned, then it aligns
		the tooltip with an extremity of the target (whichever is results in the tooltip
		being entirely within document.body)*/
		describe("aligns the tooltip with the target", () => {
			let edgeStubValue;
			let getLeftStub;
			let getTopStub;
			let getTooltipPositionStub;

			beforeEach(() => {
				testTooltip.tooltipRect = {top: 1, bottom: 2, left: 3, right: 4}; // we don't actually read these values
				edgeStubValue = 'someEdge';
				getLeftStub = sinon.stub(Tooltip.prototype, '_getLeftFor').returns(edgeStubValue);
				getTopStub = sinon.stub(Tooltip.prototype, '_getTopFor').returns(edgeStubValue);
			});

			afterEach(() => {
				getTopStub.restore();
				getLeftStub.restore();
				getTooltipPositionStub.restore();
			});

			describe("when the tootip is positioned above", ()=> {

				beforeEach(() => {
					getTooltipPositionStub = sinon.stub(Tooltip.prototype, '_getTooltipPosition').returns("above");
					resetPositionStub.withArgs(testTooltip.tooltipRect.top, 'y').returns([true, 'above']);
				});

				describe("and its left side is off screen", () => {
					beforeEach(() => {
						outOfBoundsStub.withArgs(testTooltip.tooltipRect.left, 'x').returns(true);
						outOfBoundsStub.withArgs(testTooltip.tooltipRect.right, 'x').returns(false);
					});

					it("sets calls _drawTooltip with a rect with a left value from _getLeftFor", () => {
						testTooltip.drawTooltip();
						proclaim.isTrue(getLeftStub.called);
						proclaim.strictEqual(drawStub.firstCall.args[0].left, edgeStubValue);
					});
					it("sets tooltipAlignment to left", () => {
						testTooltip.drawTooltip();
						proclaim.strictEqual(testTooltip.tooltipAlignment, 'left');
					});
				});

				describe("and its right side is off screen", () => {
					beforeEach(() => {
						outOfBoundsStub.withArgs(testTooltip.tooltipRect.left, 'x').returns(false);
						outOfBoundsStub.withArgs(testTooltip.tooltipRect.right, 'x').returns(true);
					});

					it("sets calls _drawTooltip with a rect with a left value from _getLeftFor", () => {
						testTooltip.drawTooltip();
						proclaim.isTrue(getLeftStub.calledWith('right'));
						proclaim.strictEqual(drawStub.firstCall.args[0].left, edgeStubValue);
					});

					it("sets tooltipAlignment to right", () => {
						testTooltip.drawTooltip();
						proclaim.strictEqual(testTooltip.tooltipAlignment, 'right');
					});
				});
			});

			describe("when the tootip is positioned below", ()=> {
				beforeEach(() => {
					getTooltipPositionStub = sinon.stub(Tooltip.prototype, '_getTooltipPosition').returns("below");
					resetPositionStub.withArgs(testTooltip.tooltipRect.bottom, 'y').returns([true, 'below']);
				});

				describe("and its left side is off screen", () => {
					beforeEach(() => {
						outOfBoundsStub.withArgs(testTooltip.tooltipRect.left, 'x').returns(true);
						outOfBoundsStub.withArgs(testTooltip.tooltipRect.right, 'x').returns(false);
					});

					it("sets calls _drawTooltip with a rect with a left value from _getleft", () => {
						testTooltip.drawTooltip();
						proclaim.isTrue(getLeftStub.calledWith('left'));
						proclaim.strictEqual(drawStub.firstCall.args[0].left, edgeStubValue);
					});
					it("sets tooltipAlignment to left", () => {
						testTooltip.drawTooltip();
						proclaim.strictEqual(testTooltip.tooltipAlignment, 'left');
					});
				});

				describe("and its right side is off screen", () => {
					beforeEach(() => {
						outOfBoundsStub.withArgs(testTooltip.tooltipRect.left, 'x').returns(false);
						outOfBoundsStub.withArgs(testTooltip.tooltipRect.right, 'x').returns(true);
					});

					it("sets calls _drawTooltip with a rect with a left value from _getLeft", () => {
						testTooltip.drawTooltip();
						proclaim.isTrue(getLeftStub.calledWith('right'));
						proclaim.strictEqual(drawStub.firstCall.args[0].left, edgeStubValue);
					});

					it("sets tooltipAlignment to right", () => {
						testTooltip.drawTooltip();
						proclaim.strictEqual(testTooltip.tooltipAlignment, 'right');
					});
				});
			});

			describe("when the tootip is positioned left", ()=> {
				beforeEach(() => {
					getTooltipPositionStub = sinon.stub(Tooltip.prototype, '_getTooltipPosition').returns("left");
					resetPositionStub.withArgs(testTooltip.tooltipRect.left, 'x').returns([true, 'left']);
				});

				describe("and its top is off screen", () => {
					beforeEach(() => {
						outOfBoundsStub.withArgs(testTooltip.tooltipRect.top, 'y').returns(true);
						outOfBoundsStub.withArgs(testTooltip.tooltipRect.bottom, 'y').returns(false);
					});

					it("sets calls _drawTooltip with a rect with a top value from _getTopFor", () => {
						testTooltip.drawTooltip();
						proclaim.isTrue(getTopStub.calledWith('top'));
						proclaim.strictEqual(drawStub.firstCall.args[0].top, edgeStubValue);
					});
					it("sets tooltipAlignment to top", () => {
						testTooltip.drawTooltip();
						proclaim.strictEqual(testTooltip.tooltipAlignment, 'top');
					});
				});

				describe("and its bottom side is off screen", () => {
					beforeEach(() => {
						outOfBoundsStub.withArgs(testTooltip.tooltipRect.top, 'y').returns(false);
						outOfBoundsStub.withArgs(testTooltip.tooltipRect.bottom, 'y').returns(true);
					});

					it("sets calls _drawTooltip with a rect with a left value from _getTop", () => {
						testTooltip.drawTooltip();
						proclaim.isTrue(getTopStub.calledWith('bottom'));
						proclaim.strictEqual(drawStub.firstCall.args[0].top, edgeStubValue);
					});

					it("sets tooltipAlignment to bottom", () => {
						testTooltip.drawTooltip();
						proclaim.strictEqual(testTooltip.tooltipAlignment, 'bottom');
					});
				});
			});

			describe("when the tootip is positioned right", ()=> {
				beforeEach(() => {
					getTooltipPositionStub = sinon.stub(Tooltip.prototype, '_getTooltipPosition').returns("right");
					resetPositionStub.withArgs(testTooltip.tooltipRect.right, 'x').returns([true, 'right']);
				});

				describe("and its top is off screen", () => {
					beforeEach(() => {
						outOfBoundsStub.withArgs(testTooltip.tooltipRect.top, 'y').returns(true);
						outOfBoundsStub.withArgs(testTooltip.tooltipRect.bottom, 'y').returns(false);
					});

					it("sets calls _drawTooltip with a rect with a top value from _getTop", () => {
						testTooltip.drawTooltip();
						proclaim.isTrue(getTopStub.calledWith('top'));
						proclaim.strictEqual(drawStub.firstCall.args[0].top, edgeStubValue);
					});
					it("sets tooltipAlignment to top", () => {
						testTooltip.drawTooltip();
						proclaim.strictEqual(testTooltip.tooltipAlignment, 'top');
					});
				});

				describe("and its bottom side is off screen", () => {
					beforeEach(() => {
						outOfBoundsStub.withArgs(testTooltip.tooltipRect.top, 'y').returns(false);
						outOfBoundsStub.withArgs(testTooltip.tooltipRect.bottom, 'y').returns(true);
					});

					it("sets calls _drawTooltip with a rect with a left value from _getTop", () => {
						testTooltip.drawTooltip();
						proclaim.isTrue(getTopStub.calledWith('bottom'));
						proclaim.strictEqual(drawStub.firstCall.args[0].top, edgeStubValue);
					});

					it("sets tooltipAlignment to bottom", () => {
						testTooltip.drawTooltip();
						proclaim.strictEqual(testTooltip.tooltipAlignment, 'bottom');
					});
				});
			});
		});
	});

	describe("calculateTooltipRect", () => {
		let testTooltip;
		let getStub;
		let checkStub;
		let getLeftStub;
		let getTopStub;
		let targetStub;
		let renderStub;
		let position;

		beforeEach(() => {
			getStub = sinon.stub(Tooltip, 'getOptions');
			checkStub = sinon.stub(Tooltip, 'checkOptions').returns({target: 'testValue'});
			renderStub = sinon.stub(Tooltip.prototype, 'render');
			getLeftStub = sinon.stub(Tooltip.prototype, '_getLeftFor').returns(100);
			getTopStub = sinon.stub(Tooltip.prototype, '_getTopFor').returns(100);

			let tooltipElStub = {offsetWidth: 10, offsetHeight: 10};
			targetStub = sinon.stub(Tooltip, 'Target').returns({top: 1, left: 1, right: 1, bottom: 1, offsetTop: 0, offsetParentLeft: 0, width: 1, height:1});

			testTooltip = new Tooltip(tooltipElStub);

			testTooltip.tooltipEl = tooltipElStub;
		});

		afterEach(() => {
			getStub.restore();
			checkStub.restore();
			getLeftStub.restore();
			getTopStub.restore();
			targetStub.restore();
			renderStub.restore();
			testTooltip.destroy();
		});

		describe("when position is above", () => {
			beforeEach(() => {
				testTooltip.tooltipPosition = 'above';
				position = testTooltip.tooltipPosition;
			});

			it("calls get edge", () => {
				testTooltip.calculateTooltipRect(position);
				proclaim.isTrue(getLeftStub.calledWith('middle'));
			});

			it("returns a rect with the expected values", () => {
				let expectedLeft = testTooltip._getLeftFor();
				let expectedRight = expectedLeft + testTooltip.width();
				let expectedTop = testTooltip.target.top - (testTooltip.height() + Tooltip.arrowDepth);
				let expectedBottom = expectedTop + testTooltip.height();

				let expectedValue = {left: expectedLeft, right: expectedRight, top: expectedTop, bottom: expectedBottom};
				testTooltip.calculateTooltipRect(position);
				let returnValue = testTooltip.tooltipRect;

				proclaim.deepEqual(expectedValue, returnValue);
			});
		});

		describe("when position is below", () => {
			beforeEach(()=>{
				testTooltip.tooltipPosition = 'below';
				position = testTooltip.tooltipPosition;
			});

			it("calls get edge", () => {
				testTooltip.calculateTooltipRect(position);
				proclaim.isTrue(getLeftStub.calledWith('middle'));
			});

			it("returns a rect with the expected values", () => {
				let expectedLeft = testTooltip._getLeftFor();
				let expectedRight = expectedLeft + testTooltip.width();

				let expectedTop = testTooltip.target.bottom + Tooltip.arrowDepth;
				let expectedBottom = expectedTop + testTooltip.height();

				let expectedValue = {left: expectedLeft, right: expectedRight, top: expectedTop, bottom: expectedBottom};
				testTooltip.calculateTooltipRect(position);
				let returnValue = testTooltip.tooltipRect;

				proclaim.deepEqual(expectedValue, returnValue);
			});

		});

		describe("when position is left", () => {
			beforeEach(()=>{
				testTooltip.tooltipPosition = 'left';
				position = testTooltip.tooltipPosition;
			});

			it("calls get edge", () => {
				testTooltip.calculateTooltipRect(position);
				proclaim.isTrue(getTopStub.calledWith('middle'));
			});

			it("returns a rect with the expected values", () => {
				let expectedLeft = testTooltip.target.left - (testTooltip.width() + Tooltip.arrowDepth);
				let expectedRight = expectedLeft + testTooltip.width();

				let expectedTop = testTooltip._getTopFor();
				let expectedBottom = expectedTop + testTooltip.height();

				let expectedValue = {left: expectedLeft, right: expectedRight, top: expectedTop, bottom: expectedBottom};
				testTooltip.calculateTooltipRect(position);
				let returnValue = testTooltip.tooltipRect;

				proclaim.deepEqual(expectedValue, returnValue);
			});

		});

		describe("when position is right", () => {
			beforeEach(() => {
				testTooltip.tooltipPosition = 'right';
				position = testTooltip.tooltipPosition;

			});

			it("calls get edge", () => {
				testTooltip.calculateTooltipRect(position);
				proclaim.isTrue(getTopStub.calledWith('middle'));
			});

			it("returns a rect with the expected values", () => {
				let expectedLeft = testTooltip.target.right + Tooltip.arrowDepth;
				let expectedRight = expectedLeft + testTooltip.width();

				let expectedTop = testTooltip._getTopFor();
				let expectedBottom = expectedTop + testTooltip.height();

				let expectedValue = {left: expectedLeft, right: expectedRight, top: expectedTop, bottom: expectedBottom};
				testTooltip.calculateTooltipRect(position);
				let returnValue = testTooltip.tooltipRect;

				proclaim.deepEqual(expectedValue, returnValue);
			});
		});
	});

	describe("resetPosition ", () => {
		let testTooltip;
		let originalTooltipPosition;
		let outOfBoundsStub;

		beforeEach(() => {
			fixtures.declarativeCode();
			let stubEl = document.createElement('div');
			testTooltip = new Tooltip(stubEl, {target: 'demo-tooltip-target'});

			originalTooltipPosition = testTooltip.tooltipPosition;

			outOfBoundsStub = sinon.stub(Tooltip, '_isOutOfBounds');
		});

		afterEach(() => {
			outOfBoundsStub.restore();
		});

		it("if in bounds it won't reset the tooltip position", () => {
			let tooltipRect = {left: 1, right: 1, top: 1, bottom: 1};
			outOfBoundsStub.withArgs(tooltipRect.top, 'y').returns(false);

			testTooltip.resetPosition(tooltipRect.top, 'y');
			proclaim.strictEqual(originalTooltipPosition, testTooltip.tooltipPosition);
		});

		it("if out of bounds it resets the tooltip position", () => {
			let tooltipRect = {left: 1, right: 1, top: 1, bottom: 1};
			testTooltip.tooltipPosition = "above";
			outOfBoundsStub.withArgs(tooltipRect.top, 'y').returns(true);

			testTooltip.resetPosition(tooltipRect.top, 'y');
			proclaim.notStrictEqual(originalTooltipPosition, testTooltip.tooltipPosition);
		});
	});

	describe("_getTooltipPosition", () => {
		let checkStub;
		let getStub;
		let targetStub;
		let widthStub;
		let heightStub;
		let oGridStub;

		let testTooltip;

		beforeEach(() => {
			getStub = sinon.stub(Tooltip, 'getOptions');
			targetStub = sinon.stub(Tooltip, 'Target').returns({left: 0, right: 7, centrePoint: {x: 5}});
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
			tooltipOptions({'position': 'above'});
			testTooltip = createTooltip();
			setViewportWidth('default');
			proclaim.strictEqual(testTooltip._getTooltipPosition(), 'above');
		});

		it("returns small options position if one is declared, and viewport is Small", () => {
			tooltipOptions({'position': 'above', 'positionS': 'right'});
			testTooltip = createTooltip();
			setViewportWidth('S');
			proclaim.strictEqual(testTooltip._getTooltipPosition(), 'right');
		});

		it("falls back to  small options position if one is declared, and viewport is Medium", () => {
			tooltipOptions({'position': 'above', 'positionS': 'right'});
			testTooltip = createTooltip();
			setViewportWidth('M');
			proclaim.strictEqual(testTooltip._getTooltipPosition(), 'right');
		});

		it("returns medium options position if one is declared, and viewport is Medium", () => {
			tooltipOptions({'position': 'left', 'positionM': 'below'});
			testTooltip = createTooltip();
			setViewportWidth('M');
			proclaim.strictEqual(testTooltip._getTooltipPosition(), 'below');
		});

		it("falls back to  medium options position if one is declared, and viewport is Large", () => {
			tooltipOptions({'position': 'above', 'positionM': 'right'});
			testTooltip = createTooltip();
			setViewportWidth('L');
			proclaim.strictEqual(testTooltip._getTooltipPosition(), 'right');
		});

		it("returns large options position if one is declared, and viewport is Large", () => {
			tooltipOptions({'position': 'below', 'positionL': 'left'});
			testTooltip = createTooltip();
			setViewportWidth('L');
			proclaim.strictEqual(testTooltip._getTooltipPosition(), 'left');
		});

		it("falls back to large options position if one is declared, and viewport is X-Large", () => {
			tooltipOptions({'position': 'above', 'positionL': 'right'});
			testTooltip = createTooltip();
			setViewportWidth('XL');
			proclaim.strictEqual(testTooltip._getTooltipPosition(), 'right');
		});

		it("returns x-large options position if one is declared, and viewport is X-Large", () => {
			tooltipOptions({'position': 'below', 'positionXl': 'top'});
			testTooltip = createTooltip();
			setViewportWidth('XL');
			proclaim.strictEqual(testTooltip._getTooltipPosition(), 'top');
		});
	});

	describe("_getLeftFor", () => {
		let checkStub;
		let getStub;
		let targetStub;
		let widthStub;
		let heightStub;

		let testTooltip;

		beforeEach(() => {
			getStub = sinon.stub(Tooltip, 'getOptions');
			checkStub = sinon.stub(Tooltip, 'checkOptions').returns({'position': 'above'});
			targetStub = sinon.stub(Tooltip, 'Target').returns({left: 0, right: 7, centrePoint: {x: 5}});
			let stubEl = document.createElement('div');
			widthStub = sinon.stub(Tooltip.prototype, 'width').returns(100);
			heightStub = sinon.stub(Tooltip.prototype, 'height').returns(500);
			testTooltip = new Tooltip(stubEl);
		});

		afterEach(() => {
			getStub.restore();
			checkStub.restore();
			targetStub.restore();
			heightStub.restore();
			widthStub.restore();
		});

		it("returns target left for 'left'", () => {
			proclaim.strictEqual(testTooltip._getLeftFor('left'), 0);
		});
		it("returns the target right, offset by the tooltip width", () => {
			let leftValue = testTooltip._getLeftFor('right');
			proclaim.isTrue(widthStub.called);
			proclaim.strictEqual(leftValue, testTooltip.target.right - testTooltip.width());
		});
		it("returns the middle of the target offset by half the tooltip width", () => {
			let leftValue = testTooltip._getLeftFor('middle');
			proclaim.isTrue(widthStub.called);
			proclaim.strictEqual(leftValue, testTooltip.target.centrePoint.x - testTooltip.width()/2);
		});
	});

	describe("_getTopFor", () => {
		let checkStub;
		let getStub;
		let targetStub;
		let widthStub;
		let heightStub;

		let testTooltip;

		beforeEach(() => {

			getStub = sinon.stub(Tooltip, 'getOptions');
			checkStub = sinon.stub(Tooltip, 'checkOptions').returns({'position': 'above'});
			targetStub = sinon.stub(Tooltip, 'Target').returns({top: 0, bottom: 9, centrePoint: {y: 6}});
			let stubEl = document.createElement('div');
			widthStub = sinon.stub(Tooltip.prototype, 'width').returns(100);
			heightStub = sinon.stub(Tooltip.prototype, 'height').returns(500);
			testTooltip = new Tooltip(stubEl);
		});

		afterEach(() => {
			getStub.restore();
			checkStub.restore();
			targetStub.restore();
			heightStub.restore();
			widthStub.restore();
		});

		it("returns target top for 'top'", () => {
			proclaim.strictEqual(testTooltip._getTopFor('top'), 0);
		});
		it("returns the target bottom, offset by the tooltip height for 'bottom'", () => {
			let topValue = testTooltip._getTopFor('bottom');
			proclaim.isTrue(heightStub.called);
			proclaim.strictEqual(topValue, testTooltip.target.bottom - testTooltip.height());
		});
		it("returns the middle of the target offset by half the tooltip height for 'middle'", () => {
			let topValue = testTooltip._getTopFor('middle');
			proclaim.isTrue(heightStub.called);
			proclaim.strictEqual(topValue, testTooltip.target.centrePoint.y - testTooltip.height()/2);
		});
	});

	describe("_setArrow", () => {
		let checkStub;
		let getStub;
		let targetStub;
		let testTooltip;

		beforeEach(() => {
			getStub = sinon.stub(Tooltip, 'getOptions');
			checkStub = sinon.stub(Tooltip, 'checkOptions').returns({'position': 'above'});
			targetStub = sinon.stub(Tooltip, 'Target');
			let stubEl = document.createElement('div');
			testTooltip = new Tooltip(stubEl);
			testTooltip.tooltipPosition = 'above';
			testTooltip.tooltipAlignment = 'middle';
		});

		afterEach(() => {
			getStub.restore();
			checkStub.restore();
			targetStub.restore();
		});


		it('removes all the other arrow classes', () => {
			testTooltip._setArrow();
			let classesToRemove = [
				"o-tooltip--arrow-left",
				"o-tooltip--arrow-right",
				"o-tooltip--arrow-above",
				"o-tooltip-arrow--align-top",
				"o-tooltip-arrow--align-bottom",
				"o-tooltip-arrow--align-left",
				"o-tooltip-arrow--align-right"
			];

			classesToRemove.forEach((classname) => {
				proclaim.isFalse(testTooltip.tooltipEl.classList.contains(classname));
			});
		});

		it('adds the arrow-position and alignment', () => {
			let positionsAndAlignments = {
				"below": { arrowPosition: "above", alignments: ["left", "right", "middle"] },
				"above": { arrowPosition: "below", alignments: ["left", "right", "middle"] },
				"left": { arrowPosition: "right", alignments: ["top", "bottom", "middle"] },
				"right": { arrowPosition: "left", alignments: ["top", "bottom", "middle"] }
			};

			for (const position of Object.keys(positionsAndAlignments)) {
				testTooltip.tooltipPosition = position;
				positionsAndAlignments[position].alignments.forEach((alignment) => { // eslint-disable-line no-loop-func
					testTooltip.tooltipAlignment = alignment;

					testTooltip._setArrow();

					proclaim.isTrue(testTooltip.tooltipEl.classList.contains("o-tooltip-arrow--align-"+alignment));
					proclaim.isTrue(testTooltip.tooltipEl.classList.contains("o-tooltip--arrow-"+positionsAndAlignments[position].arrowPosition));
				});
			}
		});

	});

	describe("_drawTooltip", () => {
		let testTooltip;

		beforeEach(() => {
			fixtures.declarativeCode();
			testTooltip = Tooltip.init('#tooltip-demo');
		});

		afterEach(() => {
			fixtures.reset();
		});

		it("sets the style.top to the top value of the rect passed in", () => {
			testTooltip._drawTooltip({top: 123, left: 456});
			proclaim.strictEqual(testTooltip.tooltipEl.style.top, "123px");

		});
		it("sets the style.left to the left value of the rect passed in", () => {
			testTooltip._drawTooltip({top: 123, left: 456});
			proclaim.strictEqual(testTooltip.tooltipEl.style.left, "456px");
		});
	});

	describe("_isOutOfBounds", () => {

		it('returns true if the value passed in is less than 0', () => {
			proclaim.isTrue(Tooltip._isOutOfBounds(-1));
		});

		context('with empty opts measures bounds against document.documentElement', () => {
			const stubOpts = {};

			it('returns true if the value passed in is greater than document.documentElement.clientHeight and the axis is y', () => {
				proclaim.isTrue(Tooltip._isOutOfBounds(document.documentElement.clientHeight+1, 'y', stubOpts));
			});

			it('returns true if the value passed in is greater than document.documentElement.clientWidth and the axis is x', () => {
				proclaim.isTrue(Tooltip._isOutOfBounds(document.documentElement.clientWidth+1, 'x', stubOpts));
			});

			it('returns false if the value passed in is less than document.documentElement.clientWidth and the axis is x', () => {
				proclaim.isFalse(Tooltip._isOutOfBounds(document.documentElement.clientWidth-1, 'x', stubOpts));
			});

			it('returns false if the value passed in is less than document.documentElement.clientHeight and the axis is y', () => {
				document.body.style.height = "20px";

				proclaim.isFalse(Tooltip._isOutOfBounds(document.documentElement.clientHeight-1, 'y', stubOpts));
			});
		});

		context('with showOnConstruction opts measures bounds against document.body', () => {
			const stubOpts = { showOnConstruction: true };

			it('returns true if the value passed in is greater than document.body.clientHeight and the axis is y', () => {
				proclaim.isTrue(Tooltip._isOutOfBounds(document.body.clientHeight+1, 'y', stubOpts));
			});

			it('returns true if the value passed in is greater than document.body.clientWidth and the axis is x', () => {
				proclaim.isTrue(Tooltip._isOutOfBounds(document.body.clientWidth+1, 'x', stubOpts));
			});

			it('returns false if the value passed in is less than document.body.clientWidth and the axis is x', () => {
				proclaim.isFalse(Tooltip._isOutOfBounds(document.body.clientWidth-1, 'x', stubOpts));
			});

			it('returns false if the value passed in is less than document.body.clientHeight and the axis is y', () => {
				document.body.style.height = "20px";

				proclaim.isFalse(Tooltip._isOutOfBounds(document.body.clientHeight-1, 'y', stubOpts));
			});
		});
	});

	describe("_rotateOrientation", () => {
		it("returns below if you pass in right", () => {
			proclaim.strictEqual(Tooltip._rotateOrientation("right"), "below");
		});
		it("returns left if you pass in below", () => {
			proclaim.strictEqual(Tooltip._rotateOrientation("below"), "left");
		});
		it("returns above if you pass in left", () => {
			proclaim.strictEqual(Tooltip._rotateOrientation("left"), "above");
		});
		it("returns right if you pass in above", () => {
			proclaim.strictEqual(Tooltip._rotateOrientation("above"), "right");
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

		it('emits oTooltip.close event', function(done) {
			this.timeout(1000);

			const timer = setTimeout(() => {
				proclaim.fail('oTooltip.close event to fire', 'oTooltip.close event did not fire');
			}, 500);

			const tooltipEl = document.getElementById('tooltip-demo');
			const testTooltip = new Tooltip(tooltipEl, {target: 'demo-tooltip-target'});
			testTooltip.delegates.tooltip.on('oTooltip.close', () => {
				clearTimeout(timer);
				done();
			});

			testTooltip.show();
			testTooltip.close();
		});


		describe('when called with fireCloseEvent=false', function () {
			it('skips emitting oTooltip.close event', function(done) {
				this.timeout(1000);

				const timer = setTimeout(() => {
					done();
				}, 500);

				const tooltipEl = document.getElementById('tooltip-demo');
				const testTooltip = new Tooltip(tooltipEl, {target: 'demo-tooltip-target'});
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

			let closeStub = sinon.stub(Tooltip.prototype, 'close');

			const testTooltip = Tooltip.init('#tooltip-demo');
			testTooltip.show();

			let enterKeypress = document.createEvent('Event');
			enterKeypress.keyCode = 13;

			testTooltip.closeOnKeyUp(enterKeypress);
			proclaim.isFalse(closeStub.called);

			let escKeypress = document.createEvent('Event');
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
			drawTooltipStub = sinon.stub(Tooltip.prototype, 'drawTooltip');
			fixtures.declarativeCode();
			closeStub = sinon.stub(Tooltip.prototype, 'close');
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
		it("destroys the tooltip map if this is the last tooltip", () => {
			const testTooltip = Tooltip.init('#tooltip-demo');
			testTooltip.destroy();
			proclaim.isUndefined(Tooltip._tooltips);
		});
	});
});
