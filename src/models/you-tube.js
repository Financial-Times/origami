'use strict';

var Video = require('./video');

function YouTube () {
	Video.apply(this, arguments);
}

YouTube.prototype = Object.create(Video.prototype, {
	constructor: {
		value: YouTube,
		configurable: true
	}
});

YouTube.prototype.init = function () {
	this.el = document.createElement('iframe');
	var attrs = {
		src: 'https://youtube.com/embed/' + this.id,
		height: '315',
		width: '560',
		frameborder: '0',
		webkitallowfullscreen: 'true',
		mozallowfullscreen: 'true',
		allowfullscreen: 'true'
	};
	for (var attr in attrs) {
		if (attrs.hasOwnProperty(attr)) {
			this.el.setAttribute(attr, attrs[attr]);
		}
	}
	this.containerEl.appendChild(this.el);
	return Promise.resolve(this);
};

module.exports = YouTube;
