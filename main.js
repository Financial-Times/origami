const factory = require('./src/models/video-factory');
const init = opts => {
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
	const context = options.context instanceof HTMLElement ? options.context : document.querySelector(opts.context);
	const videoPromises = [].map.call(context.querySelectorAll(options.selector + ':not([data-n-video-js])[data-n-component~="n-video"]'), videoEl => {
		return factory(videoEl, options)
			.init()
			// don't fail all if a video errors
			.catch(() => { });
	});
	return Promise.all(videoPromises);
}

module.exports = {
	init,
	factory
};
