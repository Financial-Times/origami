/* eslint-env mocha */
/* global proclaim */

import supportedFormats from './../../src/js/helpers/supported-formats';

describe('Supported Formats', () => {

	it('should exist', () => {
		proclaim.ok(supportedFormats);
	});

});
