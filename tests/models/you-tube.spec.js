/* global describe, it, beforeEach, afterEach */
'use strict';

var YouTube = require('../../src/models/you-tube');

describe('YouTube', function () {

	var containerEl;

	beforeEach(function () {
		containerEl = document.createElement('div');
		containerEl.setAttribute('data-n-video-id', '1234567890');
		document.body.appendChild(containerEl);
	});

	afterEach(function () {
		document.body.removeChild(containerEl);
	});

	it('should exist', function () {
		YouTube.should.exist;
	});

	it('should be able to instantiate', function () {
		var youTube = new YouTube(containerEl);
		youTube.should.exist;
	});

	it('should return a Promise on `init`', function () {
		var youTube = new YouTube(containerEl);
		youTube.init().should.be.an.instanceOf(Promise);
	});

	it('should return the Brightcove instance on `init`', function () {
		var youTube = new YouTube(containerEl);
		youTube.init().should.eventually.equal(youTube);
	});

	it('should create an iframe on `init`', function () {
		var youTube = new YouTube(containerEl);
		youTube.init();
		var iframeEl = containerEl.querySelector('iframe');
		iframeEl.getAttribute('src').should.equal('https://youtube.com/embed/1234567890');
	});

});
