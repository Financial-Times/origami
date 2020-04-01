/* eslint-env mocha */
/* global proclaim sinon */

import * as fixtures from './helpers/fixtures';
import SteppedProgressStep from '../src/js/stepped-progress-step';

describe('src/js/stepped-progress-step', () => {

	it('exports a class constructor', () => {
		proclaim.isFunction(SteppedProgressStep);
		proclaim.throws(SteppedProgressStep, TypeError);
	});

	describe('new SteppedProgressStep(stepElement, parent)', () => {
		let mockLabelElement;
		let mockParent;
		let mockStatusElement;
		let mockStepElement;
		let step;

		beforeEach(() => {
			const sandbox = document.createElement('div');
			sandbox.innerHTML = fixtures.testMarkup.steppedProgressStep;
			mockStepElement = sandbox.querySelector('.o-stepped-progress__step');
			mockLabelElement = mockStepElement.querySelector('.o-stepped-progress__label');
			mockStatusElement = mockStepElement.querySelector('.o-stepped-progress__status');
			mockParent = {};
			step = new SteppedProgressStep(mockStepElement, mockParent);
		});

		describe('.stepElement', () => {
			it('is set to the `stepElement` that was passed into the constructor', () => {
				proclaim.strictEqual(step.stepElement, mockStepElement);
			});
		});

		describe('.parent', () => {
			it('is set to the `parent` that was passed into the constructor', () => {
				proclaim.strictEqual(step.parent, mockParent);
			});
		});

		describe('.labelElement', () => {
			it('is set to the label element found inside `stepElement`', () => {
				proclaim.strictEqual(step.labelElement, mockLabelElement);
			});
		});

		describe('.statusElement', () => {

			it('is set to the status element found inside `stepElement`', () => {
				proclaim.strictEqual(step.statusElement, mockStatusElement);
			});

			it('is emptied of any text', () => {
				proclaim.strictEqual(step.statusElement.textContent.trim(), '');
			});

		});

		describe('.isComplete()', () => {

			describe('when the step has the "complete" modifier class', () => {
				it('returns `true`', () => {
					mockStepElement.classList.add('o-stepped-progress__step--complete');
					proclaim.isTrue(step.isComplete());
				});
			});

			describe('when the step does not have the "complete" modifier class', () => {
				it('returns `false`', () => {
					mockStepElement.classList.remove('o-stepped-progress__step--complete');
					proclaim.isFalse(step.isComplete());
				});
			});

		});

		describe('.isCurrent()', () => {

			describe('when the step has the "current" modifier class', () => {
				it('returns `true`', () => {
					mockStepElement.classList.add('o-stepped-progress__step--current');
					proclaim.isTrue(step.isCurrent());
				});
			});

			describe('when the step does not have the "current" modifier class', () => {
				it('returns `false`', () => {
					mockStepElement.classList.remove('o-stepped-progress__step--current');
					proclaim.isFalse(step.isCurrent());
				});
			});

		});

		describe('.isError()', () => {

			describe('when the step has the "error" modifier class', () => {
				it('returns `true`', () => {
					mockStepElement.classList.add('o-stepped-progress__step--error');
					proclaim.isTrue(step.isError());
				});
			});

			describe('when the step does not have the "error" modifier class', () => {
				it('returns `false`', () => {
					mockStepElement.classList.remove('o-stepped-progress__step--error');
					proclaim.isFalse(step.isError());
				});
			});

		});

		describe('.isFuture()', () => {

			beforeEach(() => {
				sinon.stub(step, 'isComplete').returns(false);
				sinon.stub(step, 'isCurrent').returns(false);
				sinon.stub(step, 'isError').returns(false);
			});

			afterEach(() => {
				step.isComplete.restore();
				step.isCurrent.restore();
				step.isError.restore();
			});

			describe('when the step has no explicit state', () => {
				it('returns `true`', () => {
					proclaim.isTrue(step.isFuture());
				});
			});

			describe('when the step is considered to be in a "complete" state', () => {
				it('returns `false`', () => {
					step.isComplete.returns(true);
					proclaim.isFalse(step.isFuture());
				});
			});

			describe('when the step is considered to be in a "current" state', () => {
				it('returns `false`', () => {
					step.isCurrent.returns(true);
					proclaim.isFalse(step.isFuture());
				});
			});

			describe('when the step is considered to be in a "error" state', () => {
				it('returns `false`', () => {
					step.isError.returns(true);
					proclaim.isFalse(step.isFuture());
				});
			});

		});

		describe('.markAsComplete()', () => {

			beforeEach(() => {
				mockStepElement.classList.add('o-stepped-progress__step--current');
				mockStepElement.classList.add('o-stepped-progress__step--error');
				step.markAsComplete();
			});

			it('removes any other status classes', () => {
				proclaim.isFalse(mockStepElement.classList.contains('o-stepped-progress__step--current'));
				proclaim.isFalse(mockStepElement.classList.contains('o-stepped-progress__step--error'));
			});

			it('adds the "complete" status class', () => {
				proclaim.isTrue(mockStepElement.classList.contains('o-stepped-progress__step--complete'));
			});

			it('sets the status element text to indicate the new state', () => {
				proclaim.strictEqual(step.statusElement.textContent.trim(), '(completed)');
			});

		});

		describe('.markAsCurrent()', () => {

			beforeEach(() => {
				mockStepElement.classList.add('o-stepped-progress__step--complete');
				mockStepElement.classList.add('o-stepped-progress__step--error');
				step.markAsCurrent();
			});

			it('removes any other status classes', () => {
				proclaim.isFalse(mockStepElement.classList.contains('o-stepped-progress__step--complete'));
				proclaim.isFalse(mockStepElement.classList.contains('o-stepped-progress__step--error'));
			});

			it('adds the "current" status class', () => {
				proclaim.isTrue(mockStepElement.classList.contains('o-stepped-progress__step--current'));
			});

			it('sets the status element text to indicate the new state', () => {
				proclaim.strictEqual(step.statusElement.textContent.trim(), '(current step)');
			});

		});

		describe('.markAsError()', () => {

			beforeEach(() => {
				mockStepElement.classList.add('o-stepped-progress__step--complete');
				mockStepElement.classList.add('o-stepped-progress__step--current');
				step.markAsError();
			});

			it('removes any other status classes', () => {
				proclaim.isFalse(mockStepElement.classList.contains('o-stepped-progress__step--complete'));
				proclaim.isFalse(mockStepElement.classList.contains('o-stepped-progress__step--current'));
			});

			it('adds the "error" status class', () => {
				proclaim.isTrue(mockStepElement.classList.contains('o-stepped-progress__step--error'));
			});

			it('sets the status element text to indicate the new state', () => {
				proclaim.strictEqual(step.statusElement.textContent.trim(), '(error)');
			});

		});

		describe('.markAsFuture()', () => {

			beforeEach(() => {
				mockStepElement.classList.add('o-stepped-progress__step--complete');
				mockStepElement.classList.add('o-stepped-progress__step--current');
				mockStepElement.classList.add('o-stepped-progress__step--error');
				mockStatusElement.textContent = 'Mock Status';
				step.markAsFuture();
			});

			it('removes all status classes', () => {
				proclaim.isFalse(mockStepElement.classList.contains('o-stepped-progress__step--complete'));
				proclaim.isFalse(mockStepElement.classList.contains('o-stepped-progress__step--current'));
				proclaim.isFalse(mockStepElement.classList.contains('o-stepped-progress__step--error'));
			});

			it('clears the status element text', () => {
				proclaim.strictEqual(step.statusElement.textContent.trim(), '');
			});

		});

		describe('when the status element does not exist', () => {

			beforeEach(() => {
				mockStatusElement.remove();
				step = new SteppedProgressStep(mockStepElement, mockParent);
			});

			it('is created', () => {
				proclaim.isDefined(step.statusElement);
				proclaim.strictEqual(step.statusElement.outerHTML, '<span class="o-stepped-progress__status"></span>');
			});

		});

		describe('when the initial state of the step is "complete"', () => {

			beforeEach(() => {
				mockStatusElement.textContent = '';
				mockStepElement.classList.add('o-stepped-progress__step--complete');
				step = new SteppedProgressStep(mockStepElement, mockParent);
			});

			describe('.statusElement', () => {
				it('has its text set to indicate the initial state', () => {
					proclaim.strictEqual(step.statusElement.textContent.trim(), '(completed)');
				});
			});

		});

		describe('when the initial state of the step is "current"', () => {

			beforeEach(() => {
				mockStatusElement.textContent = '';
				mockStepElement.classList.add('o-stepped-progress__step--current');
				step = new SteppedProgressStep(mockStepElement, mockParent);
			});

			describe('.statusElement', () => {
				it('has its text set to indicate the initial state', () => {
					proclaim.strictEqual(step.statusElement.textContent.trim(), '(current step)');
				});
			});

		});

		describe('when the initial state of the step is "error"', () => {

			beforeEach(() => {
				mockStatusElement.textContent = '';
				mockStepElement.classList.add('o-stepped-progress__step--error');
				step = new SteppedProgressStep(mockStepElement, mockParent);
			});

			describe('.statusElement', () => {
				it('has its text set to indicate the initial state', () => {
					proclaim.strictEqual(step.statusElement.textContent.trim(), '(error)');
				});
			});

		});

	});

});
