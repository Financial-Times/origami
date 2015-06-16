'use strict';

var getDomPathTokens = require('../libs/get-dom-path-tokens');

function Video(el, opts) {
	this.containerEl = el;
	var defaultOpts = {
		classes: [],
		optimumWidth: null,
		placeholder: false,
		playButton: true
	};
	this.opts = {};
	Object.keys(defaultOpts).forEach(function (optionName) {
		var optionAttribute = this.containerEl.getAttribute('data-n-video-opts-' + optionName);
		if (optionAttribute) {
			this.opts[optionName] = optionAttribute;
		} else if (opts && opts[optionName]) {
			this.opts[optionName] = opts[optionName];
		} else {
			this.opts[optionName] = defaultOpts[optionName];
		}
	}.bind(this));
	this.classes = typeof this.opts.classes === 'string' ? this.opts.classes.split(' ') : this.opts.classes.slice();
	this.classes.push('n-video__video');
	this.id = el.getAttribute('data-n-video-id');
	this.el;
	this.placeholderEl;
	this.domPathTokens = getDomPathTokens(this.containerEl);
	this.domPath = this.domPathTokens.reverse().join(' | ');

	this.containerEl.setAttribute('data-n-video-js', '');
}

Video.prototype.init = function () {
	return Promise.resolve(this);
};

module.exports = Video;
