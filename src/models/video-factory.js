const Video = require('./video');
const Brightcove = require('./brightcove');
const VideoJsPlayer = require('./videojs');

module.exports = (el, opts) => {
	const source = el.getAttribute('data-o-video-source').toLowerCase();
	const player = (el.getAttribute('data-o-video-player') || 'html5').toLowerCase();
	if (source === 'brightcove') {
		if (player === 'videojs') {
			return new VideoJsPlayer(el, opts);
		}
		return new Brightcove(el, opts);
	} else {
		return new Video(el, opts);
	}

};
