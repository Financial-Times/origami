const Video = require('./video');
const Brightcove = require('./brightcove');
const BrightcovePlayer = require('./brightcove-player');
const YouTube = require('./you-tube');

module.exports = (el, opts) => {
	const source = el.getAttribute('data-n-video-source').toLowerCase();
	const player = (el.getAttribute('data-n-video-player') || 'html5').toLowerCase();
	if (source === 'brightcove') {
		if (player === 'brightcove') {
			return new BrightcovePlayer(el, opts);
		}
		return new Brightcove(el, opts);
	} else if (source === 'youtube') {
		return new YouTube(el, opts);
	} else {
		return new Video(el, opts);
	}

};
