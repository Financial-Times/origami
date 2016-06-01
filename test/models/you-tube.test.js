/* global describe, xit, beforeEach, afterEach */
const YouTube = require('../../src/models/you-tube');

describe('YouTube', () => {

	let containerEl;

	beforeEach(() => {
		containerEl = document.createElement('div');
		containerEl.setAttribute('data-n-video-id', '1234567890');
		document.body.appendChild(containerEl);
	});

	afterEach(() => {
		document.body.removeChild(containerEl);
	});

	xit('should exist', () => {
		YouTube.should.exist;
	});

	xit('should be able to instantiate', () => {
		const youTube = new YouTube(containerEl);
		youTube.should.exist;
	});

	xit('should return a Promise on `init`', () => {
		const youTube = new YouTube(containerEl);
		youTube.init().should.be.an.instanceOf(Promise);
	});

	xit('should return the Brightcove instance on `init`', () => {
		const youTube = new YouTube(containerEl);
		youTube.init().should.eventually.equal(youTube);
	});

	xit('should create an iframe on `init`', () => {
		const youTube = new YouTube(containerEl);
		youTube.init();
		const iframeEl = containerEl.querySelector('iframe');
		iframeEl.getAttribute('src').should.equal('https://youtube.com/embed/1234567890');
	});

});
