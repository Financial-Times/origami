/* eslint-env mocha */
/* eslint-disable no-loop-func */

import * as assert from 'proclaim';
import * as fixtures from './helpers/fixtures';
import sinon from 'sinon/pkg/sinon';
import SteppedProgress from '../src/js/stepped-progress';
import SteppedProgressStep from '../src/js/stepped-progress-step';

sinon.assert.expose(assert, {
	includeFail: false,
	prefix: ''
});

describe('src/js/stepped-progress', () => {

	it('exports a class constructor', () => {
		assert.isFunction(SteppedProgress);
		assert.throws(SteppedProgress, TypeError);
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
			assert.calledOnce(SteppedProgress.getDataAttributes);
			assert.calledWithExactly(SteppedProgress.getDataAttributes, mockSteppedProgressElement);
		});

		describe('.options', () => {
			it('is a defaulted options object', () => {
				assert.isObject(steppedProgress.options);
				assert.deepEqual(steppedProgress.options, {
					isMockDataAttributeOptions: true
				});
				assert.notStrictEqual(steppedProgress.options, mockDataAttributeOptions);
			});
		});

		describe('.steppedProgressElement', () => {
			it('is set to the `steppedProgressElement` that was passed into the constructor', () => {
				assert.strictEqual(steppedProgress.steppedProgressElement, mockSteppedProgressElement);
			});
		});

		describe('.getSteps()', () => {
			let returnValue;

			beforeEach(() => {
				steppedProgress._steps = ['a', 'b', 'c'];
				returnValue = steppedProgress.getSteps();
			});

			it('returns an array of all of the steps', () => {
				assert.deepEqual(returnValue, steppedProgress._steps);
			});

			it('does not return the exact array instance used internally', () => {
				assert.notStrictEqual(returnValue, steppedProgress._steps);
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
				assert.deepEqual(returnValue, [
					steppedProgress._steps[0],
					steppedProgress._steps[2]
				]);
			});

			it('does not return the exact array instance used internally', () => {
				assert.notStrictEqual(returnValue, steppedProgress._steps);
			});

		});

		describe('.hasStepAtIndex(index)', () => {

			beforeEach(() => {
				steppedProgress._steps = ['a', 'b', 'c'];
			});

			describe('when a step exists at `index`', () => {
				it('returns `true`', () => {
					assert.isTrue(steppedProgress.hasStepAtIndex(1));
				});
			});

			describe('when a step does not exist at `index`', () => {
				it('returns `false`', () => {
					assert.isFalse(steppedProgress.hasStepAtIndex(10));
				});
			});

		});

		describe('.getStepAtIndex(index)', () => {

			beforeEach(() => {
				steppedProgress._steps = ['a', 'b', 'c'];
			});

			describe('when a step exists at `index`', () => {
				it('returns the step at the given index', () => {
					assert.strictEqual(steppedProgress.getStepAtIndex(1), 'b');
				});
			});

			describe('when a step does not exist at `index`', () => {
				it('throws an error', () => {
					assert.throws(() => steppedProgress.getStepAtIndex(10), /no step at index: 10/i);
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
					assert.strictEqual(steppedProgress.getCurrentStep(), steppedProgress._steps[3]);
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
					assert.isUndefined(steppedProgress.getCurrentStep());
				});

			});

		});

		describe('.getLastStep()', () => {

			beforeEach(() => {
				steppedProgress._steps = ['a', 'b', 'c'];
			});

			it('returns the last step', () => {
				assert.strictEqual(steppedProgress.getLastStep(), 'c');
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
					assert.isTrue(steppedProgress.isComplete());
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
					assert.isFalse(steppedProgress.isComplete());
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
						assert.strictEqual(steppedProgress.getNextStep(), steppedProgress._steps[1]);
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
						assert.strictEqual(steppedProgress.getNextStep(), 'mock last');
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
					assert.strictEqual(steppedProgress.getNextStep(), 'mock last');
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
					assert.calledOnce(steppedProgress.getCurrentStep);
					assert.calledOnce(mockCurrentStep.markAsComplete);
				});

				it('marks the next step as current', () => {
					assert.calledOnce(steppedProgress.getNextStep);
					assert.calledOnce(mockNextStep.markAsCurrent);
				});

			});

			describe('when the stepped progress is not complete, and the current step is the last step', () => {

				beforeEach(() => {
					steppedProgress.isComplete.onCall(0).returns(false);
					steppedProgress.isComplete.onCall(1).returns(true);
					steppedProgress.progress();
				});

				it('marks the current step as complete', () => {
					assert.calledOnce(steppedProgress.getCurrentStep);
					assert.calledOnce(mockCurrentStep.markAsComplete);
				});

				it('does not mark the next step as current', () => {
					assert.notCalled(steppedProgress.getNextStep);
					assert.notCalled(mockNextStep.markAsCurrent);
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
					assert.calledOnce(steppedProgress.getCurrentStep);
					assert.notCalled(mockCurrentStep.markAsComplete);
				});

				it('marks the next step as current', () => {
					assert.calledOnce(steppedProgress.getNextStep);
					assert.calledOnce(mockNextStep.markAsCurrent);
				});

			});

			describe('when the stepped progress is complete', () => {

				beforeEach(() => {
					steppedProgress.isComplete.onCall(0).returns(true);
					steppedProgress.isComplete.onCall(1).returns(true);
					steppedProgress.progress();
				});

				it('does not mark the current step as complete', () => {
					assert.notCalled(steppedProgress.getCurrentStep);
					assert.notCalled(mockCurrentStep.markAsComplete);
				});

				it('does not mark the next step as current', () => {
					assert.notCalled(steppedProgress.getNextStep);
					assert.notCalled(mockNextStep.markAsCurrent);
				});

			});

		});

		describe('._steps', () => {

			it('is an array of `SteppedProgressStep` instances', () => {
				assert.isArray(steppedProgress._steps);
				for (const step of steppedProgress._steps) {
					assert.instanceOf(step, SteppedProgressStep);
				}
			});

			describe('each `SteppedProgressStep` instance', () => {
				let stepElements;

				beforeEach(() => {
					stepElements = mockSteppedProgressElement.querySelectorAll('.o-stepped-progress__step');
				});

				// The length of this array is based on mock HTML
				// found in: ./helpers/fixtures.js
				for (const index of Array(4).keys()) {
					describe(`\`SteppedProgressStep\` instance #${index}`, () => {

						it('has a `.stepElement` property set to the corresponding HTML element', () => {
							assert.strictEqual(steppedProgress._steps[index].stepElement, stepElements[index]);
						});

						it('has a `.parent` property set to the `SteppedProgress` instance', () => {
							assert.strictEqual(steppedProgress._steps[index].parent, steppedProgress);
						});

					});
				}

			});

		});

	});

});
