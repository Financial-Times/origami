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
		beforeEach(() => {
			fixtures.htmlCode();
		});

		afterEach(() => {
			fixtures.reset();
		});

		it("is a function", () => {
			const comments = OComments.init('#element');
			proclaim.equal(typeof comments.on, 'function');
		});

		it("throws a error if it's missing a parameter", () => {
			const comments = OComments.init('#element');
			proclaim.throws(() => comments.on('component.render.successful'), '.on requires both the `event` & `callback` parameters');
		});

		it("throws a error if the event name isn't valid", () => {
			const comments = OComments.init('#element');
			proclaim.throws(() => comments.on('not.real', () => {}), 'not.real is not a valid event');
		});

		it("throws a type error if the callback parameter isn't a function", () => {
			const comments = OComments.init('#element');
			proclaim.throws(() => comments.on('component.render.successful', 'Not a function'),'The callback must be a function');
		});

		it("calls the callback when the event is omitted", () => {
			let beenCalled = false;
			const comments = OComments.init('#element');
			comments.on('component.render.successful', () => {
				beenCalled = true;
			});

			document.dispatchEvent(new CustomEvent('component.render.successful'));

			proclaim.isTrue(beenCalled);
		});

		describe("when Coral Talk events are omittd", () => {
			it("maps the `query.CoralEmbedStream_Embed.ready` event", () => {
				let beenCalled = false;
				const comments = OComments.init('#element');
				comments.on('component.render.successful', () => {
					beenCalled = true;
				});

				window.dispatchEvent(new CustomEvent('talkEvent', {
					detail: {
						name: 'query.CoralEmbedStream_Embed.ready'
					}
				}));

				proclaim.isTrue(beenCalled);
			});

			it("maps the `mutation.PostComment.success` event", () => {
				let beenCalled = false;
				const comments = OComments.init('#element');
				comments.on('comment.posted.successful', () => {
					beenCalled = true;
				});

				window.dispatchEvent(new CustomEvent('talkEvent', {
					detail: {
						name: 'mutation.PostComment.success'
					}
				}));
				proclaim.isTrue(beenCalled);
			});

			it("maps the `mutation.CreateLikeAction.success` event", () => {
				let beenCalled = false;
				const comments = OComments.init('#element');
				comments.on('comment.liked.successful', () => {
					beenCalled = true;
				});

				window.dispatchEvent(new CustomEvent('talkEvent', {
					detail: {
						name: 'mutation.CreateLikeAction.success'
					}
				}));
				proclaim.isTrue(beenCalled);
			});

			it("maps the `action.TALK_FRAMEWORK_CHECK_LOGIN_SUCCESS` event", () => {
				let beenCalled = false;
				const comments = OComments.init('#element');
				comments.on('auth.login.successful', () => {
					beenCalled = true;
				});

				window.dispatchEvent(new CustomEvent('talkEvent', {
					detail: {
						name: 'action.TALK_FRAMEWORK_CHECK_LOGIN_SUCCESS'
					}
				}));
				proclaim.isTrue(beenCalled);
			});

			it("maps the `action.SHOW_SIGNIN_DIALOG` event", () => {
				let beenCalled = false;
				const comments = OComments.init('#element');
				comments.on('auth.login.required', () => {
					beenCalled = true;
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
