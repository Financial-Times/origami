/* eslint-env mocha */
/* global proclaim sinon */

import '../setup.js';

import {set} from '../../src/javascript/core/settings.js';
import {init as initSend} from '../../src/javascript/core/send.js';
import core from '../../src/javascript/core.js';
import {init as initSession} from '../../src/javascript/core/session.js';
import {init as initComponentView} from '../../src/javascript/events/component-view.js';

const config = {
	context: {
		product: 'desktop'
	},
	user: {
		user_id: '123456'
	},
};

let targetComponent;
let errorThrown;

function createTargetComponent (attributes, text) {
	targetComponent = document.createElement('div');
	attributes.forEach(attr => targetComponent.setAttribute(attr.key, attr.value));
	targetComponent.innerHTML = text;
	document.body.appendChild(targetComponent);
}

function viewed (target) {
	const event = new Event('intersect');
	target.dispatchEvent(event);
}

function setMockIntersectionObserver (observeSpy, unobserveSpy) {
	function mockIntersectionObserver(callback, options) {
		this.callback = callback;
		this.options = options;
	}

	mockIntersectionObserver.prototype.observe = function (target) {
		target.addEventListener('intersect', () => {
			try {
				this.callback([{ isIntersecting: true, target }]);
			} catch (e) {
				errorThrown = e;
			}
		});
		observeSpy(target);
	};

	mockIntersectionObserver.prototype.unobserve = function (target) {
		unobserveSpy(target);
	};

	window.IntersectionObserver = mockIntersectionObserver;
}


describe('component:view', () => {

	const observeSpy = sinon.spy();
	const unobserveSpy = sinon.spy();

	beforeEach(() => {
		initSession();
		initSend();
		set('config', config);
		setMockIntersectionObserver(observeSpy, unobserveSpy);
		sinon.spy(core, 'track');
	});

	afterEach(() => {
		observeSpy.resetHistory();
		unobserveSpy.resetHistory();
		if (targetComponent) {
			document.body.removeChild(targetComponent);
			targetComponent = undefined;
		}
		errorThrown = undefined;
		core.track.restore();
	});

	context('with default props', () => {
		beforeEach(() => {
			const attributes = [{ key: 'data-o-tracking-view', value: true }];
			const text = 'component:view target for default props';

			createTargetComponent(attributes, text);
			initComponentView();
			viewed(targetComponent);
		});

		it('should track an event for a component view ', () => {
			proclaim.equal(errorThrown, undefined);
			proclaim.equal(observeSpy.calledOnce, true, 'IntersectionObserver observed target');
			proclaim.equal(unobserveSpy.calledOnce, true, 'IntersectionObserver unobserved target');
		});
	});

	context('with custom props', () => {
		const category = 'custom';
		const id = '1234';
		const type = 'audio';
		const targetAttribute = 'data-custom-element';
		const idAttribute = 'data-id';
		const attributes = [
			{ key: targetAttribute, value: true },
			{ key: idAttribute, value: id },
		];
		const text = 'component:view target for custom props';

		beforeEach(() => {
			createTargetComponent(attributes, text);
		});

		describe('given correct', () => {
			beforeEach(() => {
				const opts = {
					category,
					selector: `[${targetAttribute}]`,
					getContextData: (el) => {
						return { componentContentId: el.getAttribute(idAttribute), type };
					},
				};

				initComponentView(opts);
				viewed(targetComponent);
			});

			it('should track an event for a component view', () => {
				proclaim.equal(errorThrown, undefined);
				proclaim.equal(observeSpy.calledOnce, true, 'IntersectionObserver observed target');
				proclaim.equal(unobserveSpy.calledOnce, true, 'IntersectionObserver unobserved target');
			});
		});

		describe('given wrong', () => {
			context('getContextData is not a function', () => {
				beforeEach(() => {
					const opts = {
						selector: `[${targetAttribute}]`,
						getContextData: {},
					};

					initComponentView(opts);
					viewed(targetComponent);
				});

				it('should throw an error', () => {
					proclaim.equal(errorThrown.message, 'opts.getContextData is not a function');
					proclaim.equal(observeSpy.calledOnce, true, 'IntersectionObserver observed target');
					proclaim.equal(unobserveSpy.calledOnce, false, 'IntersectionObserver unobserved target');
				});
			});

			context('getContextData returns non-Object', () => {
				beforeEach(() => {
					const opts = {
						selector: `[${targetAttribute}]`,
						getContextData: (el) => `${el}`,
					};

					initComponentView(opts);
					viewed(targetComponent);
				});

				it('should throw an error', () => {
					proclaim.equal(errorThrown.message, 'opts.getContextData function should return {object}');
					proclaim.equal(observeSpy.calledOnce, true, 'IntersectionObserver observed target');
					proclaim.equal(unobserveSpy.calledOnce, false, 'IntersectionObserver unobserved target');
				});
			});

			context('getContextData returns an Object which includes unfiltered props', () => {
				beforeEach(() => {
					const opts = {
						selector: `[${targetAttribute}]`,
						getContextData: (el) => {
							return {
								componentContentId: el.getAttribute(idAttribute),
								name: 'name',
							};
						},
					};

					initComponentView(opts);
					viewed(targetComponent);
				});

				it('should not throw an error', () => {
					proclaim.equal(errorThrown, undefined);
					proclaim.equal(observeSpy.calledOnce, true, 'IntersectionObserver observed target');
					proclaim.equal(unobserveSpy.calledOnce, true, 'IntersectionObserver unobserved target');
				});
			});

		});
	});

});
