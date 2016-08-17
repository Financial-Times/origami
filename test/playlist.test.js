/* global describe, context, it, beforeEach, afterEach, before, after, should */
const Player = require('../src/js/video');
const Subject = require('../src/js/playlist');
const sinon = require('sinon/pkg/sinon');

function createStubPlayer () {
	const stub = sinon.createStubInstance(Player);
	stub.opts = {};
	stub.containerEl = document.createElement('div');
	stub.videoEl = document.createElement('video');
	stub.update.returns(Promise.resolve());

	return stub;
}

describe.only('Playlist', () => {
	let stubPlayer;

	beforeEach(() => {
		stubPlayer = createStubPlayer();
	});

	describe('constructor', () => {
		it('can instantiate', () => {
			const instance = new Subject({
				player: stubPlayer,
				queue: []
			});

			instance.should.be.an.instanceOf(Subject);

			instance.opts.should.exist;
			instance.opts.player.should.equal(stubPlayer);
		});

		it('selects currently playing video from playlist', () => {
			stubPlayer.videoData = { id: 'bar' };

			const instance = new Subject({
				player: stubPlayer,
				queue: ['foo', 'bar', 'baz', 'qux']
			});

			instance.currentIndex.should.equal(1);
		});

		it('starts the playlist if the current video does not match', () => {
			const instance = new Subject({
				player: stubPlayer,
				queue: ['foo', 'bar', 'baz', 'qux']
			});

			instance.currentIndex.should.equal(0);
			sinon.assert.calledOnce(stubPlayer.update);
		});

		it('listens for the video to end to trigger the next in the queue', () => {
			stubPlayer.videoData = { id: 'bar' };

			const instance = new Subject({
				player: stubPlayer,
				queue: ['foo', 'bar', 'baz', 'qux']
			});

			// no DOM so trigger this on the listener directly
			stubPlayer.containerEl.dispatchEvent(new CustomEvent('ended', { bubbles: false }));

			sinon.assert.calledOnce(stubPlayer.update);
			sinon.assert.calledWith(stubPlayer.update, sinon.match({ id: 'baz' }));
		});
	});

	describe('#next', () => {
		it('calls the next in the queue', () => {
			const instance = new Subject({
				player: stubPlayer,
				queue: ['foo', 'bar', 'baz', 'qux']
			});

			instance.currentIndex.should.equal(0);
			instance.next();
			instance.currentIndex.should.equal(1);
		});
	});

	describe('#prev', () => {
		it('calls the previous in the queue', () => {
			const instance = new Subject({
				player: stubPlayer,
				queue: ['foo', 'bar', 'baz', 'qux']
			});

			instance.currentIndex.should.equal(0);
			instance.prev();
			instance.currentIndex.should.equal(instance.opts.queue.length - 1);
		});
	});

	describe('#goto', () => {
		it('calls the update method on the player instance', () => {
			const instance = new Subject({
				player: stubPlayer,
				queue: ['foo', 'bar', 'baz', 'qux']
			});

			instance.goto(10);
			instance.currentIndex.should.equal(0);
			sinon.assert.calledWith(stubPlayer.update, sinon.match({ id: 'foo' }));

			instance.goto(-10);
			instance.currentIndex.should.equal(3);
			sinon.assert.calledWith(stubPlayer.update, sinon.match({ id: 'qux' }));
		});
	});
});
