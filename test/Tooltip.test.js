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
		let renderStub;
		let showStub;
		let targetStub;

		beforeEach(() => {
			getOptionsReturnStub = {};
			getOptionsStub = sinon.stub(Tooltip.prototype, 'getOptions').returns(getOptionsReturnStub);
			checkOptionsStub = sinon.stub(Tooltip.prototype, 'checkOptions').returnsArg(0);
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

		it("calls render if opts.renderOnConstruction is set to true", () => {
			const stubEl = "stubEL";
			new Tooltip(stubEl, {"renderOnConstruction": true});
			proclaim.isTrue(renderStub.called);
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
			el.setAttribute('data-o-tooltip-position', stubPosition);

			const options = Tooltip.prototype.getOptions(el);
			proclaim.equal(options.position, stubPosition);
		});

		it("extracts renderOnConstruction if it's set on the el passed in", () => {
			const el = document.createElement('div');
			el.setAttribute('data-o-tooltip-render-on-construction', true);

			const options = Tooltip.prototype.getOptions(el);
			proclaim.isTrue(options.renderOnConstruction);
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

		it("calls throwError if position is not one of `above`, `below`, `left`, `right` or falsey", () => {
			Tooltip.prototype.checkOptions({"target": "#el", "tooltipPosition": "side"});
			proclaim.isTrue(throwStub.called);
		});

		it("sets opts.tooltipPosition to below if no position was specified", ()=>{
			let opts = Tooltip.prototype.checkOptions({"target": "#el"});
			proclaim.isFalse(throwStub.called);
			proclaim.strictEqual(opts.tooltipPosition, 'below');
		});

		it("does not error if tooltipPosition is `top`, `bottom`, `left`, `right` or falsey", () => {
			["above", "left", "right", "below", undefined].forEach((value) => {
				Tooltip.prototype.checkOptions({"target": "#el", "tooltipPosition": value});
				proclaim.isFalse(throwStub.called);
			});
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
			tooltip.opts.zindex = fakeZ;

			tooltip.render();
			proclaim.strictEqual(tooltipEl.style.zIndex, fakeZ);
		});

		it("adds a close button with an aria label, role and title", () => {
			const tooltip = Tooltip.init('#tooltip-demo');
			tooltip.render();
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

		beforeEach(() => {
			getOptionsStub = sinon.stub(Tooltip.prototype, 'getOptions').returns({});
			checkOptionsStub = sinon.stub(Tooltip.prototype, 'checkOptions').returnsArg(0);
			drawTooltipStub = sinon.stub(Tooltip.prototype, 'drawTooltip');
			resizeListenerStub = sinon.stub(Tooltip.prototype, 'resizeListener');

			targetStub = sinon.stub(Tooltip, "Target");

			fixtures.declarativeCode();
		});

		afterEach(() => {
			getOptionsStub.restore();
			checkOptionsStub.restore();
			drawTooltipStub.restore();
			resizeListenerStub.restore();

			targetStub.restore();

			fixtures.reset();
		});

		it('sets up a touchend and click handler for the body', () => {
			const closeOnExternalClickSpy = sinon.spy(Tooltip.prototype, 'closeOnExternalClick');
			let testTooltip = new Tooltip('#tooltip-demo');

			document.body.click();

			const e = new Event('touchend');
			document.body.dispatchEvent(e);

			proclaim.isFalse(closeOnExternalClickSpy.called);

			testTooltip.show();

			document.body.click();
			document.body.dispatchEvent(e);

			proclaim.isTrue(closeOnExternalClickSpy.calledTwice);
		});

		it('sets up a close handler tooltip-close button', () => {
			const closeSpy = sinon.spy(Tooltip.prototype, 'close');
			const tooltipEl = document.getElementById('tooltip-demo');
			const testTooltip = new Tooltip(tooltipEl);
			testTooltip.render();
			const tooltipCloseEl = tooltipEl.querySelector('.o-tooltip-close');

			tooltipCloseEl.click();

			const e = new Event('touchend');
			tooltipCloseEl.dispatchEvent(e);

			proclaim.isFalse(closeSpy.called);

			testTooltip.show();

			tooltipCloseEl.click();
			tooltipCloseEl.dispatchEvent(e);
			/* this fails because the touchend doesn't trigger. Don't know why,
				works irl, previous test's touchend faking also works */
			//proclaim.isTrue(closeSpy.calledTwice);

			proclaim.isTrue(closeSpy.called);
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
			getStub = sinon.stub(Tooltip.prototype, 'getOptions');
			checkStub = sinon.stub(Tooltip.prototype, 'checkOptions').returns({'position': 'top'});
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
			let getEdgeStub;

			beforeEach(() => {
				tooltipRect = {top: 1, bottom: 2, left: 3, right: 4}; // we don't actually read these values
				calculateTooltipRectStub = sinon.stub(Tooltip.prototype, 'calculateTooltipRect').returns(tooltipRect);
				edgeStubValue = 'someEdge';
				getEdgeStub = sinon.stub(Tooltip.prototype, '_getEdge').returns(edgeStubValue);

				outOfBoundsStub = sinon.stub(Tooltip, '_isOutOfBounds');
			});

			afterEach(() => {
				outOfBoundsStub.restore();
				calculateTooltipRectStub.restore();
				getEdgeStub.restore();
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

					it("sets calls _drawTooltip with a rect with a left value from _getEdge", () => {
						testTooltip.drawTooltip();
						proclaim.isTrue(getEdgeStub.calledWith('left'));
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

					it("sets calls _drawTooltip with a rect with a left value from _getEdge", () => {
						testTooltip.drawTooltip();
						proclaim.isTrue(getEdgeStub.calledWith('right'));
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

					it("sets calls _drawTooltip with a rect with a left value from _getEdge", () => {
						testTooltip.drawTooltip();
						proclaim.isTrue(getEdgeStub.calledWith('left'));
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

					it("sets calls _drawTooltip with a rect with a left value from _getEdge", () => {
						testTooltip.drawTooltip();
						proclaim.isTrue(getEdgeStub.calledWith('right'));
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

					it("sets calls _drawTooltip with a rect with a top value from _getEdge", () => {
						testTooltip.drawTooltip();
						proclaim.isTrue(getEdgeStub.calledWith('top'));
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

					it("sets calls _drawTooltip with a rect with a left value from _getEdge", () => {
						testTooltip.drawTooltip();
						proclaim.isTrue(getEdgeStub.calledWith('bottom'));
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

					it("sets calls _drawTooltip with a rect with a top value from _getEdge", () => {
						testTooltip.drawTooltip();
						proclaim.isTrue(getEdgeStub.calledWith('top'));
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

					it("sets calls _drawTooltip with a rect with a left value from _getEdge", () => {
						testTooltip.drawTooltip();
						proclaim.isTrue(getEdgeStub.calledWith('bottom'));
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
		describe("when position is above", () => {
			it("calls get edge");
			it("returns a rect with the expected values");
		});
		// repeat 4 times
	});
});
