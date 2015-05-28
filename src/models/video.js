'use strict';

var getDomPathTokens = require('../libs/get-dom-path-tokens');

function Video(el, opts) {
	this.containerEl = el;
	this.id = el.getAttribute('data-next-video-id');
	this.videoEl;
	this.domPathTokens = getDomPathTokens(this.containerEl);
	this.domPath = this.domPathTokens.reverse().join(' | ');
}

Video.prototype.init = function () {
	return Promise.resolve(this);
};

Video.prototype.getProgress = function () {
	return parseInt(100 * this.el.currentTime / this.el.duration, 10);
};

module.exports = Video;
