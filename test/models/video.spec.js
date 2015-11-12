/* global describe, it, beforeEach, afterEach */
const Video = require('../../src/models/video');

describe('Video', () => {

	let containerEl;

	beforeEach(() => {
		containerEl = document.createElement('div');
		containerEl.setAttribute('data-n-video-id', '1234567890');
		containerEl.setAttribute('data-trackable', 'video');
		document.body.appendChild(containerEl);
	});

	afterEach(() => {
		document.body.removeChild(containerEl);
	});

	it('should exist', () => {
		Video.should.exist;
	});

	it('should be able to instantiate', () => {
		const video = new Video(containerEl);
		video.should.exist;
		video.domPathTokens.should.eql(['video']);
		video.domPath.should.equal('video');
	});

	it('should an a `data-n-video-js` attribute', () => {
		new Video(containerEl);
		containerEl.getAttribute('data-n-video-js').should.exists;
	});

	it('should return a Promise on init', () => {
		const video = new Video(containerEl);
		video.init().should.be.an.instanceOf(Promise);
	});

});
