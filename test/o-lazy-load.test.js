/* eslint-env mocha */
/* global proclaim sinon */

import * as fixtures from './helpers/fixtures';
import waitUntil from './helpers/wait-until';
import Subject from './../main';

describe('o-lazy-load', () => {
	let sandbox;
	beforeEach(() => {
		sandbox = sinon.createSandbox();
	});

	afterEach(() => {
		sandbox.restore();
	});

	it('is defined', () => {
		proclaim.equal(typeof Subject, 'function');
	});

	it('has a static init method', () => {
		proclaim.equal(typeof Subject.init, 'function');
	});

	it('should autoinitialize', () => {
		const initSpy = sandbox.spy(Subject, 'init');

		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));

		return waitUntil(() => proclaim.equal(initSpy.called, true));
	});

	describe('observing the viewport', () => {
		let instance;

		afterEach(() => {
			instance.observer.disconnect();
		});

		it('sets root to null if the root is the document element', () => {
			instance = new Subject(document.documentElement);
			proclaim.isNull(instance.options.root);
		});

		it('sets root to null if the root is the body element', () => {
			instance = new Subject(document.body);
			proclaim.isNull(instance.options.root);
		});
	});

	describe('visibility changes', () => {
		let instance;
		let sandboxEl;

		beforeEach(() => {
			fixtures.htmlCode();
			sandboxEl = document.getElementById('scrollable');
			instance = new Subject(sandboxEl);
		});

		afterEach(() => {
			instance.observer.disconnect();
			fixtures.reset();
		});

		it('loads target when moved into bounds', () => {
			const [ a, b, c, d ] = sandboxEl.querySelectorAll('.o-lazy-load');

			return Promise.resolve()
				.then(() => {
					// proclaim.isUndefined(a.dataset.oLazyLoad);
					a.scrollIntoView();
					return waitUntil(() => proclaim.equal(a.dataset.oLazyLoad, 'true'));
				})
				.then(() => {
					// proclaim.isUndefined(b.dataset.oLazyLoad);
					b.scrollIntoView();
					return waitUntil(() => proclaim.equal(b.dataset.oLazyLoad, 'true'));
				})
				.then(() => {
					// proclaim.isUndefined(c.dataset.oLazyLoad);
					c.scrollIntoView();
					return waitUntil(() => proclaim.equal(c.dataset.oLazyLoad, 'true'));
				})
				.then(() => {
					// proclaim.isUndefined(d.dataset.oLazyLoad);
					d.scrollIntoView();
					return waitUntil(() => proclaim.equal(d.dataset.oLazyLoad, 'true'));
				});
		});

		it('can load images, pictures, and toggle class names', () => {
			const [ a, b, c, d ] = sandboxEl.querySelectorAll('.o-lazy-load');

			return Promise.resolve()
				.then(() => {
					// <img data-src>
					proclaim.isNull(a.getAttribute('src'));
					a.scrollIntoView();
					return waitUntil(() => proclaim.equal(a.getAttribute('src'), 'path/to/img-1.jpg'));
				})
				.then(() => {
					// <img data-srcset>
					proclaim.isNull(b.getAttribute('srcset'));
					b.scrollIntoView();
					return waitUntil(() => proclaim.equal(b.getAttribute('srcset'), 'path/to/img-2.jpg 800w'));
				})
				.then(() => {
					// <div data-toggle-class></div>
					proclaim.isFalse(c.classList.contains('is-loaded'));
					c.scrollIntoView();
					return waitUntil(() => proclaim.isTrue(c.classList.contains('is-loaded')));
				})
				.then(() => {
					// <picture><source data-srcset><img data-src></picture>
					const source = d.querySelector('source');
					const img = d.querySelector('img');

					proclaim.isNull(source.getAttribute('srcset'));
					proclaim.isNull(img.getAttribute('src'));

					d.scrollIntoView();

					return waitUntil(() => {
						proclaim.equal(source.getAttribute('srcset'), 'path/to/img-s.jpg');
						proclaim.equal(img.getAttribute('src'), 'path/to/img-l.jpg');
					});
				});
		});
	});
});