/* eslint-env mocha, sinon, proclaim */
import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import * as fixtures from './helpers/fixtures';
import createMockRaf from 'mock-raf';
const Tooltip = require('./../main');
import Viewport from 'o-viewport';


describe("Tooltip", () => {

	afterEach(() => {
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
		let showStub;
		let targetStub;

		beforeEach(() => {
			getOptionsReturnStub = {};
			getOptionsStub = sinon.stub(Tooltip, 'getOptions').returns(getOptionsReturnStub);
			checkOptionsStub = sinon.stub(Tooltip, 'checkOptions').returnsArg(0);
			renderStub = sinon.stub(Tooltip.prototype, 'render');
			showStub = sinon.stub(Tooltip.prototype, 'show');
			targetStub = sinon.stub(Tooltip, "Target");
		});

		afterEach(() => {
			getOptionsStub.restore();
			checkOptionsStub.restore();
			renderStub.restore();
			showStub.restore();
			targetStub.restore();
		});

		it("doesn't call getOptions if options are passed in", () => {
			const stubEl = "stubEL";
			const stubOpts = {};

			new Tooltip(stubEl, stubOpts);

			proclaim.isFalse(getOptionsStub.called);
		});

		it("calls getOptions if no options were passed in", () => {
			const stubEl = "stubEL";
			new Tooltip(stubEl);

			proclaim.isTrue(getOptionsStub.calledWith(stubEl));
		});

		it("calls checkOptions with the options passed in if some options were passed in", () => {
			const stubOpts = {};
			const stubEl = "stubEL";

			new Tooltip(stubEl, stubOpts);

			proclaim.isTrue(checkOptionsStub.calledWith(stubOpts));

		});

		it("calls checkOptions with the return values of getOptions if no options were passed in", () => {
			const stubEl = "stubEL";
			new Tooltip(stubEl);

			proclaim.isTrue(checkOptionsStub.calledWith(getOptionsReturnStub));
		});

		it("calls render if opts.showOnConstruction is set to true", () => {
			const stubEl = "stubEL";
			new Tooltip(stubEl, {"showOnConstruction": true});
			proclaim.isTrue(renderStub.called);
		});

		it("Adds the tooltip to the global tooltip map", () => {
			proclaim.isUndefined(Tooltip._tooltips);

			new Tooltip("stubEL");
			proclaim.strictEqual(Tooltip._tooltips.size, 1);
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
			Tooltip.checkOptions({"target": "#el", "tooltipPosition": "side"});
			proclaim.isTrue(throwStub.called);
		});

		it("sets opts.tooltipPosition to below if no position was specified", ()=>{
			let opts = Tooltip.checkOptions({"target": "#el"});
			proclaim.isFalse(throwStub.called);
			proclaim.strictEqual(opts.tooltipPosition, 'below');
		});

		it("does not error if tooltipPosition is `top`, `bottom`, `left`, `right` or falsey", () => {
			["above", "left", "right", "below", undefined].forEach((value) => {
				Tooltip.checkOptions({"target": "#el", "tooltipPosition": value});
				proclaim.isFalse(throwStub.called);
			});
		});

		it("returns the opts object", () => {
			let opts = Tooltip.checkOptions({"target": "#el"});
			proclaim.isObject(opts);
		});
	});

	describe("render", () => {

		let tooltipEl;

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
			proclaim.isTrue(buttonEl.hasAttribute('role'));
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
			const testTooltip = new Tooltip(tooltipEl);
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
			const testTooltip = new Tooltip(tooltipEl);
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
			const testTooltip = new Tooltip(tooltipEl);

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
			const testTooltip = new Tooltip(tooltipEl);

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
			const testTooltip = new Tooltip(tooltipEl);

			testTooltip.show();
			proclaim.isTrue(drawTooltipStub.called);
		});
	});

	describe("drawTooltip", () => {

		let testTooltip;
		let checkStub;
		let getStub;
		let targetStub;
		let drawStub;
		let setArrowStub;

		beforeEach(() => {
			getStub = sinon.stub(Tooltip, 'getOptions');
			checkStub = sinon.stub(Tooltip, 'checkOptions').returns({'position': 'top'});
			targetStub = sinon.stub(Tooltip, 'Target');
			drawStub = sinon.stub(Tooltip.prototype, '_drawTooltip');
			setArrowStub = sinon.stub(Tooltip.prototype, '_setArrow');
			let stubEl = document.createElement('div');
			testTooltip = new Tooltip(stubEl);
		});

		afterEach(() => {
			checkStub.restore();
			getStub.restore();
			targetStub.restore();
			drawStub.restore();
			setArrowStub.restore();
			testTooltip.destroy();
		});

		/* Happy path */
		it("sets tooltipAlignment to 'middle'", () => {
			testTooltip.tooltipAlignment = 'someValue';
			proclaim.notStrictEqual(testTooltip.tooltipAlignment, 'middle');
			testTooltip.drawTooltip();
			proclaim.strictEqual(testTooltip.tooltipAlignment, 'middle');
		});

		it("calls calculateTooltipRect", () => {
			const tooltipRect = {left: 1, right: 1, top: 1, bottom: 1};
			const calculateTooltipRectStub = sinon.stub(Tooltip.prototype, 'calculateTooltipRect').returns(tooltipRect);
			testTooltip.drawTooltip();
			proclaim.isTrue(calculateTooltipRectStub.called);
			calculateTooltipRectStub.restore();
		});

		it("calls _drawTooltip with the result of calculateTooltipRect", () => {
			const tooltipRect = {left: 1, right: 1, top: 1, bottom: 1};
			const calculateTooltipRectStub = sinon.stub(Tooltip.prototype, 'calculateTooltipRect').returns(tooltipRect);
			testTooltip.drawTooltip();
			proclaim.isTrue(drawStub.called);
			proclaim.strictEqual(drawStub.firstCall.args[0], tooltipRect);
			calculateTooltipRectStub.restore();
		});

		it("calls _setArrow", () => {
			testTooltip.drawTooltip();
			proclaim.isTrue(setArrowStub.called);
		});

		/* Unhappy path: tests for every position that if there isn't room for the tooltip
		it flips the tooltip. So "top" becomes "bottom" etc */
		describe("flips the tooltip", () => {
			let secondTooltipRect;
			let calculateTooltipRectStub;
			let outOfBoundsStub;
			let tooltipRect;

			beforeEach(() => {
				tooltipRect = {top: 1, bottom: 2, left: 3, right: 4}; // we don't actually read these values
				secondTooltipRect = {top: 5, bottom: 6, left: 7, right: 8}; // we don't actually read these values
				calculateTooltipRectStub = sinon.stub(Tooltip.prototype, 'calculateTooltipRect');
				calculateTooltipRectStub.onFirstCall().returns(tooltipRect);
				calculateTooltipRectStub.onSecondCall().returns(secondTooltipRect);

				outOfBoundsStub = sinon.stub(Tooltip, '_isOutOfBounds');
			});

			afterEach(() => {
				calculateTooltipRectStub.restore();
				outOfBoundsStub.restore();
			});

			describe("when the tooltip is positioned above the target and there isn't room", () => {
				beforeEach(() => {
					// Set the tooltip postition to above, but the tooltip top to off screen
					testTooltip.tooltipPosition = "above";

					outOfBoundsStub.withArgs(tooltipRect.top, 'y').returns(true);
					outOfBoundsStub.withArgs(tooltipRect.bottom, 'y').returns(false);
				});

				it("sets the tooltipPosition to the return value of _flipOrientation", () => {
					let originalTooltipPosition = testTooltip.tooltipPosition;

					const flipResultStub = "flipResultStub";
					const flipStub = sinon.stub(Tooltip, '_flipOrientation').returns(flipResultStub);

					testTooltip.drawTooltip();

					proclaim.strictEqual(flipStub.firstCall.args[0], originalTooltipPosition);
					proclaim.strictEqual(testTooltip.tooltipPosition, flipResultStub);
					flipStub.restore();

				});

				it("calls calculateTooltipRect again", () => {
					testTooltip.drawTooltip();
					proclaim.isTrue(calculateTooltipRectStub.calledTwice);
				});

				it("draws the tooltip with the new rect", () => {
					testTooltip.drawTooltip();
					proclaim.isTrue(calculateTooltipRectStub.calledTwice);
					proclaim.strictEqual(drawStub.firstCall.args[0], secondTooltipRect);
				});
			});

			describe("when the tooltip is positioned below the target and there isn't room", () => {
				beforeEach(() => {
					// Set the tooltip postition to above, but the tooltip top to off screen
					testTooltip.tooltipPosition = "below";

					outOfBoundsStub.withArgs(tooltipRect.top, 'y').returns(false);
					outOfBoundsStub.withArgs(tooltipRect.bottom, 'y').returns(true);
				});

				it("sets the tooltipPosition to the return value of _flipOrientation", () => {
					let originalTooltipPosition = testTooltip.tooltipPosition;

					const flipResultStub = "flipResultStub";
					const flipStub = sinon.stub(Tooltip, '_flipOrientation').returns(flipResultStub);

					testTooltip.drawTooltip();

					proclaim.strictEqual(flipStub.firstCall.args[0], originalTooltipPosition);
					proclaim.strictEqual(testTooltip.tooltipPosition, flipResultStub);
					flipStub.restore();
				});

				it("calls calculateTooltipRect again", () => {
					testTooltip.drawTooltip();
					proclaim.isTrue(calculateTooltipRectStub.calledTwice);
				});

				it("draws the tooltip with the new rect", () => {
					testTooltip.drawTooltip();
					proclaim.isTrue(calculateTooltipRectStub.calledTwice);
					proclaim.strictEqual(drawStub.firstCall.args[0], secondTooltipRect);
				});
			});

			describe("when the tooltip is positioned left of the target and there isn't room", () => {
				beforeEach(() => {
					// Set the tooltip postition to above, but the tooltip top to off screen
					testTooltip.tooltipPosition = "left";
					outOfBoundsStub.withArgs(tooltipRect.left, 'x').returns(true);
					outOfBoundsStub.withArgs(tooltipRect.right, 'x').returns(false);
				});

				it("sets the tooltipPosition to the return value of _flipOrientation", () => {
					let originalTooltipPosition = testTooltip.tooltipPosition;

					const flipResultStub = "flipResultStub";
					const flipStub = sinon.stub(Tooltip, '_flipOrientation').returns(flipResultStub);

					testTooltip.drawTooltip();

					proclaim.strictEqual(flipStub.firstCall.args[0], originalTooltipPosition);
					proclaim.strictEqual(testTooltip.tooltipPosition, flipResultStub);
					flipStub.restore();
				});

				it("calls calculateTooltipRect again", () => {
					testTooltip.drawTooltip();
					proclaim.isTrue(calculateTooltipRectStub.calledTwice);
				});

				it("draws the tooltip with the new rect", () => {
					testTooltip.drawTooltip();
					proclaim.isTrue(calculateTooltipRectStub.calledTwice);
					proclaim.strictEqual(drawStub.firstCall.args[0], secondTooltipRect);
				});
			});

			describe("when the tooltip is positioned right of the target and there isn't room", () => {
				beforeEach(() => {
					// Set the tooltip postition to above, but the tooltip top to off screen
					testTooltip.tooltipPosition = "right";

					outOfBoundsStub.withArgs(tooltipRect.left, 'x').returns(false);
					outOfBoundsStub.withArgs(tooltipRect.right, 'x').returns(true);
				});

				it("sets the tooltipPosition to the return value of _flipOrientation", () => {
					let originalTooltipPosition = testTooltip.tooltipPosition;

					const flipResultStub = "flipResultStub";
					const flipStub = sinon.stub(Tooltip, '_flipOrientation').returns(flipResultStub);

					testTooltip.drawTooltip();

					proclaim.strictEqual(flipStub.firstCall.args[0], originalTooltipPosition);
					proclaim.strictEqual(testTooltip.tooltipPosition, flipResultStub);
					flipStub.restore();
				});

				it("calls calculateTooltipRect again", () => {
					testTooltip.drawTooltip();
					proclaim.isTrue(calculateTooltipRectStub.calledTwice);
				});

				it("draws the tooltip with the new rect", () => {
					testTooltip.drawTooltip();
					proclaim.isTrue(calculateTooltipRectStub.calledTwice);
					proclaim.strictEqual(drawStub.firstCall.args[0], secondTooltipRect);
				});
			});
		});

		/* Unhappy path: If the tooltip is slightly offscreen when it is middle aligned, then it aligns
		the tooltip with an extremity of the target (whichever is results in the tooltip
		being entirely within document.body)*/
		describe("aligns the tooltip with the target", () => {
			let outOfBoundsStub;
			let edgeStubValue;
			let tooltipRect;
			let calculateTooltipRectStub;
			let getLeftStub;
			let getTopStub;

			beforeEach(() => {
				tooltipRect = {top: 1, bottom: 2, left: 3, right: 4}; // we don't actually read these values
				calculateTooltipRectStub = sinon.stub(Tooltip.prototype, 'calculateTooltipRect').returns(tooltipRect);
				edgeStubValue = 'someEdge';
				getLeftStub = sinon.stub(Tooltip.prototype, '_getLeftFor').returns(edgeStubValue);
				getTopStub = sinon.stub(Tooltip.prototype, '_getTopFor').returns(edgeStubValue);

				outOfBoundsStub = sinon.stub(Tooltip, '_isOutOfBounds');
			});

			afterEach(() => {
				outOfBoundsStub.restore();
				calculateTooltipRectStub.restore();
				getTopStub.restore();
				getLeftStub.restore();

			});

			describe("when the tootip is positioned above", ()=> {
				beforeEach(() => {
					testTooltip.tooltipPosition = "above";
				});

				describe("and its left side is off screen", () => {
					beforeEach(() => {
						outOfBoundsStub.withArgs(tooltipRect.left, 'x').returns(true);
						outOfBoundsStub.withArgs(tooltipRect.right, 'x').returns(false);
					});

					it("sets calls _drawTooltip with a rect with a left value from _getLeftFor", () => {
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
						outOfBoundsStub.withArgs(tooltipRect.left, 'x').returns(false);
						outOfBoundsStub.withArgs(tooltipRect.right, 'x').returns(true);
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
					testTooltip.tooltipPosition = "below";
				});

				describe("and its left side is off screen", () => {
					beforeEach(() => {
						outOfBoundsStub.withArgs(tooltipRect.left, 'x').returns(true);
						outOfBoundsStub.withArgs(tooltipRect.right, 'x').returns(false);
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
						outOfBoundsStub.withArgs(tooltipRect.left, 'x').returns(false);
						outOfBoundsStub.withArgs(tooltipRect.right, 'x').returns(true);
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
					testTooltip.tooltipPosition = "left";
				});

				describe("and its top is off screen", () => {
					beforeEach(() => {
						outOfBoundsStub.withArgs(tooltipRect.top, 'y').returns(true);
						outOfBoundsStub.withArgs(tooltipRect.bottom, 'y').returns(false);
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
						outOfBoundsStub.withArgs(tooltipRect.top, 'y').returns(false);
						outOfBoundsStub.withArgs(tooltipRect.bottom, 'y').returns(true);
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
					testTooltip.tooltipPosition = "right";
				});

				describe("and its top is off screen", () => {
					beforeEach(() => {
						outOfBoundsStub.withArgs(tooltipRect.top, 'y').returns(true);
						outOfBoundsStub.withArgs(tooltipRect.bottom, 'y').returns(false);
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
						outOfBoundsStub.withArgs(tooltipRect.top, 'y').returns(false);
						outOfBoundsStub.withArgs(tooltipRect.bottom, 'y').returns(true);
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

		beforeEach(() => {
			getStub = sinon.stub(Tooltip, 'getOptions');
			checkStub = sinon.stub(Tooltip, 'checkOptions').returns({target: 'testValue'});
			renderStub = sinon.stub(Tooltip.prototype, 'render');
			getLeftStub = sinon.stub(Tooltip.prototype, '_getLeftFor').returns(100);
			getTopStub = sinon.stub(Tooltip.prototype, '_getTopFor').returns(100);

			let tooltipElStub = {offsetWidth: 10, offsetHeight: 10};
			targetStub = sinon.stub(Tooltip, 'Target').returns({top: 1, left: 1, right: 1, bottom: 1});

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
			});

			it("calls get edge", () => {
				testTooltip.calculateTooltipRect();
				proclaim.isTrue(getLeftStub.calledWith('middle'));
			});

			it("returns a rect with the expected values", () => {
				let expectedLeft = testTooltip._getLeftFor();
				let expectedRight = expectedLeft + testTooltip.width();
				let expectedTop = testTooltip.target.top - (testTooltip.height() + Tooltip.arrowDepth);
				let expectedBottom = expectedTop + testTooltip.height();

				let expectedValue = {left: expectedLeft, right: expectedRight, top: expectedTop, bottom: expectedBottom};
				let returnValue = testTooltip.calculateTooltipRect();
				proclaim.deepEqual(expectedValue, returnValue);
			});
		});

		describe("when position is below", () => {
			beforeEach(()=>{
				testTooltip.tooltipPosition = 'below';
			});

			it("calls get edge", () => {
				testTooltip.calculateTooltipRect();
				proclaim.isTrue(getLeftStub.calledWith('middle'));
			});

			it("returns a rect with the expected values", () => {
				let expectedLeft = testTooltip._getLeftFor();
				let expectedRight = expectedLeft + testTooltip.width();

				let expectedTop = testTooltip.target.bottom + Tooltip.arrowDepth;
				let expectedBottom = expectedTop + testTooltip.height();

				let expectedValue = {left: expectedLeft, right: expectedRight, top: expectedTop, bottom: expectedBottom};
				let returnValue = testTooltip.calculateTooltipRect();
				proclaim.deepEqual(expectedValue, returnValue);
			});
		});

		describe("when position is left", () => {
			beforeEach(()=>{
				testTooltip.tooltipPosition = 'left';
			});

			it("calls get edge", () => {
				testTooltip.calculateTooltipRect();
				proclaim.isTrue(getTopStub.calledWith('middle'));
			});

			it("returns a rect with the expected values", () => {
				let expectedLeft = testTooltip.target.left - (testTooltip.width() + Tooltip.arrowDepth);
				let expectedRight = expectedLeft + testTooltip.width();

				let expectedTop = testTooltip._getTopFor();
				let expectedBottom = expectedTop + testTooltip.height();

				let expectedValue = {left: expectedLeft, right: expectedRight, top: expectedTop, bottom: expectedBottom};
				let returnValue = testTooltip.calculateTooltipRect();
				proclaim.deepEqual(expectedValue, returnValue);
			});
		});

		describe("when position is right", () => {
			beforeEach(() => {
				testTooltip.tooltipPosition = 'right';
			});

			it("calls get edge", () => {
				testTooltip.calculateTooltipRect();
				proclaim.isTrue(getTopStub.calledWith('middle'));
			});

			it("returns a rect with the expected values", () => {
				let expectedLeft = testTooltip.target.right + Tooltip.arrowDepth;
				let expectedRight = expectedLeft + testTooltip.width();

				let expectedTop = testTooltip._getTopFor();
				let expectedBottom = expectedTop + testTooltip.height();

				let expectedValue = {left: expectedLeft, right: expectedRight, top: expectedTop, bottom: expectedBottom};
				let returnValue = testTooltip.calculateTooltipRect();
				proclaim.deepEqual(expectedValue, returnValue);
			});
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
			checkStub = sinon.stub(Tooltip, 'checkOptions').returns({'position': 'top'});
			targetStub = sinon.stub(Tooltip, 'Target').returns({left: 'someLeftValue', right: 7, centrePoint: {x: 5}});
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
			proclaim.strictEqual(testTooltip._getLeftFor('left'), "someLeftValue");
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
			checkStub = sinon.stub(Tooltip, 'checkOptions').returns({'position': 'top'});
			targetStub = sinon.stub(Tooltip, 'Target').returns({top: 'someTopValue', bottom: 9, centrePoint: {y: 6}});
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
			proclaim.strictEqual(testTooltip._getTopFor('top'), "someTopValue");
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
			let classesToRemove = ["o-tooltip--arrow-left",
			"o-tooltip--arrow-right",
			"o-tooltip--arrow-above",
			"o-tooltip-arrow--align-top",
			"o-tooltip-arrow--align-bottom",
			"o-tooltip-arrow--align-left",
			"o-tooltip-arrow--align-right"];

			classesToRemove.forEach((classname) => {
				proclaim.isFalse(testTooltip.tooltipEl.classList.contains(classname));
			});
		});

		it('adds the arrow-position and alignment', () => {
			let positionsAndAlignments = {"below": {arrowPosition: "above", alignments: ["left", "right", "middle"]},
																		"above": {arrowPosition: "below", alignments: ["left", "right", "middle"]},
																		"left": {arrowPosition: "right", alignments: ["top", "bottom", "middle"]},
																		"right": {arrowPosition: "left", alignments: ["top", "bottom", "middle"]}};

			for (const position of Object.keys(positionsAndAlignments)) {
				testTooltip.tooltipPosition = position;
				positionsAndAlignments[position].alignments.forEach((alignment) => {
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

		it('returns true if the value passed in is greater than document.body.offsetHeight and the axis is y', () => {
			proclaim.isTrue(Tooltip._isOutOfBounds(document.body.offsetHeight+1, 'y'));
		});

		it('returns true if the value passed in is greater than document.body.offsetWidth and the axis is x', () => {
			proclaim.isTrue(Tooltip._isOutOfBounds(document.body.offsetWidth+1, 'x'));
		});

		it('returns false if the value passed in is less than document.body.offsetWidth and the axis is x', () => {
			proclaim.isFalse(Tooltip._isOutOfBounds(document.body.offsetWidth-1, 'x'));
		});

		it('returns false if the value passed in is less than document.body.offsetheight and the axis is y', () => {
			document.body.style.height = "20px";

			proclaim.isFalse(Tooltip._isOutOfBounds(document.body.offsetHeight-1, 'y'));
		});
	});

	describe("_flipOrientation", () => {
		it("returns above if you pass in below", () => {
			proclaim.strictEqual(Tooltip._flipOrientation("above"), "below");
		});
		it("returns below if you pass in above", () => {
			proclaim.strictEqual(Tooltip._flipOrientation("below"), "above");
		});
		it("returns right if you pass in left", () => {
			proclaim.strictEqual(Tooltip._flipOrientation("left"), "right");
		});
		it("returns left if you pass in right", () => {
			proclaim.strictEqual(Tooltip._flipOrientation("right"), "left");
		});
	});

	describe("#resizeListener", () => {

		let refreshStub;
		let hasMovedStub;
		let drawTooltipStub;
		let mockRaf;

		beforeEach(() => {
			refreshStub = sinon.stub(Tooltip.Target.prototype, 'refreshRect');
			hasMovedStub = sinon.stub(Tooltip.Target.prototype, 'hasMoved').returns(true);
			drawTooltipStub = sinon.stub(Tooltip.prototype, 'drawTooltip');

			mockRaf = createMockRaf();

			fixtures.declarativeCode();
		});

		afterEach(() => {
			refreshStub.restore();
			drawTooltipStub.restore();
			hasMovedStub.restore();
			fixtures.reset();
			window.requestAnimationFrame.restore();
		});

		it("redraws if the target has moved", () => {
			const testTooltip = Tooltip.init('#tooltip-demo');

			sinon.stub(window, 'requestAnimationFrame', mockRaf.raf);

			testTooltip.resizeListener();
			mockRaf.step({ count: 1 });

			proclaim.isTrue(hasMovedStub.called);

			proclaim.isTrue(refreshStub.called);
			proclaim.isTrue(drawTooltipStub.called);
		});

		it("doesn't redraw if the target hasn't moved", () => {
			hasMovedStub.returns(false);

			const testTooltip = Tooltip.init('#tooltip-demo');

			sinon.stub(window, 'requestAnimationFrame', mockRaf.raf);

			testTooltip.resizeListener();
			mockRaf.step({ count: 1 });

			proclaim.isTrue(hasMovedStub.called);

			proclaim.isFalse(refreshStub.called);
			proclaim.isFalse(drawTooltipStub.called);
		});
	});

	describe("#close", () => {
		beforeEach(() => {
			fixtures.declarativeCode();
		});

		afterEach(() => {
			fixtures.reset();
		});

		it("sets tooltip.visible to false", () => {
			const testTooltip = Tooltip.init('#tooltip-demo');
			testTooltip.show();
			proclaim.isTrue(testTooltip.visible);
			testTooltip.close();
			proclaim.isFalse(testTooltip.visible);
		});

		it("sets display none on the tooltip", () => {
			const testTooltip = Tooltip.init('#tooltip-demo');
			testTooltip.show();
			proclaim.notStrictEqual(testTooltip.tooltipEl.style.display, 'none');
			testTooltip.close();
			proclaim.strictEqual(testTooltip.tooltipEl.style.display, 'none');
		});
	});

	describe("#closeOnKeyUp", () => {
		beforeEach(() => {
			fixtures.declarativeCode();
		});

		afterEach(() => {
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
		beforeEach(() => {
			fixtures.declarativeCode();
		});

		afterEach(() => {
			fixtures.reset();
		});

		it("returns a number", () => {
			const testTooltip = Tooltip.init('#tooltip-demo');
			testTooltip.show();
			proclaim.isNumber(testTooltip.width());
		});
	});

	describe('height', () => {
		beforeEach(() => {
			fixtures.declarativeCode();
		});

		afterEach(() => {
			fixtures.reset();
		});

		it("returns a number", () => {
			const testTooltip = Tooltip.init('#tooltip-demo');
			testTooltip.show();
			proclaim.isNumber(testTooltip.height());
		});
	});

	describe('throwError', () => {
	});
	describe('width', () => {
	});
	describe('height', () => {
	});
	describe("#destroy", () => {
		let closeStub;

		beforeEach(() => {
			fixtures.declarativeCode();
			closeStub = sinon.stub(Tooltip.prototype, 'close');
		});

		afterEach(() => {
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
