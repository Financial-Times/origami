/* eslint-env mocha, proclaim */

import proclaim from 'proclaim';
import * as fixtures from './helpers/fixtures';

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

    describe('constructor()', () => {
        it('Should set targetEl and its boundingClientRectangle', () => {
            proclaim.deepEqual(target.targetEl, targetEl);
        });
    });

    describe('get left()', () => {
        it('should return the left edge of the target', () => {
            const leftEdge = targetEl.getBoundingClientRect().left;
            proclaim.equal(target.left, leftEdge);
        });
    });

    describe('get right()', () => {
       it('should return the right edge of the target', () => {
           const rightEdge = target.width + target.left;
           proclaim.equal(target.right, rightEdge);
       });
    });

    describe('get top()', () => {
        it('should return the top edge of the target', () => {
            const topEdge = targetEl.getBoundingClientRect().top;
            proclaim.equal(target.top, topEdge);
        });
    });

    describe('get bottom()', () => {
        it('should return the bottom edge of the target', () => {
            const bottomEdge = target.top + target.height;
            proclaim.equal(target.bottom, bottomEdge);
        });
    });

    describe('get width()', () => {
        it('should return the width of the target', () => {
            proclaim.equal(target.width, targetEl.getBoundingClientRect().width);
        });
    });

    describe('get height()', () => {
        it('should return the height of the target', () => {
            proclaim.equal(target.height, targetEl.getBoundingClientRect().height);
        });
    });

    describe('get centrePoint()', () => {
        it('should return the centre point of the target', () => {
            proclaim.deepEqual(target.centrePoint, {
                x: target.left + (target.width/2),
                y: target.top + (target.height/2)
            });
        });
    });

    describe('.hasFixedParent()', () => {
        it('should return true if the target element has a fixed position', () => {
            target.targetEl = document.getElementById('positioned-target-by-self');
            proclaim.isTrue(target.hasFixedParent());
        });
        it('should return true if the target element has a parent with a fixed position', () => {
            target.targetEl = document.getElementById('positioned-target-by-parent');
            proclaim.isTrue(target.hasFixedParent());
        });
        it('should return false if the target element and all parents do not have a fixed position', () => {
            target.targetEl = document.getElementById('non-positioned-target');
            proclaim.isFalse(target.hasFixedParent());
        });
    });
});
