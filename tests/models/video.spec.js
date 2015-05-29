/* global describe, it, beforeEach, afterEach */
'use strict';

var Video = require('../../src/models/video');

describe('Video', function () {

	var videoEl;

	beforeEach(function () {
		videoEl = document.createElement('div');
		videoEl.setAttribute('data-n-video-id', '1234567890');
		videoEl.setAttribute('data-trackable', 'video');
		document.body.appendChild(videoEl);
	});

	afterEach(function () {
		document.body.removeChild(videoEl);
	});

	it('should exist', function () {
		Video.should.exist;
	});

	it('should be able to instantiate', function () {
		var video = new Video(videoEl);
		video.should.exist;
		video.domPathTokens.should.eql(['video']);
		video.domPath.should.equal('video');
	});

});
