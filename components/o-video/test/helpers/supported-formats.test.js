/* eslint-env mocha */

import proclaim from 'proclaim';

import supportedFormats from './../../src/js/helpers/supported-formats.js';

describe('Supported Formats', () => {

	it('should exist', () => {
		proclaim.ok(supportedFormats);
	});

});
