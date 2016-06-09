/* global fetch, videojs */

const crossDomainFetch = require('o-fetch-jsonp').crossDomainFetch;
const Video = require('./video');
const getAppropriateRendition = require('../libs/get-appropriate-rendition');

let currentlyPlayingVideo = null;
let requestedVideo = null;
let videoJsPromise;
let videoJsPluginsPromise;
let videoElementIdOrder = 0;
let advertising;

const pauseOtherVideos = (video) => {
	requestedVideo = video;
	if(currentlyPlayingVideo && currentlyPlayingVideo !== requestedVideo){
		currentlyPlayingVideo.pause();
	}

	currentlyPlayingVideo = video;
};

const ensureVideoJsLibraryLoaded = () => {
	if (videoJsPromise) {
		return videoJsPromise;
	}

	const videojsScript = document.createElement('script');
	videojsScript.setAttribute('type', 'text/javascript');
	videojsScript.setAttribute('src', `//vjs.zencdn.net/5.9.2/video.min.js`);
	videojsScript.setAttribute('async', true);
	videojsScript.setAttribute('defer', true);
	document.getElementsByTagName("head")[0].appendChild(videojsScript);

	const videojsStyles = document.createElement('link');
	videojsStyles.setAttribute('rel', 'stylesheet');
	videojsStyles.setAttribute('type', 'text/css');
	videojsStyles.setAttribute('href', '//vjs.zencdn.net/5.9.2/video-js.min.css');
	document.getElementsByTagName('head')[0].appendChild(videojsStyles);

	videoJsPromise = new Promise(resolve => {
		videojsScript.addEventListener('load', () => {
				resolve();
		});
	});

	return videoJsPromise;
};

const ensureVideoJsPluginsAreLoaded = () => {
	if(videoJsPluginsPromise) {
		return videoJsPluginsPromise;
	}

	if(advertising) {
		const videoJsAdPluginsScript = document.createElement('script');
		videoJsAdPluginsScript.setAttribute('type', 'text/javascript');
		videoJsAdPluginsScript.setAttribute('src', `https://next-geebee.ft.com/assets/videojs/videojs-plugins.min.js`);
		videoJsAdPluginsScript.setAttribute('async', true);
		videoJsAdPluginsScript.setAttribute('defer', true);
		document.getElementsByTagName("head")[0].appendChild(videoJsAdPluginsScript);

		let videoJsAdPluginsScriptPromise = new Promise(pluginsLoaded => {
			videoJsAdPluginsScript.addEventListener('load', () => {
				pluginsLoaded();
			});
		});

		const videoJsAdPluginStyles = document.createElement('link');
		videoJsAdPluginStyles.setAttribute('rel', 'stylesheet');
		videoJsAdPluginStyles.setAttribute('type', 'text/css');
		videoJsAdPluginStyles.setAttribute('href', 'https://next-geebee.ft.com/assets/videojs/videojs-plugins.min.css');
		document.getElementsByTagName('head')[0].appendChild(videoJsAdPluginStyles);
		videoJsPluginsPromise = Promise.all([videoJsAdPluginsScriptPromise]);
		return videoJsPluginsPromise;
	} else {
		return Promise.resolve();
	}
};

const ensureAllScriptsAreLoaded = () => {
	return ensureVideoJsLibraryLoaded().then(() => {
		return ensureVideoJsPluginsAreLoaded();
	});
};


// use the image resizing service, if width supplied
const updatePosterUrl = (posterImage, width) => {
	let url = `https://image.webservices.ft.com/v1/images/raw/${encodeURIComponent(posterImage)}?source=o-video`;
	if (width) {
		url += `&fit=scale-down&width=${width}`;
	}
	return url;
};

class VideoJsPlayer extends Video {
	constructor(el, opts) {
		advertising = opts && opts['ads'] ? true : false;
		ensureAllScriptsAreLoaded();
		super(el, opts);
		this.targeting = {
			site: '/5887/ft.com',
			position: 'video',
			sizes: '592x333|400x225',
			videoId: this.id
		};
	}

	getData() {
		const dataPromise = this.opts.data ? Promise.resolve(this.opts.data) : crossDomainFetch(`//next-video.ft.com/api/${this.id}`)
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
			this.rendition = getAppropriateRendition(data.renditions);
			this.targeting.brand = this.getVideoBrand();
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
		const initPromise = this.getData().then(() => this.renderVideo());
		return Promise.all([initPromise, videoJsPromise]);
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
		let videoIdProperty = 'test-video-' + videoElementIdOrder++;
		this.el = document.createElement('video');
		this.el.setAttribute('poster', this.posterImage);
		this.el.setAttribute('src', this.rendition.url);
		this.el.setAttribute('id', videoIdProperty);
		this.el.className = Array.isArray(this.classes) ? this.classes.join(' ') : this.classes;
		this.el.classList.add('o-video--videojs');
		this.containerEl.appendChild(this.el);
		this.el.addEventListener('playing', () => pauseOtherVideos(this.el));
		return ensureAllScriptsAreLoaded()
			.then(() => {
				let videoPlayer = videojs(videoIdProperty, {"controls": true,"autoplay": true,"preload": "auto"}).width('100%');
				if(advertising) {
					this.advertising(videoPlayer, videoIdProperty);
				}
			});
	}

	getVideoBrand() {
		if(!this.brightcoveData.tags || this.brightcoveData.tags.length === 0) {
			return false;
		} else {
			let filtered = this.brightcoveData.tags.filter(val => val.toLowerCase().indexOf('brand:') !== -1);
			if(filtered.length > 0) {
				try {
					 // when we target the value in the ad server, we only want to target actual brand name, so we strip out "brand:" part of the string
					 return filtered.pop().substring(6);
				}
				catch (e) {
					 return false;
				}
			} else {
				return false;
			}
		}
	}

	advertising(player, videoIdProperty) {
		// ad server request call that contains ad server details such as: site(iu), sizes(sz), position(pos), video id(ttid) and branding(brand) if it is available
		// these key values are then used on ad server to target pre roll advertising
		let advertisingUrl = `http://pubads.g.doubleclick.net/gampad/ads?env=vp&gdfp_req=1&impl=s&output=xml_vast2&iu=${this.targeting.site}&sz=${this.targeting.sizes}&unviewed_position_start=1&scp=pos%3D${this.targeting.position}&ttid=${this.targeting.videoId}`;
		if(this.targeting.brand) {
			advertisingUrl += `&brand=${encodeURIComponent(this.targeting.brand)}`;
		}

		player.ima({
			id: videoIdProperty,
			adTagUrl: advertisingUrl
		});
		player.ima.requestAds();
	}

	addPlaceholder() {
		this.placeholderEl = document.createElement('img');
		this.placeholderEl.setAttribute('src', this.posterImage);
		this.placeholderEl.className = Array.isArray(this.classes) ? this.classes.join(' ') : this.classes;
		this.containerEl.classList.add('o-video--placeholder');

		this.containerEl.appendChild(this.placeholderEl);

		let titleEl;
		if (this.opts.placeholderTitle) {
			titleEl = document.createElement('div');
			titleEl.className = 'o-video__title';
			titleEl.textContent = this.brightcoveData.name;
			this.containerEl.appendChild(titleEl);
		}

		if (this.opts.playButton) {

			const playButtonEl = document.createElement('button');
			playButtonEl.className = 'o-video__play-button';
			this.containerEl.appendChild(playButtonEl);

			const playIconEl = document.createElement('i');
			playIconEl.className = 'o-video__play-button-icon';
			playButtonEl.appendChild(playIconEl);

			playButtonEl.addEventListener('click', () => {
				this.containerEl.removeChild(playButtonEl);
				if (titleEl) {
					this.containerEl.removeChild(titleEl);
				}
				this.removePlaceholder();
				this.addVideo();
				this.el.focus();
			});
		}
	}

	removePlaceholder() {
		this.containerEl.classList.remove('o-video--placeholder');
		this.containerEl.removeChild(this.placeholderEl);
	}

}

module.exports = VideoJsPlayer;
