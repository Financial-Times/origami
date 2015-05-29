/* global describe, it, beforeEach, afterEach */
'use strict';

var YouTube = require('../../src/models/you-tube');

describe('YouTube', function () {

	var videoEl;

	beforeEach(function () {
		videoEl = document.createElement('div');
		videoEl.setAttribute('data-next-video-id', '1234567890');
		document.body.appendChild(videoEl);
	});

	afterEach(function () {
		document.body.removeChild(videoEl);
	});

	it('should exist', function () {
		YouTube.should.exist;
	});

	it('should be able to instantiate', function () {
		var video = new YouTube(videoEl);
		video.should.exist;
	});

});
