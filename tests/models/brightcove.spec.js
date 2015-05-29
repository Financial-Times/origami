/* global describe, it, beforeEach, afterEach */
'use strict';

var Brightcove = require('../../src/models/brightcove');

describe('Brightcove', function () {

	var videoEl;

	beforeEach(function () {
		videoEl = document.createElement('div');
		videoEl.setAttribute('data-n-video-id', '1234567890');
		document.body.appendChild(videoEl);
	});

	afterEach(function () {
		document.body.removeChild(videoEl);
	});

	it('should exist', function () {
		Brightcove.should.exist;
	});

	it('should be able to instantiate', function () {
		var video = new Brightcove(videoEl);
		video.should.exist;
	});

});
