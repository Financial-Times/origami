import Player from './video';

class Playlist {
	constructor (opts) {
		this.opts = opts;

		// find the currently playing video, always deal with strings
		const currentId = opts.player.videoData ? opts.player.videoData.id : opts.player.opts.id;
		this.currentIndex = currentId ? opts.queue.indexOf(currentId.toString()) : -1;

		this.opts.player.containerEl.addEventListener('ended', this.next.bind(this), true);

		if (this.currentIndex === -1) {
			this.next();
		}
	}

	next () {
		this.goto(this.currentIndex + 1);
	}

	prev () {
		this.goto(this.currentIndex - 1);
	}

	goto (index) {
		if (index < 0) {
			this.currentIndex = this.opts.queue.length - 1;
		} else if (index >= this.opts.queue.length) {
			this.currentIndex = 0;
		} else {
			this.currentIndex = index;
		}

		return this.opts.player.update({ id: this.opts.queue[this.currentIndex] }).then(() => {
			if (this.opts.player.videoEl) {
				this.opts.player.videoEl.play();
			}
		});
	}
}

export default Playlist;