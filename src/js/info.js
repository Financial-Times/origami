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
			const brandName = this.video.videoData.brand && this.video.videoData.brand.name;
			this.brandEl.textContent = brandName;
		}

		if (this.titleEl) {
			this.titleEl.textContent = this.video.videoData.title;
		}

		if (this.descriptionEl) {
			this.descriptionEl.textContent = this.video.videoData.standfirst;
		}
	}

	teardown () {
		this.video.placeholderEl.removeChild(this.infoEl);

		delete this.infoEl;
		delete this.brandEl;
		delete this.titleEl;
		delete this.descriptionEl;
	}
}

export default VideoInfo;
export {VideoInfo};
