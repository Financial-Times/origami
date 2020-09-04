/* eslint-env mocha */
/* global proclaim */

import * as fixtures from './helpers/fixtures.js';

import Target from'./../src/js/target';

describe('Target', () => {
	let target;
	let targetEl;
	beforeEach(() => {
		fixtures.declarativeCode();
		// We are using a tooltip target with fixed position - don't change this
		targetEl = document.getElementById('demo-tooltip-target-5');
		target = new Target(targetEl);
	});
	afterEach(() => {
		fixtures.reset();
		target = undefined;
		targetEl = undefined;
	});

	context('constructor()', () => {
		it('Should set targetEl and its boundingClientRectangle', () => {
			proclaim.deepEqual(target.targetEl, targetEl);
		});
	});

	context('get left()', () => {
		it('should return the left edge of the target', () => {
			const leftEdge = targetEl.getBoundingClientRect().left - (targetEl.offsetParent && targetEl.offsetParent.getBoundingClientRect().left);
			proclaim.equal(target.left, leftEdge);
		});
	});

	context('get right()', () => {
	   it('should return the right edge of the target', () => {
		   const rightEdge = target.width + target.left;
		   proclaim.equal(target.right, rightEdge);
	   });
	});

	context('get top()', () => {
		it('should return the top edge of the target', () => {
			const topEdge = targetEl.getBoundingClientRect().top - (targetEl.offsetParent && targetEl.offsetParent.getBoundingClientRect().top);
			proclaim.equal(target.top, topEdge);
		});
	});

	context('get bottom()', () => {
		it('should return the bottom edge of the target', () => {
			const bottomEdge = target.top + target.height;
			proclaim.equal(target.bottom, bottomEdge);
		});
	});

	context('get width()', () => {
		it('should return the width of the target', () => {
			proclaim.equal(target.width, targetEl.getBoundingClientRect().width);
		});
	});

	context('get height()', () => {
		it('should return the height of the target', () => {
			proclaim.equal(target.height, targetEl.getBoundingClientRect().height);
		});
	});

	context('get centrePoint()', () => {
		it('should return the centre point of the target', () => {
			proclaim.deepEqual(target.centrePoint, {
				x: target.left + target.width/2,
				y: target.top + target.height/2
			});
		});
	});
});