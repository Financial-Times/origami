/* global describe, xit */
const getAppropriateRendition = require('../../src/libs/get-appropriate-rendition');
const renditions = require('../fixtures/brightcove.json').renditions;

describe('Get Appropriate Renditions', () => {

	const supportedFormats = ['h264'];

	xit('should exist', () => {
		getAppropriateRendition.should.exist;
	});

	xit('should get largest if no width supplied', () => {
		getAppropriateRendition(renditions, { supportedFormats: supportedFormats })
			.should.have.property('id', 4085577922001);
	});

	xit('should get rendition of at least the width supplied', () => {
		getAppropriateRendition(renditions, { supportedFormats: supportedFormats, width: 410 })
			.should.have.property('id', 4085577902001);
	});

	xit('should get smallest rendition if width is small', () => {
		getAppropriateRendition(renditions, { supportedFormats: supportedFormats, width: 390 })
			.should.have.property('id', 4085577899001);
	});

});
