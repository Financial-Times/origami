import proclaim from 'proclaim';
import * as fixtures from '../../helpers/fixtures';
import Stream from '../../../src/js/stream';

module.exports = () => {
	beforeEach(() => {
		fixtures.streamMarkup();
	});

	afterEach(() => {
		fixtures.reset();
	});

	it("is a function", () => {
		const stream = new Stream();
		proclaim.equal(typeof stream.on, 'function');
	});

	it("throws a error if it's missing a parameter", () => {
		const stream = new Stream();
		proclaim.throws(() => stream.on('oComments.ready'), '.on requires both the `event` & `callback` parameters');
	});

	it("throws a error if the event name isn't valid", () => {
		const stream = new Stream();
		proclaim.throws(() => stream.on('not.real', () => {}), 'not.real is not a valid event');
	});

	it("throws a type error if the callback parameter isn't a function", () => {
		const stream = new Stream();
		proclaim.throws(() => stream.on('oComments.ready', 'Not a function'),'The callback must be a function');
	});

	it("calls the callback when the event is emitted", () => {
		const stream = new Stream();
		let eventWasEmitted = false;

		stream.on('oComments.ready', () => {
			eventWasEmitted = true;
		});

		stream.publishEvent({name: 'ready'});

		proclaim.isTrue(eventWasEmitted);
	});

	it("throttles events so callbacks are only called every 250 milliseconds", (done) => {
		const stream = new Stream();
		let onCount = 0;
		let listenerCount = 0;

		stream.on('oComments.ready', () => {
			onCount++;
		});

		document.addEventListener('oComments.ready', () => {
			listenerCount++;
		});

		const interval = window.setInterval(() => {
			stream.publishEvent({name: 'ready'});
		}, 10);

		window.setTimeout(() => {
			proclaim.equal(onCount, 2);
			proclaim.equal(listenerCount, 2);
			window.clearInterval(interval);
			done();
		}, 270);
	});

	describe("when Coral Talk events are emitted", () => {
		it("maps the `ready` event", (done) => {
			const stream = new Stream();

			stream.on('oComments.ready', () => {
				proclaim.isTrue(true);
				done();
			});

			stream.publishEvent({name: 'ready'});

		});

		it("maps the `mutation.createComment` event", (done) => {
			const stream = new Stream();

			stream.on('oComments.postComment', () => {
				proclaim.isTrue(true);
				done();
			});

			stream.publishEvent({name: 'mutation.createComment'});
		});

		it("maps the `mutation.createCommentReaction` event", (done) => {
			const stream = new Stream();

			stream.on('oComments.likeComment', () => {
				proclaim.isTrue(true);
				done();
			});

			stream.publishEvent({name: 'mutation.createCommentReaction'});
		});

		it("maps the `mutation.editComment` event", (done) => {
			const stream = new Stream();

			stream.on('oComments.editComment', () => {
				proclaim.isTrue(true);
				done();
			});

			stream.publishEvent({name: 'mutation.editComment'});
		});

		it("maps the `mutation.createCommentReply` event", (done) => {
			const stream = new Stream();

			stream.on('oComments.replyComment', () => {
				proclaim.isTrue(true);
				done();
			});

			stream.publishEvent({name: 'mutation.createCommentReply'});
		});

		describe("when the payload contains an error", () => {
			it("maps the `COMMENT_IS_TOXIC` error event", (done) => {
				const stream = new Stream();

				stream.on('oComments.toxicComment', () => {
					proclaim.isTrue(true);
					done();
				});

				stream.publishEvent({
					data: {
						error: {
							errors: [
								{
									translation_key: 'COMMENT_IS_TOXIC'
								}
							]
						}
					}
				});
			});

		});

		describe("when the payload contains an error and a valid event", () => {
			it("maps the `COMMENT_IS_TOXIC` error event", (done) => {
				const stream = new Stream();

				stream.on('oComments.toxicComment', () => {
					proclaim.isTrue(true);
					done();
				});

				stream.publishEvent({
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
				});
			});

			it("maps the valid  event", (done) => {
				const stream = new Stream();

				stream.on('oComments.editComment', () => {
					proclaim.isTrue(true);
					done();
				});

				stream.publishEvent({
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
				});
			});
		});
	});
};
