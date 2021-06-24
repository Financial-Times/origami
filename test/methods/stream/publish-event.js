/* eslint-env mocha */
/* global proclaim sinon */
import fixtures from '../../helpers/fixtures.js';
import Stream from '../../../src/js/stream.js';

export default function publishEvent () {
	beforeEach(() => {
		fixtures.streamMarkup();
	});

	afterEach(() => {
		fixtures.reset();
		sinon.restore();
	});

	describe("valid event", () => {
		describe("loginPrompt event", () => {
			describe("this.userHasValidSession is truthy", () => {
				it("calls displayNamePrompt", () => {
					const displayNamePromptStub = sinon.stub();

					const stream = new Stream();
					stream.userHasValidSession = true;
					stream.displayNamePrompt = displayNamePromptStub;
					stream.publishEvent({ name: 'loginPrompt' });

					proclaim.isTrue(displayNamePromptStub.calledOnce);
				});
			});

			describe("this.userHasValidSession is falsy", () => {
				it("doesn't calls displayNamePrompt", () => {
					const displayNamePromptStub = sinon.stub();

					const stream = new Stream();
					stream.userHasValidSession = false;
					stream.displayNamePrompt = displayNamePromptStub;
					stream.publishEvent({ name: 'loginPrompt' });

					proclaim.isFalse(displayNamePromptStub.calledOnce);
				});
			});
		});

		it("maps coral events to oComment events", (done) => {
			const listener = () => {
				document.removeEventListener('oComments.ready', listener);
				done();
			};
			document.addEventListener('oComments.ready', listener);

			const stream = new Stream();
			stream.publishEvent({ name: 'ready' });
		});

		it("maps coral events to oTracking events", (done) => {
			const listener = (event) => {
				document.removeEventListener('oTracking.event', listener);
				try {
					proclaim.equal(event.detail.category, 'comment');
					proclaim.equal(event.detail.action, 'ready');
					done();
				} catch (error) {
					done(error);
				}
			};
			document.addEventListener('oTracking.event', listener);

			const stream = new Stream();
			stream.publishEvent({ name: 'ready' });
		});

		it("sets isWithheld to true when a comment is withheld for moderation", (done) => {
			const listener = (event) => {
				document.removeEventListener('oTracking.event', listener);
				try {
					proclaim.isTrue(event.detail.isWithheld);
					done();
				} catch (error) {
					done(error);
				}
			};
			document.addEventListener('oTracking.event', listener);

			const stream = new Stream();
			stream.publishEvent({
				name: 'createComment.success',
				data: {
					success: {
						status: 'SYSTEM_WITHHELD'
					}
				}
			});
		});

		it("doesn't emit oTracking events if it has been disabled", (done) => {
			const oTrackingEventListener = (event) => {
				if (event.detail.category === 'comment' && event.detail.action === 'ready') {
					document.removeEventListener('oTracking.event', oTrackingEventListener);
					done(new Error('This event should not have been fired'));
				}
			};
			document.addEventListener('oTracking.event', oTrackingEventListener);

			// Removing the o-component data attribute will prevent auto-initialisation
			const commentsElement = document.getElementById('o-comments-stream');
			delete commentsElement.dataset.oComponent;

			const stream = new Stream(commentsElement, {
				disableOTracking: true
			});
			stream.publishEvent({ name: 'ready' });
			document.removeEventListener('oTracking.event', oTrackingEventListener);

			window.setTimeout(() => {
				document.removeEventListener('oTracking.event', oTrackingEventListener);
				done();
			}, 500);
		});

		it("only maps 1 event every 100 milliseconds", (done) => {
			const listenerStub = sinon.stub();
			document.addEventListener('oComments.ready', listenerStub);

			const stream = new Stream();
			const interval = window.setInterval(() => {
				stream.publishEvent({ name: 'ready' });
			}, 10);

			window.setTimeout(() => {
				window.clearInterval(interval);
				document.removeEventListener('oComments.ready', listenerStub);
				try {
					proclaim.equal(listenerStub.getCalls().length, 2);
					done();
				} catch (error) {
					done(error);
				}
			}, 120);
		});
	});

	describe("valid coral error", () => {
		it("maps coral errors to oComment events", (done) => {
			const listener = () => {
				document.removeEventListener('oComments.errorComment', listener);
				done();
			};
			document.addEventListener('oComments.errorComment', listener);

			const stream = new Stream();
			stream.publishEvent({ name: 'createComment.error' });
		});

		it("maps coral errors to oTracking events", (done) => {
			const listener = (event) => {
				document.removeEventListener('oTracking.event', listener);
				try {
					proclaim.equal(event.detail.category, 'comment');
					proclaim.equal(event.detail.action, 'post-error');
					done();
				} catch (error) {
					done(error);
				}
			};
			document.addEventListener('oTracking.event', listener);

			const stream = new Stream();
			stream.publishEvent({
				name: 'createComment.error',
				data: {
					error: {
						code: 'TOXIC_COMMENT'
					}
				}
			});
		});

		it("doesn't emit oTracking events if it has been disabled", (done) => {
			const listener = (event) => {
				if (event.detail.category === 'comment' && event.detail.action === 'post-error') {
					document.removeEventListener('oTracking.event', listener);
					done(new Error('This event should not have been fired'));
				}
			};
			document.addEventListener('oTracking.event', listener);

			// Removing the o-component data attribute will prevent auto-initialisation
			const commentsElement = document.getElementById('o-comments-stream');
			delete commentsElement.dataset.oComponent;

			const stream = new Stream(commentsElement, {
				disableOTracking: true
			});
			stream.publishEvent({
				name: 'createComment.error',
				data: {
					error: {
						code: 'TOXIC_COMMENT'
					}
				}
			});
			document.removeEventListener('oTracking.event', listener);

			window.setTimeout(() => {
				document.removeEventListener('oTracking.event', listener);
				done();
			}, 500);
		});


		it("only maps 1 event every 100 milliseconds", (done) => {
			const listenerStub = sinon.stub();
			const listener = (event) => {
				if (event.detail.category === 'comment' && event.detail.action === 'post-error') {
					listenerStub();
				}
			};
			document.addEventListener('oTracking.event', listener);

			const stream = new Stream();
			const interval = window.setInterval(() => {
				stream.publishEvent({
					name: 'createComment.error',
					data: {
						error: {
							code: 'TOXIC_COMMENT'
						}
					}
				});
			}, 10);

			window.setTimeout(() => {
				window.clearInterval(interval);
				document.removeEventListener('oTracking.event', listener);
				try {
					proclaim.equal(listenerStub.getCalls().length, 2);
					done();
				} catch (error) {
					done(error);
				}
			}, 120);
		});
	});
}
