/* global describe, it, beforeEach, afterEach */
const videoFactory = require('../../src/models/video-factory');
const Brightcove = require('../../src/models/brightcove');
const Video = require('../../src/models/video');

describe('Video Factory', () => {

	let containerEl;

	beforeEach(() => {
		containerEl = document.createElement('div');
		containerEl.setAttribute('data-o-video-id', '1234567890');
		document.body.appendChild(containerEl);
	});

	afterEach(() => {
		document.body.removeChild(containerEl);
	});

	it('should exist', () => {
		videoFactory.should.exist;
	});

	it('should create a Brightcove object if source is \'brightcove\'', () => {
		containerEl.setAttribute('data-o-video-source', 'brightcove');
		videoFactory(containerEl).should.be.a.instanceof(Brightcove);
	});

	it('should create a standard Video object if unknown source', () => {
		containerEl.setAttribute('data-o-video-source', 'other');
		videoFactory(containerEl).should.be.an.instanceOf(Video);
	});

});
