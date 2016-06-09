const factory = require('./src/models/video-factory');

function loadAdsLibrary() {
	return new Promise((resolve, reject) => {
		const googleSdkScript = document.createElement('script');
		googleSdkScript.setAttribute('type', 'text/javascript');
		googleSdkScript.setAttribute('src', `//imasdk.googleapis.com/js/sdkloader/ima3.js`);
		googleSdkScript.setAttribute('async', true);
		googleSdkScript.setAttribute('defer', true);
		document.getElementsByTagName("head")[0].appendChild(googleSdkScript);

		googleSdkScript.addEventListener('load', () => {
			resolve();
		});

		googleSdkScript.addEventListener('error', () => {
			reject();
		});
	});
}

function loadVideos(options) {
	const videoPromises = [].map.call(options.context.querySelectorAll(options.selector + ':not([data-o-video-js])[data-o-component~="o-video"]'), videoEl => {
		return factory(videoEl, options)
			.init()
			// don't fail all if a video errors
			.catch(() => { });
	});

	return Promise.all(videoPromises);
}

function init(opts) {
	const options = opts || {};
	const defaultOpts = {
		context: document.body,
		selector: '*'
	};

	for (let defaultOpt in defaultOpts) {
		if (defaultOpts.hasOwnProperty(defaultOpt) && !options.hasOwnProperty(defaultOpt)) {
			options[defaultOpt] = defaultOpts[defaultOpt];
		}
	}

	const librariesLoaded = options.ads ? loadAdsLibrary() : Promise.resolve();
	options.context = options.context instanceof HTMLElement ? options.context : document.querySelector(opts.context);

	return librariesLoaded.then(() => {
		return loadVideos(options);
	}, () => {
		options.ads = false;
		return loadVideos(options);
	});
};

module.exports = {
	init,
	factory,
	_loadAdsLibrary: loadAdsLibrary
};
