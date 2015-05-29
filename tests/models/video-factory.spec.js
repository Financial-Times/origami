/* global describe, it, beforeEach, afterEach */
'use strict';

var videoFactory = require('../../src/models/video-factory');
var Brightcove = require('../../src/models/brightcove');
var YouTube = require('../../src/models/you-tube');
var Video = require('../../src/models/video');

describe('Video Factory', function () {

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
		videoFactory.should.exist;
	});

	it('should create a Brightcove object if source is \'brightcove\'', function () {
		containerEl.setAttribute('data-n-video-source', 'brightcove');
		videoFactory(containerEl).should.be.a.instanceof(Brightcove);
	});

	it('should create a YouTube object if source is \'youtube\'', function () {
		containerEl.setAttribute('data-n-video-source', 'youtube');
		videoFactory(containerEl).should.be.an.instanceOf(YouTube);
	});

	it('should create a standard Video object if unknown source', function () {
		containerEl.setAttribute('data-n-video-source', 'other');
		videoFactory(containerEl).should.be.an.instanceOf(Video);
	});

});
