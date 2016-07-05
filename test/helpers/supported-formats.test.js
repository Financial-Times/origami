/* global describe, it */
const supportedFormats = require('./../../src/helpers/supported-formats');

describe('Supported Formats', () => {

	it('should exist', () => {
		supportedFormats.should.exist;
	});

});
