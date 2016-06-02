const Video = require('./video');
const Brightcove = require('./brightcove');

module.exports = (el, opts) => {
	const source = el.getAttribute('data-o-video-source').toLowerCase();
	if (source === 'brightcove') {
		return new Brightcove(el, opts);
	} else {
		return new Video(el, opts);
	}

};
