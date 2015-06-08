/* global fetch */
'use strict';

require('es6-promise').polyfill();
require('isomorphic-fetch');
var Video = require('./video');
var getAppropriateRendition = require('../libs/get-appropriate-rendition');

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

// use the image resizing service, if width supplied
function updatePosterUrl(posterImage, width) {
	var url = 'https://next-geebee.ft.com/image/v1/images/raw/' + encodeURIComponent(posterImage) + '?source=next';
	if (width) {
		url += '&fit=scale-down&width=' + width;
	}
	return url;
}

// PRIVATE
function addVideo() {
	/* jshint validthis: true */
	this.el = document.createElement('video');
	this.el.setAttribute('controls', true);
	this.el.setAttribute('poster', this.posterImage);
	this.el.setAttribute('src', this.rendition.url);
	this.el.className = this.classes.join(' ');
	this.containerEl.classList.add('n-video--player');
	this.containerEl.appendChild(this.el);
	addEvents(this, ['play', 'pause', 'ended']);
}

function addPlaceholder() {
	/* jshint validthis: true */
	this.placeholderEl = document.createElement('img');
	this.placeholderEl.setAttribute('src', this.posterImage);
	this.placeholderEl.className = this.classes.join(' ');
	this.containerEl.classList.add('n-video--placeholder');
	this.containerEl.appendChild(this.placeholderEl);
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
	return fetch('https://next-video.ft.com/api/' + this.id)
		.then(function (response) {
			if (response.ok) {
				return response.json();
			} else {
				throw Error('Brightcove responded with a ' + response.status + ' (' + response.statusText + ') for id ' + this.id);
			}
		}.bind(this))
		.then(function (data) {
			this.posterImage = updatePosterUrl(data.videoStillURL, this.opts.optimumWidth);
			this.rendition = getAppropriateRendition(data.renditions, { width: this.opts.optimumWidth });
			if (this.rendition) {
				if (this.opts.placeholder) {
					addPlaceholder.call(this);
				} else {
					addVideo.call(this);
				}
			}
			return this;
		}.bind(this));
};

Brightcove.prototype.getProgress = function () {
	return this.el.duration ? parseInt(100 * this.el.currentTime / this.el.duration, 10) : 0;
};

module.exports = Brightcove;
