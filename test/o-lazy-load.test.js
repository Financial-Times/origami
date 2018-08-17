/* eslint-env mocha */
import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import * as fixtures from './helpers/fixtures';
import waitUntil from './helpers/wait-until';
import Subject from './../main';

const sandbox = sinon.sandbox.create();

describe('o-lazy-load', () => {
	afterEach(() => {
		sinon.sandbox.restore();
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
					a.scrollIntoView();
					return waitUntil(() => proclaim.equal(a.dataset.oLazyLoad, 'true'));
				})
				.then(() => {
					b.scrollIntoView();
					return waitUntil(() => proclaim.equal(b.dataset.oLazyLoad, 'true'));
				})
				.then(() => {
					c.scrollIntoView();
					return waitUntil(() => proclaim.equal(c.dataset.oLazyLoad, 'true'));
				})
				.then(() => {
					d.scrollIntoView();
					return waitUntil(() => proclaim.equal(d.dataset.oLazyLoad, 'true'));
				});
		});

		it('loads target when moved into bounds', () => {
			const [ a, b, c, d ] = sandboxEl.querySelectorAll('.o-lazy-load');

			return Promise.resolve()
				.then(() => {
					a.scrollIntoView();
					return waitUntil(() => proclaim.equal(a.getAttribute('src'), 'path/to/img-1.jpg'));
				})
				.then(() => {
					b.scrollIntoView();
					return waitUntil(() => proclaim.equal(b.getAttribute('srcset'), 'path/to/img-2.jpg 800w'));
				})
				.then(() => {
					c.scrollIntoView();
					return waitUntil(() => proclaim.equal(c.classList.contains('o-lazy-load'), true));
				})
				.then(() => {
					const src = d.querySelector('source');
					const img = d.querySelector('img');

					d.scrollIntoView();

					return waitUntil(() => {
						proclaim.equal(src.getAttribute('srcset'), 'path/to/img-s.jpg');
						proclaim.equal(img.getAttribute('src'), 'path/to/img-l.jpg');
					});
				});
		});
	});
});