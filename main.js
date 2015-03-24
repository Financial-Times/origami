'use strict';

var getDomPath = function (el, path) {
	path = path || [];
	if (!el.parentNode) {
		return path;
	}

	var trackable = el.getAttribute('data-trackable');

	if (trackable) {
		path.push(trackable);
	}

	if (el.hasAttribute('data-trackable-terminate')) {
		return path;
	}

	return getDomPath(el.parentNode, path);
};

function emitBeacon (data) {
	var event = document.createEvent('Event');
	event.initEvent('beacon:media', true, true);
	event.detail = data;
	document.body.dispatchEvent(event);
}

var Video = function (el, opts) {
	el.addEventListener('play', function (ev) {
		var domPath = getDomPath(el);
		emitBeacon({
			mediaType: 'video',
			contentId: el.getAttribute('data-content-id'),
			domPath: domPath.reverse().join(" | "),
			domPathTokens: domPath,
			event: 'play',
			progress: parseInt(100 * el.currentTime / el.duration, 10)
		});
	});

	el.addEventListener('pause', function (ev) {
		var domPath = getDomPath(el);
		emitBeacon({
			mediaType: 'video',
			contentId: el.getAttribute('data-content-id'),
			domPath: domPath.reverse().join(" | "),
			domPathTokens: domPath,
			event: 'pause',
			progress: parseInt(100 * el.currentTime / el.duration, 10)
		});
	});

	el.addEventListener('ended', function (ev) {
		var domPath = getDomPath(el);
		emitBeacon({
			mediaType: 'video',
			contentId: el.getAttribute('data-content-id'),
			domPath: domPath.reverse().join(" | "),
			domPathTokens: domPath,
			event: 'ended',
			progress: parseInt(100 * el.currentTime / el.duration, 10)
		});
	});
}

var init = function(el, opts) {
	if (!el) {
		el = document.body;
	}
	if (!(el instanceof HTMLElement)) {
		el = document.querySelector(el);
	}
	return [].map.call(el.querySelectorAll('video'), function (el) {
		return el.hasAttribute('data-next-video-js') ? undefined : new Video(el, opts);
	});
};

module.exports = {
	init: init
};
