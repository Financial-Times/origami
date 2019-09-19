import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import * as fixtures from '../../helpers/fixtures';
import Stream from '../../../src/js/stream';

const sandbox = sinon.createSandbox();

module.exports = () => {
	beforeEach(() => {
		fixtures.streamMarkup();
	});

	afterEach(() => {
		fixtures.reset();
		sandbox.restore();
	});

	describe("valid event", () => {
		it("maps coral events to oComment events", (done) => {
			const listenerStub = sandbox.stub();
			document.addEventListener('oComments.ready', () => {
				listenerStub();
				done();
			});

			const stream = new Stream();
			stream.publishEvent({ name: 'ready' });

			proclaim.isTrue(listenerStub.calledOnce);
		});

		it("maps coral events to oTracking events", (done) => {
			const listenerStub = sandbox.stub();
			document.addEventListener('oTracking.event', (event) => {

				if (event.detail.category === 'comment' && event.detail.action === 'ready') {
					listenerStub();
					done();
				}
			});

			const stream = new Stream();
			stream.publishEvent({ name: 'ready' });

			proclaim.isTrue(listenerStub.calledOnce);
		});

		it("doesn't emit oTracking events if it has been disabled", (done) => {
			const listenerStub = sandbox.stub();
			const commentsElement = document.getElementById('o-comments-stream');

			document.addEventListener('oTracking.event', (event) => {
				if (event.detail.category === 'comment' && event.detail.action === 'ready') {
					listenerStub();
				}
			});

			commentsElement.addEventListener('oComments.ready', () => {
				listenerStub();

				window.setTimeout(done, 500);

			});

			// Removing the o-component data attribute will prevent auto-initialisation
			delete commentsElement.dataset.oComponent;

			const stream = new Stream(commentsElement, {
				disableOTracking: true
			});

			stream.publishEvent({ name: 'ready' });

			proclaim.isTrue(listenerStub.calledOnce);
		});

		it("only maps 1 event every 100 milliseconds", (done) => {
			const listenerStub = sandbox.stub();
			document.addEventListener('oComments.ready', listenerStub);

			const stream = new Stream();

			const interval = window.setInterval(() => {
				stream.publishEvent({ name: 'ready' });
			}, 10);

			window.setTimeout(() => {
				proclaim.isTrue(listenerStub.calledTwice);
				window.clearInterval(interval);
				done();
			}, 120);
		});
	});

	describe("valid coral error", () => {
		it("maps coral errors to oComment events", (done) => {
			const listenerStub = sandbox.stub();
			document.addEventListener('oComments.toxicComment', () => {
				listenerStub();
				done();
			});

			const stream = new Stream();

			stream.publishEvent({ name: 'oComments.postComment', data: {
				error: {
					errors: [
						{
							translation_key: 'COMMENT_IS_TOXIC'
						}
					]
				}
			}});

			proclaim.isTrue(listenerStub.calledOnce);
		});

		it("maps coral errors to oTracking events", (done) => {
			const listenerStub = sandbox.stub();
			document.addEventListener('oTracking.event', () => {
				if (event.detail.category === 'comment' && event.detail.action === 'post-rejected-toxic') {
					listenerStub();
					done();
				}
			});

			const stream = new Stream();

			stream.publishEvent({ name: 'oComments.postComment', data: {
				error: {
					errors: [
						{
							translation_key: 'COMMENT_IS_TOXIC'
						}
					]
				}
			}});

			proclaim.isTrue(listenerStub.calledOnce);
		});

		it("doesn't emit oTracking events if it has been disabled", (done) => {
			const listenerStub = sandbox.stub();
			const commentsElement = document.getElementById('o-comments-stream');

			document.addEventListener('oTracking.event', (event) => {
				if (event.detail.category === 'comment' && event.detail.action === 'post-rejected-toxic') {
					listenerStub();
				}
			});

			commentsElement.addEventListener('oComments.toxicComment', () => {
				listenerStub();

				window.setTimeout(done, 500);

			});

			// Removing the o-component data attribute will prevent auto-initialisation
			delete commentsElement.dataset.oComponent;

			const stream = new Stream(commentsElement, {
				disableOTracking: true
			});

			stream.publishEvent({ name: 'oComments.postComment', data: {
				error: {
					errors: [
						{
							translation_key: 'COMMENT_IS_TOXIC'
						}
					]
				}
			}});

			proclaim.isTrue(listenerStub.calledOnce);
		});


		it("only maps 1 event every 100 milliseconds", (done) => {
			const listenerStub = sandbox.stub();
			document.addEventListener('oTracking.event', () => {
				if (event.detail.category === 'comment' && event.detail.action === 'post-rejected-toxic') {
					listenerStub();
					done();
				}
			});

			const stream = new Stream();
			const interval = window.setInterval(() => {
				stream.publishEvent({ name: 'oComments.postComment', data: {
					error: {
						errors: [
							{
								translation_key: 'COMMENT_IS_TOXIC'
							}
						]
					}
				}});
			}, 10);

			window.setTimeout(() => {
				proclaim.isTrue(listenerStub.calledTwice);
				window.clearInterval(interval);
				done();
			}, 120);
		});
	});
};
