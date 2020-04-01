/* eslint-env mocha */
/* global proclaim sinon */

import * as fixtures from './helpers/fixtures';
import SteppedProgress from '../src/js/stepped-progress';
import SteppedProgressStep from '../src/js/stepped-progress-step';

sinon.assert.expose(proclaim, {
	includeFail: false,
	prefix: ''
});

describe('src/js/stepped-progress', () => {

	it('exports a class constructor', () => {
		proclaim.isFunction(SteppedProgress);
		proclaim.throws(SteppedProgress, TypeError);
	});

	describe('new SteppedProgress(steppedProgressElement)', () => {
		let mockDataAttributeOptions;
		let mockSteppedProgressElement;
		let steppedProgress;

		beforeEach(() => {
			mockDataAttributeOptions = {
				isMockDataAttributeOptions: true
			};
			sinon.stub(SteppedProgress, 'getDataAttributes').returns(mockDataAttributeOptions);

			const sandbox = document.createElement('div');
			sandbox.innerHTML = fixtures.testMarkup.steppedProgress;
			mockSteppedProgressElement = sandbox.querySelector('.o-stepped-progress');

			steppedProgress = new SteppedProgress(mockSteppedProgressElement);
		});

		afterEach(() => {
			SteppedProgress.getDataAttributes.restore();
		});

		it('fetches options set via HTML data attributes', () => {
			proclaim.calledOnce(SteppedProgress.getDataAttributes);
			proclaim.calledWithExactly(SteppedProgress.getDataAttributes, mockSteppedProgressElement);
		});

		describe('.options', () => {
			it('is a defaulted options object', () => {
				proclaim.isObject(steppedProgress.options);
				proclaim.deepEqual(steppedProgress.options, {
					isMockDataAttributeOptions: true
				});
				proclaim.notStrictEqual(steppedProgress.options, mockDataAttributeOptions);
			});
		});

		describe('.steppedProgressElement', () => {
			it('is set to the `steppedProgressElement` that was passed into the constructor', () => {
				proclaim.strictEqual(steppedProgress.steppedProgressElement, mockSteppedProgressElement);
			});
		});

		describe('.getSteps()', () => {
			let returnValue;

			beforeEach(() => {
				steppedProgress._steps = ['a', 'b', 'c'];
				returnValue = steppedProgress.getSteps();
			});

			it('returns an array of all of the steps', () => {
				proclaim.deepEqual(returnValue, steppedProgress._steps);
			});

			it('does not return the exact array instance used internally', () => {
				proclaim.notStrictEqual(returnValue, steppedProgress._steps);
			});

		});

		describe('.getCompletedSteps()', () => {
			let returnValue;

			beforeEach(() => {
				steppedProgress._steps = [
					{
						isComplete: sinon.stub().returns(true)
					},
					{
						isComplete: sinon.stub().returns(false)
					},
					{
						isComplete: sinon.stub().returns(true)
					},
					{
						isComplete: sinon.stub().returns(false)
					}
				];
				returnValue = steppedProgress.getCompletedSteps();
			});

			it('returns an array of all of the steps which are completed', () => {
				proclaim.deepEqual(returnValue, [
					steppedProgress._steps[0],
					steppedProgress._steps[2]
				]);
			});

			it('does not return the exact array instance used internally', () => {
				proclaim.notStrictEqual(returnValue, steppedProgress._steps);
			});

		});

		describe('.hasStepAtIndex(index)', () => {

			beforeEach(() => {
				steppedProgress._steps = ['a', 'b', 'c'];
			});

			describe('when a step exists at `index`', () => {
				it('returns `true`', () => {
					proclaim.isTrue(steppedProgress.hasStepAtIndex(1));
				});
			});

			describe('when a step does not exist at `index`', () => {
				it('returns `false`', () => {
					proclaim.isFalse(steppedProgress.hasStepAtIndex(10));
				});
			});

		});

		describe('.getStepAtIndex(index)', () => {

			beforeEach(() => {
				steppedProgress._steps = ['a', 'b', 'c'];
			});

			describe('when a step exists at `index`', () => {
				it('returns the step at the given index', () => {
					proclaim.strictEqual(steppedProgress.getStepAtIndex(1), 'b');
				});
			});

			describe('when a step does not exist at `index`', () => {
				it('throws an error', () => {
					proclaim.throws(() => steppedProgress.getStepAtIndex(10), /no step at index: 10/i);
				});
			});

		});

		describe('.getCurrentStep()', () => {

			describe('when there is at least one step with a "current" status', () => {

				beforeEach(() => {
					steppedProgress._steps = [
						{
							isCurrent: sinon.stub().returns(false)
						},
						{
							isCurrent: sinon.stub().returns(true)
						},
						{
							isCurrent: sinon.stub().returns(false)
						},
						{
							isCurrent: sinon.stub().returns(true)
						},
						{
							isCurrent: sinon.stub().returns(false)
						}
					];
				});

				it('returns the last step with a "current" status', () => {
					proclaim.strictEqual(steppedProgress.getCurrentStep(), steppedProgress._steps[3]);
				});

			});

			describe('when there is no current step', () => {

				beforeEach(() => {
					steppedProgress._steps = [
						{
							isCurrent: sinon.stub().returns(false)
						}
					];
				});

				it('returns `undefined`', () => {
					proclaim.isUndefined(steppedProgress.getCurrentStep());
				});

			});

		});

		describe('.getLastStep()', () => {

			beforeEach(() => {
				steppedProgress._steps = ['a', 'b', 'c'];
			});

			it('returns the last step', () => {
				proclaim.strictEqual(steppedProgress.getLastStep(), 'c');
			});

		});

		describe('.isComplete()', () => {

			describe('when all steps have the "complete" status', () => {

				beforeEach(() => {
					steppedProgress._steps = [
						{
							isComplete: sinon.stub().returns(true)
						},
						{
							isComplete: sinon.stub().returns(true)
						},
						{
							isComplete: sinon.stub().returns(true)
						}
					];
				});

				it('returns `true`', () => {
					proclaim.isTrue(steppedProgress.isComplete());
				});

			});

			describe('when not all steps have the "complete" status', () => {

				beforeEach(() => {
					steppedProgress._steps = [
						{
							isComplete: sinon.stub().returns(true)
						},
						{
							isComplete: sinon.stub().returns(false)
						},
						{
							isComplete: sinon.stub().returns(true)
						}
					];
				});

				it('returns `false`', () => {
					proclaim.isFalse(steppedProgress.isComplete());
				});

			});

		});

		describe('.getNextStep()', () => {

			beforeEach(() => {
				sinon.stub(steppedProgress, 'getLastStep');
				sinon.stub(steppedProgress, 'isComplete');
			});

			afterEach(() => {
				steppedProgress.getLastStep.restore();
				steppedProgress.isComplete.restore();
			});

			describe('when the stepped progress is not complete', () => {

				beforeEach(() => {
					steppedProgress.isComplete.returns(false);
				});

				describe('and there are steps without a status', () => {

					beforeEach(() => {
						steppedProgress._steps = [
							{
								isFuture: sinon.stub().returns(false)
							},
							{
								isFuture: sinon.stub().returns(true)
							},
							{
								isFuture: sinon.stub().returns(true)
							}
						];
					});

					it('returns the next step which has no status', () => {
						proclaim.strictEqual(steppedProgress.getNextStep(), steppedProgress._steps[1]);
					});

				});

				describe('and there are no steps without a status', () => {

					beforeEach(() => {
						steppedProgress.getLastStep.returns('mock last');
						steppedProgress._steps = [
							{
								isFuture: sinon.stub().returns(false)
							},
							{
								isFuture: sinon.stub().returns(false)
							},
							{
								isFuture: sinon.stub().returns(false)
							}
						];
					});

					it('returns the last step', () => {
						proclaim.strictEqual(steppedProgress.getNextStep(), 'mock last');
					});

				});

			});

			describe('when the stepped progress is complete', () => {

				beforeEach(() => {
					steppedProgress.isComplete.returns(true);
					steppedProgress.getLastStep.returns('mock last');
					steppedProgress._steps = ['a', 'b', 'c'];
				});

				it('returns the last step', () => {
					proclaim.strictEqual(steppedProgress.getNextStep(), 'mock last');
				});

			});

		});

		describe('.progress()', () => {
			let mockCurrentStep;
			let mockNextStep;

			beforeEach(() => {
				mockCurrentStep = {
					markAsComplete: sinon.stub()
				};
				mockNextStep = {
					markAsCurrent: sinon.stub()
				};
				sinon.stub(steppedProgress, 'getCurrentStep').returns(mockCurrentStep);
				sinon.stub(steppedProgress, 'getNextStep').returns(mockNextStep);
				sinon.stub(steppedProgress, 'isComplete');
			});

			afterEach(() => {
				steppedProgress.getCurrentStep.restore();
				steppedProgress.getNextStep.restore();
				steppedProgress.isComplete.restore();
			});

			describe('when the stepped progress is not complete, and there is a current and next step', () => {

				beforeEach(() => {
					steppedProgress.isComplete.onCall(0).returns(false);
					steppedProgress.isComplete.onCall(1).returns(false);
					steppedProgress.progress();
				});

				it('marks the current step as complete', () => {
					proclaim.calledOnce(steppedProgress.getCurrentStep);
					proclaim.calledOnce(mockCurrentStep.markAsComplete);
				});

				it('marks the next step as current', () => {
					proclaim.calledOnce(steppedProgress.getNextStep);
					proclaim.calledOnce(mockNextStep.markAsCurrent);
				});

			});

			describe('when the stepped progress is not complete, and the current step is the last step', () => {

				beforeEach(() => {
					steppedProgress.isComplete.onCall(0).returns(false);
					steppedProgress.isComplete.onCall(1).returns(true);
					steppedProgress.progress();
				});

				it('marks the current step as complete', () => {
					proclaim.calledOnce(steppedProgress.getCurrentStep);
					proclaim.calledOnce(mockCurrentStep.markAsComplete);
				});

				it('does not mark the next step as current', () => {
					proclaim.notCalled(steppedProgress.getNextStep);
					proclaim.notCalled(mockNextStep.markAsCurrent);
				});

			});

			describe('when the stepped progress is not complete, but there is no current step', () => {

				beforeEach(() => {
					steppedProgress.getCurrentStep.returns(undefined);
					steppedProgress.isComplete.onCall(0).returns(false);
					steppedProgress.isComplete.onCall(1).returns(false);
					steppedProgress.progress();
				});

				it('does not mark the current step as complete', () => {
					proclaim.calledOnce(steppedProgress.getCurrentStep);
					proclaim.notCalled(mockCurrentStep.markAsComplete);
				});

				it('marks the next step as current', () => {
					proclaim.calledOnce(steppedProgress.getNextStep);
					proclaim.calledOnce(mockNextStep.markAsCurrent);
				});

			});

			describe('when the stepped progress is complete', () => {

				beforeEach(() => {
					steppedProgress.isComplete.onCall(0).returns(true);
					steppedProgress.isComplete.onCall(1).returns(true);
					steppedProgress.progress();
				});

				it('does not mark the current step as complete', () => {
					proclaim.notCalled(steppedProgress.getCurrentStep);
					proclaim.notCalled(mockCurrentStep.markAsComplete);
				});

				it('does not mark the next step as current', () => {
					proclaim.notCalled(steppedProgress.getNextStep);
					proclaim.notCalled(mockNextStep.markAsCurrent);
				});

			});

		});

		describe('._steps', () => {

			it('is an array of `SteppedProgressStep` instances', () => {
				proclaim.isArray(steppedProgress._steps);
				for (const step of steppedProgress._steps) {
					proclaim.instanceOf(step, SteppedProgressStep);
				}
			});

			describe('each `SteppedProgressStep` instance', () => {
				let stepElements;

				beforeEach(() => {
					stepElements = mockSteppedProgressElement.querySelectorAll('.o-stepped-progress__step');
				});

				// The length of this array is based on mock HTML
				// found in: ./helpers/fixtures.js
				describe(`\`SteppedProgressStep\` instance #${0}`, () => {

					it('has a `.stepElement` property set to the corresponding HTML element', () => {
						proclaim.strictEqual(steppedProgress._steps[0].stepElement, stepElements[0]);
					});

					it('has a `.parent` property set to the `SteppedProgress` instance', () => {
						proclaim.strictEqual(steppedProgress._steps[0].parent, steppedProgress);
					});

				});
				describe(`\`SteppedProgressStep\` instance #${1}`, () => {

					it('has a `.stepElement` property set to the corresponding HTML element', () => {
						proclaim.strictEqual(steppedProgress._steps[1].stepElement, stepElements[1]);
					});

					it('has a `.parent` property set to the `SteppedProgress` instance', () => {
						proclaim.strictEqual(steppedProgress._steps[1].parent, steppedProgress);
					});

				});
				describe(`\`SteppedProgressStep\` instance #${2}`, () => {

					it('has a `.stepElement` property set to the corresponding HTML element', () => {
						proclaim.strictEqual(steppedProgress._steps[2].stepElement, stepElements[2]);
					});

					it('has a `.parent` property set to the `SteppedProgress` instance', () => {
						proclaim.strictEqual(steppedProgress._steps[2].parent, steppedProgress);
					});

				});
				describe(`\`SteppedProgressStep\` instance #${3}`, () => {

					it('has a `.stepElement` property set to the corresponding HTML element', () => {
						proclaim.strictEqual(steppedProgress._steps[3].stepElement, stepElements[3]);
					});

					it('has a `.parent` property set to the `SteppedProgress` instance', () => {
						proclaim.strictEqual(steppedProgress._steps[3].parent, steppedProgress);
					});

				});

			});

		});

	});

});
