/* global describe, it */
const getRendition = require('./../../src/js/helpers/get-rendition');
const renditions = require('./../fixtures/brightcove-1.json').renditions;

describe('Get Appropriate Renditions', () => {

	const supportedFormats = ['h264'];

	it('should exist', () => {
		getRendition.should.exist;
	});

	it('should get largest if no width supplied', () => {
		getRendition(renditions, { supportedFormats: supportedFormats })
			.should.have.property('id', 4085577922001);
	});

	it('should get rendition of at least the width supplied', () => {
		getRendition(renditions, { supportedFormats: supportedFormats, optimumwidth: 410 })
			.should.have.property('id', 4085577902001);
	});

	it('should get smallest rendition if width is small', () => {
		getRendition(renditions, { supportedFormats: supportedFormats, optimumwidth: 390 })
			.should.have.property('id', 4085577899001);
	});

});
