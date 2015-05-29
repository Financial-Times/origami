/* global describe, it, beforeEach, afterEach */
'use strict';

var Video = require('../../src/models/video');

describe('Video', function () {

	var containerEl;

	beforeEach(function () {
		containerEl = document.createElement('div');
		containerEl.setAttribute('data-n-video-id', '1234567890');
		containerEl.setAttribute('data-trackable', 'video');
		document.body.appendChild(containerEl);
	});

	afterEach(function () {
		document.body.removeChild(containerEl);
	});

	it('should exist', function () {
		Video.should.exist;
	});

	it('should be able to instantiate', function () {
		var video = new Video(containerEl);
		video.should.exist;
		video.domPathTokens.should.eql(['video']);
		video.domPath.should.equal('video');
	});

	it('should an a `data-n-video-js` attribtue', function () {
		new Video(containerEl);
		containerEl.getAttribute('data-n-video-js').should.exists;
	});

	it('should return a Promise on init', function () {
		var video = new Video(containerEl);
		video.init().should.be.an.instanceOf(Promise);
	});

});
