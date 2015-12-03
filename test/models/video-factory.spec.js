/* global describe, it, beforeEach, afterEach */
const videoFactory = require('../../src/models/video-factory');
const Brightcove = require('../../src/models/brightcove');
const YouTube = require('../../src/models/you-tube');
const Video = require('../../src/models/video');

describe('Video Factory', () => {

	let containerEl;

	beforeEach(() => {
		containerEl = document.createElement('div');
		containerEl.setAttribute('data-n-video-id', '1234567890');
		document.body.appendChild(containerEl);
	});

	afterEach(() => {
		document.body.removeChild(containerEl);
	});

	it('should exist', () => {
		videoFactory.should.exist;
	});

	it('should create a Brightcove object if source is \'brightcove\'', () => {
		containerEl.setAttribute('data-n-video-source', 'brightcove');
		videoFactory(containerEl).should.be.a.instanceof(Brightcove);
	});

	it('should create a YouTube object if source is \'youtube\'', () => {
		containerEl.setAttribute('data-n-video-source', 'youtube');
		videoFactory(containerEl).should.be.an.instanceOf(YouTube);
	});

	it('should create a standard Video object if unknown source', () => {
		containerEl.setAttribute('data-n-video-source', 'other');
		videoFactory(containerEl).should.be.an.instanceOf(Video);
	});

});
