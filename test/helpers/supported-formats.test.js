/* eslint-env mocha */
import supportedFormats from './../../src/js/helpers/supported-formats';
import proclaim from 'proclaim';

describe('Supported Formats', () => {

	it('should exist', () => {
		proclaim.ok(supportedFormats);
	});

});
