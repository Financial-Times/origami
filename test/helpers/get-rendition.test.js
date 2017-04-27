/* global describe, it */
const getRendition = require('./../../src/js/helpers/get-rendition');
const renditions = require('./../fixtures/media-api-1.json').renditions;

describe('Get Appropriate Renditions', () => {

	const supportedFormats = ['h264'];

	it('should exist', () => {
		getRendition.should.exist;
	});

	it('should get largest if no width supplied', () => {
		getRendition(renditions, { supportedFormats: supportedFormats })
			.should.have.property('url', 'https://bcsecure04-a.akamaihd.net/34/47628783001/201704/970/47628783001_5393625770001_5393611350001.mp4?pubId=47628783001&videoId=5393611350001');
	});

	it('should get rendition of at least the width supplied', () => {
		getRendition(renditions, { supportedFormats: supportedFormats, optimumvideowidth: 600 })
			.should.have.property('url', 'https://bcsecure04-a.akamaihd.net/34/47628783001/201704/970/47628783001_5393625604001_5393611350001.mp4?pubId=47628783001&videoId=5393611350001');
	});

	it('should get smallest rendition if width is small', () => {
		getRendition(renditions, { supportedFormats: supportedFormats, optimumvideowidth: 390 })
			.should.have.property('url', 'https://bcsecure04-a.akamaihd.net/34/47628783001/201704/970/47628783001_5393625602001_5393611350001.mp4?pubId=47628783001&videoId=5393611350001');
	});


	it('should get largest rendition if width is bigger than any renditions', () => {
		getRendition(renditions, { supportedFormats: supportedFormats, optimumvideowidth: 2048 })
			.should.have.property('url', 'https://bcsecure04-a.akamaihd.net/34/47628783001/201704/970/47628783001_5393625770001_5393611350001.mp4?pubId=47628783001&videoId=5393611350001');
	});

});
