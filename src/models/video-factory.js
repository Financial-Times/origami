const Video = require('./video');
const Brightcove = require('./brightcove');
const BrightcovePlayer = require('./brightcove-player');

module.exports = (el, opts) => {
	const source = el.getAttribute('data-o-video-source').toLowerCase();
	const player = (el.getAttribute('data-o-video-player') || 'html5').toLowerCase();
	if (source === 'brightcove') {
		if (player === 'brightcove') {
			return new BrightcovePlayer(el, opts);
		}
		return new Brightcove(el, opts);
	} else {
		return new Video(el, opts);
	}

};
