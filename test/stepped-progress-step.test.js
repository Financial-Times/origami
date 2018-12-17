/* eslint-env mocha */

import * as assert from 'proclaim';
import * as fixtures from './helpers/fixtures';
import sinon from 'sinon/pkg/sinon';
import SteppedProgressStep from '../src/js/stepped-progress-step';

describe('src/js/stepped-progress-step', () => {

	it('exports a class constructor', () => {
		assert.isFunction(SteppedProgressStep);
		assert.throws(SteppedProgressStep, TypeError);
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
				assert.strictEqual(step.stepElement, mockStepElement);
			});
		});

		describe('.parent', () => {
			it('is set to the `parent` that was passed into the constructor', () => {
				assert.strictEqual(step.parent, mockParent);
			});
		});

		describe('.labelElement', () => {
			it('is set to the label element found inside `stepElement`', () => {
				assert.strictEqual(step.labelElement, mockLabelElement);
			});
		});

		describe('.statusElement', () => {

			it('is set to the status element found inside `stepElement`', () => {
				assert.strictEqual(step.statusElement, mockStatusElement);
			});

			it('is emptied of any text', () => {
				assert.strictEqual(step.statusElement.textContent.trim(), '');
			});

		});

		describe('.isComplete()', () => {

			describe('when the step has the "complete" modifier class', () => {
				it('returns `true`', () => {
					mockStepElement.classList.add('o-stepped-progress__step--complete');
					assert.isTrue(step.isComplete());
				});
			});

			describe('when the step does not have the "complete" modifier class', () => {
				it('returns `false`', () => {
					mockStepElement.classList.remove('o-stepped-progress__step--complete');
					assert.isFalse(step.isComplete());
				});
			});

		});

		describe('.isCurrent()', () => {

			describe('when the step has the "current" modifier class', () => {
				it('returns `true`', () => {
					mockStepElement.classList.add('o-stepped-progress__step--current');
					assert.isTrue(step.isCurrent());
				});
			});

			describe('when the step does not have the "current" modifier class', () => {
				it('returns `false`', () => {
					mockStepElement.classList.remove('o-stepped-progress__step--current');
					assert.isFalse(step.isCurrent());
				});
			});

		});

		describe('.isError()', () => {

			describe('when the step has the "error" modifier class', () => {
				it('returns `true`', () => {
					mockStepElement.classList.add('o-stepped-progress__step--error');
					assert.isTrue(step.isError());
				});
			});

			describe('when the step does not have the "error" modifier class', () => {
				it('returns `false`', () => {
					mockStepElement.classList.remove('o-stepped-progress__step--error');
					assert.isFalse(step.isError());
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
					assert.isTrue(step.isFuture());
				});
			});

			describe('when the step is considered to be in a "complete" state', () => {
				it('returns `false`', () => {
					step.isComplete.returns(true);
					assert.isFalse(step.isFuture());
				});
			});

			describe('when the step is considered to be in a "current" state', () => {
				it('returns `false`', () => {
					step.isCurrent.returns(true);
					assert.isFalse(step.isFuture());
				});
			});

			describe('when the step is considered to be in a "error" state', () => {
				it('returns `false`', () => {
					step.isError.returns(true);
					assert.isFalse(step.isFuture());
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
				assert.isFalse(mockStepElement.classList.contains('o-stepped-progress__step--current'));
				assert.isFalse(mockStepElement.classList.contains('o-stepped-progress__step--error'));
			});

			it('adds the "complete" status class', () => {
				assert.isTrue(mockStepElement.classList.contains('o-stepped-progress__step--complete'));
			});

			it('sets the status element text to indicate the new state', () => {
				assert.strictEqual(step.statusElement.textContent.trim(), '(completed)');
			});

		});

		describe('.markAsCurrent()', () => {

			beforeEach(() => {
				mockStepElement.classList.add('o-stepped-progress__step--complete');
				mockStepElement.classList.add('o-stepped-progress__step--error');
				step.markAsCurrent();
			});

			it('removes any other status classes', () => {
				assert.isFalse(mockStepElement.classList.contains('o-stepped-progress__step--complete'));
				assert.isFalse(mockStepElement.classList.contains('o-stepped-progress__step--error'));
			});

			it('adds the "current" status class', () => {
				assert.isTrue(mockStepElement.classList.contains('o-stepped-progress__step--current'));
			});

			it('sets the status element text to indicate the new state', () => {
				assert.strictEqual(step.statusElement.textContent.trim(), '(current step)');
			});

		});

		describe('.markAsError()', () => {

			beforeEach(() => {
				mockStepElement.classList.add('o-stepped-progress__step--complete');
				mockStepElement.classList.add('o-stepped-progress__step--current');
				step.markAsError();
			});

			it('removes any other status classes', () => {
				assert.isFalse(mockStepElement.classList.contains('o-stepped-progress__step--complete'));
				assert.isFalse(mockStepElement.classList.contains('o-stepped-progress__step--current'));
			});

			it('adds the "error" status class', () => {
				assert.isTrue(mockStepElement.classList.contains('o-stepped-progress__step--error'));
			});

			it('sets the status element text to indicate the new state', () => {
				assert.strictEqual(step.statusElement.textContent.trim(), '(error)');
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
				assert.isFalse(mockStepElement.classList.contains('o-stepped-progress__step--complete'));
				assert.isFalse(mockStepElement.classList.contains('o-stepped-progress__step--current'));
				assert.isFalse(mockStepElement.classList.contains('o-stepped-progress__step--error'));
			});

			it('clears the status element text', () => {
				assert.strictEqual(step.statusElement.textContent.trim(), '');
			});

		});

		describe('when the status element does not exist', () => {

			beforeEach(() => {
				mockStatusElement.remove();
				step = new SteppedProgressStep(mockStepElement, mockParent);
			});

			it('is created', () => {
				assert.isDefined(step.statusElement);
				assert.strictEqual(step.statusElement.outerHTML, '<span class="o-stepped-progress__status"></span>');
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
					assert.strictEqual(step.statusElement.textContent.trim(), '(completed)');
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
					assert.strictEqual(step.statusElement.textContent.trim(), '(current step)');
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
					assert.strictEqual(step.statusElement.textContent.trim(), '(error)');
				});
			});

		});

	});

});
