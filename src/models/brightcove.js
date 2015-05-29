/* global fetch */
'use strict';

require('es6-promise').polyfill();
require('isomorphic-fetch');
var Video = require('./video');
var supportedFormats = require('../libs/supported-formats');

// get the rendition closest to the supplied width
function getAppropriateRendition(renditions, width) {
	var appropriateRendition;
	// order smallest to largest
	var orderedRenditions = renditions
		.filter(function (rendition) {
			return supportedFormats.indexOf(rendition.videoCodec.toLowerCase()) > -1;
		})
		.sort(function (renditionOne, renditionTwo) {
			return renditionOne.frameWidth - renditionTwo.frameWidth;
		});

	// if no width supplied, get largest
	if (!width) {
		return orderedRenditions.pop();
	}
	// NOTE: rather use find...
	orderedRenditions.some(function (rendition) {
		if (rendition.frameWidth >= width) {
			appropriateRendition = rendition;
			return true;
		}
		return false;
	});

	return appropriateRendition || orderedRenditions.shift();
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
			var rendition = getAppropriateRendition(data.renditions, this.opts.optimumWidth);
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
