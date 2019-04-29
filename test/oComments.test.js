/* eslint-env mocha */
import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import * as fixtures from './helpers/fixtures';

import OComments from '../main';

describe("OComments", () => {
	it('is defined', () => {
		proclaim.equal(typeof OComments, 'function');
	});

	it('has a static init method', () => {
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

	describe("new Comments(oCommentsEl, opts)", () => {
		let boilerplate;
		let rootElement;
		let scriptElement;

		beforeEach(() => {
			fixtures.htmlCode();
			boilerplate = OComments.init('#element');
			rootElement = boilerplate.oCommentsEl;
			scriptElement = rootElement.querySelector('script');
		});

		afterEach(() => {
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
			proclaim.throws(() => comments.on('component.render.successful'), '.on requires both the `event` & `callback` parameters');
		});

		it("throws a error if the event name isn't valid", () => {
			proclaim.throws(() => comments.on('not.real', () => {}), 'not.real is not a valid event');
		});

		it("throws a type error if the callback parameter isn't a function", () => {
			proclaim.throws(() => comments.on('component.render.successful', 'Not a function'),'The callback must be a function');
		});

		it("calls the callback when the event is omitted", () => {
			comments.on('component.render.successful', () => {
				eventWasEmitted = true;
			});

			document.dispatchEvent(new CustomEvent('component.render.successful'));

			proclaim.isTrue(eventWasEmitted);
		});

		describe("when Coral Talk events are omittd", () => {
			it("maps the `query.CoralEmbedStream_Embed.ready` event", () => {
				comments.on('component.render.successful', () => {
					eventWasEmitted = true;
				});

				window.dispatchEvent(new CustomEvent('talkEvent', {
					detail: {
						name: 'query.CoralEmbedStream_Embed.ready'
					}
				}));

				proclaim.isTrue(eventWasEmitted);
			});

			it("maps the `mutation.PostComment.success` event", () => {
				comments.on('comment.posted.successful', () => {
					eventWasEmitted = true;
				});

				window.dispatchEvent(new CustomEvent('talkEvent', {
					detail: {
						name: 'mutation.PostComment.success'
					}
				}));
				proclaim.isTrue(eventWasEmitted);
			});

			it("maps the `mutation.CreateLikeAction.success` event", () => {
				comments.on('comment.liked.successful', () => {
					eventWasEmitted = true;
				});

				window.dispatchEvent(new CustomEvent('talkEvent', {
					detail: {
						name: 'mutation.CreateLikeAction.success'
					}
				}));
				proclaim.isTrue(eventWasEmitted);
			});

			it("maps the `action.TALK_FRAMEWORK_CHECK_LOGIN_SUCCESS` event", () => {
				comments.on('auth.login.successful', () => {
					eventWasEmitted = true;
				});

				window.dispatchEvent(new CustomEvent('talkEvent', {
					detail: {
						name: 'action.TALK_FRAMEWORK_CHECK_LOGIN_SUCCESS'
					}
				}));
				proclaim.isTrue(eventWasEmitted);
			});

			it("maps the `action.SHOW_SIGNIN_DIALOG` event", () => {
				comments.on('auth.login.required', () => {
					eventWasEmitted = true;
				});

				window.dispatchEvent(new CustomEvent('talkEvent', {
					detail: {
						name: 'action.SHOW_SIGNIN_DIALOG'
					}
				}));
				proclaim.isTrue(beenCalled);
			});
		});
	});
});
