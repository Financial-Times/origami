/* eslint-env mocha */
/* global proclaim sinon */

import Player from '../src/js/video';
import Subject from '../src/js/playlist';

function createPlayer () {
	const stub = sinon.createStubInstance(Player);
	stub.opts = {};
	stub.containerEl = document.createElement('div');
	stub.videoEl = document.createElement('video');
	stub.update.returns(Promise.resolve());
	stub.fireWatchedEvent = sinon.spy();
	stub.resetAmountWatched = sinon.spy();

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

			proclaim.isInstanceOf(instance, Subject);

			proclaim.ok(instance.opts);
			proclaim.equal(instance.opts.player, player);
		});

		it('selects currently playing video from playlist', () => {
			player.videoData = { id: 'bar' };

			const instance = new Subject({ player, queue });

			proclaim.equal(instance.currentIndex, 1);
		});

		it('starts the playlist if the current video does not match', () => {
			const instance = new Subject({ player, queue, autoplay: true });

			proclaim.equal(instance.currentIndex, 0);
			sinon.assert.calledOnce(player.update);
		});

		it('listens for the video to end to trigger the next in the queue when autoplay is set', () => {
			player.videoData = { id: 'bar' };

			new Subject({ player, queue, autoplay: true });

			// no DOM so trigger this on the listener directly
			player.containerEl.dispatchEvent(new CustomEvent('ended', { bubbles: false }));

			sinon.assert.calledOnce(player.update);
			sinon.assert.calledWith(player.update, sinon.match({ id: 'baz' }));
		});

		it('doesn\'t listen for the video to end when autoplay is not set', () => {
			player.videoData = { id: 'bar' };

			new Subject({ player, queue, autoplay: false });

			player.containerEl.dispatchEvent(new CustomEvent('ended', { bubbles: false }));

			sinon.assert.notCalled(player.update);
		});
	});

	describe('#next', () => {
		it('calls the next in the queue', () => {
			const instance = new Subject({ player, queue, autoplay: true });

			proclaim.equal(instance.currentIndex, 0);
			instance.next();
			proclaim.equal(instance.currentIndex, 1);
		});
	});

	describe('#prev', () => {
		it('calls the previous in the queue', () => {
			const instance = new Subject({ player, queue, autoplay: true });

			proclaim.equal(instance.currentIndex, 0);
			instance.prev();
			proclaim.equal(instance.currentIndex, instance.opts.queue.length - 1);
		});
	});

	describe('#goto', () => {
		it('calls the update method on the player instance', () => {
			const instance = new Subject({ player, queue });

			instance.goto(10);
			proclaim.equal(instance.currentIndex, 0);
			sinon.assert.calledWith(player.update, sinon.match({ id: 'foo' }));

			instance.goto(-10);
			proclaim.equal(instance.currentIndex, 3);
			sinon.assert.calledWith(player.update, sinon.match({ id: 'qux' }));
		});

		it('stores the currently playing video data', () => {
			const instance = new Subject({ player, queue });

			player.videoData = { id: 'abc' };

			instance.goto(1);

			proclaim.isTrue(instance.cache.hasOwnProperty('abc'));
		});

		it('retrieves next video from cache when available', () => {
			const instance = new Subject({ player, queue });

			instance.cache.foo = { id: 'foo', name: 'lorem ipsum doler sit amet' };

			instance.goto(0);

			sinon.assert.calledWith(player.update, sinon.match({ data: instance.cache.foo }));
		});

		it('fires off watched event data', () => {
			const instance = new Subject({ player, queue });
			instance.goto(0);

			sinon.assert.called(player.fireWatchedEvent);
		});

		it('resets amount watched', () => {
			const instance = new Subject({ player, queue });
			instance.goto(0);

			sinon.assert.called(player.resetAmountWatched);
		});
	});
});
