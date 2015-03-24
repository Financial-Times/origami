'use strict';

var getDomPath = function (el, path) {

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

function emitBeacon = function (data) {
	var event = document.createEvent('Event');
	event.initEvent('beacon:cta', true, true);
	event.detail = data;
	document.body.dispatchEvent(event);
}

var Video = function (el, opts) {
	el.addEventListener('play', function (ev) {
		var domPath = getDomPath(el);
		emitBeacon({
			nodeName: 'video',
			domPath: domPath.reverse().join(" | "),
			domPathTokens: domPath,
			target: e.target.getAttribute('data-trackable') + '| play',
			position: el.currentTime
		});
	});

	el.addEventListener('pause', function (ev) {
		var domPath = getDomPath(el);
		emitBeacon({
			nodeName: 'video',
			domPath: domPath.reverse().join(" | "),
			domPathTokens: domPath,
			target: e.target.getAttribute('data-trackable') + '| pause',
			position: el.currentTime
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
