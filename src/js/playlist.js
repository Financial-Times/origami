class Playlist {
	constructor (opts) {
		this.opts = opts;

		// find the currently playing video, always deal with strings
		const currentId = opts.player.videoData ? opts.player.videoData.id : opts.player.opts.id;
		this.currentIndex = currentId ? opts.queue.indexOf(currentId.toString()) : -1;

		this.cache = {};

		if (this.opts.autoplay) {
			this.opts.player.containerEl.addEventListener('ended', this.next.bind(this), true);

			if ( this.currentIndex === -1) {
				this.next();
			}
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

		// store the current data for quick access later
		const currentVideoId = this.opts.player.videoData && this.opts.player.videoData.id;

		if (currentVideoId && !this.cache[currentVideoId]) {
			this.cache[currentVideoId] = this.opts.player.videoData;
		}

		// fire off any current watched data
		this.opts.player.fireWatchedEvent();
		this.opts.player.resetAmountWatched();

		const nextVideoId = this.opts.queue[this.currentIndex];

		const nextVideoOpts = {
			id: nextVideoId,
			data: this.cache[nextVideoId]
		};

		return this.opts.player.update(nextVideoOpts).then(() => {
			if (this.opts.player.videoEl) {
				this.opts.player.videoEl.play();
			}
		});
	}
}

export default Playlist;
