/* global fetch */
'use strict';

require('es6-promise').polyfill();
require('isomorphic-fetch');
var Video = require('./video');
var supportedFormats = require('../libs/supported-formats');

// get the rendition closest to the supplied width
function getAppropriateRendition(renditions, width) {
	var appropriateRendition;
	renditions
		.filter(function (rendition, index) {
			return supportedFormats[rendition.videoCodec.toLowerCase()];
		})
		.sort(function (renditionOne, renditionTwo) {
			return renditionTwo.frameWidth - renditionOne.frameWidth;
		})
		.some(function (rendition, index) {
			if (rendition.frameWidth < width) {
				appropriateRendition = (index === 0) ? rendition : renditions[index - 1];
				return true;
			}
			return false;
		});
	return appropriateRendition || renditions.pop();
}

// PRIVATE
function eventListener(video, ev) {
	var event = document.createEvent('Event');
	event.initEvent('beacon:media', true, true);
	event.detail = {
		mediaType: 'video',
		contentId: video.id,
		domPath: video.domPath,
		domPathTokens: video.domPathTokens,
		event: ev.type,
		progress: video.getProgress()
	};
	document.body.dispatchEvent(event);
}

function addEvents(video, events) {
	events.forEach(function (event) {
		video.el.addEventListener(event, eventListener.bind(this, video));
	});
}

function Brightcove () {
	Video.apply(this, arguments);
}

Brightcove.prototype = Object.create(Video.prototype, {
	constructor: {
		value: Brightcove,
		configurable: true
	}
});

Brightcove.prototype.init = function () {
	return fetch('//next-brightcove-proxy.ft.com/' + this.id)
		.then(function (response) {
			if (response.ok) {
				return response.json();
			} else {
				throw Error('Brightcove responded with a ' + response.status + ' (' + response.statusText + ') for id ' + this.id);
			}
		}.bind(this))
		.then(function (data) {
			var rendition = getAppropriateRendition(data.renditions, 710);
			if (rendition) {
				this.el = document.createElement('video');
				this.el.setAttribute('controls', true);
				this.el.setAttribute('poster', data.videoStillURL);
				this.el.setAttribute('src', rendition.url);
				this.containerEl.appendChild(this.el);
				addEvents(this, ['play', 'pause', 'events']);
			}
			return this;
		}.bind(this));
};

Video.prototype.getProgress = function () {
	return this.el.duration ? parseInt(100 * this.el.currentTime / this.el.duration, 10) : 0;
};

module.exports = Brightcove;
