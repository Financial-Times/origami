function formatBrand (tags) {
	const regex = /brand:/i;
	const tag = tags && tags.find(tag => regex.test(tag));

	return tag && tag.replace(regex, '');
}

function formatDuration (lengthInMs) {
	const lengthInSeconds = Math.ceil(lengthInMs / 1000);
	const minutes = '' + Math.floor(lengthInSeconds / 60);
	const seconds = '' + (lengthInSeconds % 60);

	return `${minutes}:${seconds.length === 1 ? '0' + seconds : seconds}`;
}

class VideoInfo {
	constructor (video) {
		this.video = video;

		this.opts = this.video.opts.placeholderInfo.reduce((map, key) => {
			map[key] = true;
			return map;
		}, {});

		this.infoEl = document.createElement('div');
		this.infoEl.className = 'o-video__info';

		if (this.opts.brand) {
			this.brandEl = document.createElement('span');
			this.brandEl.className = 'o-video__info-brand';
			this.infoEl.appendChild(this.brandEl);
		}

		if (this.opts.duration) {
			this.durationEl = document.createElement('span');
			this.durationEl.className = 'o-video__info-duration';
			this.infoEl.appendChild(this.durationEl);
		}

		if (this.opts.title) {
			this.titleEl = document.createElement('h4');
			this.titleEl.className = 'o-video__info-title';
			this.infoEl.appendChild(this.titleEl);
		}

		if (this.opts.description) {
			this.descriptionEl = document.createElement('p');
			this.descriptionEl.className = 'o-video__info-description';
			this.infoEl.appendChild(this.descriptionEl);
		}

		this.update();

		this.video.placeholderEl.appendChild(this.infoEl);
	}

	update () {
		if (this.brandEl) {
			this.brandEl.textContent = formatBrand(this.video.videoData.tags);
		}

		if (this.durationEl) {
			this.durationEl.textContent = formatDuration(this.video.videoData.length);
		}

		if (this.titleEl) {
			this.titleEl.textContent = this.video.videoData.name;
		}

		if (this.descriptionEl) {
			this.descriptionEl.textContent = this.video.videoData.shortDescription;
		}
	}

	teardown () {
		this.video.placeholderEl.removeChild(this.infoEl);

		delete this.infoEl;
		delete this.brandEl;
		delete this.titleEl;
		delete this.durationEl;
		delete this.descriptionEl;
	}
}

export default VideoInfo;
