/* global describe, it, beforeEach */
const Player = require('../src/js/video');
const Subject = require('../src/js/playlist');
const sinon = require('sinon/pkg/sinon');

function createPlayer () {
	const stub = sinon.createStubInstance(Player);
	stub.opts = {};
	stub.containerEl = document.createElement('div');
	stub.videoEl = document.createElement('video');
	stub.update.returns(Promise.resolve());

	return stub;
}

describe('Playlist', () => {
	let player;
	const queue = ['foo', 'bar', 'baz', 'qux'];

	beforeEach(() => {
		player = createPlayer();
	});

	describe('constructor', () => {
		it('can instantiate', () => {
			const instance = new Subject({ player, queue: [] });

			instance.should.be.an.instanceOf(Subject);

			instance.opts.should.exist;
			instance.opts.player.should.equal(player);
		});

		it('selects currently playing video from playlist', () => {
			player.videoData = { id: 'bar' };

			const instance = new Subject({ player, queue });

			instance.currentIndex.should.equal(1);
		});

		it('starts the playlist if the current video does not match', () => {
			const instance = new Subject({ player, queue, autoplay: true });

			instance.currentIndex.should.equal(0);
			sinon.assert.calledOnce(player.update);
		});

		it('listens for the video to end to trigger the next in the queue', () => {
			player.videoData = { id: 'bar' };

			new Subject({ player, queue, autoplay: true });

			// no DOM so trigger this on the listener directly
			player.containerEl.dispatchEvent(new CustomEvent('ended', { bubbles: false }));

			sinon.assert.calledOnce(player.update);
			sinon.assert.calledWith(player.update, sinon.match({ id: 'baz' }));
		});
	});

	describe('#next', () => {
		it('calls the next in the queue', () => {
			const instance = new Subject({ player, queue, autoplay: true });

			instance.currentIndex.should.equal(0);
			instance.next();
			instance.currentIndex.should.equal(1);
		});
	});

	describe('#prev', () => {
		it('calls the previous in the queue', () => {
			const instance = new Subject({ player, queue, autoplay: true });

			instance.currentIndex.should.equal(0);
			instance.prev();
			instance.currentIndex.should.equal(instance.opts.queue.length - 1);
		});
	});

	describe('#goto', () => {
		it('calls the update method on the player instance', () => {
			const instance = new Subject({ player, queue });

			instance.goto(10);
			instance.currentIndex.should.equal(0);
			sinon.assert.calledWith(player.update, sinon.match({ id: 'foo' }));

			instance.goto(-10);
			instance.currentIndex.should.equal(3);
			sinon.assert.calledWith(player.update, sinon.match({ id: 'qux' }));
		});

		it('stores the currently playing video data', () => {
			const instance = new Subject({ player, queue });

			player.videoData = { id: 'abc' };

			instance.goto(1);

			instance.cache.hasOwnProperty('abc').should.be.true;
		});

		it('retrieves next video from cache when available', () => {
			const instance = new Subject({ player, queue });

			instance.cache.foo = { id: 'foo', name: 'lorem ipsum doler sit amet' };

			instance.goto(0);

			sinon.assert.calledWith(player.update, sinon.match({ data: instance.cache.foo }));
		});
	});
});
