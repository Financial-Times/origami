/* global describe, it, beforeEach, afterEach */
const Video = require('../../src/models/video');

describe('Video', () => {

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
		Video.should.exist;
	});

	it('should be able to instantiate', () => {
		const video = new Video(containerEl);
		video.should.exist;
	});

	it('should an a `data-o-video-js` attribute', () => {
		new Video(containerEl);
		containerEl.getAttribute('data-o-video-js').should.exists;
	});

	it('should return a Promise on init', () => {
		const video = new Video(containerEl);
		video.init().should.be.an.instanceOf(Promise);
	});

});
