/* global fetch */
const nJsonpFetch = require('n-jsonp-fetch');
const Video = require('./video');
const getAppropriateRendition = require('../libs/get-appropriate-rendition');

const eventListener = (video, ev) => {
	var event = new CustomEvent('oTracking.event', {
		detail: {
			action: 'media',
			category: 'video',
			event: ev.type,
			mediaType: 'video',
			contentId: video.id,
			progress: video.getProgress(),
		},
		bubbles: true
	});
	document.body.dispatchEvent(event);
};

const addEvents = (video, events) => {
	events.forEach(event => {
		video.el.addEventListener(event, eventListener.bind(this, video));
	});
};

// use the image resizing service, if width supplied
const updatePosterUrl = (posterImage, width) => {
	let url = `https://next-geebee.ft.com/image/v1/images/raw/${encodeURIComponent(posterImage)}?source=next`;
	if (width) {
		url += `&fit=scale-down&width=${width}`;
	}
	return url;
};

class Brightcove extends Video {
	constructor(el, opts) {
		super(el, opts);
	}

	getData() {
		const fetchFn = ('XDomainRequest' in window) ? nJsonpFetch : fetch;

		const dataPromise = this.opts.data ? Promise.resolve(this.opts.data) : fetchFn(`//next-video.ft.com/api/${this.id}`)
			.then(response => {
				if (response.ok) {
					return response.json();
				} else {
					throw Error('Brightcove responded with a ' + response.status + ' (' + response.statusText + ') for id ' + this.id);
				}
			});

		return dataPromise.then(data => {
			this.brightcoveData = data;
			this.posterImage = updatePosterUrl(data.videoStillURL, this.opts.optimumWidth);
			this.rendition = getAppropriateRendition(data.renditions, { width: this.opts.optimumWidth });
		});
	}

	renderVideo() {
		if (this.rendition) {
			if (this.opts.placeholder) {
				this.addPlaceholder();
			} else {
				this.addVideo();
			}
		}
		return this;
	}

	init() {
		return this.getData().then(() => this.renderVideo());
	}

	info() {
		const date = new Date(+this.brightcoveData.publishedDate);
		return {
			posterImage: this.posterImage,
			id: this.brightcoveData.id,
			length: this.brightcoveData.length,
			longDescription: this.brightcoveData.longDescription,
			name: this.brightcoveData.name,
			publishedDate: date.toISOString(),
			publishedDateReadable: date.toUTCString(),
			shortDescription: this.brightcoveData.shortDescription,
			tags: this.brightcoveData.tags,
		};
	}

	addVideo() {
		this.el = document.createElement('video');
		this.el.setAttribute('controls', true);
		this.el.setAttribute('poster', this.posterImage);
		this.el.setAttribute('src', this.rendition.url);
		this.el.className = Array.isArray(this.classes) ? this.classes.join(' ') : this.classes;
		this.containerEl.classList.add('n-video--player');
		this.containerEl.appendChild(this.el);
		addEvents(this, ['play', 'pause', 'ended']);
	}

	addPlaceholder() {
		this.placeholderEl = document.createElement('img');
		this.placeholderEl.setAttribute('src', this.posterImage);
		this.placeholderEl.className = Array.isArray(this.classes) ? this.classes.join(' ') : this.classes;
		this.containerEl.classList.add('n-video--placeholder');
		this.containerEl.appendChild(this.placeholderEl);

		const titleEl = document.createElement('div');
		titleEl.className = 'n-video__title';
		titleEl.textContent = this.brightcoveData.name;
		this.containerEl.appendChild(titleEl);

		if (this.opts.playButton) {

			const playButtonEl = document.createElement('button');
			playButtonEl.className = 'n-video__play-button';
			playButtonEl.setAttribute('data-trackable', 'play button');
			playButtonEl.textContent = 'Play video';

			this.containerEl.appendChild(playButtonEl);

			playButtonEl.addEventListener('click', () => {
				this.containerEl.removeChild(playButtonEl);
				this.containerEl.removeChild(titleEl);
				this.removePlaceholder();
				this.addVideo();
				this.el.play();
				this.el.focus();
			});
		}
	}

	removePlaceholder() {
		this.containerEl.classList.remove('n-video--placeholder');
		this.containerEl.removeChild(this.placeholderEl);
	}

	getProgress() {
		return this.el.duration ? parseInt(100 * this.el.currentTime / this.el.duration, 10) : 0;
	}
}

module.exports = Brightcove;
