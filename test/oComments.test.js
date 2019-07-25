/* eslint-env mocha */
import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import * as fixtures from './helpers/fixtures';

import OComments from '../main';
import * as auth from '../src/js/utils/auth';

describe("OComments", () => {
	it("is defined", () => {
		proclaim.equal(typeof OComments, 'function');
	});

	it("has a static init method", () => {
		proclaim.equal(typeof OComments.init, 'function');
	});

	it("should autoinitialize", (done) => {
		const initSpy = sinon.spy(OComments, 'init');
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
		setTimeout(function(){
			proclaim.equal(initSpy.called, true);
			initSpy.restore();
			done();
		}, 100);
	});

	it("should not autoinitialize when the event is not dispached", () => {
		const initSpy = sinon.spy(OComments, 'init');
		proclaim.equal(initSpy.called, false);
	});

	describe("when an authentication token is passed in", () => {
		const sandbox = sinon.sandbox.create();
		let comments;
		let rootElement;
		let scriptElement;
		let oCommentsReadyListener;

		before((done) => {
			sandbox.stub(auth, 'getJsonWebToken').resolves('fake-json-web-token');
			oCommentsReadyListener = () => {
				rootElement = comments.oCommentsEl;
				scriptElement = rootElement.querySelector('script');
				done();
			};

			document.addEventListener('oCommentsReady', oCommentsReadyListener);

			fixtures.htmlCode();
			comments = OComments.init('#element');
		});

		after(() => {
			sandbox.restore();
			document.removeEventListener('oCommentsReady', oCommentsReadyListener);
			fixtures.reset();
		});

		describe("._renderComments", () => {
			it("creates a script element", () => {
				proclaim.isNotNull(scriptElement);
			});

			it("sets the source to `embed.js`", () => {
				proclaim.include(scriptElement.src, 'embed.js');
			});

			it("sets an `onload` attribute", () => {
				const onloadAttribute = scriptElement.onload;
				proclaim.isNotNull(onloadAttribute);
				proclaim.isFunction(onloadAttribute);
			});
		});
	});

	describe("when an authentication fails", () => {
		const sandbox = sinon.sandbox.create();
		let comments;
		let rootElement;
		let scriptElement;
		let oCommentsReadyListener;

		before((done) => {
			sandbox.stub(auth, 'getJsonWebToken').rejects(new Error());
			oCommentsReadyListener = () => {
				rootElement = comments.oCommentsEl;
				scriptElement = rootElement.querySelector('script');
				done();
			};

			document.addEventListener('oCommentsFailed', oCommentsReadyListener);

			fixtures.htmlCode();
			comments = OComments.init('#element');
		});

		after(() => {
			document.removeEventListener('oCommentsFailed', oCommentsReadyListener);
			sandbox.restore();
			fixtures.reset();
		});

		it("won't create a script element", () => {
			proclaim.isNull(scriptElement);
		});
	});

	describe(".on", () => {
		let comments;
		let eventWasEmitted;

		beforeEach(() => {
			fixtures.htmlCode();
			comments = OComments.init('#element');
			eventWasEmitted = false;
		});

		afterEach(() => {
			fixtures.reset();
			eventWasEmitted = false;
			comments = false;
		});

		it("is a function", () => {
			proclaim.equal(typeof comments.on, 'function');
		});

		it("throws a error if it's missing a parameter", () => {
			proclaim.throws(() => comments.on('o-comments.ready'), '.on requires both the `event` & `callback` parameters');
		});

		it("throws a error if the event name isn't valid", () => {
			proclaim.throws(() => comments.on('not.real', () => {}), 'not.real is not a valid event');
		});

		it("throws a type error if the callback parameter isn't a function", () => {
			proclaim.throws(() => comments.on('o-comments.ready', 'Not a function'),'The callback must be a function');
		});

		it("calls the callback when the event is emitted", () => {
			comments.on('o-comments.ready', () => {
				eventWasEmitted = true;
			});

			document.dispatchEvent(new CustomEvent('o-comments.ready'));

			proclaim.isTrue(eventWasEmitted);
		});

		describe("when Coral Talk events are emitted", () => {
			it("maps the `ready` event", () => {
				comments.on('o-comments.ready', () => {
					eventWasEmitted = true;
				});

				window.dispatchEvent(new CustomEvent('talkEvent', {
					detail: {
						name: 'ready'
					}
				}));

				proclaim.isTrue(eventWasEmitted);
			});

			it("maps the `mutation.createComment` event", () => {
				comments.on('o-comments.comment.posted', () => {
					eventWasEmitted = true;
				});

				window.dispatchEvent(new CustomEvent('talkEvent', {
					detail: {
						name: 'mutation.createComment'
					}
				}));
				proclaim.isTrue(eventWasEmitted);
			});

			it("maps the `mutation.createCommentReaction` event", () => {
				comments.on('o-comments.comment.liked', () => {
					eventWasEmitted = true;
				});

				window.dispatchEvent(new CustomEvent('talkEvent', {
					detail: {
						name: 'mutation.createCommentReaction'
					}
				}));
				proclaim.isTrue(eventWasEmitted);
			});

			it("maps the `mutation.editComment` event", () => {
				comments.on('o-comments.comment.edited', () => {
					eventWasEmitted = true;
				});

				window.dispatchEvent(new CustomEvent('talkEvent', {
					detail: {
						name: 'mutation.editComment'
					}
				}));
				proclaim.isTrue(eventWasEmitted);
			});

			it("maps the `mutation.createCommentReply` event", () => {
				comments.on('o-comments.comment.replied', () => {
					eventWasEmitted = true;
				});

				window.dispatchEvent(new CustomEvent('talkEvent', {
					detail: {
						name: 'mutation.createCommentReply'
					}
				}));
				proclaim.isTrue(eventWasEmitted);
			});

			describe("when the payload contains an error", () => {
				it("maps the `COMMENT_IS_TOXIC` error event", () => {
					comments.on('o-comments.comment.toxic', () => {
						eventWasEmitted = true;
					});

					window.dispatchEvent(new CustomEvent('talkEvent', {
						detail: {
							data: {
								error: {
									errors: [
										{
											translation_key: 'COMMENT_IS_TOXIC'
										}
									]
								}
							}
						}
					}));

					proclaim.isTrue(eventWasEmitted);
				});

			});

			describe("when the payload contains an error and a valid event", () => {
				it("maps the `COMMENT_IS_TOXIC` error event", () => {
					let errorCalled = false;
					let eventCalled = false;

					comments.on('o-comments.comment.toxic', () => {
						errorCalled = true;
					});

					comments.on('o-comments.comment.edited', () => {
						eventCalled = true;
					});

					window.dispatchEvent(new CustomEvent('talkEvent', {
						detail: {
							name: 'mutation.editComment',
							data: {
								error: {
									errors: [
										{
											translation_key: 'COMMENT_IS_TOXIC'
										}
									]
								}
							}
						}
					}));

					proclaim.isTrue(errorCalled);
					proclaim.isTrue(eventCalled);
				});

			});
		});
	});
});
